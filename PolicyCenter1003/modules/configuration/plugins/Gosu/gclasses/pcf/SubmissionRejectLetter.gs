package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/submgr/SubmissionRejectLetter.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionRejectLetter extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (letterType :  LetterType, account :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.SubmissionRejectLetter, {letterType, account}, 0)
  }
  
  static function drilldown (letterType :  LetterType, account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SubmissionRejectLetter, {letterType, account}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (letterType :  LetterType, account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SubmissionRejectLetter, {letterType, account}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (letterType :  LetterType, account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SubmissionRejectLetter, {letterType, account}, 0).goInMain()
  }
  
  static function printPage (letterType :  LetterType, account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SubmissionRejectLetter, {letterType, account}, 0).printPage()
  }
  
  static function push (letterType :  LetterType, account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.SubmissionRejectLetter, {letterType, account}, 0).push()
  }
  
  
}