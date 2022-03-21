package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/email/EmailTemplateSearchResultLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EmailTemplateSearchResultLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($emailTemplateDescriptorList :  gw.plugin.email.IEmailTemplateDescriptor[]) : void {
    __widgetOf(this, pcf.EmailTemplateSearchResultLV, SECTION_WIDGET_CLASS).setVariables(false, {$emailTemplateDescriptorList})
  }
  
  function refreshVariables ($emailTemplateDescriptorList :  gw.plugin.email.IEmailTemplateDescriptor[]) : void {
    __widgetOf(this, pcf.EmailTemplateSearchResultLV, SECTION_WIDGET_CLASS).setVariables(true, {$emailTemplateDescriptorList})
  }
  
  
}