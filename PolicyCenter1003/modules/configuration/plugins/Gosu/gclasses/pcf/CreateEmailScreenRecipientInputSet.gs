package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/email/CreateEmailScreenRecipientInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateEmailScreenRecipientInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($title :  String, $contacts :  List<gw.api.email.EmailContact>, $account :  Account) : void {
    __widgetOf(this, pcf.CreateEmailScreenRecipientInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$title, $contacts, $account})
  }
  
  function refreshVariables ($title :  String, $contacts :  List<gw.api.email.EmailContact>, $account :  Account) : void {
    __widgetOf(this, pcf.CreateEmailScreenRecipientInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$title, $contacts, $account})
  }
  
  
}