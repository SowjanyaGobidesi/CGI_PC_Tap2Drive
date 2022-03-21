package gw.plugin.claimsearch.impl

uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.productmodel.ProductLookup
uses gw.api.system.PLDependenciesGateway
uses gw.pl.currency.MonetaryAmount
uses gw.pl.persistence.core.Bundle
uses gw.plugin.claimsearch.ClaimSearchSpec
uses gw.plugin.claimsearch.IClaimSearchCriteria
uses gw.plugin.claimsearch.IClaimSearchPlugin
uses gw.plugin.claimsearch.NoResultsClaimSearchException

uses java.math.BigDecimal
uses java.text.DecimalFormat

@Export
class GWDemoClaimSearchPlugin implements IClaimSearchPlugin {
  final var _insuredFirstName: String
  final var _insuredLastName: String
  final var _now = PLDependenciesGateway.SystemClock.DateTime

  construct(insuredFirstName: String, insuredLastName: String) {
    _insuredFirstName = insuredFirstName;
    _insuredLastName = insuredLastName;
  }

  construct() {
    this("Mike", "Sherman")
  }

  override function searchForClaims(claimSearchCriteria: IClaimSearchCriteria): ClaimSet {
    var policies = queryPoliciesOfInsured()
    var periods = claimSearchCriteria.SearchSpecs.flatMap(\spec -> queryPolicyPeriods(spec, policies))
    if (periods.isEmpty()) {
      throw new NoResultsClaimSearchException()
    }
    var bundle = gw.transaction.Transaction.newBundle()
    var date = _now
    var claimSet = new ClaimSet(bundle)
    for (period in periods index i) {
      claimSet.addToClaims(claim(bundle, i, date.addDays(-(i * 10)), period))
    }
    return claimSet
  }

  private function queryPolicyPeriods(searchSpec: ClaimSearchSpec, policiesOfInsured: String[]): List<PolicyPeriod> {
    return Query.make(PolicyPeriod)
      .compareIn(PolicyPeriod#PolicyNumber, searchSpec.PolicyNumbers.intersect(policiesOfInsured).toTypedArray())
      .select()
      .toList()
  }

  private function queryPoliciesOfInsured(): String[] {
    var periodQ = Query.make(PolicyPeriod)
    periodQ.join(PolicyPeriod#Policy).join(Policy#Account).join(Account#AccountHolderContact).cast(Person)
      .compare(Person#FirstName, Relop.Equals, _insuredFirstName)
      .compare(Person#LastName, Relop.Equals, _insuredLastName)
    return periodQ.select().toList().map(\period -> period.PolicyNumber).toTypedArray()
  }

  private function claim(bundle: Bundle, number: int, lossDate: Date, period: PolicyPeriod): Claim {
    var claim = new Claim(bundle)
    claim.ClaimNumber = claimNumber(number)
    claim.LossDate = lossDate
    claim.PolicyPeriod = period
    claim.Status = number % 2 == 0 ? "Open" : "Closed"
    claim.LossType = getLossTypeForProduct(period.Policy.ProductCode)
    claim.AdjusterDisplayName = "Andy Applegate"
    claim.AdjusterPhoneNumber = "202-555-1112"
    claim.TotalIncurred = new MonetaryAmount(117bd, Currency.TC_USD)
    return claim
  }

  private function getLossTypeForProduct(productCode: String): String {
    switch (productCode) {
      case "GeneralLiability": return "Liability"
      case "BusinessAuto": return "Auto"
      case "PersonalAuto": return "Auto"
      case "InlandMarine": return "Travel"
      case "CommercialPackage": return "Travel"
      case "BusinessOwners": return "Property"
      case "CommercialProperty": return "Property"
      case "WorkersComp": return "Workers' Comp"
      case "HOPHomeowners": return "Property"
      default: return "Liability"
    }
  }

  private function claimNumber(number: int): String {
    return "000-00-" + new DecimalFormat("000000").format(number)
  }

  override function giveUserViewPermissionsOnClaim(username: String, claimPublicID: String ) {
    //## do nothing for demo plugin
  }

  override function getClaimDetail(inClaim: Claim ) : ClaimDetail {
    var random = new Random()
    var claimDetail = new ClaimDetail(inClaim.Bundle)
    claimDetail.Claim = inClaim
    claimDetail.Description = "Description " + random.nextInt(56666)
    claimDetail.ClaimPublicID = "testClaim:" + random.nextInt(20000)
    claimDetail.ClaimInfoPublicID = "testClaimInfo:" + random.nextInt(20000)
    claimDetail.Injuries = random.nextBoolean() ? true : false
    claimDetail.Litigation = random.nextBoolean() ? true : false
    claimDetail.Recoveries = new BigDecimal(random.nextInt(1000000)).ofDefaultCurrency()
    claimDetail.RemainingReserves = new BigDecimal(random.nextInt(1000000)).ofDefaultCurrency()
    claimDetail.TotalPaid = new BigDecimal(random.nextInt(1000000)).ofDefaultCurrency()
    claimDetail.LossCause = "LossCause " + claimDetail.ClaimInfoPublicID
    return claimDetail
  }
}
