package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/policyholds/RegionSearchInputSet.CA.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RegionSearchInputSet_CA extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.api.admin.PCZoneSearchCriteria, $policyHold :  PolicyHold) : void {
    __widgetOf(this, pcf.RegionSearchInputSet_CA, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $policyHold})
  }
  
  function refreshVariables ($searchCriteria :  gw.api.admin.PCZoneSearchCriteria, $policyHold :  PolicyHold) : void {
    __widgetOf(this, pcf.RegionSearchInputSet_CA, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $policyHold})
  }
  
  
}