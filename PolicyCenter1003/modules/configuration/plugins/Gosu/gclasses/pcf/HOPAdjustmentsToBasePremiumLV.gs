package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPAdjustmentsToBasePremiumLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPAdjustmentsToBasePremiumLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($line :  HOPLine) : void {
    __widgetOf(this, pcf.HOPAdjustmentsToBasePremiumLV, SECTION_WIDGET_CLASS).setVariables(false, {$line})
  }
  
  function refreshVariables ($line :  HOPLine) : void {
    __widgetOf(this, pcf.HOPAdjustmentsToBasePremiumLV, SECTION_WIDGET_CLASS).setVariables(true, {$line})
  }
  
  
}