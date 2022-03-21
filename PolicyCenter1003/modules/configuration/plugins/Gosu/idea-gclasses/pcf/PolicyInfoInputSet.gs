package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/PolicyInfoInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyInfoInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $showWrittenDate :  boolean, $showRewriteLinks :  boolean, $showSplitSource :  boolean) : void {
    __widgetOf(this, pcf.PolicyInfoInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $showWrittenDate, $showRewriteLinks, $showSplitSource})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $showWrittenDate :  boolean, $showRewriteLinks :  boolean, $showSplitSource :  boolean) : void {
    __widgetOf(this, pcf.PolicyInfoInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $showWrittenDate, $showRewriteLinks, $showSplitSource})
  }
  
  
}