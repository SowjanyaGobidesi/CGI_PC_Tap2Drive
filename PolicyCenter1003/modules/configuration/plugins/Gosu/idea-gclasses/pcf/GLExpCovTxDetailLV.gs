package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/gl/policy/GLExpCovTxDetailLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class GLExpCovTxDetailLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($locationTxs :  java.util.Set<GLTransaction>) : void {
    __widgetOf(this, pcf.GLExpCovTxDetailLV, SECTION_WIDGET_CLASS).setVariables(false, {$locationTxs})
  }
  
  function refreshVariables ($locationTxs :  java.util.Set<GLTransaction>) : void {
    __widgetOf(this, pcf.GLExpCovTxDetailLV, SECTION_WIDGET_CLASS).setVariables(true, {$locationTxs})
  }
  
  
}