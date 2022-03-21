package gw.lob.wc.financials
uses gw.api.locale.DisplayKey
uses java.util.Set
uses gw.lob.wc.rating.WCRatingPeriod
uses java.util.ArrayList
uses gw.api.ui.WC_CostWrapper

enhancement WCCostSetEnhancement<T extends WCCost> : Set<T>
{
  /**
   * Returns the costs in this set that have an effective date in the rating period's [RatingStart, RatingEnd).
   */
  reified function byRatingPeriod( ratingPeriod : WCRatingPeriod ) : Set<T>
  {
    var start = ratingPeriod.RatingStart.trimToMidnight()
    var end   = ratingPeriod.RatingEnd.trimToMidnight()
    return this.where( \ c -> c.EffDate >= start and c.EffDate < end ).toSet()
  }
  
  /**
   * Returns the costs in this set that have a calcOrder in [calcOrder, endOrder].
   */
  reified function byCalcOrder( startOrder : int, endOrder : int ) : Set<T>
  {
    return this.where( \ c -> c.CalcOrder >= startOrder and c.CalcOrder <= endOrder ).toSet()
  }

  reified function getOtherPremiumAndSurcharges(currency : Currency) : WC_CostWrapper[]{
    var ordered = new ArrayList<WC_CostWrapper>()
    
    ordered.addCosts( this.where( \ t -> t.CalcOrder >= 400 ))
    var state = this.first().JurisdictionState
    var header1 = DisplayKey.get("Web.SubmissionWizard.Quote.WC.Subtotal.TotalPremium", state)
    ordered.add( new WC_CostWrapper(500.5, header1, this.byCalcOrder( 0, 500 ).AmountSum(currency), true) )
    var header2 = DisplayKey.get("Web.SubmissionWizard.Quote.WC.Subtotal.TotalCost", state)
    ordered.add( new WC_CostWrapper(10000000, header2, this.AmountSum(currency), true) )

    return ordered.toTypedArray()
  }
  
  reified function getStandardPremiums(currency : Currency) : WC_CostWrapper[]{
    var ordered = new ArrayList<WC_CostWrapper>()
    
    ordered.addCosts( this.where( \ t -> t.CalcOrder < 400 ))
    
    ordered.add( new WC_CostWrapper(100.5,
      DisplayKey.get("Web.SubmissionWizard.Quote.WC.Subtotal.ManualPremium"), 
      this.byCalcOrder( 0, 100 ).AmountSum(currency), false) )
    ordered.add( new WC_CostWrapper(200.5,
      DisplayKey.get("Web.SubmissionWizard.Quote.WC.Subtotal.SubjectPremium"), 
      this.byCalcOrder( 0, 200 ).AmountSum(currency), false) )
    ordered.add( new WC_CostWrapper(300.5,
      DisplayKey.get("Web.SubmissionWizard.Quote.WC.Subtotal.ModifiedPremium"), 
      this.byCalcOrder( 0, 300 ).AmountSum(currency), false))
    ordered.add( new WC_CostWrapper(400.5,
      DisplayKey.get("Web.SubmissionWizard.Quote.WC.Subtotal.StandardPremium"), 
      this.byCalcOrder( 0, 400 ).AmountSum(currency), true))
        
    return ordered.toTypedArray()
  }
  
}
