package gw.command.critical

uses gw.api.web.tools.BatchProcessInfoPage
uses gw.command.Argument
uses gw.command.BaseCommand
uses gw.command.DefaultMethod
uses gw.command.OpenPopup

@Export
@DefaultMethod("wCode")
class BatchProcess extends BaseCommand
{
  @OpenPopup
  @Argument("process", BatchProcessType.getTypeKeys( false )*.Code)
  function wCode() : String {
    var code = getArgumentAsString("process")
    run(BatchProcessType.get( code ))
    return "Batch process run: " + code
  }

  function wAuditTask(){
    run(BatchProcessType.TC_AUDITTASK)
  }
  
  function wWorkflow(){
    run(BatchProcessType.TC_WORKFLOW)
  }

  function wJobExpire(){
    run(BatchProcessType.TC_JOBEXPIRE)
  }

  private function run(type : BatchProcessType){
    var batchProcess = new gw.api.tools.BatchProcess(type)
    new BatchProcessInfoPage().start( batchProcess )
  }
}
