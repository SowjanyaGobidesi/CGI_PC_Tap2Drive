package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/NewAccountScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAccountScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($forNewSubmission :  boolean) : void {
    __widgetOf(this, pcf.NewAccountScreen, SECTION_WIDGET_CLASS).setVariables(false, {$forNewSubmission})
  }
  
  function refreshVariables ($forNewSubmission :  boolean) : void {
    __widgetOf(this, pcf.NewAccountScreen, SECTION_WIDGET_CLASS).setVariables(true, {$forNewSubmission})
  }
  
  
}