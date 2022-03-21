package gw.api.web.dashboard.ui.overview

uses com.google.common.base.Preconditions
uses gw.api.locale.DisplayKey
uses org.joda.time.DateTime
uses org.joda.time.Months
uses org.joda.time.Years

@Export
class ElapsedTimeFormatUtil {

  /**
   * @return the localized text describing how many years or months have passed between the dates.
   */
  static function formatTimePassedBetween(startDate: Date, endDate: Date): String {
    Preconditions.checkNotNull(startDate)
    Preconditions.checkNotNull(endDate)
    Preconditions.checkArgument(startDate <= endDate, "startDate cannot be after the endDate")

    var timeSince = Years.yearsBetween(new DateTime(startDate), new DateTime(endDate)).getYears()
    if (timeSince != 0) {
      if (timeSince == 1) {
        return DisplayKey.get('Web.ElapsedTimeFormatUtil.TimeSince.YearSingle', timeSince)
      }
      return DisplayKey.get('Web.ElapsedTimeFormatUtil.TimeSince.YearPlural', timeSince)
    }

    timeSince = Months.monthsBetween(new DateTime(startDate), new DateTime(endDate)).getMonths()
    if (timeSince != 0) {
      if (timeSince == 1) {
        return DisplayKey.get('Web.ElapsedTimeFormatUtil.TimeSince.MonthSingle', timeSince)
      }
      return DisplayKey.get('Web.ElapsedTimeFormatUtil.TimeSince.MonthPlural', timeSince)
    }

    if (startDate.MonthOfYearEnum == Date.CurrentDate.MonthOfYearEnum) {
      return DisplayKey.get('Web.ElapsedTimeFormatUtil.TimeSince.ThisMonth')
    }

    return DisplayKey.get('Web.ElapsedTimeFormatUtil.TimeSince.LastMonth')
  }
}
