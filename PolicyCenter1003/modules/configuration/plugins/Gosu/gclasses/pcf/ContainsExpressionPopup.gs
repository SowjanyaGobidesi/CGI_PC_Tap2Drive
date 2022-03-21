package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/ContainsExpressionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContainsExpressionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (fragHolder :  gw.bizrules.pcf.ContainsExpressionFragmentHolder) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContainsExpressionPopup, {fragHolder}, 0)
  }
  
  static function push (fragHolder :  gw.bizrules.pcf.ContainsExpressionFragmentHolder) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContainsExpressionPopup, {fragHolder}, 0).push()
  }
  
  
}