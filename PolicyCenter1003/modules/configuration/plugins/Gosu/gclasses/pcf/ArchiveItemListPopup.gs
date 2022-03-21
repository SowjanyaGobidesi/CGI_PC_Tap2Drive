package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/infopages/ArchiveItemListPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ArchiveItemListPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (archiveDetailsData :  gw.api.archiving.ArchiveDetailsData) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ArchiveItemListPopup, {archiveDetailsData}, 0)
  }
  
  static function push (archiveDetailsData :  gw.api.archiving.ArchiveDetailsData) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ArchiveItemListPopup, {archiveDetailsData}, 0).push()
  }
  
  
}