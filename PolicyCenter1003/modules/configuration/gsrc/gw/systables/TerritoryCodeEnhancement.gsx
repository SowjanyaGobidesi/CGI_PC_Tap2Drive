package gw.systables

uses gw.api.locale.DisplayKey
uses java.util.Map
uses gw.api.util.JurisdictionMappingUtil

enhancement TerritoryCodeEnhancement : TerritoryCode {

  /*
   * Performs a territory code lookup and returns the Territory[] object.
   * @param criteria gw.lob.common.TerritoryLookupCriteria used to lookup territory code
   * @return Territories satisfying the passed in criteria
   */  
  function getTerritoryCodes(criteria : gw.lob.common.TerritoryLookupCriteria) : Territory[] {
    var result = criteria.performSearch()
    return result.toTypedArray().map(\ d -> new Territory(this.Bundle){ :DBTerritory = d })
  }

  function createLookupCriteria(): gw.lob.common.TerritoryLookupCriteria {
    var criteria = new gw.lob.common.TerritoryLookupCriteria()
    criteria.State = JurisdictionMappingUtil.getJurisdiction(this.PolicyLocation)
    criteria.PolicyLinePatternCode = this.PolicyLinePatternCode
    criteria.City = this.PolicyLocation.City
    criteria.PostalCode = this.PolicyLocation.PostalCode
    var line = this.PolicyLocation.Branch.getLine(this.PolicyLinePattern)
    criteria.EffectiveOnDate = line.getReferenceDateForCurrentJob(criteria.State)
    var previousSelectedCode = (this.PolicyLocation.Branch.Job.NewTerm) ? null : this.BasedOn.Code
    if (previousSelectedCode != null) {
      criteria.PreviousCode = previousSelectedCode
    }
    return criteria
  }

  /**
   * Lookup criteria that defines what territories match for this territory code.
   */
  property get MatchingLookupCriteria() : gw.lob.common.TerritoryLookupCriteria {
    var criteria = new gw.lob.common.TerritoryLookupCriteria()
    MatchingCriteriaMap.eachKeyAndValue(\ k, v -> {criteria[k] = v})
    return criteria
  }
  
  /**
   * Lookup criteria that defines what territories match for this territory code.
   */
  property get MatchingCriteriaMap() : Map<String, Object> {
    var juris = JurisdictionMappingUtil.getJurisdiction(this.PolicyLocation)
    return {
      "Code" -> this.Code,
      "State" -> juris,
      "PolicyLinePatternCode" -> this.PolicyLinePatternCode,
      "EffectiveOnDate" -> this.PolicyLocation.Branch.getLine(this.PolicyLinePattern).getReferenceDateForCurrentJob(juris),
      "PreviousCode" -> (this.PolicyLocation.Branch.Job.NewTerm) ? null : this.BasedOn.Code
    }
  }

  /**
   * check if territoryCode agrees with the policy location
   */
  function prelimValidate() : String {
    return prelimValidate(MatchingLookupCriteria)
  }

  /**
   * check if territoryCode agrees with the policy location
   */
  @Param("matcher", "Criteria defining what territories match this territory code. See TerritoryCode.MatchingLookupCriteria.")
  function prelimValidate(matcher : gw.lob.common.TerritoryLookupCriteria) : String {
    var territories = getTerritoryCodes(matcher)
    
    return territories.hasMatch( \ t -> t.Code == this.Code )  // require exact match
        ? null
        : DisplayKey.get("Web.Policy.LocationContainer.Location.Validation.TerritoryCodeMismatch", this.Code)
  }
 
 function fillWithFirst() {
    var territories = getTerritoryCodes(createLookupCriteria())
    if (territories.Count > 0) {
      this.Code = territories[0].Code
    }
  }
}