package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/payment/demo/DemoTransactionConfirmationScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DemoTransactionConfirmationScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($reference :  String, $amount :  java.math.BigDecimal, $address :  String) : void {
    __widgetOf(this, pcf.DemoTransactionConfirmationScreen, SECTION_WIDGET_CLASS).setVariables(false, {$reference, $amount, $address})
  }
  
  function refreshVariables ($reference :  String, $amount :  java.math.BigDecimal, $address :  String) : void {
    __widgetOf(this, pcf.DemoTransactionConfirmationScreen, SECTION_WIDGET_CLASS).setVariables(true, {$reference, $amount, $address})
  }
  
  
}