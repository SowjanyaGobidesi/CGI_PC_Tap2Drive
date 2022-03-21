package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/email/PickEmailTemplatePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PickEmailTemplatePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (inSearchCriteria :  gw.api.email.EmailTemplateSearchCriteria) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PickEmailTemplatePopup, {inSearchCriteria}, 0)
  }
  
  function pickValueAndCommit (value :  gw.plugin.email.IEmailTemplateDescriptor) : void {
    __widgetOf(this, pcf.PickEmailTemplatePopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (inSearchCriteria :  gw.api.email.EmailTemplateSearchCriteria) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PickEmailTemplatePopup, {inSearchCriteria}, 0).push()
  }
  
  
}