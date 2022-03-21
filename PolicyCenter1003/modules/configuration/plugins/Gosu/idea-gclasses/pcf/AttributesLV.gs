package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/AttributesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AttributesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($attributes :  gw.api.database.IQueryBeanResult<Attribute>) : void {
    __widgetOf(this, pcf.AttributesLV, SECTION_WIDGET_CLASS).setVariables(false, {$attributes})
  }
  
  function refreshVariables ($attributes :  gw.api.database.IQueryBeanResult<Attribute>) : void {
    __widgetOf(this, pcf.AttributesLV, SECTION_WIDGET_CLASS).setVariables(true, {$attributes})
  }
  
  
}