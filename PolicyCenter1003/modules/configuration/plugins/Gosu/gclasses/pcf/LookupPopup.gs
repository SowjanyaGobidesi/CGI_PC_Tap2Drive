package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/LookupPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LookupPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (existingLookup :  LookupTableDefinition, editable :  Boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.LookupPopup, {existingLookup, editable}, 0)
  }
  
  static function push (existingLookup :  LookupTableDefinition, editable :  Boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LookupPopup, {existingLookup, editable}, 0).push()
  }
  
  
}