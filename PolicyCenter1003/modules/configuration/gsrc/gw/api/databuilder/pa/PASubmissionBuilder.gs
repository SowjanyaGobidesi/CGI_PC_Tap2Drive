package gw.api.databuilder.pa

uses gw.api.builder.AccountBuilder
uses gw.api.builder.AccountContactBuilder
uses gw.api.builder.AccountLocationBuilder
uses gw.api.builder.AddressBuilder
uses gw.api.builder.CoverageBuilder
uses gw.api.builder.DriverBuilder
uses gw.api.builder.PersonBuilder
uses gw.api.builder.SubmissionBuilderBase
uses gw.transaction.Transaction

uses java.util.ArrayList
uses gw.api.builder.OrganizationBuilder
uses gw.api.builder.ProducerCodeBuilder
uses gw.api.builder.CommissionPlanBuilder
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.builder.PCRoleBuilder
uses gw.api.builder.AgencyBillPlanBuilder

/**
 * Build a PersonalAuto submission.
 *
 * This depends on having access to the Account builder and the Policy Line
 * builder. Use the constructors to specify the Account builder, if necessary,
 * and DO NOT invoke withProduct, withAccount, or withPolicyLine on any instance
 * of this builder.
 */
@Export
class PASubmissionBuilder extends SubmissionBuilderBase<PASubmissionBuilder> {
  var _lineBuilder : PersonalAutoLineBuilder
  var _accountBuilder : AccountBuilder
  var lastFirstPerson : Person
  var policyDrivers = new ArrayList<PolicyDriverBuilder>()

  static var policyDriverIndex = 0

  construct() {
    this(true)
  }

  construct(validating: boolean) {
    constructInit(validating)
  }

  construct(howManyDrivers : int){
    constructWithPolicyDrivers(howManyDrivers, null)
  }

  construct(howManyDrivers : int, firstPerson : Person){
    constructWithPolicyDrivers(howManyDrivers, firstPerson)
  }

  construct(accountBuilder : AccountBuilder) {
    constructInit(accountBuilder, true)
  }

  final function withVehicle(vehicleBuilder : PAVehicleBuilder) : PASubmissionBuilder {
    policyDriverIndex++

    var driver = new DriverBuilder().withGoodDriverDiscount(false)
    _accountBuilder.withAccountContact(new AccountContactBuilder().withRole(driver)
      .withContact(new PersonBuilder(policyDriverIndex).withLicenseState(Jurisdiction.TC_CA)
            .withLicenseNumber("A12345" + policyDriverIndex)
            .withAddressBookUID(UniqueKeyGenerator.get().nextID())))

    var vehDriverBuilder = new VehicleDriverBuilder()
    var driverBuilder = new PolicyDriverBuilder().withAccountContactRole( driver ).withVehicleDriver(vehDriverBuilder)
    withPolicyContactRole( driverBuilder )
    vehicleBuilder.withVehicleDriver(vehDriverBuilder)
    _lineBuilder.withVehicle( vehicleBuilder)
    _lineBuilder.withPolicyDriver(driverBuilder)
    return this
  }

  function withAccountContact(accountContactBuilder : AccountContactBuilder) : PASubmissionBuilder {
    _accountBuilder.withAccountContact(accountContactBuilder)
    return this
  }

  function withAgencyBillingEnabledForUSD() : PASubmissionBuilder {
    var organization = new OrganizationBuilder()
        .withName(UniqueKeyGenerator.get().nextID())
        .withType(BusinessType.TC_AGENCY)
        .withProducerStatus(ProducerStatus.TC_ACTIVE)
        .createAndCommit()

    var agencyPlan = new AgencyBillPlanBuilder()
        .withPlanId(UniqueKeyGenerator.get().nextID() + Currency.TC_USD.Code)
        .withCurrency(Currency.TC_USD)
        .withOrganization(organization)
        .createAndCommit()
    organization.addToAgencyBillPlans(agencyPlan)

    var role = new PCRoleBuilder()
        .withRoleType(RoleType.TC_USERPRODUCERCODE.get())
        .createAndCommit()

    var producerCode = new ProducerCodeBuilder()
        .withCode(UniqueKeyGenerator.get().nextID())
        .withOrganization(organization)
        .withRole(role)
        .withStatus(ProducerStatus.TC_ACTIVE)
        .withCommissionPlan(new CommissionPlanBuilder().withCurrency(Currency.TC_USD))
        .createAndCommit()

    _accountBuilder
      .withPreferredCoverageCurrency(Currency.TC_USD)
      .withPreferredSettlementCurrency(Currency.TC_USD)
      .withProducerCode(producerCode)

    withProducerCodeOfRecord(producerCode)

    return this
  }

  final function withVehicleFirstDriver(vehicleBuilder : PAVehicleBuilder) : PASubmissionBuilder {
    var vehDriverBuilder = new VehicleDriverBuilder()
    policyDrivers.first().withVehicleDriver(vehDriverBuilder)
    vehicleBuilder.withVehicleDriver(vehDriverBuilder)
    _lineBuilder.withVehicle( vehicleBuilder)
    return this
  }

  function withCoverageByBuilder(coverageBuilder : CoverageBuilder) : PASubmissionBuilder {
    _lineBuilder.withCoverage(coverageBuilder)
    return this
  }

  function withCoverage(patternCode : String) : PASubmissionBuilder {
    var coverageBuilder = new CoverageBuilder(PersonalAutoCov)
      .withPatternCode(patternCode)
    return withCoverageByBuilder(coverageBuilder)
  }

  private function constructInit(validating : boolean) {
    constructInit(new AccountBuilder(), validating)
  }

  private function constructInit(accountBuilder : AccountBuilder, validating : boolean) {
    constructBaseInit(accountBuilder)

    withVehicle(new PAVehicleBuilder())

    if (validating) {
      withValidation()
    }
  }

  private function constructBaseInit(accountBuilder : AccountBuilder) {
    withProduct("PersonalAuto")
    _accountBuilder = accountBuilder
    withAccount(_accountBuilder)
    _lineBuilder = new PersonalAutoLineBuilder()
    withPolicyLine(_lineBuilder)
  }

  private function constructWithPolicyDrivers(howManyDrivers: int,  firstPerson : Person): PASubmissionBuilder {
    constructBaseInit(new AccountBuilder(false))

    policyDriverIndex++
    // Set up policy & account drivers
    var firstDriver : AccountContactBuilder = null
    var drivers = new DriverBuilder[howManyDrivers]
    for (i in 0..|howManyDrivers) {
      var person : Person
      if(i == 0 and firstPerson != null){
        person = firstPerson
        lastFirstPerson = firstPerson
      } else {
        Transaction.runWithNewBundle(\ bundle ->
        {person = new PersonBuilder(i + policyDriverIndex)
          .withPrimaryAddress( new AddressBuilder() )
          .withLicenseState( Jurisdiction.TC_CA )
          .withLicenseNumber("A12345" + (i + policyDriverIndex)).create(bundle)})
        if (i == 0) {
          lastFirstPerson = person
        }
      }
      drivers[i] = new DriverBuilder().withGoodDriverDiscount(false)
      var driverAC = new AccountContactBuilder().withRole(drivers[i]).withContact(person)
      _accountBuilder.withAccountContact(driverAC)
      if (firstDriver == null) {
        firstDriver = driverAC
      }

      var policyDriver = new PolicyDriverBuilder().withAccountContactRole(drivers[i])

      policyDrivers.add(policyDriver)
      withPolicyContactRole(policyDriver)
      _lineBuilder.withPolicyDriver(policyDriver)
    }

    // Set up account holder
    if (firstDriver == null) {
      firstDriver = new AccountContactBuilder().withContact(
        new PersonBuilder()
          .withPrimaryAddress( new AddressBuilder() )
          .withLicenseState( Jurisdiction.TC_CA )
          .withLicenseNumber( "A1234567" )
      )
      _accountBuilder.withAccountContact(firstDriver)
    }
    firstDriver.asAccountHolder()

    _accountBuilder.withPrimaryLocation(new AccountLocationBuilder().withName("San Francisco").withState(State.TC_CA))

    isDraft()

    policyDriverIndex += howManyDrivers

    return this
  }
}