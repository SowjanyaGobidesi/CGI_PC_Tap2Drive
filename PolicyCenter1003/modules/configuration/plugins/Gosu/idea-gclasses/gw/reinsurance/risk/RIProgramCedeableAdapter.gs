package gw.reinsurance.risk

uses gw.pl.currency.MonetaryAmount

uses java.lang.IllegalStateException

@Export
class RIProgramCedeableAdapter extends AbstractCedeableAdapter {
  var _riProgram : RIProgram

  construct(owner : RIProgram) {
    super()
    _riProgram = owner
  }

  private property get riProgram() : RIProgram {
    return _riProgram
  }

  override property get TotalRisk() : MonetaryAmount {
    return riProgram.SingleRiskMaximum
  }

  override property get GrossRetention() : MonetaryAmount {
    var perRiskTreaties = riProgram.Treaties.PerRiskAgreementsForCalc
    var quotaShare = perRiskTreaties.getAgreementsOfType({TC_QUOTASHARERITREATY}).first() as QuotaShareRITreaty
    if (quotaShare != null) {
      return quotaShare.CoverageLimit
    }
    var surplus = perRiskTreaties.getAgreementsOfType({TC_SURPLUSRITREATY}).minBy(\ r -> r.AttachmentPoint) as SurplusRITreaty
    if (surplus != null) {
      return surplus.MaxRetention
    }
    return null
  }

  override function getOverrideCededAmountForSurplusRITreaty(treaty : SurplusRITreaty) : MonetaryAmount {
    return null
  }

  override property get Currency() : Currency {
    return _riProgram.Currency
  }

  override property get Reinsurable() : Reinsurable {
    throw new IllegalStateException("This method should not be called for RIProgram")
  }
}