package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RatingParameterSetScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RatingParameterSetScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter () : void {
    __widgetOf(this, pcf.RatingParameterSetScreen, SECTION_WIDGET_CLASS).setVariables(false, {})
  }
  
  function refreshVariables () : void {
    __widgetOf(this, pcf.RatingParameterSetScreen, SECTION_WIDGET_CLASS).setVariables(true, {})
  }
  
  
}