package gw.lob.im
uses java.lang.IllegalArgumentException
uses gw.pl.currency.MonetaryAmount

@Export
enhancement IMLineQuotePageEnhancement : entity.InlandMarineLine {

  /**
   * Gets the number of lines that is being displayed on the quote page
   * The page length is determined by adding the number of cost rows with coverable rows
   * @return int
   */
  function quotePageLength() : int {
    var pagelength = 0
    /**
     * 3 lines per cost 
     * plus 4 lines per coverable
     */
    var costCount = this.Costs.Count
    var coverableCount = this.AllCoverables.Count
    pagelength = coverableCount * 4 + costCount * 3
    return pagelength
  }

  /**
   * Returns the premium for a coverage part
   * @param subtype - the {@link typekey.IMCoveragePart} to get the premium
   * @return MonetaryAmount
   */
  function coveragePartPremium( subtype : typekey.IMCoveragePart ) : MonetaryAmount {
    var covPartIterable = this.VersionList.IMCoverageParts.map( \ i -> i.AllVersions.last() )
    var currency = (this.Branch.PreferredSettlementCurrency)
    switch (subtype) {
      // need to use verions list of line to get all Cov Parts, even if they have been removed
      //  on a policy Change
      case TC_IMSIGNPART :
        var signpart = covPartIterable.firstWhere( \ part -> part typeis IMSignPart ) as IMSignPart
        return signpart.VersionList.IMSignPartCosts.sum(currency, \ vL -> vL.AllVersions.AmountSum(currency) )
        
      case TC_IMACCOUNTSRECPART :
        var accountsRecPart = covPartIterable.firstWhere( \ part -> part typeis IMAccountsRecPart ) as IMAccountsRecPart
        return accountsRecPart.VersionList.IMAccountsRecPartCosts.sum(currency, \ vL -> vL.AllVersions.AmountSum(currency) ) 
      
      case TC_CONTRACTORSEQUIPPART :
        var contractorspart = covPartIterable.firstWhere( \ part -> part typeis ContractorsEquipPart ) as ContractorsEquipPart
        return contractorspart.VersionList.ContrEquipPartCosts.sum(currency, \ vL -> vL.AllVersions.AmountSum(currency) ) 
      
      default : 
        throw new IllegalArgumentException("Unhandled Create IMCoveragePart subtype " + subtype.Code)
    }
  }
}
