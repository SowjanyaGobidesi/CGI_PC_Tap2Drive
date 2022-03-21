package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/EditNotePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditNotePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (note :  Note) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditNotePopup, {note}, 0)
  }
  
  static function createDestination (note :  Note, startInEditMode :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditNotePopup, {note, startInEditMode}, 1)
  }
  
  static function push (note :  Note) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditNotePopup, {note}, 0).push()
  }
  
  static function push (note :  Note, startInEditMode :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditNotePopup, {note, startInEditMode}, 1).push()
  }
  
  
}