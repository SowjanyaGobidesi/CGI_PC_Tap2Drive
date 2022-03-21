package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/note/NotesPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NotesPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (notes :  entity.Note[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NotesPopup, {notes}, 0)
  }
  
  static function push (notes :  entity.Note[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NotesPopup, {notes}, 0).push()
  }
  
  
}