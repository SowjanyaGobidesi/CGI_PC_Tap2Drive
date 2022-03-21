package gw.api.web.document;

uses gw.api.domain.linkedobject.LinkedObjectContainer
uses gw.document.BaseDocumentApplicationContext
uses gw.document.DocumentCreationInfo
uses gw.document.DocumentDetailsApplicationHelper
uses gw.document.DocumentsUtilBase
uses gw.plugin.Plugins
uses gw.plugin.document.IDocumentProduction
uses gw.plugin.document.IDocumentTemplateDescriptor

@Export
public class DocumentPCContext extends BaseDocumentApplicationContext {
  private var _documentContainer : LinkedObjectContainer
  private var _documentType : DocumentType
  private var _levels : LinkedObjectContainer[]
  private var _levelsVisible : boolean
  private var _pcfMode : String

  construct(pcfMode : String, documentContainer : LinkedObjectContainer, documentType : DocumentType, levels : LinkedObjectContainer[], levelsVisible : boolean) {
    _pcfMode = pcfMode
    if (documentContainer != null) {
      _documentContainer = documentContainer
    } else if (levels != null && levels.HasElements) {
      _documentContainer = levels.first()
    }
    _documentType = documentType
    _levels = levels
    _levelsVisible = levelsVisible
  }

  construct(documentContainer : LinkedObjectContainer, documentType : DocumentType, levels : LinkedObjectContainer[], levelsVisible : boolean) {
    this(null, documentContainer, documentType, levels, levelsVisible)
  }

  override function createDocumentCreationInfo(documentTemplateDescriptor: IDocumentTemplateDescriptor): DocumentCreationInfo {
    var dci = DocumentsHelper.createDocumentCreationInfo(_documentContainer, _documentType)
    if (documentTemplateDescriptor != null) {
      dci.setDocumentTemplateDescriptor(documentTemplateDescriptor);
    }
    return dci
  }

  override function createDocumentCreationInfo(): DocumentCreationInfo {
    return DocumentsHelper.createDocumentCreationInfo(_documentContainer, _documentType)
  }

  override function generateDocument(documentCreationInfo: DocumentCreationInfo) {
    var parameters = gw.api.web.document.DocumentsHelper.getDocumentCreationParameters(documentCreationInfo)
    var documentContentsInfo = Plugins.get(IDocumentProduction).
        createDocumentSynchronously(documentCreationInfo.DocumentTemplateDescriptor,
            parameters, documentCreationInfo.Document)
    DocumentsUtilBase.outputDocumentContents(documentCreationInfo, documentContentsInfo)
  }

  override function createDocumentDetailsHelper(documents : Document[]): DocumentDetailsApplicationHelper {
    return new DocumentMetadataPCHelper(_pcfMode, documents, _levels, _levelsVisible);
  }

  property get PCFMode() : String { return _pcfMode }

  property get GenerateLevels() : LinkedObjectContainer[] { return _levels }

  property get LevelsVisible() : boolean { return _levelsVisible }
}
