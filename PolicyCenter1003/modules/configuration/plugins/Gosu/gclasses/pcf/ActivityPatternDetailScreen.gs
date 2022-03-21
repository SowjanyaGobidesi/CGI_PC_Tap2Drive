package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/ActivityPatternDetailScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ActivityPatternDetailScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($activityPattern :  ActivityPattern) : void {
    __widgetOf(this, pcf.ActivityPatternDetailScreen, SECTION_WIDGET_CLASS).setVariables(false, {$activityPattern})
  }
  
  function refreshVariables ($activityPattern :  ActivityPattern) : void {
    __widgetOf(this, pcf.ActivityPatternDetailScreen, SECTION_WIDGET_CLASS).setVariables(true, {$activityPattern})
  }
  
  
}