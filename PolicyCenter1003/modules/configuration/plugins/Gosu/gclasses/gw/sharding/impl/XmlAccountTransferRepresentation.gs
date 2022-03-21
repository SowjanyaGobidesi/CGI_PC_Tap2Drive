package gw.sharding.impl

uses gw.api.sharding.AccountTransferRepresentation

uses java.io.ByteArrayInputStream
uses java.io.InputStream
uses java.nio.charset.StandardCharsets

/**
 * A representation of an Account entity for transfer in XML form.
 */
@Export
class XmlAccountTransferRepresentation implements AccountTransferRepresentation {
  static final var ENCODING = StandardCharsets.UTF_8

  var _accountTransferContent : String
  var _accountTransferAdditionalInfo : String

  /**
   * Construct the transfer representation from a String of XML.
   * @param xmlContent the XML representation of the Account.
   * @param additionalInfo the additional information XML representation of the Account Transfer Graph
   */
  construct(xmlContent : String, additionalInfo : String) {
    _accountTransferContent = xmlContent
    _accountTransferAdditionalInfo = additionalInfo
  }

  override property get AccountTransferInputStream() : InputStream {
    return new ByteArrayInputStream(_accountTransferContent.getBytes(ENCODING))
  }

  override property get AdditionalInfoInputStream(): InputStream {
    if (_accountTransferAdditionalInfo != null) {
      return new ByteArrayInputStream(_accountTransferAdditionalInfo.getBytes(ENCODING))
    } else {
      return null
    }
  }
}