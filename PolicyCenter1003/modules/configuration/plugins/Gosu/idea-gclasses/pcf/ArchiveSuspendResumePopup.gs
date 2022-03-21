package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/archive/ArchiveSuspendResumePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ArchiveSuspendResumePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policy :  Policy) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ArchiveSuspendResumePopup, {policy}, 0)
  }
  
  static function push (policy :  Policy) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ArchiveSuspendResumePopup, {policy}, 0).push()
  }
  
  
}