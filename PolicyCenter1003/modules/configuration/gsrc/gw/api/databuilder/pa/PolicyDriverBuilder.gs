package gw.api.databuilder.pa
uses gw.api.builder.PolicyContactRoleBuilder
uses gw.api.databuilder.pa.VehicleDriverBuilder

@Export
class PolicyDriverBuilder extends PolicyContactRoleBuilder<PolicyDriver, PolicyDriverBuilder>
{
  construct() {
    this(true)
  }
  
  construct(quotable: boolean) {
    super(PolicyDriver)
    if(quotable){
      defaultsForQuote()
    }
  }
  
  final function defaultsForQuote() : PolicyDriverBuilder{
    withNumberOfAccidents(NumberOfAccidents.TC_0)
    withNumberOfViolations(NumberOfAccidents.TC_0)
    return this
  }
  
  function asApplicableGoodDriver(applicableGoodDriver : boolean) : PolicyDriverBuilder {
    set(PolicyDriver.Type.TypeInfo.getProperty("ApplicableGoodDriverDiscount"), applicableGoodDriver)
    return this
  }
  
  function withVehicleDriver(vehicleDriverBuilder : VehicleDriverBuilder) : PolicyDriverBuilder {
    addArrayElement(PolicyDriver.Type.TypeInfo.getProperty("VehicleDrivers"), vehicleDriverBuilder)
    return this
  }
  
  function withQuickQuoteNumber(number : int) : PolicyDriverBuilder {
    set(PolicyDriver.Type.TypeInfo.getProperty("QuickQuoteNumber"), number)
    return this
  }

  function withExcluded(excluded : boolean) : PolicyDriverBuilder {
    set(PolicyDriver.Type.TypeInfo.getProperty("ExcludedInternal"), excluded)
    return this
  }

  function withDoNotOrderMVR(doNotOrder : boolean) : PolicyDriverBuilder {
    set(PolicyDriver.Type.TypeInfo.getProperty("DoNotOrderMVR"), doNotOrder)
    return this
  }

  function withNumberOfAccidents(numberOfAccidents : NumberOfAccidents) : PolicyDriverBuilder {
    set(PolicyDriver.Type.TypeInfo.getProperty("NumberOfAccidents"), numberOfAccidents)
    return this
  }

  function withNumberOfViolations(numberOfViolations : NumberOfAccidents) : PolicyDriverBuilder {
    set(PolicyDriver.Type.TypeInfo.getProperty("NumberOfViolations"), numberOfViolations)
    return this
  }

  function withPolicyDriverMVR(policyDriverMVRBuilder : PolicyDriverMVRBuilder) : PolicyDriverBuilder {
    set(PolicyDriver.Type.TypeInfo.getProperty("PolicyDriverMVR"), policyDriverMVRBuilder)
    return this
  }
}
