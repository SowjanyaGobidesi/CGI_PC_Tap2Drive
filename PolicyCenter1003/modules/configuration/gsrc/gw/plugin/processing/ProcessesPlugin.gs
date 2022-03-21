package gw.plugin.processing

uses gw.integration.document.production.bulk.BulkSubmission
uses gw.processes.BatchProcess
uses gw.processes.PolicyRenewalClearCheckDate
uses gw.processes.SolrDataImportBatchProcess

@Export
class ProcessesPlugin implements IProcessesPlugin {

  construct() {
  }

  override function createBatchProcess(type : BatchProcessType, arguments : Object[]) : BatchProcess {
    switch(type) {
      case BatchProcessType.TC_POLICYRENEWALCLEARCHECKDATE:
        return new PolicyRenewalClearCheckDate()
      case BatchProcessType.TC_SOLRDATAIMPORT:
        return new SolrDataImportBatchProcess()
      case BatchProcessType.TC_BULKSUBMISSION:
        return new BulkSubmission()
      default:
        return null
    }
  }

}
