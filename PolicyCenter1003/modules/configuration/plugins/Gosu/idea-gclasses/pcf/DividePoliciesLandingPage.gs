package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/divide/DividePoliciesLandingPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DividePoliciesLandingPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (originalPeriod :  PolicyPeriod, firstSubmission :  Submission) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission}, 1)
  }
  
  static function createDestination (originalPeriod :  PolicyPeriod, firstSubmission :  Submission, secondSubmission :  Submission) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission, secondSubmission}, 0)
  }
  
  static function drilldown (originalPeriod :  PolicyPeriod, firstSubmission :  Submission) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission}, 1).drilldown()
  }
  
  static function drilldown (originalPeriod :  PolicyPeriod, firstSubmission :  Submission, secondSubmission :  Submission) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission, secondSubmission}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (originalPeriod :  PolicyPeriod, firstSubmission :  Submission) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (originalPeriod :  PolicyPeriod, firstSubmission :  Submission, secondSubmission :  Submission) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission, secondSubmission}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (originalPeriod :  PolicyPeriod, firstSubmission :  Submission) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (originalPeriod :  PolicyPeriod, firstSubmission :  Submission, secondSubmission :  Submission) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission, secondSubmission}, 0).goInMain()
  }
  
  static function printPage (originalPeriod :  PolicyPeriod, firstSubmission :  Submission) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission}, 1).printPage()
  }
  
  static function printPage (originalPeriod :  PolicyPeriod, firstSubmission :  Submission, secondSubmission :  Submission) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission, secondSubmission}, 0).printPage()
  }
  
  static function push (originalPeriod :  PolicyPeriod, firstSubmission :  Submission) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission}, 1).push()
  }
  
  static function push (originalPeriod :  PolicyPeriod, firstSubmission :  Submission, secondSubmission :  Submission) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DividePoliciesLandingPage, {originalPeriod, firstSubmission, secondSubmission}, 0).push()
  }
  
  
}