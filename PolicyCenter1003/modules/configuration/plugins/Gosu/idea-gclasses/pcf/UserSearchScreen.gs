package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/UserSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter () : void {
    __widgetOf(this, pcf.UserSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {})
  }
  
  function refreshVariables () : void {
    __widgetOf(this, pcf.UserSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {})
  }
  
  
}