package gw.billing

uses gw.pl.currency.MonetaryAmount
uses gw.plugin.billing.BillingPaymentsPreview
uses gw.plugin.billing.PaymentPreviewItem

/**
 * Defines enhancements for the {@link BillingPaymentsPreview} class.
 */
enhancement BillingPaymentsPreviewEnhancement : BillingPaymentsPreview {

  /**
   * @param the {@link PolicyPeriod} for which the items were generated
   * @return The sum total of the preview items {@link
   *         PaymentPreviewItem#Amount}s.
   */
  function getTotal(policyPeriod : PolicyPeriod) : MonetaryAmount {
    return this.PreviewItems
               .sum(policyPeriod.PreferredSettlementCurrency,
                    \p -> p.Amount)
  }

  /**
   * Returns the number of preview items of specific invoice type, e.g., "installment"
   */
  function getNumberOfPreviewItemsOfType(invoiceItemType : String) : int {
    return this.PreviewItems.where(\ p -> p.Type == invoiceItemType).Count
  }

 /**
  * @param the {@code InvoiceItemType.Code} string that identifies the
  *        preview items of interest
  * @param the {@link PolicyPeriod} for which the items were generated
  * @return The sum total of the preview items of interest {@link
  *         PaymentPreviewItem#Amount}s.
  */
  function getTypeTotal(invoiceItemType : String, policyPeriod : PolicyPeriod) : MonetaryAmount {
    return sumOf(policyPeriod.PreferredSettlementCurrency,
                 this.PreviewItems
                     .where(\ p -> p.Type == invoiceItemType))
  }

  /**
   * @param the {@code ChargeCategory.Code} string that identifies the
   *        preview items of interest
   * @param the {@link PolicyPeriod} for which the items were generated
   * @return The sum total of the preview items of interest {@link
   *         PaymentPreviewItem#Amount}s.
   */
  function getCategoryTotal(chargeCategory : String, policyPeriod : PolicyPeriod) : MonetaryAmount {
    return sumOf(policyPeriod.PreferredSettlementCurrency,
                 this.PreviewItems
                     .where(\ p -> p.ChargeCategory == chargeCategory))
  }

  /**
   * Returns an amount representative of the preview items that match the
   * specified {@link PaymentPreviewItem#Type}.
   *
   * @param the {@code InvoiceItemType.Code} string that identifies the
   *        preview items of interest
   * @param the {@link PolicyPeriod} for which the items were generated
   * @return The {@link PaymentPreviewItem#Amount} of a representative preview
   *         item; {@code null} if not applicable, {@code 0} if none.
   */
  function getTypeAmount(invoiceItemType : String, policyPeriod : PolicyPeriod) : MonetaryAmount {
    var previewItems = this.PreviewItems.where(\p -> p.Type == invoiceItemType)
    var currency = policyPeriod.PreferredSettlementCurrency

    if (previewItems.Count == 0) {
      return 0bd.ofCurrency(currency)
    } else if (previewItems.Count == 1) {
      return previewItems[0].Amount
    } else {
      return moreThanOneTimeOf(currency, previewItems)
    }
  }

  /**
   * Returns an amount representative of the preview items that match the
   * specified {@link PaymentPreviewItem#ChargeCategory}.
   *
   * @param the {@code ChargeCategory.Code} string that identifies the
   *        preview items of interest
   * @param the {@link PolicyPeriod} for which the items were generated
   * @return The {@link PaymentPreviewItem#Amount} of a representative preview
   *         item; {@code null} if not applicable, {@code 0} if none.
   */
  function getCategoryAmount(chargeCategory : String, policyPeriod : PolicyPeriod) : MonetaryAmount {
    // not defined if not partitioned by category, otherwise 0 if none found...
    if(this.PartitionedByCategory) {
      return moreThanOneTimeOf(policyPeriod.PreferredSettlementCurrency,
                               this.PreviewItems
                                   .where(\item -> item.ChargeCategory == chargeCategory))
    }

    return null
  }

  function getOneTimeCategoryAmount(chargeCategory : String, policyPeriod : PolicyPeriod) : MonetaryAmount {
    // not defined if not partitioned by category, otherwise 0 if none found...
    if(this.PartitionedByCategory) {
        return getOneTimeCharge(policyPeriod.PreferredSettlementCurrency,
                                this.PreviewItems
                                    .where(\item -> item.ChargeCategory == chargeCategory))
    }

    return null
  }

  private function sumOf(currency : Currency, previewItems : PaymentPreviewItem[]) : MonetaryAmount {
    return previewItems.IsEmpty
        ? 0bd.ofCurrency(currency)
        : previewItems.sum(currency, \ item -> item.Amount)
  }

  private function getOneTimeCharge(currency : Currency, previewItems : PaymentPreviewItem[]) : MonetaryAmount {
    return previewItems.IsEmpty
        ? 0bd.ofCurrency(currency)
        // Return a one-time fee (appears only once) what implies it should have a frequency of 1
        : getChargeByFrequencyCheck(currency, previewItems, \value -> value == 1)
  }

  private function moreThanOneTimeOf(currency : Currency, previewItems : PaymentPreviewItem[]) : MonetaryAmount {
    return previewItems.IsEmpty
        ? 0bd.ofCurrency(currency)
        // Return a representative fee (appears more than once) what implies it should have a frequency higher than 1
        : getChargeByFrequencyCheck(currency, previewItems, \value -> value > 1)
  }

  private function getChargeByFrequencyCheck(currency : Currency, previewItems : PaymentPreviewItem[], frequency(value : Integer) : boolean) : MonetaryAmount {
    // Return the amount according to the frequency specified
    // Example 1: If "previewItems" contain these amounts: {100, 10, 10, 9.7} and condition -> value == 1, it will return 100
    // Example 2: If "previewItems" contain these amounts: {100, 10, 10, 9.7} and condition -> value > 1, it will return 10

    return previewItems.mapToKeyAndValue(\t -> t.Amount,
                                         \t -> previewItems.countWhere(\elt ->
                                                  roundingAmount(t.Amount, elt.Amount))
                                        )
                                        .filterByValues(\v -> frequency(v))
                                        ?.Keys
                                            ?.first()
           ?: 0bd.ofCurrency(currency)
  }

  private function roundingAmount(amountKey : MonetaryAmount, amount : MonetaryAmount) : boolean {
    var MAX_AMOUNT_DEVIATION = 0.01

    // Return true for parameters like (10, 10), (10, 9.5) , (10, 9). It takes into account a maximun deviation of 1% of amountKey
    return (amountKey.Amount - amount.Amount).abs() <= amountKey.Amount * MAX_AMOUNT_DEVIATION
  }
}