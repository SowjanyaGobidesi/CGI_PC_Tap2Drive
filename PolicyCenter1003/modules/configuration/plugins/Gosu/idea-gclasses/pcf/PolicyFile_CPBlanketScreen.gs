package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policyfile/PolicyFile_CPBlanketScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_CPBlanketScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($cpLine :  CommercialPropertyLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PolicyFile_CPBlanketScreen, SECTION_WIDGET_CLASS).setVariables(false, {$cpLine, $openForEdit})
  }
  
  function refreshVariables ($cpLine :  CommercialPropertyLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PolicyFile_CPBlanketScreen, SECTION_WIDGET_CLASS).setVariables(true, {$cpLine, $openForEdit})
  }
  
  
}