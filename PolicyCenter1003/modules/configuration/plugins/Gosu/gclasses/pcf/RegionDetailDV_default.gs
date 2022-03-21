package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/regions/RegionDetailDV.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RegionDetailDV_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($Region :  Region, $Country :  Country) : void {
    __widgetOf(this, pcf.RegionDetailDV_default, SECTION_WIDGET_CLASS).setVariables(false, {$Region, $Country})
  }
  
  function refreshVariables ($Region :  Region, $Country :  Country) : void {
    __widgetOf(this, pcf.RegionDetailDV_default, SECTION_WIDGET_CLASS).setVariables(true, {$Region, $Country})
  }
  
  
}