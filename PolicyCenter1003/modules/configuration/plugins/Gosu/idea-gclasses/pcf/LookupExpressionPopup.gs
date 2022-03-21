package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/LookupExpressionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LookupExpressionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (fragHolder :  gw.bizrules.pcf.LookupExpressionFragmentHolder, rule :  Rule) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.LookupExpressionPopup, {fragHolder, rule}, 0)
  }
  
  static function push (fragHolder :  gw.bizrules.pcf.LookupExpressionFragmentHolder, rule :  Rule) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LookupExpressionPopup, {fragHolder, rule}, 0).push()
  }
  
  
}