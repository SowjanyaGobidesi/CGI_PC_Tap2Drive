package gw.financials
uses gw.api.util.TypeUtil

uses java.util.Set

enhancement TransactionSetEnhancement<T extends Transaction> : Set<T> {

  /**
   * @return All members of the set where the RateAmountType of the cost is not a Tax or Surcharge
   */
  reified property get Premiums() : Set<T>
  {
    return this.where( \ tx -> not tx.Cost.IsTaxOrSurcharge).toSet()
  }

  /**
   * @return All members of the set where the RateAmountType of the cost is a Tax or Surcharge
   */
  reified property get TaxSurcharges() : Set<T>
  {
    return this.where( \ tx -> tx.Cost.IsTaxOrSurcharge).toSet()
  }

  /**
   * @param t Type that is desired.
   * @return All members of the set which are compatible with the given type <code>t</code>.
   */
  reified function findByCostType( t : Type ) : Set<T>
  {
    return this.where(\elt -> TypeUtil.isNominallyOrStructurallyAssignable(t, typeof elt.Cost ) ).toSet()
  }
}
