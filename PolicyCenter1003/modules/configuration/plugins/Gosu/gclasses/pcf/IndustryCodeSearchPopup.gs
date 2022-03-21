package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/IndustryCodeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IndustryCodeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (domain :  IndustryCodeType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.IndustryCodeSearchPopup, {domain}, 0)
  }
  
  static function createDestination (domain :  IndustryCodeType, referenceDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.IndustryCodeSearchPopup, {domain, referenceDate}, 1)
  }
  
  static function createDestination (domain :  IndustryCodeType, referenceDate :  java.util.Date, previousIndustryCode :  IndustryCode) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.IndustryCodeSearchPopup, {domain, referenceDate, previousIndustryCode}, 2)
  }
  
  function pickValueAndCommit (value :  IndustryCode) : void {
    __widgetOf(this, pcf.IndustryCodeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (domain :  IndustryCodeType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.IndustryCodeSearchPopup, {domain}, 0).push()
  }
  
  static function push (domain :  IndustryCodeType, referenceDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.IndustryCodeSearchPopup, {domain, referenceDate}, 1).push()
  }
  
  static function push (domain :  IndustryCodeType, referenceDate :  java.util.Date, previousIndustryCode :  IndustryCode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.IndustryCodeSearchPopup, {domain, referenceDate, previousIndustryCode}, 2).push()
  }
  
  
}