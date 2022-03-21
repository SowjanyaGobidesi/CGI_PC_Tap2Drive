package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/GroupDetailInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GroupDetailInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($group :  Group, $isSupervisorRequired :  boolean, $existingUsers :  List<User>) : void {
    __widgetOf(this, pcf.GroupDetailInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$group, $isSupervisorRequired, $existingUsers})
  }
  
  function refreshVariables ($group :  Group, $isSupervisorRequired :  boolean, $existingUsers :  List<User>) : void {
    __widgetOf(this, pcf.GroupDetailInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$group, $isSupervisorRequired, $existingUsers})
  }
  
  
}