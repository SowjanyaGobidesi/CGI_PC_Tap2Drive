package gw.note

uses entity.Contact
uses entity.Job
uses gw.api.domain.linkedobject.LinkedObjectContainer

@Export
class NewNoteHelper {

  final var _accounts: Account[] as Accounts
  final var _policyPeriod: PolicyPeriod as PolicyPeriod
  final var _job: Job as Job
  final var _contingency: Contingency as Contingency
  final var _editable: boolean as RelatedToEditable

  var _note: Note

  private construct(accounts: Account[], policyPeriod: PolicyPeriod, job: Job, contingency: Contingency, editable: boolean) {
    _accounts = accounts
    _policyPeriod = policyPeriod
    _job = job
    _contingency = contingency
    _editable = editable
  }

  static function forPolicy(account: Account, policyPeriod: PolicyPeriod, job: Job, contingency: Contingency): NewNoteHelper {
    return new NewNoteHelper({account}, policyPeriod, job, contingency, true)
  }

  static function forAccount(account: Account): NewNoteHelper {
    return new NewNoteHelper({account}, null, null, null, false)
  }

  static function forContact(contact: Contact): NewNoteHelper {
    var sortedAccounts = contact.getAccountsByRoleType(TC_ACCOUNTHOLDER).sortBy(\a -> a.AccountNumber)
    return new NewNoteHelper(sortedAccounts, null, null, null, true)
  }

  property get Policy(): Policy {
    return _policyPeriod.Policy
  }

  property get LevelsValueRange(): LinkedObjectContainer[] {
    if (not _editable) {
      return Note.generateLevels(Account, Policy, Job, Contingency)
    }

    var containers = new ArrayList<LinkedObjectContainer>()
    for (account in Accounts) {
      Note.generateLevels(account, Policy, Job, Contingency).each(\objectContainer -> containers.add(objectContainer))

      if (Policy == null and Job == null and Contingency == null) {
        account.Policies
            .where(\policy -> policy.Issued)
            .each(\policy -> Note.generateLevels(null, policy, null, null).each(\container -> containers.add(container)))
      }
    }
    return containers.toArray(new LinkedObjectContainer[containers.size()])
  }

  property get Note(): Note {
    if (_note != null) {
      return _note
    }

    if (Contingency != null) {
      _note = Contingency.createContingencyNote()
    } else if (Job != null) {
      _note = Job.newNote()
    } else if (Policy != null) {
      _note = Policy.newNote()
    } else {
      _note = Account.newNote()
    }
    return _note
  }

  property get Account(): Account {
    return _accounts.first()
  }
}