package gw.pcf.rating.rtm

uses gw.rating.rtm.RateBookMerge.conflictStatus

uses java.lang.IllegalStateException
uses gw.rating.rtm.NullableRadioValueWrapper
uses gw.api.locale.DisplayKey

@Export
class RateBookMergeUIHelper {

  public final static var CONFLICT_ICON : String = "conflict"
  public final static var MODIFIED_ONLY_IN_BOOK1_ICON: String = "edited_left"
  public final static var MODIFIED_ONLY_IN_BOOK2_ICON : String  = "edited_right"
  public final static var ONLY_IN_BOOK1_ICON : String = "conflict_exists_left"
  public final static var ONLY_IN_BOOK2_ICON : String  = "conflict_exists_right"
  public final static var NO_CONFLICT_ICON : String = "completed"

  var _book1 : RateBook
  var _book2 : RateBook

  construct(book1 : RateBook, book2: RateBook ) {
    _book1 = book1
    _book2 = book2
  }

  function getIcon(status : conflictStatus) : String {
    switch (status) {
      case IDENTICAL:
        return NO_CONFLICT_ICON

      case ONLY_IN_BOOK1:
        return ONLY_IN_BOOK1_ICON

      case ONLY_IN_BOOK2:
        return ONLY_IN_BOOK2_ICON

      case MODIFIED_ONLY_IN_BOOK1:
          return MODIFIED_ONLY_IN_BOOK1_ICON

      case MODIFIED_ONLY_IN_BOOK2:
          return MODIFIED_ONLY_IN_BOOK2_ICON

      case CONFLICT:
        return CONFLICT_ICON

      default:
        throw new IllegalStateException("There is no such conflict status: " + status)
    }
  }

  function getIconToolTip(status : conflictStatus) : String {
    switch (status) {
      case IDENTICAL:
          return DisplayKey.get("Web.Rating.RateBooks.Merge.Identical")

      case ONLY_IN_BOOK1:
          return DisplayKey.get("Web.Rating.RateBooks.Merge.FirstRateBook")

      case ONLY_IN_BOOK2:
          return DisplayKey.get("Web.Rating.RateBooks.Merge.SecondRateBook")

      case MODIFIED_ONLY_IN_BOOK1:
          return DisplayKey.get("Web.Rating.RateBooks.Merge.FirstRateBookModified")

      case MODIFIED_ONLY_IN_BOOK2:
          return DisplayKey.get("Web.Rating.RateBooks.Merge.SecondRateBookModified")

      case CONFLICT:
          return DisplayKey.get("Web.Rating.RateBooks.Merge.MergeInstructions")

      default:
        throw new IllegalStateException("There is no such conflict status: " + status)
    }
  }

  function getPossibleValues(propertyName : String): List<NullableRadioValueWrapper> {
    if (_book1.getFieldValue(propertyName) == _book2.getFieldValue(propertyName)) {
      return {new NullableRadioValueWrapper(_book1.getFieldValue(propertyName))}
    } else {
      return {new NullableRadioValueWrapper(_book1.getFieldValue(propertyName)), new NullableRadioValueWrapper(_book2.getFieldValue(propertyName))}
    }
  }

  function getRateBookPropertyIcons(propertyName : String) : String {
    if (_book1.getFieldValue(propertyName) == _book2.getFieldValue(propertyName)) {
      return NO_CONFLICT_ICON
    } else {
      return CONFLICT_ICON
    }
  }

  function getRateBookPropertyIconToolTip(propertyName : String) : String {
    if (_book1.getFieldValue(propertyName) == _book2.getFieldValue(propertyName)) {
      return DisplayKey.get("Web.Rating.RateBooks.Merge.Identical")
    } else {
      return DisplayKey.get("Web.Rating.RateBooks.Merge.MergeInstructions")
    }
  }

  function getRoutineOrTableOptionLabel(status : conflictStatus, itemName : String) : String {
    switch (status) {
      case IDENTICAL:
      case CONFLICT:
      case MODIFIED_ONLY_IN_BOOK1:
      case MODIFIED_ONLY_IN_BOOK2:
          return itemName

      case ONLY_IN_BOOK1:
          return DisplayKey.get("Web.Rating.RateBooks.Merge.OnlyInBook1OptionLabel", itemName)

      case ONLY_IN_BOOK2:
          return DisplayKey.get("Web.Rating.RateBooks.Merge.OnlyInBook2OptionLabel", itemName)

      default:
          throw new IllegalStateException("There is no such conflict status: " + status)
    }
  }
}