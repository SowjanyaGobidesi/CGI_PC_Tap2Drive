package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/WrapperOrCovCode.coverage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WrapperOrCovCode_coverage extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($parameter :  CalcRoutineParameter, $parameterSet :  CalcRoutineParameterSet, $helper :  gw.pcf.rating.flow.RatingParameterSetScreenHelper) : void {
    __widgetOf(this, pcf.WrapperOrCovCode_coverage, SECTION_WIDGET_CLASS).setVariables(false, {$parameter, $parameterSet, $helper})
  }
  
  function refreshVariables ($parameter :  CalcRoutineParameter, $parameterSet :  CalcRoutineParameterSet, $helper :  gw.pcf.rating.flow.RatingParameterSetScreenHelper) : void {
    __widgetOf(this, pcf.WrapperOrCovCode_coverage, SECTION_WIDGET_CLASS).setVariables(true, {$parameter, $parameterSet, $helper})
  }
  
  
}