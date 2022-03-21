package gw.integration.document.production.smartcomms.api

uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException
uses gw.integration.document.production.smartcomms.SmartCommsConfigurationProvider
uses gw.integration.document.production.smartcomms.client.SmartCommsRestClient
uses gw.integration.document.production.smartcomms.dto.GenerateDocumentResponse
uses gw.integration.document.production.smartcomms.dto.document.DocumentRequest
uses gw.integration.document.production.smartcomms.dto.draft.DraftResponse
uses gw.integration.document.production.smartcomms.dto.draft.FinalizeDraftRequest
uses gw.integration.document.production.smartcomms.exception.SmartCommsException
uses gw.plugin.document.production.dto.DocumentContent
uses org.apache.http.Consts
uses org.apache.http.message.BasicNameValuePair
uses org.apache.log4j.Logger

uses java.lang.invoke.MethodHandles

/**
 * The Smart Communications Job API for
 * - generating Draft Document
 * - generating finalized Documents files
 */
@Export
class SmartCommsJobAPI {
  static final var GENERATE_DRAFT = "/generateDraft"
  static final var FINALIZE_DRAFT = "/finalizeDraft"
  static final var GENERATE_DOCUMENT = "/generateDocument"
  static final var INCLUDE_DOCUMENT_DATA_QUERY_PARAM = "includeDocumentData"
  // Note: according to API doc message type is one of
  // 'info', 'warn', or 'error' but in reality:
  static final var ERROR_MESSAGE_TYPE = "E"
  static final var LOGGER = Logger.getLogger(MethodHandles.lookup().lookupClass())

  var _smartClient: SmartCommsRestClient

  construct(client: SmartCommsRestClient) {
    _smartClient = client
  }

  /**
   * Calls the configured document production system to create a draft document
   *
   * @param templateSelectorID Template Selector ResourceId
   * @param transactionData    The InsuranceSuite Claim/Policy/Account data to be embedded in the draft document
   * @return DraftResponse object
   */
  function createDraft(templateSelectorID: String, transactionData: String): DraftResponse {
    var draftRequest = new DocumentRequest()
    draftRequest.BatchConfigResId = templateSelectorID
    draftRequest.TransactionData = Base64.getEncoder().encodeToString(transactionData.getBytes(Consts.UTF_8.name()))
    var draftResponse = _smartClient.post(draftRequest, getPath(GENERATE_DRAFT), {}, DraftResponse)
    verifyDraftResponse(draftResponse)
    return draftResponse
  }

  /**
   * Invokes 'finalizeDraft' API method and returns content.
   *
   * @param draftContent content of interactive editor
   * @return {@link DocumentLink} with data to download and create a file.
   */
  function finalizeDraft(draftContent: String): DocumentContent {
    var req = new FinalizeDraftRequest()
    req.ReviewCaseData = toBase64(draftContent)
    var res = _smartClient.post(req, getPath(FINALIZE_DRAFT), {
        new BasicNameValuePair(INCLUDE_DOCUMENT_DATA_QUERY_PARAM, 'true')
    }, GenerateDocumentResponse)
    return retrieveDocumentContentFromGenerateDocumentResponse(res)
  }

  /**
   * Invokes 'generateDocument' API method and returns the content
   *
   * @param templateSelectorID Template Selector ResourceId
   * @param transactionData    The InsuranceSuite Claim/Policy/Account data to be embedded in the document
   * @return {@link DocumentContent} Content
   */
  function generateDocument(templateSelectorID: String, transactionData: String): DocumentContent {
    var documentRequest = new DocumentRequest()
    documentRequest.BatchConfigResId = templateSelectorID
    documentRequest.TransactionData = toBase64(transactionData)
    var res = _smartClient.post(documentRequest, getPath(GENERATE_DOCUMENT), {
        new BasicNameValuePair(INCLUDE_DOCUMENT_DATA_QUERY_PARAM, 'true')
    }, GenerateDocumentResponse)
    return retrieveDocumentContentFromGenerateDocumentResponse(res)
  }

  private function toBase64(value: String): String {
    return Base64.getEncoder().encodeToString(value.getBytes(Consts.UTF_8.name()))
  }

  private function fromBase64(value: String): byte[] {
    return Base64.getDecoder().decode(value)
  }

  /**
   * Verify if response contains no errors, otherwise throws.
   *
   * @param response API response
   */
  private function verifyGenerateDocumentResponse(response: GenerateDocumentResponse) {
    if (LOGGER.WarnEnabled) {
      for (ex in response.Exceptions) {
        LOGGER.warn(ex.toString())
      }
    }
    if (LOGGER.InfoEnabled) {
      for (message in response.JobMessages) {
        LOGGER.info(message.toString())
      }
    }
    var exceptionMessage = new StringBuilder();
    if (response.Exceptions != null) {
      var exceptions = response.Exceptions
          .map(\e -> e.toString())
          .join('\n')
      if (!exceptions.Empty) {
        exceptionMessage.append('User exceptions:\n' + exceptions + '\n')
      }
    }
    if (response.JobMessages != null) {
      var errors = response.JobMessages
          .where(\e -> e.MsgType == ERROR_MESSAGE_TYPE)
          .map(\e -> e.toString())
          .join('\n')
      if (!errors.Empty) {
        exceptionMessage.append('Job errors:\n' + errors + '\n')
      }
    }

    if (!(exceptionMessage.isEmpty())) {
      throw new SmartCommsException(exceptionMessage.toString())
    }
  }

  /**
   * Verify if response contains no errors, otherwise throws.
   *
   * @param response API response
   */
  private function verifyDraftResponse(response: DraftResponse) {
    if (LOGGER.WarnEnabled) {
      for (ex in response.ReviewCaseExceptions) {
        LOGGER.warn(ex.toString())
      }
    }
    if (LOGGER.InfoEnabled) {
      for (message in response.JobMessages) {
        LOGGER.info(message.toString())
      }
    }
    var exceptionMessage = new StringBuilder();
    if (response.ReviewCaseExceptions != null) {
      var exceptions = response.ReviewCaseExceptions
          .map(\e -> e.toString())
          .join('\n')
      if (!exceptions.Empty) {
        exceptionMessage.append('User exceptions:\n' + exceptions + '\n')
      }
    }
    if (response.JobMessages != null) {
      var errors = response.JobMessages
          .where(\e -> e.MsgType == ERROR_MESSAGE_TYPE)
          .map(\e -> e.toString())
          .join('\n')
      if (!errors.Empty) {
        exceptionMessage.append('Job errors:\n' + errors + '\n')
      }
    }

    if (!(exceptionMessage.isEmpty())) {
      throw new SmartCommsException(exceptionMessage.toString())
    }
  }

  /**
   * Expands path to resource of this API.
   *
   * @param part e.g. '/generateDraft'
   * @return URL
   */
  private function getPath(part: String): String {
    return SmartCommsConfigurationProvider.Configuration.JobServiceURL + part
  }

  /**
   * Does some checks on the API response and returns a DocumentLink
   *
   * @param res API Response
   * @return URL
   */
  private function retrieveDocumentContentFromGenerateDocumentResponse(res: GenerateDocumentResponse): DocumentContent {
    verifyGenerateDocumentResponse(res)
    if (res.Envelopes.size() != 1) {
       throw new DisplayableException(
           DisplayKey.get("Integration.Document.Production.SmartComms.RetrieveDocument.Error"))
    }
    var channel = res.Envelopes.first().MasterChannel
    return new DocumentContent(){
        :MimeType = channel.MimeType,
        :Data = fromBase64(channel.Data),
        :Name = channel.DocumentName
        }
  }
}