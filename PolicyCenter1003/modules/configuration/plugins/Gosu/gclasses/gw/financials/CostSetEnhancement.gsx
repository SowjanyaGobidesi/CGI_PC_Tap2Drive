package gw.financials
uses java.util.Set

enhancement CostSetEnhancement<T extends Cost> : Set<T>
{
  reified property get Premiums() : Set<T>
  {
    return this.where( \ c -> not c.IsTaxOrSurcharge).toSet()
  }
  
  reified property get TaxSurcharges() : Set<T>
  {
    return this.where( \ c -> c.IsTaxOrSurcharge).toSet()
  }

}
