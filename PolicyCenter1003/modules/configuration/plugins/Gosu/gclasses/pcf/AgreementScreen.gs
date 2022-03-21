package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/AgreementScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AgreementScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($agreement :  RIAgreement, $isInPopup :  boolean) : void {
    __widgetOf(this, pcf.AgreementScreen, SECTION_WIDGET_CLASS).setVariables(false, {$agreement, $isInPopup})
  }
  
  function refreshVariables ($agreement :  RIAgreement, $isInPopup :  boolean) : void {
    __widgetOf(this, pcf.AgreementScreen, SECTION_WIDGET_CLASS).setVariables(true, {$agreement, $isInPopup})
  }
  
  
}