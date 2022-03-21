package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/AgreementOtherTermsInputSet.nonproportional.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AgreementOtherTermsInputSet_nonproportional extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($agreement :  RIAgreement) : void {
    __widgetOf(this, pcf.AgreementOtherTermsInputSet_nonproportional, SECTION_WIDGET_CLASS).setVariables(false, {$agreement})
  }
  
  function refreshVariables ($agreement :  RIAgreement) : void {
    __widgetOf(this, pcf.AgreementOtherTermsInputSet_nonproportional, SECTION_WIDGET_CLASS).setVariables(true, {$agreement})
  }
  
  
}