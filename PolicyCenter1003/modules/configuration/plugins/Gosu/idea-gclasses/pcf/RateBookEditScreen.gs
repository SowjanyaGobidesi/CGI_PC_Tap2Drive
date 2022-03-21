package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateBookEditScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateBookEditScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($rateBook :  RateBook, $isEdit :  Boolean, $currentCard :  gw.rating.rtm.util.RatingUIUtil.RateBookCardTabType) : void {
    __widgetOf(this, pcf.RateBookEditScreen, SECTION_WIDGET_CLASS).setVariables(false, {$rateBook, $isEdit, $currentCard})
  }
  
  function refreshVariables ($rateBook :  RateBook, $isEdit :  Boolean, $currentCard :  gw.rating.rtm.util.RatingUIUtil.RateBookCardTabType) : void {
    __widgetOf(this, pcf.RateBookEditScreen, SECTION_WIDGET_CLASS).setVariables(true, {$rateBook, $isEdit, $currentCard})
  }
  
  
}