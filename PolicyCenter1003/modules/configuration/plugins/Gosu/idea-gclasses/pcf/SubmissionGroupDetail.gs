package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/renmgr/SubmissionGroupDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionGroupDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (submissionGroup :  SubmissionGroup) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.SubmissionGroupDetail, {submissionGroup}, 0)
  }
  
  static function drilldown (submissionGroup :  SubmissionGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SubmissionGroupDetail, {submissionGroup}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (submissionGroup :  SubmissionGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SubmissionGroupDetail, {submissionGroup}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (submissionGroup :  SubmissionGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SubmissionGroupDetail, {submissionGroup}, 0).goInMain()
  }
  
  static function printPage (submissionGroup :  SubmissionGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SubmissionGroupDetail, {submissionGroup}, 0).printPage()
  }
  
  static function push (submissionGroup :  SubmissionGroup) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SubmissionGroupDetail, {submissionGroup}, 0).push()
  }
  
  
}