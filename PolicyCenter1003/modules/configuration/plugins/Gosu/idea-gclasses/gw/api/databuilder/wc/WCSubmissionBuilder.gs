package gw.api.databuilder.wc

uses gw.api.builder.*

uses java.util.Date

uses gw.api.databuilder.UniqueKeyGenerator

/**
 * A test builder that creates a submission with a workers comp line, a base jurisdiction,
 * and base class code, that is guaranteed to pass validation.
 */
@Export
class WCSubmissionBuilder extends SubmissionBuilderBase<WCSubmissionBuilder> {
  var lineBuilder = new WorkersCompLineBuilder()
  var accountBuilder = new AccountBuilder(false)
      .withAccountHolderContact(new CompanyBuilder()
        .withAddressBookUID(UniqueKeyGenerator.get().nextID()))
  var defaultPayroll = 100000 

  construct() {
    this(true)
  }

  construct(validating: boolean) {
    if (validating) {
      withValidation()
    }
    withAccount(accountBuilder)
    withProduct( "WorkersComp" )
    withPolicyLine(lineBuilder)    

    lineBuilder.withWCCoveredEmployee(new WCCoveredEmployeeBuilder()
      .withClassCode( "0035" )
      .withPayroll( 10000 )
    )
  }
  
  function withWCCoveredEmployee(policyLocationBuilder : PolicyLocationBuilder) : WCSubmissionBuilder{
    withPolicyLocation(policyLocationBuilder)
    lineBuilder.withWCCoveredEmployee(new WCCoveredEmployeeBuilder()
      .withLocation(policyLocationBuilder)
      .withClassCode( "0035" )
      .withPayroll( 10000 )
    )
    return this
  }

  function withLocation(accountLocation: AccountLocation): WCSubmissionBuilder {
    var policyLocBuilder = new PolicyLocationBuilder().withAccountLocation(accountLocation)
    withPolicyLocation(policyLocBuilder)
    lineBuilder.withWCCoveredEmployee(
      new WCCoveredEmployeeBuilder()
        .withLocation( policyLocBuilder )
        .withClassCode( "0005" )
        .withPayroll( defaultPayroll )
    )
    return this
  }

  function withLocation(state: State): WCSubmissionBuilder {
    var alb = new AccountLocationBuilder().withState( state )
    accountBuilder.withAccountLocation( alb )
    var policyLocBuilder = new PolicyLocationBuilder().withAccountLocation(alb)
    withPolicyLocation(policyLocBuilder)
    lineBuilder.withWCCoveredEmployee(
      new WCCoveredEmployeeBuilder()
        .withLocation( policyLocBuilder )
        .withClassCode( "0005" )
        .withPayroll( defaultPayroll )
    )
    return this
  }

  final function withWCFedEmpLiabCov() : WCSubmissionBuilder {
    lineBuilder.withCoverage( new CoverageBuilder(WCFedEmpLiabCov).withPatternCode("WCFedEmpLiabCov") )
    return this
  }

  final function withWCWorkersCompCov() : WCSubmissionBuilder {
    lineBuilder.withCoverage( new CoverageBuilder(WCWorkersCompCov).withPatternCode("WCWorkersCompCov") )
    return this
  }

  function withPayroll( payroll : int) : WCSubmissionBuilder{
    defaultPayroll = payroll 
    return this   
  }
  
  function withAdditionalWCCoveredEmployee(additionalEmployeeBuilder : WCCoveredEmployeeBuilder) : WCSubmissionBuilder{    
    lineBuilder.withWCCoveredEmployee(additionalEmployeeBuilder)
    return this    
  }
  
  function withJurisdiction(jurisdictionBuilder : WCJurisdictionBuilder) : WCSubmissionBuilder {
    lineBuilder.withJurisdiction( jurisdictionBuilder )
    return this
  }

  function withAnniversaryDate(state: Jurisdiction, anniversaryDate: Date): WCSubmissionBuilder {
    lineBuilder.withJurisdiction(new WCJurisdictionBuilder(state).withAnniversaryDate(anniversaryDate))
    return this
  }
}
