package gw.job
uses java.util.Date

@Export
class RenewalProcessTimeoutHandler {
  
  public static var STANDARD_INSTANCE : RenewalProcessTimeoutHandler = new RenewalProcessTimeoutHandler()
  
  function startAutomatedRenewal(branch : PolicyPeriod) {
    branch.startWorkflowAsynchronously(TC_STARTRENEWALWF)  
  }
  
  function scheduleTimeoutOperation(branch : PolicyPeriod, timeoutDate : Date, 
        callbackName : String, isRenewalOffer : boolean) {
    var workflow = branch.createActiveWorkflow( TC_RENEWALTIMEOUTWF ) as RenewalTimeoutWF
    workflow.FunctionToCall = callbackName
    workflow.WakeupTime = timeoutDate
    workflow.RenewalOffer = isRenewalOffer
    workflow.start()
  }

}
