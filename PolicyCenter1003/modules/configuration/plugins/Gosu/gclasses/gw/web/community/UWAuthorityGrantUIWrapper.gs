package gw.web.community

uses gw.api.locale.DisplayKey
uses gw.api.util.CurrencyUtil
uses gw.api.util.MonetaryAmounts
uses gw.api.util.PCNumberFormatUtil
uses gw.pl.currency.MonetaryAmount
uses org.apache.commons.beanutils.ConversionException
uses org.apache.commons.lang.StringUtils
uses typekey.Currency

uses java.math.BigDecimal

/**
 * The UWAuthorityProfileDetailScreen is modified to allow the safe input of MonetaryAmounts.  It will show the amount
 * and currency in two columns.  However, the UWIssueGrant itself will store the MonetaryAmount as a serialized string
 * in the Value field.  This Wrapper works with the UI to decompose and serialize/deserialize those values and edit
 * them on screen.
 *
 * Since there is a wrapper for each column in each row, the wrapper cannot hold state itself.  Instead, setting
 * of any value will change it on the underlying grant.  For this reason, setting either value or currency will result
 * in a non-null value for both.
*/
@Export
class UWAuthorityGrantUIWrapper {

  var _grant : UWAuthorityGrant
  var _issueType: UWIssueType

  construct(aGrant : UWAuthorityGrant) {
    _grant = aGrant
    _issueType = aGrant.IssueType?.ActiveVersion
  }

  property get Grant() : UWAuthorityGrant {
    return _grant
  }

  property get IssueType(): UWIssueType {
    return _issueType
  }

  property set IssueType(issueType: UWIssueType) {
    _issueType = issueType?.ActiveVersion
    _grant.IssueType = _issueType
  }

  property get ComparisonType() : ValueComparator {
    return _grant.ComparisonType
  }

  property set ComparisonType(comparator : ValueComparator) {
    _grant.ComparisonType = comparator
  }

  property get ApproveAnyValue() : Boolean {
    return _grant.ApproveAnyValue
  }

  property set ApproveAnyValue(anApproveAnyValue : Boolean) {
    _grant.ApproveAnyValue = anApproveAnyValue
  }

  /**
   * Return the currency represented in the Grant's Value
  */
  property get Currency() : Currency {
    var ma = getMonetaryAmount()
    return ma == null ? null : ma.Currency
   }

  /**
   * Sets the currency of the Grant by creating a MonetaryAmount of the same absolute value with the new currency
   * and serializing it into the Grant's value
  */
  property set Currency(aCurrency : Currency) {
    if (aCurrency == null) {
       _grant.Value = null
      return
    }

    if (_grant.Value == null) {
      _grant.Value = new MonetaryAmount(0, aCurrency).toString()
    } else {
      var ma = getMonetaryAmount(getMonetaryAmount().Amount.asString(), aCurrency)
      if (ma == null) {
        ma = new MonetaryAmount(0, aCurrency)
      }
      _grant.Value = ma.toString()
    }
  }

  /**
   * Returns the Grant's value.  If the value represents a MonetaryAmount, it only returns the Amount portion, providing
   * a separate means for accessing the currency
  */
  property get Value() : String {
    if (isCurrency()) {
      var ma = getMonetaryAmount()
      return ma == null ? null : MonetaryAmounts.renderForInput(ma)
    } else if (isNumber() and _grant.Value != null) {
      return PCNumberFormatUtil.renderForInput(new BigDecimal(_grant.Value), false)
    }
    return _grant.Value
  }

  /**
   * Sets the value of the underlying Grant.  If Grant Value is to represent a MonetaryAmount, it will attempt to
   * create the appropriate MonetaryAmount and serialize it into the Value attribute.  Creating the MonetaryAmount
   * can happen in one of two ways.  First, and more typical, the incoming string will represent a BigDecimal.  The
   * MonetaryAmount will then be created with the BigDecimal as the new Amount and use the existing currency.  Second,
   * the incoming string will represent the serialized MonetaryAmount (e.g. "100 usd" or "50 eur").  The MonetaryAmount
   * will then be created simply by deserializing the given amount.
  */
  property set Value(val : String) {
    if (val == null) {
      _grant.Value = null
      return
    }

    if (isCurrency()) {
      var ma = getMonetaryAmount(val)
      if (ma != null) {
        _grant.Value = ma.toString()
      }
    } else if (isNumber()) {
      _grant.Value = PCNumberFormatUtil.parse(val) as String
    } else {
      _grant.Value = val
    }
  }

  /**
   * Runs the validation for the Grant, creating a serialized version of the MonetaryAmount for review when
   * using a MonetaryAmount based UW Grant.
  **/
  function validate(proposedNewValue : String) : String {
    var valueToCheck = proposedNewValue.trim()
    if (isCurrency()) {
      var ma = getMonetaryAmount(proposedNewValue)
      if (ma != null) {
        valueToCheck = ma.toString()
      } else {
        return DisplayKey.get("UWIssue.MonetaryAmountType.InvalidMonetaryAmount", proposedNewValue)
      }
    }
    return gw.job.uw.UWIssueValueComparatorWrapper.wrap(ComparisonType).ValueType.validate(valueToCheck)
  }

  /**
   * Creates a MonetaryAmount by deserializing the grant's value.  Defaults to 0 of the default currency if there is
   * an exception of any sort
   */
  private function getMonetaryAmount() : MonetaryAmount {
    if (_grant.Value == null or !isCurrency()) return null

    try {
      return new MonetaryAmount(_grant.Value)
    } catch (iae : IllegalArgumentException) {
      return new MonetaryAmount(0, CurrencyUtil.getDefaultCurrency())
    }
  }

  /**
   * Attempts to create a MonetaryAmount with the string provided, treating it as the Amount or the serialized
   * MonetaryAmount
   **/
  private function getMonetaryAmount(amountOrSerializedMonetaryAmount : String) : MonetaryAmount {
    amountOrSerializedMonetaryAmount.trim()
    if (Currency == null) {
      Currency = CurrencyUtil.getDefaultCurrency()
    }

    //Treats string as the Amount
    var result = getMonetaryAmount(amountOrSerializedMonetaryAmount, Currency)
    if (result != null) return result

    //Treats string as the serialized MonetaryAmount
    try {
      var amountAndCurrency = StringUtils.split(amountOrSerializedMonetaryAmount)
      assert(amountAndCurrency.length == 2)
      return new MonetaryAmount(PCNumberFormatUtil.parse(amountAndCurrency[0]), Currency.getTypeKey(amountAndCurrency[1])).rescale()
    } catch (iae : IllegalArgumentException) {
      return null
    } catch (ce : ConversionException) {
      return null
    } catch (ae : AssertionError) {
      return null
    }
  }

  /**
   * Attempts to create a MonetaryAmount with the string provided, treating it as the Amount or the serialized
   * MonetaryAmount
   **/
  private function getMonetaryAmount(bigDecimalAmount: String, aCurrency : Currency) : MonetaryAmount {
    try {
      return new MonetaryAmount(PCNumberFormatUtil.parse(bigDecimalAmount), aCurrency).rescale()
    } catch (iae : IllegalArgumentException) {
      return null
    } catch (ce : ConversionException) {
      return null
    }
  }

  private function isCurrency() : boolean {
    return ComparisonType == ValueComparator.TC_MONETARY_GE
        or ComparisonType == ValueComparator.TC_MONETARY_LE
  }

  private function isNumber() : boolean {
    return ComparisonType == ValueComparator.TC_NUMERIC_GE
        or ComparisonType == ValueComparator.TC_NUMERIC_LE
  }
}