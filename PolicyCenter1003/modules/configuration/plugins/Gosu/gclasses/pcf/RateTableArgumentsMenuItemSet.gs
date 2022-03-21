package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateTableArgumentsMenuItemSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableArgumentsMenuItemSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($tableName :  String, $arg :  CalcStepDefinitionArgument, $paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, List<gw.rating.flow.util.InScopeUsage>>, $lineCode :  String, $availLocalVariables :  List<gw.rating.flow.LocalVariable>) : void {
    __widgetOf(this, pcf.RateTableArgumentsMenuItemSet, SECTION_WIDGET_CLASS).setVariables(false, {$tableName, $arg, $paramInScopeUsageMap, $lineCode, $availLocalVariables})
  }
  
  function refreshVariables ($tableName :  String, $arg :  CalcStepDefinitionArgument, $paramInScopeUsageMap :  java.util.Map<CalcRoutineParamName, List<gw.rating.flow.util.InScopeUsage>>, $lineCode :  String, $availLocalVariables :  List<gw.rating.flow.LocalVariable>) : void {
    __widgetOf(this, pcf.RateTableArgumentsMenuItemSet, SECTION_WIDGET_CLASS).setVariables(true, {$tableName, $arg, $paramInScopeUsageMap, $lineCode, $availLocalVariables})
  }
  
  
}