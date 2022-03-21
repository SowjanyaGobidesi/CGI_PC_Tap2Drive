package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/regions/RegionZonesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RegionZonesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($Region :  Region, $ZoneType :  ZoneType, $Country :  Country) : void {
    __widgetOf(this, pcf.RegionZonesLV, SECTION_WIDGET_CLASS).setVariables(false, {$Region, $ZoneType, $Country})
  }
  
  function refreshVariables ($Region :  Region, $ZoneType :  ZoneType, $Country :  Country) : void {
    __widgetOf(this, pcf.RegionZonesLV, SECTION_WIDGET_CLASS).setVariables(true, {$Region, $ZoneType, $Country})
  }
  
  
}