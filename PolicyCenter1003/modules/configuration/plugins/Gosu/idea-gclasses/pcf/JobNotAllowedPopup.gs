package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/JobNotAllowedPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobNotAllowedPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (jobType :  String, product :  gw.api.productmodel.Product) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.JobNotAllowedPopup, {jobType, product}, 0)
  }
  
  static function push (jobType :  String, product :  gw.api.productmodel.Product) : pcf.api.Location {
    return __newDestinationForLocation(pcf.JobNotAllowedPopup, {jobType, product}, 0).push()
  }
  
  
}