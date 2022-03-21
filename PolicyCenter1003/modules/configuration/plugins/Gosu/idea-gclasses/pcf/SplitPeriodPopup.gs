package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/SplitPeriodPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SplitPeriodPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (wcLine :  productmodel.WorkersCompLine, jurisdictions :  WCJurisdiction[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.SplitPeriodPopup, {wcLine, jurisdictions}, 0)
  }
  
  static function push (wcLine :  productmodel.WorkersCompLine, jurisdictions :  WCJurisdiction[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SplitPeriodPopup, {wcLine, jurisdictions}, 0).push()
  }
  
  
}