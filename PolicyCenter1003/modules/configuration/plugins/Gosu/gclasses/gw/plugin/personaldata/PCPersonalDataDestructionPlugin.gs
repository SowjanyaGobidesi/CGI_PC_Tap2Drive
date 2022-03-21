package gw.plugin.personaldata

uses com.google.common.collect.Lists
uses entity.Contact
uses gw.api.database.Queries
uses gw.api.domain.PinnableHierarchyModel
uses gw.api.domain.personaldata.PCPersonalDataDestroyer
uses gw.api.domain.personaldata.PinnablePersonalDataDestroyer
uses gw.api.util.PCDeleteBuilder
uses gw.personaldata.purge.RemoveOrphanedAccountContactAndAccountContactRoleVisitor
uses gw.personaldata.purge.RemoveOrphanedEntitiesVisitor
uses gw.personaldata.purge.RemoveOrphanedLinkedAddressVisitor
uses gw.pl.persistence.core.Bundle

@Export
class PCPersonalDataDestructionPlugin extends AbstractPersonalDataDestructionPlugin {

  override function shouldDestroyPolicyTerm(policyTerm: PolicyTerm, descendants: Collection<DestructionRootPinnable>,
                                            origin: DestructionRootPinnable): PersonalDataDisposition {
    return MUST_NOT_DESTROY
  }

  override function shouldDestroyPolicy(policy: Policy, descendants: Collection<DestructionRootPinnable>,
                                        origin: DestructionRootPinnable): PersonalDataDisposition {
    return MUST_NOT_DESTROY
  }

  override function shouldDestroyAccount(account: Account, descendants: Collection<DestructionRootPinnable>,
                                         origin: DestructionRootPinnable): PersonalDataDisposition {
    return MUST_NOT_DESTROY
  }

  override function shouldDestroyContact(contact: Contact, descendants: Collection<DestructionRootPinnable>,
                                         origin: DestructionRootPinnable): PersonalDataDisposition {
    return MUST_NOT_DESTROY
  }

  override property get Destroyer(): PinnablePersonalDataDestroyer {
    return new PCPersonalDataDestroyer()
  }

  override function shouldDestroyUser(userContact: UserContact): PersonalDataDisposition {
    return MUST_NOT_DESTROY
  }

  override function notifyDataProtectionOfficer(root: DestructionRootPinnable, title: String, message: String, errorOccurred: Date) {
    root.accept(new NotifyDataProtectionOfficerVisitor(title, message, errorOccurred))
  }

  override function notifyExternalSystemsRequestProcessed(requester : PersonalDataDestructionRequester) {
    //To notify the external system from which the request to purge the Contact with the given AddressBookUID originated
  }

  override function createContext(context : PersonalDataPurgeContext) : PersonalDataPurgeContext {
    /* just return the specified context, or return a subclass instance
     * created from the specified context...
     */
    return new ExtendedContext(context)
  }

  override function prepareForPurge(context : PersonalDataPurgeContext) {
    /*
     * Perform any actions prior to purge such as logging or gathering statistics.
     * Guidewire performs some cleanup for PolicyPeriod links before purging.
     */
    if (context typeis ExtendedContext) {
      var model = new PinnableHierarchyModel(context.Pinnable)
      model.accept(context.Visitor)
    }
  }

  override function postPurge(context : PersonalDataPurgeContext) {
    /*
     * Perform any actions post-purge such as clean-up
     * or notification of external systems
     * Other than logging or gathering statistics, Guidewire strongly recommends against any business critical task being performed
     * in this method.
     */
    if (context typeis ExtendedContext) {
      var orphanedEntities: Collection<KeyableBean>
      gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
        orphanedEntities = context.Visitor.postPurge(bundle)
      })

      deleteOrphanEntities(orphanedEntities)
    }
  }

  private function deleteOrphanEntities(orphans: Collection<KeyableBean>) {
    orphans.each(\ orphan -> {
      var type = orphan.IntrinsicType
      var query = Queries.createQuery(type)
      query.withFindRetired(true)
          .withLogSQL(true)
          .compare(KeyableBean.ID_DYNPROP.get(type), Equals, orphan.ID)
      new PCDeleteBuilder().executeDelete(query)
    })
  }

  /**
   * Extended PurgeContext. Modify to add customer-specific information
   * that will be passed from the pre-purge to the post-purge extension.
   */
  static class ExtendedContext extends PersonalDataPurgeContext {
    var _visitor : CompositeVisitor as readonly Visitor

    construct(ctx : PersonalDataPurgeContext) {
      super(ctx)
      _visitor = new CompositeVisitor()
      _visitor.addVisitor(new RemoveOrphanedAccountContactAndAccountContactRoleVisitor())
      _visitor.addVisitor(new RemoveOrphanedLinkedAddressVisitor())
    }
  }

  private static class CompositeVisitor implements RemoveOrphanedEntitiesVisitor {
    var _visitors : List<RemoveOrphanedEntitiesVisitor>

    construct() {
      _visitors = new ArrayList<RemoveOrphanedEntitiesVisitor>()
    }

    function addVisitor(visitor : RemoveOrphanedEntitiesVisitor) {
      _visitors.add(visitor)
    }

    function postPurge(bundle: Bundle): Collection<KeyableBean> {
      var orphanedEntities = Lists.newArrayList<KeyableBean>()
      _visitors.each(\elt -> orphanedEntities.addAll(elt.postPurge(bundle)))
      return orphanedEntities
    }

    override function visit(contact : Contact) {
      _visitors.each(\elt -> elt.visit(contact))
    }

    override function visit(account : Account) {
      _visitors.each(\elt -> elt.visit(account))
    }

    override function visit(policy : Policy) {
      _visitors.each(\elt -> elt.visit(policy))
    }

    override function visit(policyTerm : PolicyTerm) {
      _visitors.each(\elt -> elt.visit(policyTerm))
    }

    override function visit(period : PolicyPeriod) {
      _visitors.each(\elt -> elt.visit(period))
    }
  }
}