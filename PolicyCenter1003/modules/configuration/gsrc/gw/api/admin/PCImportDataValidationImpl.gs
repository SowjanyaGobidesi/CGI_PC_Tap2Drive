package gw.api.admin
uses gw.admin.FormPatternValidation
uses entity.KeyableBean
uses gw.lang.Export
uses gw.plugin.Plugins
uses gw.plugin.lookup.LookupCreationPlugin
uses typekey.ValidationLevel
uses entity.FormPattern
uses gw.validation.ValidationUtil
uses gw.admin.PolicyHoldValidation

@Export
class PCImportDataValidationImpl implements PCImportDataValidation {
  
  override function validate(bean : KeyableBean) {
    if (bean typeis FormPattern) {
      var context = ValidationUtil.createContext(ValidationLevel.TC_DEFAULT)
      var validator = new FormPatternValidation(context, bean as FormPattern)
      validator.validate() 
      context.raiseExceptionIfProblemsFound()  
    } else if (bean typeis PolicyHold) {
      var context = ValidationUtil.createContext(ValidationLevel.TC_DEFAULT)
      var validator = new PolicyHoldValidation(context, bean as PolicyHold)
      validator.validate() 
      context.raiseExceptionIfProblemsFound()  
    } else if (bean typeis LookupTableDefinition) {
      var lookupCreationPlugin = Plugins.get(LookupCreationPlugin)
      var validationErrors = lookupCreationPlugin.validateLookup(bean as LookupTableDefinition)
      var context = ValidationUtil.createContext(ValidationLevel.TC_DEFAULT)
      validationErrors.each(\error -> {
        context.Result.addError(bean as KeyableBean,ValidationLevel.TC_DEFAULT, error)
      })
      context.raiseExceptionIfProblemsFound()
    }
  }

  /**
   * This validation raises an exception (via context) on first validation error
   * So this should never return true
   */
  override function hasErrors() : boolean {
    return false
  }

}
