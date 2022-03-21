package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/OfficialIDInputSet.person.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OfficialIDInputSet_person extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($personContact :  Contact) : void {
    __widgetOf(this, pcf.OfficialIDInputSet_person, SECTION_WIDGET_CLASS).setVariables(false, {$personContact})
  }
  
  function refreshVariables ($personContact :  Contact) : void {
    __widgetOf(this, pcf.OfficialIDInputSet_person, SECTION_WIDGET_CLASS).setVariables(true, {$personContact})
  }
  
  
}