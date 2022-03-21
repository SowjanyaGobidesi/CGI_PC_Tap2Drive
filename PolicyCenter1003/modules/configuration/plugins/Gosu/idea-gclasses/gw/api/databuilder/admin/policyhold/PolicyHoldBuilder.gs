package gw.api.databuilder.admin.policyhold

uses java.util.Date
uses typekey.UWIssueCheckingSet
uses java.lang.String
uses entity.PolicyHold
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.system.PCDependenciesGateway
uses gw.api.productmodel.CoveragePattern
uses gw.api.productmodel.ClausePattern

@Export
class PolicyHoldBuilder extends DataBuilder<PolicyHold, PolicyHoldBuilder>{

  static function baseBuilder() : PolicyHoldBuilder {
    var base = new PolicyHoldBuilder()
    base.withHoldType(TC_UWHOLD)
    base.withHoldCode(UniqueKeyGenerator.get().nextID())
    base.withDescription("Hold Description")
    base.withStartDate(Date.Today.addMonths(-2))
    base.withEndDate(Date.Today.addMonths(2))
    base.withIssueType(UWIssueType.finder.findUWIssueTypeByCheckingSet(TC_UWHOLD).first())
    base.withLongDescription("Long Hold Description")
    return base 
  }

  construct() {
    super(PolicyHold)
  }
  
  construct(includeDefaults : boolean) {
    super(PolicyHold)
    if (includeDefaults) {
      withDefaults()
    }
  }
  
  private function withDefaults() {
    withHoldType(TC_UWHOLD)
    withHoldCode(UniqueKeyGenerator.get().nextID())
    withDescription("Hold Description")
    withStartDate(Date.Today.addMonths(-2))
    withEndDate(Date.Today.addMonths(2))
    withIssueType(UWIssueType.finder.findUWIssueTypeByCheckingSet(TC_UWHOLD).first())
    withLongDescription("Long Hold Description")
    withRule(new PolicyHoldRuleBuilder()
                  .withJobType(TC_SUBMISSION)
                  .withPolicyLine(TC_PERSONALAUTOLINE)
                  .withJobDateType(TC_EFFECTIVE)
                  .withCovPatternCode(PCDependenciesGateway.getProductModel().getPatternByCodeIdentifier("PACollisionCov", ClausePattern).PublicID))
  }
  
  function withHoldType(holdType : UWIssueCheckingSet) : PolicyHoldBuilder {
    set(PolicyHold.Type.TypeInfo.getProperty("HoldType"), holdType)
    return this
  }

  function withHoldCode(holdCode : String) : PolicyHoldBuilder {
    set(PolicyHold.Type.TypeInfo.getProperty("PolicyHoldCode"), holdCode)
    return this
  }
  
  function withDescription(desc : String) : PolicyHoldBuilder {
    set(PolicyHold.Type.TypeInfo.getProperty("Description"), desc)
    return this
  }

  function withStartDate(startDate : Date) : PolicyHoldBuilder {
    set(PolicyHold.Type.TypeInfo.getProperty("StartDate"), startDate)
    return this
  }

  function withEndDate(endDate : Date) : PolicyHoldBuilder {
    set(PolicyHold.Type.TypeInfo.getProperty("EndDate"), endDate)
    return this
  }
  
  function withLongDescription(longDesc : String) : PolicyHoldBuilder {
    set(PolicyHold.Type.TypeInfo.getProperty("UWIssueLongDesc"), longDesc)
    return this
  }
  
  function withIssueType(issueType : UWIssueType) : PolicyHoldBuilder {
    set(PolicyHold.Type.TypeInfo.getProperty("IssueType"), issueType)
    return this
  }
 
  function withRule(policyHoldRuleBuilder : PolicyHoldRuleBuilder) : PolicyHoldBuilder {
    addArrayElement(PolicyHold.Type.TypeInfo.getProperty("Rules"), policyHoldRuleBuilder)
    return this
  }  
  
  function withHoldZone(policyHoldZoneBuilder : PolicyHoldZoneBuilder) : PolicyHoldBuilder {
    addArrayElement(PolicyHold.Type.TypeInfo.getProperty("PolicyHoldZones"), policyHoldZoneBuilder)
    return this
  }
}
