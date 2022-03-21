package gw.plugin.billing

uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.MonetaryAmounts
uses gw.pl.currency.MonetaryAmount

uses java.lang.SuppressWarnings
uses java.math.RoundingMode

uses MonetaryAmounts#*

@Export
abstract class BillingUtilityMethods {

  static function getNumberOfInstallments(downPayment: MonetaryAmount, installment: MonetaryAmount, tax: MonetaryAmount,
                                          installmentFee: MonetaryAmount, total: MonetaryAmount): int {
    if (total == null or downPayment == null or installment == null or installment.IsZero) {
      return 0
    }

    var installmentWithFee = installment.add(zeroIfNull(installmentFee))
    return total.subtract(downPayment).subtract(zeroIfNull(tax))
        .divide(installmentWithFee, RoundingMode.CEILING)
        .intValue()
  }

  static function getNumberOfPayments(downPayment: MonetaryAmount, installment: MonetaryAmount, tax: MonetaryAmount,
                                      installmentFee: MonetaryAmount, total: MonetaryAmount): int {
    if (total == null or downPayment == null or installment == null or installment.IsZero) {
      return 1
    }

    var numberOfDownPaymentInvoices = downPayment.add(zeroIfNull(tax)).IsPositive ? 1 : 0
    var numberOfInstallments = getNumberOfInstallments(downPayment, installment, tax, installmentFee, total)
    return numberOfDownPaymentInvoices + numberOfInstallments
  }

  static function getTypeKeyForBillDateOrDueDateBilling(expectString : String) : BillDateOrDueDateBilling {
    var typeVal = typekey.BillDateOrDueDateBilling.getTypeKey(expectString)
    if (typeVal == null) {
      throw new IllegalArgumentException("Unknown type of BillDateOrDueDateBilling : " + expectString)
    }

    return typeVal
  }

  @SuppressWarnings({"all"})
  public static function convertPaymentMethodToAccountPaymentMethod(paymentMethodValue : String) : AccountPaymentMethod {
    var accountPaymentMethod = AccountPaymentMethod.get(paymentMethodValue)

    if (accountPaymentMethod == null or accountPaymentMethod.Retired) {
      PCLoggerCategory.BILLING_SYSTEM_PLUGIN.error(DisplayKey.get("BillingSystemPlugin.Error.MismatchedPaymentMethod", paymentMethodValue))
      accountPaymentMethod = AccountPaymentMethod.TC_UNSUPPORTED
    }

    return accountPaymentMethod
  }
}
