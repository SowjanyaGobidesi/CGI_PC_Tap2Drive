package gw.processes

uses gw.processes.BatchProcessBase
uses java.util.Date
uses gw.api.admin.MessagingUtil
uses java.lang.Integer
uses gw.api.system.PCConfigParameters
uses gw.api.upgrade.Coercions

/**
 * Purges the MessageHistory by deleting the completed messages where the sendtime is before given date.
 */
@Export
class PurgeMessageHistory extends BatchProcessBase {

  var _ageInDays : int
  
  construct() {
    this({PCConfigParameters.KeepCompletedMessagesForDays.Value})
  }
  
  construct(arguments : Object[]) {
    super(BatchProcessType.TC_PURGEMESSAGEHISTORY)
    if (arguments.length == 1 and arguments[0] typeis Integer) {
      _ageInDays = Coercions.makeIntFrom(arguments[0])
    } else {
      _ageInDays = PCConfigParameters.KeepCompletedMessagesForDays.Value
    }
  }

  override function doWork() {
    var before = Date.CurrentDate.addDays(-_ageInDays)
    MessagingUtil.removeMessageHistory(before)
  }

}
