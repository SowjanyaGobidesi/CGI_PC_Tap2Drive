package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/user/UserPrefsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserPrefsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($userPreferences :  gw.api.web.userpreference.UserPreferencesOfCurrentUser, $userBase :  User) : void {
    __widgetOf(this, pcf.UserPrefsDV, SECTION_WIDGET_CLASS).setVariables(false, {$userPreferences, $userBase})
  }
  
  function refreshVariables ($userPreferences :  gw.api.web.userpreference.UserPreferencesOfCurrentUser, $userBase :  User) : void {
    __widgetOf(this, pcf.UserPrefsDV, SECTION_WIDGET_CLASS).setVariables(true, {$userPreferences, $userBase})
  }
  
  
}