package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/DocumentsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DocumentsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $viewOnly :  boolean) : void {
    __widgetOf(this, pcf.DocumentsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$account, $viewOnly})
  }
  
  function refreshVariables ($account :  Account, $viewOnly :  boolean) : void {
    __widgetOf(this, pcf.DocumentsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$account, $viewOnly})
  }
  
  
}