package gw.api.databuilder.pa

uses gw.api.databuilder.DataBuilder
uses java.util.Date

@Export
class PAMVRIncidentBuilder extends DataBuilder<MVRIncident, PAMVRIncidentBuilder> {

  construct() {
    
    super(MVRIncident)
     
    withIncidentType(MVRIncidentType.TC_VIOL)
    withCode("E01")
    withConvictionDate(Date.create(1998, MAY, 18))
    withDescription("OPERATING WITHOUT REQUIRED EQUIPMENT")
    withPoints(0)
    withViolationDate(Date.create(1998, APRIL, 11))
    withLocation("MA")
    withIncidentNumber(1)
  }
  
  final function withDefaultRein1(): PAMVRIncidentBuilder {
    withIncidentType(MVRIncidentType.TC_REIN)
    withCode("D53")
    withConvictionDate(Date.create(1995, SEPTEMBER, 25))
    withDescription("FAIL TO PAY - FINE AND COSTS")
    withPoints(0)
    withViolationDate(Date.create(1995, SEPTEMBER, 25))
    withLocation("MA")
    return this
  }  
  
  final function withDefaultViol1(): PAMVRIncidentBuilder {
    withIncidentType(MVRIncidentType.TC_VIOL)
    withCode("063")
    withConvictionDate(Date.create(1998, JANUARY, 15))
    withDescription("HAS LICENSE IN ANOTHER STATE")
    withPoints(0)
    withViolationDate(Date.create(1998, JANUARY, 15))
    withLocation("FL")
    return this
  }  
  
  final function withDefaultViol2(): PAMVRIncidentBuilder {
    withIncidentType(MVRIncidentType.TC_VIOL)
    withCode("082")
    withConvictionDate(Date.create(1998, JUNE, 4))
    withDescription("FAIL TO FILE INS AFTER CONVCTN/SUSP/NOTI")
    withPoints(0)
    withViolationDate(Date.create(1997, DECEMBER, 4))
    withLocation("GA")
    return this
  }

  final function withIncidentType(incidentType: MVRIncidentType): PAMVRIncidentBuilder  {
    set(MVRIncident.Type.TypeInfo.getProperty("IncidentType"), incidentType)
    return this
  }  
  
  final function withCode(carrierViolationCode : String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("CarrierViolationCode"), carrierViolationCode )
    return this
  }  
  
  final function withConvictionDate(convictionDate: Date) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("ConvictionDate"), convictionDate)
    return this
  }  
  
  final function withDescription(description: String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("Description"), description)
    return this
  }  
  
  final function withPoints(points: int) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("Points"), points)
    return this
  }
  
  final function withViolationDate(violationDate: Date) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("ViolationDate"), violationDate)
    return this
  }
  
  final function withLocation(location: String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("Location"), location)
    return this
  }  
  
  final function withState(state: State) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("State"), state)
    return this
  }
  
  final function withStateCode(violationCode: String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("ViolationCode"), violationCode)
    return this
  }
  
  final function withCourt(court: String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("Court"), court)
    return this
  }
  
  final function withEligibleDate(eligibleDate: Date) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("EligibleDate"), eligibleDate)
    return this
  }
  
  final function withOrderNumber(orderNumber: String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("OrderNumber"), orderNumber)
    return this
  }  
  
  final function withIncidentNumber(incidentNumber: int) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("IncidentNumber"), incidentNumber)
    return this
  }
  
  final function withDisposition(disposition: String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("Disposition"), disposition)
    return this
  }
  
  final function withSpeed(speed: String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("Speed"), speed)
    return this
  }
  
  final function withSpeedZone(speedZone: String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("SpeedZone"), speedZone)
    return this
  }
  
  final function withAccident(accident: String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("Accident"), accident)
    return this
  }
  
  final function withMisc(misc: String) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("Misc"), misc)
    return this
  }
  
  final function withMVR(mvr : entity.MVR) : PAMVRIncidentBuilder {
    set(MVRIncident.Type.TypeInfo.getProperty("MVR"), mvr)
    return this  
  }
}
