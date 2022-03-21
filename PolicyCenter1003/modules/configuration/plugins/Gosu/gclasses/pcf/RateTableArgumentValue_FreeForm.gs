package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateTableArgumentValue.FreeForm.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableArgumentValue_FreeForm extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rateTableArgSrcHelper :  gw.pcf.rating.rtm.RateTableArgumentSourceHelper) : void {
    __widgetOf(this, pcf.RateTableArgumentValue_FreeForm, SECTION_WIDGET_CLASS).setVariables(false, {$rateTableArgSrcHelper})
  }
  
  function refreshVariables ($rateTableArgSrcHelper :  gw.pcf.rating.rtm.RateTableArgumentSourceHelper) : void {
    __widgetOf(this, pcf.RateTableArgumentValue_FreeForm, SECTION_WIDGET_CLASS).setVariables(true, {$rateTableArgSrcHelper})
  }
  
  
}