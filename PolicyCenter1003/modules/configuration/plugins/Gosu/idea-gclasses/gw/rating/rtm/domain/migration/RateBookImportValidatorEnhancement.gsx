package gw.rating.rtm.domain.migration

enhancement RateBookImportValidatorEnhancement: RateBookImportValidator {
  static function currentUserCanImportActiveRateBook(book : RateBook) : boolean {
    return book.Status != TC_ACTIVE or perm.System.ratebookapprove
  }
}
