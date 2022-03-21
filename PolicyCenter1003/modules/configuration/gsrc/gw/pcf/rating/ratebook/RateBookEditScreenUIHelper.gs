package gw.pcf.rating.ratebook

uses gw.api.locale.DisplayKey
uses pcf.api.Location
uses gw.api.util.DisplayableException
uses gw.web.rating.CalcRoutineCodeAndVersion
uses gw.api.web.PebblesUtil

@Export
class RateBookEditScreenUIHelper {
  var _rateBook : RateBook as RateBook
  var _currentLocation : Location as CurrentLocation

  construct(rateBook : RateBook, currentLocation : Location) {
    _rateBook = rateBook
    _currentLocation = currentLocation
  }

  function checkCurrentDataChange() {
    if((RateBook.updatedCalcRoutines.toSet().equals(RateBook.CalcRoutines.toSet()))) {
      CurrentLocation.commit()
    } else {
      throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.RoutinesChanged"))
    }
  }

  //warn user before click addtoratebook
  function addToRateBookAction(CheckedValues : CalcRoutineCodeAndVersion[]) {
    var groupsOfCodes = CheckedValues.partition(\ c -> c.Code)
    groupsOfCodes.eachKeyAndValue(\ s, l -> {
      if (l.Count > 1) {
        throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.AddingDuplicateCalcRoutines", s))
      }
    })
    var checkedRoutines = CheckedValues.map(\ c -> {
      var availableRoutines = RateBook.availableCalcRoutines(false)
      var idx = availableRoutines.countWhere(\ existRoutine -> c.isMatch(existRoutine))
      if(idx == 0 ){
        throw new DisplayableException(DisplayKey.get("Web.Rating.Errors.RateRoutineNoMoreExist", c.Code, c.Version))
      } else {
        return availableRoutines.singleWhere(\ cr -> c.isMatch(cr))
      }
    })
    RateBook.addCalcRoutines(checkedRoutines)
    PebblesUtil.invalidateIterators(CurrentLocation, CalcRoutineCodeAndVersion)
  }

  // Brute force required to get the RateTable list to let go of a table w/changed QueryStrategy
  function clearChanges(CheckedValues: RateTable[]) {
    for (tbl in CheckedValues) {
      if (tbl.isFieldChanged(RateTable#QueryStrategy)) {
        tbl.QueryStrategy = tbl.getOriginalValue(RateTable#QueryStrategy)
      }
    }
    PebblesUtil.invalidateIterators(CurrentLocation, RateTable)
  }
}