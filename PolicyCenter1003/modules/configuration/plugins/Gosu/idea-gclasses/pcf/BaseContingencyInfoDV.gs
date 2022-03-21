package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/BaseContingencyInfoDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BaseContingencyInfoDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contingency :  entity.Contingency) : void {
    __widgetOf(this, pcf.BaseContingencyInfoDV, SECTION_WIDGET_CLASS).setVariables(false, {$contingency})
  }
  
  function refreshVariables ($contingency :  entity.Contingency) : void {
    __widgetOf(this, pcf.BaseContingencyInfoDV, SECTION_WIDGET_CLASS).setVariables(true, {$contingency})
  }
  
  
}