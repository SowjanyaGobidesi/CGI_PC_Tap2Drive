package gw.document

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.api.web.WebFile
uses gw.plugin.Plugins
uses gw.plugin.document.IDocumentContentSource
uses org.apache.commons.lang3.StringUtils

@Export
enhancement DocumentEnhancement: Document {

  /**
   * Upload content changes to this document.
   * @param webFile with content changes
   */
  public function uploadFileFromBrowser(webFile : WebFile) {
    var _dmsPlugin = Plugins.get(IDocumentContentSource)
    try {
      _dmsPlugin.updateDocument(this, webFile.InputStream)
    } catch (e : Throwable) {
      PCLoggerCategory.DOCUMENT.info("UploadContent for doc=" + this.getID() + " [" + this.PublicID + "] caught unexpected exception", e)
      throw new DisplayableException(DisplayKey.get("Document.UploadFailure"), e)
    }
  }

  /**
   * Validates that the new file MimeType correspond to the original Document MimeType
   * @param webFile with content changes
   * @throws DisplayableException when the new file type is not compatible with the original file type
   */
  public function validateCompatibleMimeType(webFile: WebFile) {
    if (this.MimeType != webFile.MIMEType) {
      throw new DisplayableException(DisplayKey.get("Web.Policy.Documents.Document.UpdateDocument.UpdateContent.IncorrectMimeType", getMimeTypeLabel(webFile.getMIMEType()), getMimeTypeLabel(this.getMimeType())))
    }
  }

  /**
   * Checks whether this document has content in the DMS to be displayed
   * @return if the document has content
   */
  property get ContentExist() : boolean {
    var dmsPlugin = Plugins.get("IDocumentContentSource") as IDocumentContentSource
    return dmsPlugin.isDocument(this);
  }

  /**
   * List of mimetypes configured in the mimetypemapping in config.xml. If the current
   * Document's MimeType is not mapped, the MimeType is added to the list and a message
   * is logged.
   * @return list of mimetypemapping's mimetypes
   */
  property get MimeTypeList() : java.util.List {
    var documentMimeType = this.getMimeType()
    var originalList = gw.document.DocumentsUtilBase.getMimeTypes().copy()
    if (documentMimeType != null and not originalList.contains(documentMimeType)) {
      PCLoggerCategory.DOCUMENT.info("The uploaded document has a Mime Type '" + documentMimeType + "' that is not configured in the application. Please add the Mime Type to the mimetypemapping in the config.xml")
      originalList.add(documentMimeType)
    }
    return originalList

  }

  /**
   * Return the description of the MimeType of the selected document. This is based on the
   * mimetypemapping's mimetype in the config.xml. If there is not a match, the MimeType is
   * returned instead.
   * @param documentMimeType Document's MimeType
   * @return the Document's MimeType description, if any. Document's MimeType otherwise.
   */
  function getMimeTypeLabel(documentMimeType: String) : String {
    var configuredMimeTypeLabel = gw.document.DocumentsUtilBase.getMimeTypeDescription(documentMimeType)
    if (configuredMimeTypeLabel == null) {
      configuredMimeTypeLabel = documentMimeType
    }
    return configuredMimeTypeLabel
  }

  /**
   * Validates whether the Document's MimeType is registered in the config.xml under the mimetypemapping
   * and has file extensions defined.
   * @return whether the Document's MimeType is allowed for viewing
   */
  property get DocumentMimeTypeAllowed() : boolean {
    var documentMimeType = this.getMimeType()
    if (documentMimeType != null) {
      return DocumentsUtilBase.getMimeTypes().contains(this.getMimeType())
          and StringUtils.isNotEmpty(DocumentsUtilBase.getFileExtensionForMimeType(documentMimeType))
    }
    return false
  }
}

