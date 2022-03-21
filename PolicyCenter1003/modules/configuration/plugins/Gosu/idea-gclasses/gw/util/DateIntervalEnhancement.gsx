package gw.util

uses gw.lang.reflect.interval.DateInterval
uses java.util.Date

enhancement DateIntervalEnhancement : DateInterval {

  /**
   * Convenience property to get the Start date of the DateInterval
   */
  property get Start() : Date {
    return this.first()
  }

  /**
   * Convenience property to get the End date of the DateInterval
   */
  property get End() : Date {
    return this.last()
  }

  /**
   * Returns true if the given DateInterval intersects with this interval
   */
  function overlaps(otherInterval: DateInterval) : boolean {
    return (otherInterval.Start <= End) and (otherInterval.End >= Start)
  }

  /**
   * Return the number of LeapDays present in this DateInterval
   */
  property get LeapDaysInInterval() : int {
    var earlier = this.LeftEndpoint
    var later = this.RightEndpoint

    if (!this.LeftClosed) {
      earlier = earlier.addDays(1)
    }
    if (!this.RightClosed) {
      later = later.addDays(-1)
    }

    return com.guidewire.pl.system.util.DateRange.allDatesBetween(earlier, later).NumOfLeapYearDays
  }
}
