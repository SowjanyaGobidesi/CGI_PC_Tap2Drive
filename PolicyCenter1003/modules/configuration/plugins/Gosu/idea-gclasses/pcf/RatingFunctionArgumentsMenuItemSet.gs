package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RatingFunctionArgumentsMenuItemSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RatingFunctionArgumentsMenuItemSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($functionName :  String, $parameter :  CalcStepDefinitionArgument, $paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, List<gw.rating.flow.util.InScopeUsage>>, $lineCode :  String, $availLocalVariables :  List<gw.rating.flow.LocalVariable>) : void {
    __widgetOf(this, pcf.RatingFunctionArgumentsMenuItemSet, SECTION_WIDGET_CLASS).setVariables(false, {$functionName, $parameter, $paramInScopeUsageMap, $lineCode, $availLocalVariables})
  }
  
  function refreshVariables ($functionName :  String, $parameter :  CalcStepDefinitionArgument, $paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, List<gw.rating.flow.util.InScopeUsage>>, $lineCode :  String, $availLocalVariables :  List<gw.rating.flow.LocalVariable>) : void {
    __widgetOf(this, pcf.RatingFunctionArgumentsMenuItemSet, SECTION_WIDGET_CLASS).setVariables(true, {$functionName, $parameter, $paramInScopeUsageMap, $lineCode, $availLocalVariables})
  }
  
  
}