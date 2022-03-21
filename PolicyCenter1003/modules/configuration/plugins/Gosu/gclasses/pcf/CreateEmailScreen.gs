package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/email/CreateEmailScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateEmailScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($symbolTable :  java.util.Map<String, Object>, $docContainer :  gw.api.domain.document.DocumentContainer, $emailTemplate :  String, $documentsToSend :  Document[]) : void {
    __widgetOf(this, pcf.CreateEmailScreen, SECTION_WIDGET_CLASS).setVariables(false, {$symbolTable, $docContainer, $emailTemplate, $documentsToSend})
  }
  
  function refreshVariables ($symbolTable :  java.util.Map<String, Object>, $docContainer :  gw.api.domain.document.DocumentContainer, $emailTemplate :  String, $documentsToSend :  Document[]) : void {
    __widgetOf(this, pcf.CreateEmailScreen, SECTION_WIDGET_CLASS).setVariables(true, {$symbolTable, $docContainer, $emailTemplate, $documentsToSend})
  }
  
  
}