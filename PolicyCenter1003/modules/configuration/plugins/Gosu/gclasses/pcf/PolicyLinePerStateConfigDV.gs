package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/PolicyLinePerStateConfigDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyLinePerStateConfigDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($wcLine :  WorkersCompLine, $jurisdiction :  WCJurisdiction) : void {
    __widgetOf(this, pcf.PolicyLinePerStateConfigDV, SECTION_WIDGET_CLASS).setVariables(false, {$wcLine, $jurisdiction})
  }
  
  function refreshVariables ($wcLine :  WorkersCompLine, $jurisdiction :  WCJurisdiction) : void {
    __widgetOf(this, pcf.PolicyLinePerStateConfigDV, SECTION_WIDGET_CLASS).setVariables(true, {$wcLine, $jurisdiction})
  }
  
  
}