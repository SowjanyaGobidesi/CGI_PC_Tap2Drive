package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/ValueProviderArgumentsInputSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ValueProviderArgumentsInputSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($valueProviderProxy :  gw.rating.rtm.valueprovider.CustomValueProviderData, $advancedEdit :  boolean, $columnDefinition :  RateTableColumn) : void {
    __widgetOf(this, pcf.ValueProviderArgumentsInputSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$valueProviderProxy, $advancedEdit, $columnDefinition})
  }
  
  function refreshVariables ($valueProviderProxy :  gw.rating.rtm.valueprovider.CustomValueProviderData, $advancedEdit :  boolean, $columnDefinition :  RateTableColumn) : void {
    __widgetOf(this, pcf.ValueProviderArgumentsInputSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$valueProviderProxy, $advancedEdit, $columnDefinition})
  }
  
  
}