package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/search/AdminProducerCodeSearchLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdminProducerCodeSearchLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($producerCodes :  gw.api.database.IQueryBeanResult<ProducerCode>, $carrier :  Organization, $filter :  java.util.Set, $havingRoles :  boolean) : void {
    __widgetOf(this, pcf.AdminProducerCodeSearchLV, SECTION_WIDGET_CLASS).setVariables(false, {$producerCodes, $carrier, $filter, $havingRoles})
  }
  
  function refreshVariables ($producerCodes :  gw.api.database.IQueryBeanResult<ProducerCode>, $carrier :  Organization, $filter :  java.util.Set, $havingRoles :  boolean) : void {
    __widgetOf(this, pcf.AdminProducerCodeSearchLV, SECTION_WIDGET_CLASS).setVariables(true, {$producerCodes, $carrier, $filter, $havingRoles})
  }
  
  
}