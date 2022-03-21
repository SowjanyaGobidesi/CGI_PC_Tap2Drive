package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/NewAccountPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAccountPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (forNewSubmission :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewAccountPopup, {forNewSubmission}, 0)
  }
  
  function pickValueAndCommit (value :  AccountSummary) : void {
    __widgetOf(this, pcf.NewAccountPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (forNewSubmission :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAccountPopup, {forNewSubmission}, 0).push()
  }
  
  
}