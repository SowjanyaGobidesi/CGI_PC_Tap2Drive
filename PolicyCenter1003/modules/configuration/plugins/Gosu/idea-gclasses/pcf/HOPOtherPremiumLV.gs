package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPOtherPremiumLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPOtherPremiumLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($line :  HOPLine) : void {
    __widgetOf(this, pcf.HOPOtherPremiumLV, SECTION_WIDGET_CLASS).setVariables(false, {$line})
  }
  
  function refreshVariables ($line :  HOPLine) : void {
    __widgetOf(this, pcf.HOPOtherPremiumLV, SECTION_WIDGET_CLASS).setVariables(true, {$line})
  }
  
  
}