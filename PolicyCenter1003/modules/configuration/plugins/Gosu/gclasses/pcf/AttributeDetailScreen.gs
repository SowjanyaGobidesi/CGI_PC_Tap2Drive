package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/AttributeDetailScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AttributeDetailScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($attribute :  Attribute) : void {
    __widgetOf(this, pcf.AttributeDetailScreen, SECTION_WIDGET_CLASS).setVariables(false, {$attribute})
  }
  
  function refreshVariables ($attribute :  Attribute) : void {
    __widgetOf(this, pcf.AttributeDetailScreen, SECTION_WIDGET_CLASS).setVariables(true, {$attribute})
  }
  
  
}