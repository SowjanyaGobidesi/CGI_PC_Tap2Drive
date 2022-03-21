package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/search/AdminProducerCodeSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdminProducerCodeSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($producer :  Organization, $filter :  java.util.Set, $havingRoles :  boolean, $shouldCache :  boolean) : void {
    __widgetOf(this, pcf.AdminProducerCodeSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {$producer, $filter, $havingRoles, $shouldCache})
  }
  
  function refreshVariables ($producer :  Organization, $filter :  java.util.Set, $havingRoles :  boolean, $shouldCache :  boolean) : void {
    __widgetOf(this, pcf.AdminProducerCodeSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {$producer, $filter, $havingRoles, $shouldCache})
  }
  
  
}