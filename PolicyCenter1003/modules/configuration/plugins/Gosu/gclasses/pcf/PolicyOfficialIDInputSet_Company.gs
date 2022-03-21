package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/PolicyOfficialIDInputSet.Company.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyOfficialIDInputSet_Company extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($namedInsured :  PolicyNamedInsured) : void {
    __widgetOf(this, pcf.PolicyOfficialIDInputSet_Company, SECTION_WIDGET_CLASS).setVariables(false, {$namedInsured})
  }
  
  function refreshVariables ($namedInsured :  PolicyNamedInsured) : void {
    __widgetOf(this, pcf.PolicyOfficialIDInputSet_Company, SECTION_WIDGET_CLASS).setVariables(true, {$namedInsured})
  }
  
  
}