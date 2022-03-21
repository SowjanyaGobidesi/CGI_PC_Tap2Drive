package gw.losshistory

uses com.google.common.base.Preconditions
uses com.google.common.collect.Iterables
uses gw.api.database.DBDateRange
uses gw.api.system.PLDependenciesGateway
uses gw.plugin.claimsearch.ClaimSearchSpec
uses gw.plugin.claimsearch.IClaimSearchCriteria
uses gw.plugin.claimsearch.IClaimSearchPlugin

uses java.io.Serializable
uses java.rmi.RemoteException

uses entity.Contact

@Export
class ClaimSearchCriteria implements IClaimSearchCriteria, Serializable {

  private var plugin : IClaimSearchPlugin
  var _policyNumbers : String[] as PolicyNumbers
  var _policy : Policy as Policy
  var _accounts : List<Account> as readonly Accounts = {}
  var _contact : Contact as Contact
  var _dateCriteria : DateCriteria as DateCriteria

  construct() {
    _dateCriteria = new DateCriteria()
    plugin = PLDependenciesGateway.PluginConfig.getPlugin(IClaimSearchPlugin)
  }

  property get Account(): Account {
    Preconditions.checkState(Accounts.size() <= 1, "Multiple Accounts assigned")
    return Iterables.getFirst(Accounts, null)
  }

  property set Account(account: Account) {
    _accounts = account == null ? {} : {account}
  }

  property get PolicyNumber() : String {
    return ( _policyNumbers == null ) || ( _policyNumbers.Count > 1 )
        || ( _policyNumbers.Count == 0 )
      ? null : _policyNumbers[0]
  }

  property set PolicyNumber(newPolicyNumber : String) {
    _policyNumbers = {newPolicyNumber}
  }

  override function performSearch() : ClaimSet {
    try {
      return plugin.searchForClaims(this)
    } catch ( e : RemoteException) {
      throw new RuntimeException(e)
    }
  }

  /**
   * Returns a list of specs to pass to the remote claim system.  The main information required
   * for the specs is a set of policy numbers for the relevant date range to search.
   * Examines the possible inputs to determine what policy numbers are relevant.  For any given
   * policy, there may be multiple numbers to search on.  For example, if a suffix is added on
   * each renewal (e.g. policy # HO-12345 becomes HO-12345R1 on first renewal), we would want to
   * search on both policy numbers to find matching claims.  So this method generally first
   * attempts to find relevant policies, based on the entered search criteria, and then finds
   * relevant policy numbers for those policies based on the date range.
   */
  override property get SearchSpecs() : List<ClaimSearchSpec> {
    var spec = new ClaimSearchSpec()
    var policyNumbers : Set<String>
    policyNumbers = this.PolicyNumbers == null ? {} : this.PolicyNumbers.toSet()
    spec.PolicyNumbers = {}
    spec.DateRange = this.DateCriteria.DateRangeToSearch
    
    if (this.PolicyNumber != null) {
      this.Policy = entity.Policy.finder.findPolicyByPolicyNumber(this.PolicyNumber)
      if (this.Policy == null) {
        // Not found.  Return the policy number
        spec.PolicyNumbers = {this.PolicyNumber}
        return {spec}
      }
    }

    if (this.Policy != null) {
      policyNumbers.addAll(this.Policy.findUniquePolicyNumbers(spec.DateRange))
    } else if (!Accounts.Empty) {
      policyNumbers.addAll(policyNumbersRelatedToAccounts(Accounts.toTypedArray(), spec.DateRange).toSet())
    } else if (this.Contact != null) {
      policyNumbers.addAll(this.Contact.PolicyPeriods*.PolicyNumber.toSet())
    }

    spec.PolicyNumbers = policyNumbers.toTypedArray()
    return {spec}
  }

  static function policyNumbersRelatedToAccounts(accounts: Account[], dateRange: DBDateRange): String[] {
    return accounts.flatMap(\acct -> acct.Policies.flatMap(\p -> p.findUniquePolicyNumbers(dateRange)).toList())
  }
}
