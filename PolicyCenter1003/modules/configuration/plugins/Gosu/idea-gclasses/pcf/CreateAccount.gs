package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/CreateAccount.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateAccount extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (insuredContactType :  typekey.ContactType, populator :  gw.account.AccountPopulator, forNewSubmission :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CreateAccount, {insuredContactType, populator, forNewSubmission}, 0)
  }
  
  static function drilldown (insuredContactType :  typekey.ContactType, populator :  gw.account.AccountPopulator, forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccount, {insuredContactType, populator, forNewSubmission}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (insuredContactType :  typekey.ContactType, populator :  gw.account.AccountPopulator, forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccount, {insuredContactType, populator, forNewSubmission}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (insuredContactType :  typekey.ContactType, populator :  gw.account.AccountPopulator, forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccount, {insuredContactType, populator, forNewSubmission}, 0).goInMain()
  }
  
  static function printPage (insuredContactType :  typekey.ContactType, populator :  gw.account.AccountPopulator, forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccount, {insuredContactType, populator, forNewSubmission}, 0).printPage()
  }
  
  static function push (insuredContactType :  typekey.ContactType, populator :  gw.account.AccountPopulator, forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccount, {insuredContactType, populator, forNewSubmission}, 0).push()
  }
  
  
}