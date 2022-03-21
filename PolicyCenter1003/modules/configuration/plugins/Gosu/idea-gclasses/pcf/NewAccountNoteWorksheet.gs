package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/note/NewAccountNoteWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAccountNoteWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (account :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewAccountNoteWorksheet, {account}, 0)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAccountNoteWorksheet, {account}, 0).goInWorkspace()
  }
  
  static function push (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAccountNoteWorksheet, {account}, 0).push()
  }
  
  
}