package gw.exportimport

uses gw.api.locale.DisplayKey
uses java.io.ByteArrayInputStream
uses java.util.Date
uses java.text.SimpleDateFormat
uses gw.api.web.util.PCWebFileUtil

@Export
class ExcelFileWriter {
  
  /**
   * Exports the excel file to the client. Renders the whole file in memory first.
   *
   * @param workbook The workbook that is to be saved
   */
  static function saveExcelFile(workbook : byte[], data : ExportData< KeyableBean >, template : boolean) {
    var inputStream = new ByteArrayInputStream(workbook)
    var fileName = constructFileName(data, template)
    PCWebFileUtil.copyStreamToClient("application/vnd.ms-excel", fileName, inputStream, workbook.Count)
  }
  
  static internal function constructFileName(data : ExportData< KeyableBean >, template : boolean) : String {
    var dateFormat = new SimpleDateFormat("yyyyMMdd-HHmm")
    var timeStamp = dateFormat.format(Date.CurrentDate)
    var entityType = data.FileNameVariables.get(ExportImportConstants.ENTITY_TYPE_FILENAME_VARIABLE)
    var fileSuffix = entityType + "_" + timeStamp

    var jobTypeName = data.FileNameVariables.get(ExportImportConstants.JOB_TYPE_FILENAME_VARIABLE)
    var jobID = data.FileNameVariables.get(ExportImportConstants.JOB_NUMBER_FILENAME_VARIABLE)
    var policyId = data.FileNameVariables.get(ExportImportConstants.POLICY_NUMBER_FILENAME_VARIABLE)
  
    var fileName : String
    if (template) {
      fileName = DisplayKey.get("Web.ExcelExport.FileName.Template") + "_" + fileSuffix
    } else if (policyId != null) {
      fileName = DisplayKey.get("Web.ExcelExport.FileName.Policy") + "_" + policyId + "_"+ jobTypeName + "_" + jobID + "_" + fileSuffix
    } else {
      fileName = jobTypeName + "_" + jobID + "_" + fileSuffix
    }
    return filterInvalidFilenameCharacters(fileName + ".xlsx")
  }

  static internal function filterInvalidFilenameCharacters(filename: String): String {
    return filename.replaceAll("[:\\\\/*?|<>\" ']", "_")
  }

}
