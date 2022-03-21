package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/note/PickNoteTemplatePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PickNoteTemplatePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (searchCriteria :  NoteTemplateSearchCriteria) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PickNoteTemplatePopup, {searchCriteria}, 0)
  }
  
  function pickValueAndCommit (value :  NoteTemplateSearchResults) : void {
    __widgetOf(this, pcf.PickNoteTemplatePopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (searchCriteria :  NoteTemplateSearchCriteria) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PickNoteTemplatePopup, {searchCriteria}, 0).push()
  }
  
  
}