package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/FormPatternDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FormPatternDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (formPattern :  FormPattern) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FormPatternDetail, {formPattern}, 0)
  }
  
  static function drilldown (formPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FormPatternDetail, {formPattern}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (formPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FormPatternDetail, {formPattern}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (formPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FormPatternDetail, {formPattern}, 0).goInMain()
  }
  
  static function printPage (formPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FormPatternDetail, {formPattern}, 0).printPage()
  }
  
  static function push (formPattern :  FormPattern) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FormPatternDetail, {formPattern}, 0).push()
  }
  
  
}