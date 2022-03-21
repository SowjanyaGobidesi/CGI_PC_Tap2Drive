package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/NewTemplateDocumentDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewTemplateDocumentDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($documentPCContext :  gw.api.web.document.DocumentPCContext, $documentCreationInfo :  gw.document.DocumentCreationInfo, $document :  Document, $account :  Account, $policyPeriod :  PolicyPeriod, $job :  Job, $activity :  Activity) : void {
    __widgetOf(this, pcf.NewTemplateDocumentDV, SECTION_WIDGET_CLASS).setVariables(false, {$documentPCContext, $documentCreationInfo, $document, $account, $policyPeriod, $job, $activity})
  }
  
  function refreshVariables ($documentPCContext :  gw.api.web.document.DocumentPCContext, $documentCreationInfo :  gw.document.DocumentCreationInfo, $document :  Document, $account :  Account, $policyPeriod :  PolicyPeriod, $job :  Job, $activity :  Activity) : void {
    __widgetOf(this, pcf.NewTemplateDocumentDV, SECTION_WIDGET_CLASS).setVariables(true, {$documentPCContext, $documentCreationInfo, $document, $account, $policyPeriod, $job, $activity})
  }
  
  
}