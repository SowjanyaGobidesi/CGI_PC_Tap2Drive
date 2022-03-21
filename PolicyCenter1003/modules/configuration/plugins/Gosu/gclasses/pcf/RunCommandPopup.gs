package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/RunCommandPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RunCommandPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (command :  gw.command.BaseCommand, methodInfo :  gw.lang.reflect.IMethodInfo) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RunCommandPopup, {command, methodInfo}, 0)
  }
  
  function pickValueAndCommit (value :  Object) : void {
    __widgetOf(this, pcf.RunCommandPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (command :  gw.command.BaseCommand, methodInfo :  gw.lang.reflect.IMethodInfo) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RunCommandPopup, {command, methodInfo}, 0).push()
  }
  
  
}