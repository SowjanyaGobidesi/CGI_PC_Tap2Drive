package gw.contact
uses java.util.Collection
uses java.util.ArrayList
uses gw.api.util.StateJurisdictionMappingUtil

@Export
enhancement PolicyNamedInsuredEnhancement : PolicyNamedInsured {

  function getOfficialIDsForState(st : State) : Collection<OfficialID> {
    var isPrimaryNamedInsured = this typeis PolicyPriNamedInsured
    var hasLocationNamedInsuredInState = false
    if (st != null) {
      hasLocationNamedInsuredInState = this.LocationNamedInsureds*.Location.hasMatch(\ polLoc -> polLoc.State == st)
    }

    var officialIdsForState = new ArrayList<OfficialID>()
    for (officialId in this.AccountContactRole.AccountContact.Contact.OfficialIDs) {
      var isInsuredAndState = officialId typeis PCOfficialID and officialId.Pattern.Scope == TC_INSUREDANDSTATE
      if (st == StateJurisdictionMappingUtil.getStateMappingForJurisdiction(officialId.State)
          and (isPrimaryNamedInsured or hasLocationNamedInsuredInState or not isInsuredAndState)) {
        officialIdsForState.add(officialId)
      }
    }
    return officialIdsForState
  }
  
  property get IndustryCode() : IndustryCode {
    return (this.AccountContactRole as NamedInsured).IndustryCode
  }

  property set IndustryCode(arg : IndustryCode) {
    (this.AccountContactRole as NamedInsured).IndustryCode = arg
  }

}
