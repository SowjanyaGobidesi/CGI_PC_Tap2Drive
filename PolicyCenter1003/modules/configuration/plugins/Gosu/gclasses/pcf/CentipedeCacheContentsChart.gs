package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/infopages/CentipedeCacheContentsChart.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CentipedeCacheContentsChart extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contentsMap :  gw.util.Pair<java.lang.Integer, java.util.ArrayList<gw.util.Pair<java.lang.String, java.lang.Integer>>>) : void {
    __widgetOf(this, pcf.CentipedeCacheContentsChart, SECTION_WIDGET_CLASS).setVariables(false, {$contentsMap})
  }
  
  function refreshVariables ($contentsMap :  gw.util.Pair<java.lang.Integer, java.util.ArrayList<gw.util.Pair<java.lang.String, java.lang.Integer>>>) : void {
    __widgetOf(this, pcf.CentipedeCacheContentsChart, SECTION_WIDGET_CLASS).setVariables(true, {$contentsMap})
  }
  
  
}