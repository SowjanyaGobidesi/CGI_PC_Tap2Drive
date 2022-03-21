package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/demopaymentsystem/PaymentMethodInputSet.ach.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PaymentMethodInputSet_ach extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountHolderName :  String, $address :  Address) : void {
    __widgetOf(this, pcf.PaymentMethodInputSet_ach, SECTION_WIDGET_CLASS).setVariables(false, {$accountHolderName, $address})
  }
  
  function refreshVariables ($accountHolderName :  String, $address :  Address) : void {
    __widgetOf(this, pcf.PaymentMethodInputSet_ach, SECTION_WIDGET_CLASS).setVariables(true, {$accountHolderName, $address})
  }
  
  
}