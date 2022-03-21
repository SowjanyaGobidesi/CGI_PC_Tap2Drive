package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/overview/LocationsListViewTile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LocationsListViewTile extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account) : void {
    __widgetOf(this, pcf.LocationsListViewTile, SECTION_WIDGET_CLASS).setVariables(false, {$account})
  }
  
  function refreshVariables ($account :  Account) : void {
    __widgetOf(this, pcf.LocationsListViewTile, SECTION_WIDGET_CLASS).setVariables(true, {$account})
  }
  
  
}