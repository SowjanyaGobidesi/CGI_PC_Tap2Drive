package gw.systables

uses gw.api.locale.DisplayKey
uses gw.api.util.DateUtil
uses gw.validation.PCValidationResult
uses gw.api.util.StringUtil
uses gw.api.util.StateJurisdictionMappingUtil
uses gw.api.database.IQueryBeanResult
uses org.apache.commons.lang.StringUtils

enhancement OfficialIDEnhancement : OfficialID {

  function validateOfficialID(period : PolicyPeriod, result: PCValidationResult) {
    if (this.OfficialIDType == null) { 
      return
    }   
    var IdInfoResults : IQueryBeanResult<OfficialIDValidationInfo> =
      OfficialIDValidationInfo.finder.findOfficialIDValidationInfosByOfficialIDTypeAndStateAndEffectiveOnDate(this.OfficialIDType,
          StateJurisdictionMappingUtil.getStateMappingForJurisdiction(this.State), DateUtil.currentDate())
    
    if (this.OfficialIDValue == null) {  // validate requiredness
      for (validationInfo in IdInfoResults) {
        if (validationInfo.OfficialIdRequiredType != TC_OPTIONAL) {
          var level: ValidationLevel
          if (validationInfo.OfficialIdRequiredType == TC_MANDATORYISSUE) {
            level = TC_READYFORISSUE
          } else {
            level = TC_BINDABLE
          }
          result.addError(period, level,
              DisplayKey.get("Validation.OfficialID.ValueRequired", this.State, validationInfo.OfficialIDType.Description, validationInfo.OfficialIdRequiredType.Description))

        }
      }
    } else { // validate value correctness
      var error = validateValue(IdInfoResults)
      if (error != null) {
        result.addError(period, TC_DEFAULT, error)
      }
    }
  }

  function validateValue(): String {
    var IdInfoResults = OfficialIDValidationInfo.finder.findOfficialIDValidationInfosByOfficialIDTypeAndStateAndEffectiveOnDate(
        this.OfficialIDType, StateJurisdictionMappingUtil.getStateMappingForJurisdiction(this.State), DateUtil.currentDate())
    return validateValue(IdInfoResults)
  }

  function validateValue(IdInfoResults: IQueryBeanResult<OfficialIDValidationInfo>): String {
    if (this.OfficialIDValue == null) {
      return null
    }

    var errorMessages = new HashSet<String>()
    for (validationInfo in IdInfoResults) {
      var format = "^" + validationInfo.IDFormat + "$"
      if (StringUtil.match(this.OfficialIDValue, format)) {
        return null
      } else { //collect all format errors, and return if none of the expected formats match officialId
        errorMessages.add(validationInfo.IDFormatError)
      }
    }
    return errorMessages.Empty ? null : DisplayKey.get("Validation.OfficialID.ValueFormat", this.OfficialIDType,
        this.State, StringUtils.join(errorMessages.order(), "\n"))
  }

}
