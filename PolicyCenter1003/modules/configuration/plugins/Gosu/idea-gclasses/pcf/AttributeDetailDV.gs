package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/AttributeDetailDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AttributeDetailDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($attribute :  Attribute) : void {
    __widgetOf(this, pcf.AttributeDetailDV, SECTION_WIDGET_CLASS).setVariables(false, {$attribute})
  }
  
  function refreshVariables ($attribute :  Attribute) : void {
    __widgetOf(this, pcf.AttributeDetailDV, SECTION_WIDGET_CLASS).setVariables(true, {$attribute})
  }
  
  
}