package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/prerenewal/PreRenewalNotesPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PreRenewalNotesPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, topic :  NoteTopicType, asOfDate :  java.util.Date) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PreRenewalNotesPage, {policyPeriod, topic, asOfDate}, 0)
  }
  
  static function drilldown (policyPeriod :  PolicyPeriod, topic :  NoteTopicType, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PreRenewalNotesPage, {policyPeriod, topic, asOfDate}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (policyPeriod :  PolicyPeriod, topic :  NoteTopicType, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PreRenewalNotesPage, {policyPeriod, topic, asOfDate}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (policyPeriod :  PolicyPeriod, topic :  NoteTopicType, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PreRenewalNotesPage, {policyPeriod, topic, asOfDate}, 0).goInMain()
  }
  
  static function printPage (policyPeriod :  PolicyPeriod, topic :  NoteTopicType, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PreRenewalNotesPage, {policyPeriod, topic, asOfDate}, 0).printPage()
  }
  
  static function push (policyPeriod :  PolicyPeriod, topic :  NoteTopicType, asOfDate :  java.util.Date) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PreRenewalNotesPage, {policyPeriod, topic, asOfDate}, 0).push()
  }
  
  
}