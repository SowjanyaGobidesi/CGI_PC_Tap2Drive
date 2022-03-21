package gw.lob.ba.rating
uses java.util.Date
uses gw.financials.PolicyPeriodFXRateCache
uses java.util.List

@Export
class BAMinimumPremiumCostData extends BACostData<BAMinimumPremiumCost> {
  
  construct(effDate : Date, expDate : Date, jurisdiction : BAJurisdiction) {
    super(effDate, expDate, TC_MINIMUMPREMIUM, jurisdiction, null)
  }
  
  construct(effDate : Date, expDate : Date, c : Currency, rateCache : PolicyPeriodFXRateCache,  jurisdiction : BAJurisdiction) {
    super(effDate, expDate, c, rateCache, TC_MINIMUMPREMIUM, jurisdiction, null)
  }
  
  override function setSpecificFieldsOnCost(line : BusinessAutoLine, cost : BAMinimumPremiumCost) {
    super.setSpecificFieldsOnCost( line, cost )
  }

  override function getVersionedCosts(line : BusinessAutoLine) : List<gw.pl.persistence.core.effdate.EffDatedVersionList> {
    return line.VersionList.BACosts.where( \ costVL -> costVL.AllVersions.first() typeis BAMinimumPremiumCost ).toList()
  }

  protected override property get KeyValues() : List<Object> {
    return {}
  }

}
