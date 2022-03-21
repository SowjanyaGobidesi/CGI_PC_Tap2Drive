package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/CreateAccountDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateAccountDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $producerSelection :  ProducerSelection) : void {
    __widgetOf(this, pcf.CreateAccountDV, SECTION_WIDGET_CLASS).setVariables(false, {$account, $producerSelection})
  }
  
  function refreshVariables ($account :  Account, $producerSelection :  ProducerSelection) : void {
    __widgetOf(this, pcf.CreateAccountDV, SECTION_WIDGET_CLASS).setVariables(true, {$account, $producerSelection})
  }
  
  
}