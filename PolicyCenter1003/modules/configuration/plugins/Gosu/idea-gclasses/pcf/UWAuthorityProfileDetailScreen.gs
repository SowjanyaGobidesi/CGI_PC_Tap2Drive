package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/UWAuthorityProfileDetailScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWAuthorityProfileDetailScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($profile :  UWAuthorityProfile) : void {
    __widgetOf(this, pcf.UWAuthorityProfileDetailScreen, SECTION_WIDGET_CLASS).setVariables(false, {$profile})
  }
  
  function refreshVariables ($profile :  UWAuthorityProfile) : void {
    __widgetOf(this, pcf.UWAuthorityProfileDetailScreen, SECTION_WIDGET_CLASS).setVariables(true, {$profile})
  }
  
  
}