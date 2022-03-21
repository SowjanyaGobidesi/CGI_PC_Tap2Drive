package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/email/EmailTemplateSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EmailTemplateSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($emailTemplateSearchCriteria :  gw.api.email.EmailTemplateSearchCriteria) : void {
    __widgetOf(this, pcf.EmailTemplateSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$emailTemplateSearchCriteria})
  }
  
  function refreshVariables ($emailTemplateSearchCriteria :  gw.api.email.EmailTemplateSearchCriteria) : void {
    __widgetOf(this, pcf.EmailTemplateSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$emailTemplateSearchCriteria})
  }
  
  
}