package gw.lob.gl

uses gw.api.locale.DisplayKey
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext
uses gw.api.util.JurisdictionMappingUtil

@Export
class GLExposureValidation extends PCValidationBase {

  var _exposure : GLExposure
  
  construct(valContext : PCValidationContext, exposure : GLExposure) {
    super(valContext)
    _exposure = exposure
  }
  
  override protected function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    checkHasLocation()
    checkClassCodeIsValid()
  }

  private function checkHasLocation(){
    if(_exposure.Location == null){
      Result.addError(_exposure, TC_DEFAULT, 
        DisplayKey.get("Web.Policy.GL.Validation.MissingLocation"), "GLLineEU")
    }
  }

  private function checkClassCodeIsValid() {
     var criteria = new GLClassCodeSearchCriteria()
     var glLine = _exposure.GLLine
     criteria.EffectiveAsOfDate = glLine.getReferenceDateForCurrentJob(JurisdictionMappingUtil.getJurisdiction(_exposure.LocationWM))
     criteria.Code = _exposure.ClassCode.Code

     var previousCPClassCode = (glLine.Branch.Job.NewTerm) ? null : _exposure.BasedOn.ClassCode
     if (previousCPClassCode != null) {
       criteria.PreviousSelectedClassCode = previousCPClassCode.Code
     }  
     criteria.ExactMatch = true
     if ( criteria.performSearch().Count == 0) {
       Result.addError(_exposure, TC_DEFAULT, 
            DisplayKey.get("Web.Policy.GL.Validation.UnavailableClassCode", _exposure.ClassCode.Code), "GLLineEU")
     }
  }

}
