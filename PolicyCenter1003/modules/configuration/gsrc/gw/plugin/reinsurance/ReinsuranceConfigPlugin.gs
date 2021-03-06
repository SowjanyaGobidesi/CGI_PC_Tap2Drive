package gw.plugin.reinsurance

uses entity.RIAgreement
uses entity.RIRisk
uses entity.Reinsurable
uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.system.database.SequenceUtil
uses gw.api.upgrade.Coercions
uses gw.api.util.DisplayableException
uses gw.api.util.PCSequenceUtilKeyRegistry
uses gw.api.util.RegionCurrencyMappingUtil
uses gw.pl.currency.MonetaryAmount
uses gw.api.util.PCSequenceUtilKeyRegistry#RI_RISK_NUMBER


@Export
class ReinsuranceConfigPlugin implements IReinsuranceConfigPlugin {

  var _logger = PCLoggerCategory.REINSURANCE_PLUGIN

  construct() {
  }

  override function getDefaultGrossRetention(ririsk : RIRisk) : MonetaryAmount {
    // OOTB, we specify the default gross retention to a quota share coverage limit or surplus treaty max retention
    if (ririsk.TotalRisk != null) {
      var quotaShare = ririsk.Attachments.AttachmentsForRiskCeding.getAttachmentsOfType({TC_QUOTASHARERITREATY})*.Agreement.first() as QuotaShareRITreaty
      if (quotaShare != null) {
        return quotaShare.CoverageLimit
      }
      var surplus = ririsk.Attachments.AttachmentsForRiskCeding.getAttachmentsOfType({TC_SURPLUSRITREATY})*.Agreement.minBy(\ r -> r.AttachmentPoint) as SurplusRITreaty
      if (surplus != null) {
        return surplus.MaxRetention
      }
    }
    return null
  }

  override function getInclusionType(ririsk : RIRisk, agreement : RIAgreement) : RIAttachmentInclusionType {
    // OOTB, default inclusion type of an agreement
    return RIAttachmentInclusionType.TC_INCLUDED // default is included
  }

  override function getOverrideCededAmountForSurplusRITreaty(ririsk : RIRisk, agreement : SurplusRITreaty) : MonetaryAmount {
    // OOTB, there is no override amount for how much is ceded to a surplus treaty.
    return null // use calculated value
  }

  override property get ReinsuranceEffectiveTime() : Date {
    /* OOTB default 1 minute into the Java epoch (1970-01-01)
     * per default Locale and TimeZone, but a customer may
     * want to change this per their business model...
     */
    return Coercions.makeDateFrom(gw.plugin.policyperiod.impl.EffectiveTimePlugin.DEFAULT_TIME_STRING)
  }

  /**
   * Generate and return a unique risk number.
   *
   * @return the unique risk number
   */
  override function generateRiskNumber(): String {
    _logger.info("Creating new risk number")
    return SequenceUtil.next(1, RI_RISK_NUMBER) as String
  }

  override function getTargetMaxRetention(ririsk : RIRisk) : MonetaryAmount {
    //OOTB, the target max retention for an RIRisk is based on its policy attachment program
    return ririsk.PolicyAttachmentProgram.TargetMaxRetention
  }

  override function shouldPolicyTermGenerateReinsurables(period : PolicyPeriod) : boolean {
    // It may make sense for customers phasing in reinsurance to do so for periods
    // effective after a specific date. For example:
// return period.PeriodStart.after(DateConverterUtil.getSharedInstance().convertStringToDate("01/01/2015")

    // it would also be possible to do the reverse, phasing out reinsurance for periods
    // effective after a specific date. The following example phases out Commercial Property
    // reinsurance on terms which start on or after 1/1/2016.
//    if (period.Policy.ProductCode == "CommercialProperty") {
//      if (DateUtil.compareIgnoreTime(period.PeriodStart, DateConverterUtil.getSharedInstance().convertStringToDate("01/01/2016")) >= 0) {
//        return false
//      }
//    }

    // OOTB, however, we always want to create reinsurables for reinsurance.
    //
    return true
  }

  /**
   * Sample implementation of this filter does not examine reinsurable; it considers all programs applicable.
   */
  override function programCanCoverReinsurable(program : RIProgram, reinsurable : Reinsurable) : boolean {
    return true
  }

  /**
   * Sample implementation of this filter does not examine Reinsurable.   For an active or draft search,
   * it throws an exception if there are multiple candidates, but if there is only one it returns it.
   *
   * For prior year programs, it chooses the one that ends last.
   *
   * If candidates is an empty list, returns null.
   *
   * Finally, if the searchType is unrecognized, throws an exception rather than failing silently.
   */
  override function chooseReinsuranceProgram(candidates: RIProgram[],
                                             reinsurable: Reinsurable, date: Date,
                                             searchType: SearchType): RIProgram {
    // if there are 0 or 1 candidates, our choice is easy
    if (candidates.Count <= 1) {
      return candidates.first()
    }

    var t = (searchType == ACTIVE_PROGRAMS) ? "active" : "draft"
    for (program in candidates) {
      _logger.error("Found ${t} program '${program}'"
          + " effective from ${program.getEffectiveDate()} to ${program.getExpirationDate()}")
    }

    switch (searchType) {
      case ACTIVE_PROGRAMS:
      case DRAFT_PROGRAMS:
          // if we got here, there was more than one program
          var msg = "Found multiple ${t} programs for Coverage Group ${reinsurable.CoverageGroup} as of date ${date}"
          throw new IllegalStateException(msg)

      case PRIOR_YEAR_PROGRAMS:
      default:
          return candidates.sortBy(\p -> p.ExpirationDate).last()
    }
  }

  override function getReinsuranceCurrency(coverages : List <Coverage>) : Currency {
    var coverables = coverages*.OwningCoverable.toSet()
    var jurisdiction = coverables.firstWhere( \ c -> c.CoverableState != null).CoverableState
    if (jurisdiction == null) {
      throw new DisplayableException(DisplayKey.get("ReinsuranceAPI.reinsurance.coverables", coverables))
    }
    var currency = RegionCurrencyMappingUtil.getCurrencyMappingForJurisdiction(jurisdiction)
    if (currency == null) {
      throw new DisplayableException(DisplayKey.get("ReinsuranceAPI.jurisdiction", jurisdiction))
    }
    return currency
  }
}