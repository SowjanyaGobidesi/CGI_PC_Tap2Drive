package gw.api.web.dashboard.ui

uses entity.Contact

@Export
class DashboardParameters {
  final static var _lvLimit: int as readonly ListViewLimit = 5
  final static var _lvLimitShort: int as readonly ListViewLimitShort = 3
  final static var _noteRelatedToMaxLength: int as readonly NoteRelatedToMaxLength = 60
  final static var _noteBodyMaxLength: int as readonly NoteBodyMaxLength = 300
  final static var _lossRatioCalculationYears: int as readonly LossRatioCalculationYears = 3

  static class AccountOverviewPermissions {

    property get AccountDetails(): boolean {
      return perm.System.accountsummary
    }

    property get OpenPolicyTransactions(): boolean {
      return perm.System.accountworkorders
    }

    property get Claims(): boolean {
      return perm.System.accountclaims
    }

    property get BillingSummary(): boolean {
      return perm.System.accountbilling
    }

    property get Payments(): boolean {
      return perm.System.accountbilling
    }

    property get Contact(): boolean {
      return perm.System.accountcontacts
    }

    property get RelatedAccounts(): boolean {
      return perm.System.accountrelations
    }

    property get Locations(): boolean {
      return perm.System.accountcontacts
    }

    property get CurrentAccountActivities(): boolean {
      return true
    }

    property get CurrentPolicies(): boolean {
      return true
    }

    property get AccountSummary(): boolean {
      return true
    }

    property get AccountSummaryBilling(): boolean {
      return perm.System.accountbilling
    }

    property get AccountSummaryClaims(): boolean {
      return perm.System.accountclaims
    }

    function canEditAccount(account: Account): boolean {
      return account.Editable and perm.Account.edit(account)
    }

    property get ViewInBillingCenter(): boolean {
      return perm.System.viewbillingsystem
    }

    property get CanAddNote(): boolean {
      return perm.System.notecreate
    }

    function canSeeAccount(account: Account): boolean {
      return perm.Account.view(account) and not account.Retired
    }

    function canSeeNotes(account: Account): boolean {
      return perm.Account.view(account) and perm.System.accountnotes and perm.System.noteview
    }

    function canVisitDashboard(account: Account): boolean {
      return perm.Account.view(account) and perm.System.accountsummary
    }

    private construct() {
    }

    static final var _instance: AccountOverviewPermissions as readonly Instance = new AccountOverviewPermissions()
  }

  static class AccountHolderSummaryPermissions {

    property get ContactDetail(): boolean {
      return true
    }

    property get OpenPolicyTransactions(): boolean {
      return true
    }

    property get CurrentPolicies(): boolean {
      return true
    }

    property get Claims(): boolean {
      return perm.System.contactclaims
    }

    property get BillingSummary(): boolean {
      return perm.System.accountbilling
    }

    property get Payments(): boolean {
      return perm.System.accountbilling
    }

    property get CustomerSummary(): boolean {
      return true
    }

    function canVisitDashboard(contact: Contact): boolean {
      return perm.System.viewaccountholderinfo and
          gw.pcf.contacts.ContactFileAccountHolderUIHelper.canViewAccountInfo(contact)
    }

    property get EditContact(): boolean {
      return true
    }

    function canStartNewSubmission(account: Account): boolean {
      return perm.Account.newSubmission(account)
    }

    function canChangePolicy(policyPeriod: PolicyPeriod): boolean {
      return perm.PolicyPeriod.change(policyPeriod)
    }

    function canCancelPolicy(policyPeriod: PolicyPeriod): boolean {
      return perm.PolicyPeriod.cancel(policyPeriod)
    }

    function canRenewPolicy(policyPeriod: PolicyPeriod): boolean {
      return perm.PolicyPeriod.renew(policyPeriod) and policyPeriod.Policy.canStartRenewal() == null
    }

    property get ViewInBillingCenter(): boolean {
      return perm.System.viewbillingsystem
    }

    property get Notes(): boolean {
      return perm.System.noteview
    }

    property get ViewInClaimCenter(): boolean {
      return perm.System.viewclaimsystem
    }

    private construct() {
    }

    static final var _instance: AccountHolderSummaryPermissions as readonly Instance = new AccountHolderSummaryPermissions()
  }

  static class PolicySummaryPermissions {

    property get PolicyDetails(): boolean {
      return true
    }

    property get Premium(): boolean {
      return true
    }

    property get PendingPolicyTransactions(): boolean {
      return true
    }

    property get CompletedPolicyTransactions(): boolean {
      return true
    }

    function canSeeContacts(policyPeriod: PolicyPeriod): boolean {
      return perm.PolicyPeriod.view(policyPeriod) and perm.System.pfilecontacts
    }

    property get Account(): boolean {
      return perm.System.accountsummary
    }

    property get Producer(): boolean {
      return true
    }

    property get CurrentActivities(): boolean {
      return true
    }

    property get Claims(): boolean {
      return perm.System.accountclaims
    }

    property get BillingSummary(): boolean {
      return perm.System.pfilebilling
    }

    property get PaymentSchedule(): boolean {
      return perm.System.pfilebilling
    }

    function canVisitDashboard(): boolean {
      return true
    }

    function canSeeNotes(policyPeriod: PolicyPeriod): boolean {
      return policyPeriod.Policy.canViewNotes() and perm.PolicyPeriod.view(policyPeriod) and perm.System.viewpolicyfile and perm.System.noteview
    }

    function canSeePolicy(policyPeriod: PolicyPeriod): boolean {
      return perm.PolicyPeriod.view(policyPeriod) and perm.System.viewpolicyfile
    }

    private construct() {
    }

    static final var _instance: PolicySummaryPermissions as readonly Instance = new PolicySummaryPermissions()
  }
}