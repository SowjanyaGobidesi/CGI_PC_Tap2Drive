package gw.lob.wc
uses gw.api.productmodel.CovTermPack
uses java.util.List

enhancement PackageWCDeductibleTypeEnhancement : PackageWCDeductibleType
{
  /**
   * List of available covterm values for this deductible type's pattern
   */
  property get AvailablePackageCovTermValues() : List<CovTermPack> {
    return this.Pattern.getOrderedAvailableValues( this )
  }
}
