package gw.personaldata.purge

uses com.google.common.collect.ImmutableSet
uses com.google.common.collect.Lists
uses com.google.common.collect.Sets
uses entity.Contact
uses gw.api.archiving.ArchiveDocumentReferencesUtil
uses gw.api.database.PCDatabaseReferenceTrackerUtility
uses gw.pl.persistence.core.Bundle
uses entity.Address

/**
 * Performs the purging of the linked address and its addresses (if any) given the following conditions:
 * <ol>
 * <li> The linked address contains no addresses </li>
 * <li> No address has FK to Account (ie AccountLocation) </li>
 * <li> No address has FK to any other Address (AddressReplacement array) </li>
 * <li> Is not "in use" (by anything other than the LinkedAddress) </li>
 * </ol>
 */
@Export
public class RemoveOrphanedLinkedAddressVisitor extends AbstractRemoveOrphanedEntitiesVisitor {

  private var _potentialOrphanedLinkedAddresses: Set<LinkedAddress>

  construct() {
    _potentialOrphanedLinkedAddresses = new HashSet<LinkedAddress>()
  }

  override public function visit(contact : Contact) : void {
    _potentialOrphanedLinkedAddresses.addAll(contact.AllAddresses*.LinkedAddress.where(\ elt -> elt != null).toSet())
  }

  override public function visit(account : Account) : void {
    _potentialOrphanedLinkedAddresses.addAll(account.AccountLocations*.LinkedAddress.where(\ elt -> elt != null).toSet())
  }

  override public function visit(policy : Policy) : void {}

  override public function visit(policyTerm : PolicyTerm) : void {}

  override public function visit(period : PolicyPeriod) : void {
    if (not period.Archived) {
      period = period.getSlice(period.EditEffectiveDate)
      var linkedAddress = period.PolicyAddress.Address.LinkedAddress
      if (linkedAddress != null) {
        _potentialOrphanedLinkedAddresses.add(linkedAddress)
      }
    }
  }

  override function postPurge(bundle: Bundle) : Collection<KeyableBean> {
    var orphanLinkedAddresses = Sets.newHashSet<LinkedAddress>()
    var orphanAddresses = Sets.newHashSet<Address>()

    _potentialOrphanedLinkedAddresses.each(\linkedAddress -> {
      linkedAddress = reloadEntity(linkedAddress) as LinkedAddress
      if (linkedAddress != null) {
        linkedAddress = bundle.add(linkedAddress)
        if (not ArchiveDocumentReferencesUtil.isReferencedFromArchiveDocument(linkedAddress)) {
          if (linkedAddress.Addresses.length == 0) {
            if (not PCDatabaseReferenceTrackerUtility.isReferencedFromDatabase(linkedAddress)) {
              orphanLinkedAddresses.add(linkedAddress)
            }
          } else if (linkedAddress.Addresses.length == 1) {
            var address = linkedAddress.Addresses.first()
            address = bundle.add(address)
            address = address.refresh() as Address

            if (address != null) {
              address.LinkedAddress = null

              if (isEntityOrphaned(address)) {
                orphanAddresses.add(address)
              }
            }

            if (PCDatabaseReferenceTrackerUtility.getBeansThatPointToMe(linkedAddress).size() == 1) {
              orphanLinkedAddresses.add(linkedAddress)
            }
          }
        }
      }
    })

    var orphanEntities = Lists.newArrayList<KeyableBean>()
    orphanEntities.addAll(orphanAddresses)
    orphanEntities.addAll(orphanLinkedAddresses)

    return orphanEntities
  }

  protected function getPotentiallyOrphanedLinkedAddresses(): Set<LinkedAddress> {
    return ImmutableSet<LinkedAddress>.copyOf(_potentialOrphanedLinkedAddresses)
  }
}
