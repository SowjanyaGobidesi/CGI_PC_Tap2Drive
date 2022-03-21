package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/printing/PrintOptionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PrintOptionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (PrintOptions :  gw.api.print.ListViewPrintOptions) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PrintOptionPopup, {PrintOptions}, 0)
  }
  
  static function push (PrintOptions :  gw.api.print.ListViewPrintOptions) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PrintOptionPopup, {PrintOptions}, 0).push()
  }
  
  
}