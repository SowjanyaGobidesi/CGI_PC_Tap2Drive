package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/Tap2DriveRecordsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Tap2DriveRecordsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyDriver :  PolicyDriver, $tap2DriveRecord :  Tap2DriveRecord_Ext) : void {
    __widgetOf(this, pcf.Tap2DriveRecordsDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyDriver, $tap2DriveRecord})
  }
  
  function refreshVariables ($policyDriver :  PolicyDriver, $tap2DriveRecord :  Tap2DriveRecord_Ext) : void {
    __widgetOf(this, pcf.Tap2DriveRecordsDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyDriver, $tap2DriveRecord})
  }
  
  
}