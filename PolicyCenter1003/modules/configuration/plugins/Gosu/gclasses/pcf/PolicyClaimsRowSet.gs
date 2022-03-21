package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/summary/PolicyClaimsRowSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyClaimsRowSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($claimHelper :  gw.api.web.dashboard.ui.claims.ClaimHelper) : void {
    __widgetOf(this, pcf.PolicyClaimsRowSet, SECTION_WIDGET_CLASS).setVariables(false, {$claimHelper})
  }
  
  function refreshVariables ($claimHelper :  gw.api.web.dashboard.ui.claims.ClaimHelper) : void {
    __widgetOf(this, pcf.PolicyClaimsRowSet, SECTION_WIDGET_CLASS).setVariables(true, {$claimHelper})
  }
  
  
}