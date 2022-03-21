package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/copydata/CopyPolicyDataSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CopyPolicyDataSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($destPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CopyPolicyDataSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {$destPeriod})
  }
  
  function refreshVariables ($destPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CopyPolicyDataSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {$destPeriod})
  }
  
  
}