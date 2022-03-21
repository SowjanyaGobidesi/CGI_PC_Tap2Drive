package gw.quoting

uses gw.plugin.quoting.QuoteData
uses gw.xml.XmlElement

/**
 * This class contains an XML representation of a quoting request and the associated costs from the quote.
 * It has the ID of the PolicyQuote persisted in the database.
 * @deprecated Please use QuoteKey instead.
 */
@Export
@gw.lang.Deprecated(:value="Use QuoteKey instead", :version="9.1.0")
class QuoteDataImpl implements QuoteData {

  var _policyQuoteID : Object as PolicyQuoteID
  var _policyPeriod : XmlElement as PolicyPeriod

}
