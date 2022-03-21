package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/note/NewContactRelatedNoteWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewContactRelatedNoteWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (contact :  Contact) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewContactRelatedNoteWorksheet, {contact}, 0)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewContactRelatedNoteWorksheet, {contact}, 0).goInWorkspace()
  }
  
  static function push (contact :  Contact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewContactRelatedNoteWorksheet, {contact}, 0).push()
  }
  
  
}