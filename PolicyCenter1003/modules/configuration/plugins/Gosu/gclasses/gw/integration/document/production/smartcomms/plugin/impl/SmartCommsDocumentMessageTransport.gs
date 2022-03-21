package gw.integration.document.production.smartcomms.plugin.impl

uses gw.api.util.DateUtil
uses gw.integration.document.production.smartcomms.SmartCommsConfigurationProvider
uses gw.pl.util.FileUtil
uses gw.plugin.InitializablePlugin
uses gw.plugin.messaging.MessageTransport
uses org.apache.commons.io.IOUtils
uses org.slf4j.LoggerFactory

uses java.io.BufferedWriter
uses java.io.File
uses java.io.FileWriter
uses java.io.IOException
uses java.lang.invoke.MethodHandles

/**
 * Extract the message payload information from message object and creates the transaction file in SmartComms appliance input folder.
 * <p>
 * Later, SmartComms BatchProcess Job process all the files from SmartComms appliance input folder and creates documents in appliance output folder.
 */
@Export
class SmartCommsDocumentMessageTransport implements MessageTransport, InitializablePlugin {

  /**
   * Destination id
   */
  public static var DEST_ID: int = 70
  /**
   * Event Name
   */
  public static final var GENERATE_DOCUMENT_MSG: String = "GenerateDocument"
  /**
   * Logger object
   */
  static final var LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass())
  /**
   * Identifier for Max Retries
   */
  static var MAX_RETRIES_PARAM = "MaxRetries"
  /**
   * Default Max Retries
   */
  static var MAX_RETRIES_DEFAULT = 5
  /**
   * Identifier for retry interval
   */
  static var RETRY_SECONDS_PARAM = "RetrySeconds"
  /**
   * Default retry interval
   */
  static var RETRY_SECONDS_DEFAULT = 10
  /**
   * date format for appending in file name
   */
  static final var DATE_FORMAT = "yyyy-MM-dd-mm-ss-SS"
  /**
   * Max retries completed
   */
  var _maxRetries: int
  /**
   * Retry interval
   */
  var _retrySeconds: int
  /**
   * Transaction file extension
   */
  var _extension: String = ".xml"

  /**
   * Process a message to save the associated payload in a file at a target location.
   *
   * @param message            the message created from the event fired rules
   * @param transformedPayload the payload
   */
  override function send(message: Message, transformedPayload: String) {
    LOGGER.trace("Called send on Message with id: ${message.PublicID}")

    var document = message.MessageRoot as Document
    try {
      var fileName = writeTransactionFile(message)
      LOGGER.trace("The payload successfully saved at the target location : ${fileName}}")
      message.reportAck()
    } catch (e: IOException) {
      if (message.RetryCount < _maxRetries) {
        LOGGER.info("Retry requested for Document:${document.ID} '${document.Name}' and message id : ${message.ID}", e)
        message.reportError(DateUtil.currentDate().addSeconds(_retrySeconds))
      } else {
        LOGGER.info("Retry requested for Document:${document.ID} '${document.Name}' exceeding maxRetry - retry discarded.", e)
        message.reportError()
      }
    } catch (e: Exception) {
      LOGGER.info("Error processing Document:${document.ID} '${document.Name}'", e)
      message.reportError(ErrorCategory.TC_SYSTEM_ERROR)
    }
  }

  /**
   * Shuts down the plugin.
   */
  override function shutdown() {
    LOGGER.trace("Called shutdown()")
  }

  /**
   * Suspends the plugin.
   */
  override function suspend() {
    LOGGER.trace("Called suspend()")
  }

  /**
   * Resumes the plugin.
   */
  override function resume() {
    LOGGER.trace("Called resume()")
  }

  /**
   * Sets the destination id
   */
  override property set DestinationID(destinationID: int) {
    DEST_ID = destinationID
  }

  /**
   * Sets the messaging config parameters
   *
   * @param params Map of parameters from messaging-config.xml
   */
  override property set Parameters(params: Map<Object, Object>) {
    _maxRetries = parseAndSetInt(params, MAX_RETRIES_PARAM, MAX_RETRIES_DEFAULT)
    _retrySeconds = parseAndSetInt(params, RETRY_SECONDS_PARAM, RETRY_SECONDS_DEFAULT)
  }

  /**
   * Finds the parameter value and set to the local variables
   *
   * @param params       Map of parameters from messaging-config.xml
   * @param paramName    Parameter name in the messaging-config.xml
   * @param defaultValue Default value defined in the implementation
   * @return the value to be assigned
   */
  private function parseAndSetInt(params: Map<Object, Object>, paramName: String, defaultValue: int): int {
    var valueStr = params.get(paramName) as String
    if (valueStr.NotBlank) {
      return Integer.parseInt(valueStr)
    }
    return defaultValue
  }

  /**
   * Writes the transaction file at the target location
   *
   * @param message the message which contains the payload
   * @return the file name (not the fully qualified file name)
   * @throws throws IOException if any problem while writing a transaction file to disk
   */
  @Throws(IOException, "if any problem while writing a transaction file to disk")
  public function writeTransactionFile(message: Message): String {
    var currentDate = gw.api.util.DateUtil.currentDate().format(DATE_FORMAT)
    var fileName = '${SmartCommsConfigurationProvider.Configuration.ApplianceInputFolder}' + '/' + '${currentDate}' + '${_extension}'
    using(var writer = new BufferedWriter(FileUtil.getFileWriter(fileName))){
        IOUtils.write(message.Payload, writer)
    }
    return fileName
  }
}