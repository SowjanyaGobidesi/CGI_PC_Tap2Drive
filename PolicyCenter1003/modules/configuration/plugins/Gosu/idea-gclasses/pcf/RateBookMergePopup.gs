package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateBookMergePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateBookMergePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (book1 :  RateBook, book2 :  RateBook) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateBookMergePopup, {book1, book2}, 0)
  }
  
  static function push (book1 :  RateBook, book2 :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBookMergePopup, {book1, book2}, 0).push()
  }
  
  
}