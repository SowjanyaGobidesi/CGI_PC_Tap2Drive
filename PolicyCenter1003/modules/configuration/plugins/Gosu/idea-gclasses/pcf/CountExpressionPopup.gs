package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/CountExpressionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CountExpressionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (fragHolder :  gw.bizrules.pcf.CountExpressionFragmentHolder) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CountExpressionPopup, {fragHolder}, 0)
  }
  
  static function push (fragHolder :  gw.bizrules.pcf.CountExpressionFragmentHolder) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CountExpressionPopup, {fragHolder}, 0).push()
  }
  
  
}