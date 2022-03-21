package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/summary/MyActivitiesListViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MyActivitiesListViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter () : void {
    __widgetOf(this, pcf.MyActivitiesListViewTile, SECTION_WIDGET_CLASS).setVariables(false, {})
  }
  
  function refreshVariables () : void {
    __widgetOf(this, pcf.MyActivitiesListViewTile, SECTION_WIDGET_CLASS).setVariables(true, {})
  }
  
  
}