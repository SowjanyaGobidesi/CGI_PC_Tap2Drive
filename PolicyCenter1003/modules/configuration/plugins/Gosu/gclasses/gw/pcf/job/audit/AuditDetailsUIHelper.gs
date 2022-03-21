package gw.pcf.job.audit

uses gw.api.locale.DisplayKey

@Export
class AuditDetailsUIHelper {

  static function standardPremiumLabel(isFinalAudit : boolean, splitPeriod : boolean, ratingPeriod : gw.lob.wc.rating.WCRatingPeriod) : String {
    if (isFinalAudit and not splitPeriod) {
      return DisplayKey.get('Web.Quote.WC.StandardPremium.OnePeriod')
    }
    else {
      return DisplayKey.get('Web.Quote.WC.StandardPremium.SplitPeriod',  gw.api.util.StringUtil.formatDate(ratingPeriod.RatingStart, "short"),
          gw.api.util.StringUtil.formatDate(ratingPeriod.RatingEnd, "short") )
    }
  }

}