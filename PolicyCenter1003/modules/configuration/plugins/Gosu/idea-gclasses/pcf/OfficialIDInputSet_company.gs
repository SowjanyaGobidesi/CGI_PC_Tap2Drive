package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/OfficialIDInputSet.company.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OfficialIDInputSet_company extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($companyContact :  Contact) : void {
    __widgetOf(this, pcf.OfficialIDInputSet_company, SECTION_WIDGET_CLASS).setVariables(false, {$companyContact})
  }
  
  function refreshVariables ($companyContact :  Contact) : void {
    __widgetOf(this, pcf.OfficialIDInputSet_company, SECTION_WIDGET_CLASS).setVariables(true, {$companyContact})
  }
  
  
}