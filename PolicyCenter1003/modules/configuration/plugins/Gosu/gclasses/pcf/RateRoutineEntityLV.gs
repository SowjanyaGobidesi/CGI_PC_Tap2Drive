package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineEntityLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineEntityLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($valueDelegate :  CalcStepValueDelegate, $inScopeUsages :  List<gw.rating.flow.util.InScopeUsage>, $helper :  gw.pcf.rating.flow.RateRoutineEntityPopupHelper) : void {
    __widgetOf(this, pcf.RateRoutineEntityLV, SECTION_WIDGET_CLASS).setVariables(false, {$valueDelegate, $inScopeUsages, $helper})
  }
  
  function refreshVariables ($valueDelegate :  CalcStepValueDelegate, $inScopeUsages :  List<gw.rating.flow.util.InScopeUsage>, $helper :  gw.pcf.rating.flow.RateRoutineEntityPopupHelper) : void {
    __widgetOf(this, pcf.RateRoutineEntityLV, SECTION_WIDGET_CLASS).setVariables(true, {$valueDelegate, $inScopeUsages, $helper})
  }
  
  
}