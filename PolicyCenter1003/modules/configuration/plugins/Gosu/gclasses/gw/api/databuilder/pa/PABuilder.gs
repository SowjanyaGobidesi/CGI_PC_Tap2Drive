package gw.api.databuilder.pa

uses gw.api.builder.AccountBuilder
uses gw.api.builder.AccountContactBuilder
uses gw.api.builder.AccountLocationBuilder
uses gw.api.builder.AddressBuilder
uses gw.api.builder.CoverageBuilder
uses gw.api.builder.DriverBuilder
uses gw.api.builder.ExclusionBuilder
uses gw.api.builder.PersonBuilder
uses gw.api.builder.PolicyConditionBuilder
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.builder.SubmissionBuilder
uses gw.api.builder.SubmissionStatus
uses gw.command.critical.KeyGenerator
uses java.util.ArrayList
uses java.util.Date
uses gw.api.util.StateJurisdictionMappingUtil

@Export
class PABuilder {
  
  public static var SAN_FRANCISCO : String = "San Francisco"
  
  var _paLine : PersonalAutoLineBuilder
  var _paAccount : AccountBuilder
  var _paSubmission : SubmissionBuilder
  var _vehiclesCreated = 0
  var _driversCreated = 0
  var _firstDriver : AccountContactBuilder
  var _status = SubmissionStatus.DRAFT
  var _policyLocations : ArrayList<PolicyLocationBuilder>
  var _baseState : Jurisdiction as BaseState
  var _effectiveDate : Date as EffectiveDate
    
  construct() {
    _paLine = new PersonalAutoLineBuilder()
    _paAccount = new AccountBuilder(false)
    _paSubmission = new SubmissionBuilder()
    _policyLocations = new ArrayList<PolicyLocationBuilder>()
    _baseState = Jurisdiction.TC_CA
    _effectiveDate = Date.Today
  }
 
  function addVehicleWithDrivers(numDrivers : int) : PABuilder {
    var vehicle = createVehicle()
    var driverList = new ArrayList<DriverBuilder>()
    for (0..|numDrivers) {
      var driver = createDriver()
      driverList.add(driver)
    }
    attachDriversToVehicle(vehicle, driverList)
    return this      
  }

  function createVehicleWith(driver : DriverBuilder) : PABuilder {
    var vehicle = createVehicle()
    attachDriversToVehicle(vehicle, {driver})
    return this              
  }
  
  function addVehicleWithLocation(location : PolicyLocationBuilder) : PABuilder {
    var vehicle = createVehicle()
    vehicle.withLocation(location)
    _policyLocations.add(location)
    return this
  }

  function addQQVehicle(vehicle : PAVehicleBuilder) : PABuilder {
    vehicle.withVIN("")
    _paLine.withVehicle(vehicle)
    return this
  }

  function addVehicle(vehicle : PAVehicleBuilder) : PABuilder {
    _vehiclesCreated++
    vehicle.withVIN(_vehiclesCreated as String)
    _paLine.withVehicle(vehicle)
    return this
  }

  private function createVehicle() : PAVehicleBuilder {
     var newVehicle = new PAVehicleBuilder()
     addVehicle(newVehicle)
     return newVehicle
  }
   
  function attachDriversToVehicle(vehicle : PAVehicleBuilder, drivers : ArrayList<DriverBuilder>) : PAVehicleBuilder {
    var howManyDrivers = drivers.Count
    if (howManyDrivers > 0) {
      var driverPercentage = (100 / howManyDrivers)
      for (j in 0..|howManyDrivers) {
        if (j == howManyDrivers - 1) {
          driverPercentage = 100 - (howManyDrivers - 1) * driverPercentage
        }
        var vehicleDriver = new VehicleDriverBuilder().withPercentageDriven(driverPercentage)
        vehicle.withVehicleDriver(vehicleDriver)
        var policyDriver = new PolicyDriverBuilder()
          .withAccountContactRole(drivers[j])
          .withVehicleDriver(vehicleDriver)
        
        withPolicyDriver(policyDriver)
      }
    }
    return vehicle
  }
  
  function withPolicyDriver(policyDriver : PolicyDriverBuilder) : PABuilder {
    _paSubmission.withPolicyContactRole(policyDriver)
    _paLine.withPolicyDriver(policyDriver)
  
    return this  
  }
  
  function createDriver() : DriverBuilder {
    return createDriver(KeyGenerator.getFirstName(), KeyGenerator.getLastName())
  }
  
  function addNamedDriver(firstName : String, lastName : String) : PABuilder {
    return addNamedDriver(firstName, lastName, 0)
  }

  function addNamedDriver(firstName : String, lastName : String, quickQuoteNumber : int) : PABuilder {
    var newDriver = createDriver(firstName, lastName)
    var policyDriver = new PolicyDriverBuilder()
      .withAccountContactRole(newDriver)
      .withQuickQuoteNumber(quickQuoteNumber)
    withPolicyDriver(policyDriver)
    return this
  }

  function addDriver(person : PersonBuilder) : PABuilder {
    var newDriver = createDriver(person)
    var policyDriver = new PolicyDriverBuilder()
      .withAccountContactRole(newDriver)
    _paSubmission.withPolicyContactRole(policyDriver)
    _paLine.withPolicyDriver(policyDriver)
    return this
  }
  
  function excluded(policyDriver : PolicyDriverBuilder) : PABuilder {
    policyDriver.withExcluded(true)

    withPolicyDriver(policyDriver)
    return this  
  }
  
  function excluded(driver : DriverBuilder) : PABuilder {
    var policyDriver = new PolicyDriverBuilder()
      .withAccountContactRole(driver)
      .withExcluded(true)

    withPolicyDriver(policyDriver)
    return this
  }
  
  function addExcludedDriver(person : PersonBuilder) : PABuilder {
    return excluded(createDriver(person))
  }
  
  // version of create driver that allow values other than just first name/last name on the Person to be specified
  function createDriver(person : PersonBuilder) : DriverBuilder {
    _driversCreated++
    var newDriver = new DriverBuilder()
    var driverAC = new AccountContactBuilder().withRole(newDriver).withContact(person)
    _paAccount.withAccountContact(driverAC)
    if (_firstDriver == null) {
     _firstDriver = driverAC
    }      
    return newDriver
  }
  
  function createDriver(firstName : String, lastName : String) : DriverBuilder {
    _driversCreated++
    var person = new PersonBuilder()
     .withPrimaryAddress(new AddressBuilder())
     .withLicenseState( _baseState )
     .withLicenseNumber("A12345" + _driversCreated)
     .withFirstName(firstName)
     .withLastName(lastName)
     .withEmailAddress1(KeyGenerator.getEmail())
     .withMaritalStatus(MaritalStatus.TC_M)
    var newDriver = new DriverBuilder().withNumberofAccidents(NumberOfAccidents.TC_0)
      .withNumberofViolations(NumberOfAccidents.TC_0)
    var driverAC = new AccountContactBuilder().withRole(newDriver).withContact(person)
    _paAccount.withAccountContact(driverAC)
    if (_firstDriver == null) {
     _firstDriver = driverAC
    }      
    return newDriver
  }
  
  function addLineCoverage(coverage: CoverageBuilder) {
    _paLine.withCoverage(coverage)
  }
  
  function addLineExclusion(exclusion : ExclusionBuilder) {
    _paLine.withExclusion(exclusion)
  }
  
  function addLineCondition(condition : PolicyConditionBuilder) {
    _paLine.withCondition(condition)
  }

  private function setupAccountHolder() {
    // Set up account holder
    if (_firstDriver == null) {
      _firstDriver = new AccountContactBuilder().withContact(
        new PersonBuilder()
        .withPrimaryAddress( new AddressBuilder() )
        .withLicenseState( _baseState )
        .withLicenseNumber( "A1234567" )
        .withFirstName(KeyGenerator.getFirstName())
        .withLastName(KeyGenerator.getLastName())
        .withEmailAddress1(KeyGenerator.getEmail())
      )
      _paAccount.withAccountContact(_firstDriver)
    }
    _firstDriver.asAccountHolder()
  }
  
  function withStatus(submissionStatus : SubmissionStatus) : PABuilder {
    _status = submissionStatus
    return this
  }

  function withBaseState(state : typekey.Jurisdiction) : PABuilder {
    this._baseState = state
    return this    
  }
  
  function withEffectiveDate( date : Date ) : PABuilder {
    this._effectiveDate = date
    return this  
  }
  
  function createPASubmission() : SubmissionBuilder {
    setupAccountHolder()
    _paSubmission.withProduct("PersonalAuto")
      .withEffectiveDate(_effectiveDate)
      .withPolicyLine(_paLine)
      .withStatus(_status)
      .withBaseState(_baseState)
      .withAccount(_paAccount.withPrimaryLocation(
        new AccountLocationBuilder().withName(SAN_FRANCISCO)
            .withState(StateJurisdictionMappingUtil.getStateMappingForJurisdiction(_baseState))))

    for (policyLocation in _policyLocations) {
      _paSubmission.withPolicyLocation(policyLocation)
    }
    return _paSubmission
  } 
}

