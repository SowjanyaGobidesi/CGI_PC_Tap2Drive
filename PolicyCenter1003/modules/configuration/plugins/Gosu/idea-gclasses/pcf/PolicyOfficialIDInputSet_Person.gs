package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/PolicyOfficialIDInputSet.Person.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyOfficialIDInputSet_Person extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($namedInsured :  PolicyNamedInsured) : void {
    __widgetOf(this, pcf.PolicyOfficialIDInputSet_Person, SECTION_WIDGET_CLASS).setVariables(false, {$namedInsured})
  }
  
  function refreshVariables ($namedInsured :  PolicyNamedInsured) : void {
    __widgetOf(this, pcf.PolicyOfficialIDInputSet_Person, SECTION_WIDGET_CLASS).setVariables(true, {$namedInsured})
  }
  
  
}