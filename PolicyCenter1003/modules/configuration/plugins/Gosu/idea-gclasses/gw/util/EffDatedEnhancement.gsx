package gw.util

uses gw.api.locale.DisplayKey
uses com.guidewire.pl.system.util.DateRange
uses gw.api.effdate.EffDatedUtil
uses gw.api.util.Range

uses java.util.ArrayList
uses java.util.Date
uses java.util.HashSet
uses java.util.Set
uses java.util.HashSet
uses java.util.List

@Export
enhancement EffDatedEnhancement : EffDated
{
  property get EffectiveDateRange() : DateRange {
    return DateRange.allDatesBetween(this.EffectiveDate, this.ExpirationDate)
  }

  property set EffectiveDateRange(range : DateRange) {
    this.EffectiveDate = range.Start
    this.ExpirationDate = range.End
  }

  /**
   * Returns the entire effective window of this eff-dated
   */
  property get EffectiveDateRangeWM() : DateRange {
    var allVersions = this.VersionListUntyped.AllVersionsUntyped
    var effDate = allVersions.first().EffectiveDate
    var expDate = allVersions.last().ExpirationDate
    return DateRange.allDatesBetween(effDate, expDate)
  }

  property get TypeIDString() : String {
    return this.FixedId.Type.Name + ":" + this.FixedId.Value
  }

  /**
   * Call before setting value in Window Mode
   */
  public function assertWindowMode(valueToSet: EffDated) {
    if (this.Slice) {
      throw DisplayKey.get("WorkersComp.CoveredEmployee.NotInWindowMode")
    }
    if(valueToSet.Slice){
      throw DisplayKey.get("WorkersComp.CoveredEmployee.NotInWindowMode")
    }
  }

  /**
   * End EffDated in Window Mode
   */
  function endDateWM(editEffDate : Date){
    var allVersions = this.VersionListUntyped.AllVersionsUntyped.iterator()
    for(version in allVersions){
      if(editEffDate.after( version.EffectiveDate )){
        if(editEffDate.before( version.ExpirationDate)){
          version.ExpirationDate = editEffDate
        }
      }else{
        version.removeWM()
        return // all subsequent slices will be deleted automatically
      }
    }
  }

  /**
   * Split EffDated in Window Mode
   */
  function splitWM(editEffDate : Date){
    var allVersions = this.VersionListUntyped.AllVersionsUntyped
    for(version in allVersions){
      if(version.isEffective( editEffDate )){
        version.splitUntyped( editEffDate )
      }
    }
  }

  /**
   * Remove the EffDated in WM
   * @see endDateWM
   */
  function removeWM(){
    this.getSliceUntyped( this.EffectiveDate ).remove()
  }

  /**
   * Removes all slices for the EffDated.
   */
  function removeAllSlicesWM() {
    var firstSlice = this.VersionListUntyped.AllVersionsUntyped.first()
    if (firstSlice != null) {
      firstSlice.removeWM()
    }
  }

  /**
   * Returns <code>true</code> if and only if this EffDated is open for removal in its bundle.
   */
  property get Removed() : boolean {
    return this.Bundle.RemovedBeans.toSet().contains(this)
  }

  /**
   * Returns all event dates for the EffDated.  An event date is anywhere where an edit occurs, the EffDated becomes
   * effective, or the EffDated expires.  Since this method returns a set, the results will be unique but unordered.
   *
   * @return All event dates for the EffDated
   */
  property get EventDates() : Set<Date> {
    var dates = new HashSet<Date>()
    this.VersionListUntyped.AllVersionsUntyped.each(\ s -> {
      dates.add(s.EffectiveDate)
      dates.add(s.ExpirationDate)
    })
    return dates
  }

  /**
   * Return the date this bean start to exist
   */
  property get EarliestEffectiveDate() : Date{
    return this.VersionListUntyped.AllVersionsUntyped.first().EffectiveDate
  }

  /**
   * Return the date this bean cease to exist
   */
  property get LatestExpirationDate() : Date{
    return this.VersionListUntyped.AllVersionsUntyped.last().ExpirationDate
  }

  /**
   * Returns the ranges of dates for which this EffDated is effective, ignoring edit dates.
   *
   * @return The contiguous date ranges when this EffDated is effective.
   */
  property get ContiguousDateRanges() : List<Range<Date>> {
    var ranges = new ArrayList<Range<Date>>()
    var start : Date = null
    var end : Date = null
    for (version in this.VersionListUntyped.AllVersionsUntyped) {
      if (start == null) {
        // This is the first version, so just copy the dates.
        start = version.EffectiveDate
        end = version.ExpirationDate
      } else if (end == version.EffectiveDate) {
        // These versions are contiguous, so extend the date range.
        end = version.ExpirationDate
      } else {
        // These versions are not contiguous, so add the range to the list of ranges and start a new one.
        ranges.add(Range.closedOpen(start, end))
        start = version.EffectiveDate
        end = version.ExpirationDate
      }
    }
    // Add any remaining ranges.
    if (start != null) {
      ranges.add(Range.closedOpen(start, end))
    }

    return ranges
  }

  /**
   * Return all versions of an exposure except the original (first) version
   */
  property get AdditionalVersions() : EffDated[] {
    var allVersions = this.VersionListUntyped.AllVersionsUntyped
    if(allVersions.Count <= 1){
      return new EffDated[0]
    }
    return allVersions.subList( 1, allVersions.Count ).toTypedArray()
  }
}