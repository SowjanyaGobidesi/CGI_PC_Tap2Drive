package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/payment/demo/DemoPaymentGatewayScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DemoPaymentGatewayScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($amount :  java.math.BigDecimal, $jobNumber :  String) : void {
    __widgetOf(this, pcf.DemoPaymentGatewayScreen, SECTION_WIDGET_CLASS).setVariables(false, {$amount, $jobNumber})
  }
  
  function refreshVariables ($amount :  java.math.BigDecimal, $jobNumber :  String) : void {
    __widgetOf(this, pcf.DemoPaymentGatewayScreen, SECTION_WIDGET_CLASS).setVariables(true, {$amount, $jobNumber})
  }
  
  
}