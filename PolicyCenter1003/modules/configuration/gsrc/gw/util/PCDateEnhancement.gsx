package gw.util
uses java.text.DateFormat
uses java.util.Date
uses java.util.Calendar
uses gw.xml.date.XmlDateTime
uses gw.date.GosuDateUtil

@Export
enhancement PCDateEnhancement : Date
{
  function toTimeString() : String{
    return DateFormat.getTimeInstance(DateFormat.MEDIUM).format(this)
  }

  function afterNow() : boolean {
    return this.after( Date.CurrentDate )
  }

  property get Calendar() : Calendar{
    return this.toCalendar()
  }

  property get FirstDayOfMonth() : Date {
    var dayOffset = 1 - GosuDateUtil.getDayOfMonth(this)
    return this.addDays(dayOffset)
  }
}
