package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/ProducerCodeSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProducerCodeSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($producer :  Organization, $usedFor :  ProducerStatusUse, $checkUserSecurityZone :  boolean, $cacheEnabled :  boolean) : void {
    __widgetOf(this, pcf.ProducerCodeSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {$producer, $usedFor, $checkUserSecurityZone, $cacheEnabled})
  }
  
  function refreshVariables ($producer :  Organization, $usedFor :  ProducerStatusUse, $checkUserSecurityZone :  boolean, $cacheEnabled :  boolean) : void {
    __widgetOf(this, pcf.ProducerCodeSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {$producer, $usedFor, $checkUserSecurityZone, $cacheEnabled})
  }
  
  
}