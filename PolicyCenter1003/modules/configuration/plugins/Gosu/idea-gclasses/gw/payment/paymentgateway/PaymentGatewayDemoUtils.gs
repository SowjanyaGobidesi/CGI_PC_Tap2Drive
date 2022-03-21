package gw.payment.paymentgateway

uses gw.api.address.AddressFormatter
uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException
uses gw.payment.paymentgateway.impl.DemoCreditCardDetails
uses gw.plugin.Plugins
uses gw.plugin.paymentgateway.PaymentGatewayPlugin
uses org.apache.commons.lang.StringUtils
uses pcf.DemoTransactionConfirmationPage
uses pcf.api.Location

uses java.math.BigDecimal
uses java.math.BigInteger
uses java.security.SecureRandom
uses java.util.ArrayList
uses java.util.Calendar

/**
 * Utility methods for demo payment gateway.
 */
@Export
class PaymentGatewayDemoUtils {

  private static final var TRANSACTION_USER = "su"

  private static final var CARD_NUMBER_VALID_LENGTH = 16

  /**
   * Method that constructs string representation of address.
   * @param addressLine1 first line of address
   * @param addressLine2 2nd line of address
   * @param country country
   * @return string representation
   */
  public static function getAddressToDisplay(addressLine1 : String, addressLine2 : String, country : Country) : String {
    var formatter = new AddressFormatter() {
        : IncludeCountry = true,
        : AddressLine1 = addressLine1,
        : AddressLine2 = addressLine2,
        : Country = country
    }
    return formatter.format(formatter, ", ")
  }

  /**
   * Gets years range for credit card expiry.
   * @return list of valid years
   */
  public static function getExpiryYears() : List<String> {
    var years = new ArrayList<String>()
    var currentYear = Calendar.getInstance().CalendarYear
    for (i in currentYear..(currentYear + 20)) {
      years.add(String.valueOf(i))
    }
    return years
  }

  /**
   * Generates random reference transaction number.
   * @return reference number
   */
  public static function getTransactionReference() : String {
    var random = new SecureRandom()
    return new BigInteger(60, random).toString(16).toUpperCase()
  }

  /**
   * Validates card number and mandatory fields.
   * @param cardNumber a card number
   * @param expiryMonth an expiration month of card
   * @param expiryYear an expiration year
   * @param cVV a cVV card code
   */
  private static function validateMandatoryFields(cardNumber : String, expiryMonth : String, expiryYear : String, cVV : String) {
    if (StringUtils.isBlank(cardNumber)
        || cardNumber.length() < CARD_NUMBER_VALID_LENGTH) {
      throw new DisplayableException(DisplayKey.get('Web.UpFrontPayment.Demo.Error.InvalidCardNumber'))
    }
    if (expiryMonth == null) {
      throw new DisplayableException(DisplayKey.get('Web.UpFrontPayment.Demo.Error.MissingMandatoryField', "Expiration Month"))
    }
    if (expiryYear == null) {
      throw new DisplayableException(DisplayKey.get('Web.UpFrontPayment.Demo.Error.MissingMandatoryField', "Expiration Year"))
    }
    if (cVV == null) {
      throw new DisplayableException(DisplayKey.get('Web.UpFrontPayment.Demo.Error.MissingMandatoryField', "CVV"))
    }
  }

  /**
   * Validate mandatory card details and if validation is successful
   * redirects to demo confirmation screen.
   * @param demoCreditCardDetails card details
   * @param amount transaction amount
   * @return demo transaction confirmation page
   */
  public static function validateMandatoryFieldsAndRedirectToConfirmationScreen(demoCreditCardDetails : DemoCreditCardDetails, amount : BigDecimal) : Location {
    validateMandatoryFields(demoCreditCardDetails.Number, demoCreditCardDetails.ExpiryMonth, demoCreditCardDetails.ExpiryYear, demoCreditCardDetails.CVV)
    return DemoTransactionConfirmationPage.push(getTransactionReference(), getAddressToDisplay(demoCreditCardDetails.AddressLine1, demoCreditCardDetails.AddressLine2, demoCreditCardDetails.Country), amount)
  }

  /**
   * Method that will remove last saved transaction details
   * when cancel transaction on demo payment gateway only for
   * standalone demo plugin.
   */
  public static function removeLatestSavedTransactionDetails() {
    var plugin = Plugins.get(PaymentGatewayPlugin)
    if (plugin.toString().contains("StandAlonePaymentGatewayPlugin")) {
      gw.transaction.Transaction.runWithNewBundle(\bundle -> {
        var savedTransactionDetails = Query.make(PaymentGatewayTransaction).select().first()
        bundle.delete(savedTransactionDetails)
      }, "su")
    }
  }

}