package gw.pcf.rating.ratebook

uses gw.api.util.DisplayableException
uses pcf.RateBookMergePopup
uses gw.api.locale.DisplayKey

@Export
class RateBookSearchResultsUIHelper {


  function beginMerge(books : RateBook[]) {
    validateMerge(books)
    RateBookMergePopup.push(books[0], books[1])
  }

  function delete(books : RateBook[]) {
    validateDelete(books)
    books.each(\cv ->cv.removeRateBook())
    gw.transaction.Transaction.getCurrent().commit()
  }

  function validateMerge(books : RateBook[]) {
    if (books.Count != 2) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.RateBooks.Errors.MergeValidation.MustSelectTwoRateBooks"))
    }

    //If it gets to this line there should be only two RateBooks in the list
    if (books[0].PolicyLine != books[1].PolicyLine) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.RateBooks.Errors.MergeValidation.MustBeSamePolicyLine"))
    }
  }

  function validateDelete(books: RateBook[]) {
    if (books.where( \ elt -> elt.Status != TC_DRAFT).HasElements) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.RateBooks.Errors.DeleteValidation.CanOnlyDeleteDraftBooks"))
    }
    if (books.where(\book -> book.ExportLock).HasElements) {
      throw new DisplayableException(DisplayKey.get("Web.Rating.RateBooks.Errors.DeleteValidation.CannotDeleteBooksLockedForExport"))
    }
  }


}