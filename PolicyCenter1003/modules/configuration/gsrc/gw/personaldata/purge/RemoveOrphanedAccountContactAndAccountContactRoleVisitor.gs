package gw.personaldata.purge

uses com.google.common.collect.Lists
uses entity.AccountContactRole
uses entity.Contact
uses gw.api.archiving.ArchiveDocumentReferencesUtil
uses gw.api.database.PCDatabaseReferenceTrackerUtility
uses gw.pl.persistence.core.Bundle

/**
 * For every PolicyContactRole, there is a corresponding AccountContactRole and AccountContact.  If the PolicyContactRole
 * has been deleted as part of the personal data removal, but the account has not been removed, then the AccountContactRole
 * or AccountContact might be left orphaned, with no PolicyContactRole pointing to them.  This visitor finds all the
 * AccountContactRoles before the purge, and then post purge checks to see if anybody is still using the AccountContactRoles
 * and AccountContacts.  If the AccountContactRoles and AccountContacts are no longer being referenced to by ANY PolicyContactRole
 * then the AccountContactRole and/or AccountContacts are removed.
 */
@Export
public class RemoveOrphanedAccountContactAndAccountContactRoleVisitor extends AbstractRemoveOrphanedEntitiesVisitor {

  protected var _accountContactRoles : Set<AccountContactRole>
  construct() {
    _accountContactRoles = new HashSet<AccountContactRole>()
  }

  override function visit(contact: Contact) {}

  override function visit(account: Account) {}

  override function visit(policy: Policy) {}

  override function visit(policyTerm: PolicyTerm) {}

  override public function visit(period : PolicyPeriod) : void {
    period = period.getSlice(period.getEditEffectiveDate())
    period.PolicyContactRoles.each(\pcr -> {
      if (pcr.AccountContactRole != null) {
        _accountContactRoles.add(pcr.AccountContactRole)
      }
    })
  }

  override function postPurge(bundle: Bundle): Collection<KeyableBean> {
    var removableAccountContactRoles = findPurgeableEntities(_accountContactRoles)
    var possibleAccountContactsToRemove : Set<AccountContact> = new HashSet<AccountContact>()

    removableAccountContactRoles.each(\acr -> {
      var accountContactRole = (acr as AccountContactRole)
      if (accountContactRole.AccountContact != null) {
        possibleAccountContactsToRemove.add(accountContactRole.AccountContact)
      }
    })

    var removableAccountContacts = possibleAccountContactsToRemove.where(\accountContact ->
        PCDatabaseReferenceTrackerUtility.getBeansThatPointToMe(accountContact).size() == 1 and
            not ArchiveDocumentReferencesUtil.isReferencedFromArchiveDocument(accountContact)
    )

    var orphanEntities = Lists.newArrayList<KeyableBean>()
    orphanEntities.addAll(removableAccountContactRoles)
    orphanEntities.addAll(removableAccountContacts)
    return orphanEntities
  }

  private function findPurgeableEntities(beansToCheck : Set<KeyableBean>) : Set<KeyableBean> {
    var toRemove = new HashSet<KeyableBean>()
    beansToCheck.each(\bean -> {
      bean = reloadEntity(bean)
      if (bean != null) {
        if (isEntityOrphaned(bean)) {
          toRemove.add(bean)
        }
      }
    })
    return toRemove
  }
}
