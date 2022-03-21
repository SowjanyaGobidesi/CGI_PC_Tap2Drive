package gw.integration.document.production.web

uses gw.api.util.DateUtil
uses gw.document.DocumentProduction
uses gw.pl.util.ArgCheck
uses gw.plugin.document.IDocumentTemplateDescriptor
uses gw.plugin.document.IDocumentTemplateSource
uses pcf.CreateDraftWorksheet
uses pcf.EditDraftWorksheet
uses pcf.TemplateSelectionWorksheet
uses pcf.api.Location

/**
 * UI helper functions for the Document Production UI
 */
@Export
class DocumentProductionUIHelper {

  static var MAX_NUMBER_RESULT = 1000

  private static function closeWorksheet(location: Location) {
    gw.api.web.workspace.WorkspaceUtil.closeWorksheetIfActiveAndRefreshTop(location)
  }

  /**
   * Opens CreateDraftWorksheet in the workspace
   *
   * @param currentLocation current pcf
   * @param info            info about document to be created
   * @param template        document template descriptor
   */
  static function goInCreateDraftWorksheet(currentLocation: TemplateSelectionWorksheet,
                                           info: DocumentProductionInfo,
                                           template: IDocumentTemplateDescriptor): Location {
    closeWorksheet(currentLocation)
    info.Template = template
    info.Name = template.Name
    return CreateDraftWorksheet.goInWorkspace(info)
  }

  /**
   * Retrieves up to {@link #MAX_NUMBER_RESULT} document templates
   */
  static property get DocumentTemplates(): IDocumentTemplateDescriptor[] {
    return gw.plugin.Plugins.get(IDocumentTemplateSource).getDocumentTemplates(DateUtil.currentDate(), {}, MAX_NUMBER_RESULT)
  }

  /**
   * Goes from "Create Draft" to "Edit Draft" step by opening next worksheet.
   *
   * @param currentLocation current location
   * @param info            info about document to be created
   * @return
   */
  static function goInDraftEditWorksheet(currentLocation: CreateDraftWorksheet,
                                         info: DocumentProductionInfo): Location {
    closeWorksheet(currentLocation)
    return EditDraftWorksheet.goInWorkspace(info)
  }

  /**
   * Completes document creation: closes dialog and attaches link to newly
   * created file.
   *
   * @param currentLocation current worksheet
   * @param info            info about document to be created
   * @param draftDocument   content of the interactive editor
   */
  static function finalizeDocument(currentLocation: EditDraftWorksheet,
                                   info: DocumentProductionInfo,
                                   document: Document) {
    DocumentProduction.createAndStoreDocumentSynchronously(info.Template, null, document)
    currentLocation.commit()
    closeWorksheet(currentLocation)
  }
}