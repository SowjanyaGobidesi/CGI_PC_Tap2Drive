package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/loadandvacation/LoadFactorDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LoadFactorDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($group :  Group) : void {
    __widgetOf(this, pcf.LoadFactorDV, SECTION_WIDGET_CLASS).setVariables(false, {$group})
  }
  
  function refreshVariables ($group :  Group) : void {
    __widgetOf(this, pcf.LoadFactorDV, SECTION_WIDGET_CLASS).setVariables(true, {$group})
  }
  
  
}