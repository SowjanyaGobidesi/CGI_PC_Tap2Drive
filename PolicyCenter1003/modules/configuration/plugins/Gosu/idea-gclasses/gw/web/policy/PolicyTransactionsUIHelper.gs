package gw.web.policy

uses gw.api.util.LocaleUtil
uses gw.i18n.DateTimeFormat

@Export
class PolicyTransactionsUIHelper {

  static function getJob (txn : Transaction) : String{
    var policyPeriod = (txn as EffDated).BranchUntyped as PolicyPeriod
    var date = policyPeriod.EditEffectiveDate
    var dateStringValue = gw.api.util.StringUtil.formatDate(date, "short")

    // Japanese specific, if Japanese Imperial calendar is enabled, populate the date in Japanese Imperial format to
    // keep consistency with date widget
    if(LocaleUtil.getCurrentLocale().isJapaneseImperialCalendarEnabled()){
      var dateFormat = LocaleUtil.getCurrentLocale().getJapaneseImperialOutputDateFormat(DateTimeFormat.SHORT, null);
      dateStringValue = dateFormat.format(date);
    }

    return policyPeriod.Job.DisplayType + " (" + dateStringValue + ")"
  }
}