package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/AuditProcessingInputSet.PremiumReport.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditProcessingInputSet_PremiumReport extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($audit :  Audit) : void {
    __widgetOf(this, pcf.AuditProcessingInputSet_PremiumReport, SECTION_WIDGET_CLASS).setVariables(false, {$audit})
  }
  
  function refreshVariables ($audit :  Audit) : void {
    __widgetOf(this, pcf.AuditProcessingInputSet_PremiumReport, SECTION_WIDGET_CLASS).setVariables(true, {$audit})
  }
  
  
}