package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/document/DocumentMetadataEditLV.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DocumentMetadataEditLV_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($DocumentApplicationContext :  gw.document.DocumentApplicationContext, $DocumentCreationInfos :  java.util.Collection<gw.document.DocumentCreationInfo>) : void {
    __widgetOf(this, pcf.DocumentMetadataEditLV_default, SECTION_WIDGET_CLASS).setVariables(false, {$DocumentApplicationContext, $DocumentCreationInfos})
  }
  
  function refreshVariables ($DocumentApplicationContext :  gw.document.DocumentApplicationContext, $DocumentCreationInfos :  java.util.Collection<gw.document.DocumentCreationInfo>) : void {
    __widgetOf(this, pcf.DocumentMetadataEditLV_default, SECTION_WIDGET_CLASS).setVariables(true, {$DocumentApplicationContext, $DocumentCreationInfos})
  }
  
  
}