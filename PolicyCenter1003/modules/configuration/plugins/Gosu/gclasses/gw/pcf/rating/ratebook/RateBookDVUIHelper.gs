package gw.pcf.rating.ratebook

uses gw.api.locale.DisplayKey
uses java.util.Date
uses gw.rating.GenericRateBookFieldSearch
uses gw.util.Pair

@Export
class RateBookDVUIHelper {
  var _rateBook: RateBook as RateBook

  construct(rateBook : RateBook) {
    _rateBook = rateBook
  }

  property get StatusChangeDateLabel() : String {
    return RateBook.isActive()
        ? DisplayKey.get("Web.Rating.RateBooks.ActivationDate")
        : DisplayKey.get("Web.Rating.RateBooks.LastStatusChangeDate")
  }

  property get PolicyLineWrapper() : String {
    return _rateBook.PolicyLine ?: GenericRateBookFieldSearch.GENERIC_POLICY_LINE_CODE
  }

  property set PolicyLineWrapper(policyLine : String) {
    _rateBook.PolicyLine = policyLine == GenericRateBookFieldSearch.GENERIC_POLICY_LINE_CODE
        ? null
        : policyLine
  }

  property get BookJurisdictionWrapper() : Pair<String, Jurisdiction> {
    var jurisdictionName = _rateBook.BookJurisdiction?.DisplayName ?: DisplayKey.get("Web.Rating.Filter.Generic")
    return new Pair<String, Jurisdiction>(jurisdictionName, _rateBook.BookJurisdiction)
  }

  property set BookJurisdictionWrapper(jurisdictionPair : Pair<String, Jurisdiction>) {
    _rateBook.BookJurisdiction = jurisdictionPair.Second
  }

  property get UWCompanyWrapper() : Pair<String, UWCompany> {
    var uwCompanyName = _rateBook.UWCompany?.DisplayName ?: DisplayKey.get("Web.Rating.Filter.Generic")
    return new Pair<String, UWCompany>(uwCompanyName, _rateBook.UWCompany)
  }

  property set UWCompanyWrapper(uwCompanyPair : Pair<String, UWCompany>) {
    _rateBook.UWCompany = uwCompanyPair.Second
  }

  property get BookOfferingWrapper() : String {
    return _rateBook.BookOffering ?: gw.rating.GenericRateBookFieldSearch.GENERIC_OFFERING_CODE
  }

  property set BookOfferingWrapper(offering : String) {
    _rateBook.BookOffering = offering == gw.rating.GenericRateBookFieldSearch.GENERIC_OFFERING_CODE
        ? null
        : offering
  }

  function possiblyAutoPopulateRenewalEffectiveDate() {
    if (RateBook.RenewalEffectiveDate == null)
      RateBook.RenewalEffectiveDate = RateBook.EffectiveDate
  }

  function checkDateIsEarlierThanBefore(targetDate : Date) : String {
    if (RateBook.ExpirationDate == null) {return null}
    if (targetDate != null and RateBook.ExpirationDate <= targetDate) {
      return DisplayKey.get("Web.Rating.RateBooks.DateIsNotEarlierThanBefore", DisplayKey.get("Web.Rating.RateBooks.RenewalEffectiveDate.Before"))
    }
    return null
  }

  function checkBeforeOccursLaterThanPolicyEffectiveDateOrRenewalEffectiveDate() : String {
    if (RateBook.ExpirationDate == null) {
      return null
    }
    if ((RateBook.EffectiveDate != null and RateBook.ExpirationDate <= RateBook.EffectiveDate) or
        (RateBook.RenewalEffectiveDate != null and RateBook.ExpirationDate <= RateBook.RenewalEffectiveDate)) {
      return DisplayKey.get("Web.Rating.RateBooks.BeforeMustBeLaterThanOnOrAfter", DisplayKey.get("Web.Rating.RateBooks.EffectiveDate.After"))
    }
    return null
  }

  property get AreRateTablesReferenced() : Boolean {
    var rateTables = _rateBook.RateTables.where( \ elt -> not elt.Owned)
    return rateTables.IsEmpty?false:true
  }

  function makeRateTablesOwned() {
    var rtFromBundle: RateTable
    gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
      _rateBook.RateTables.each( \ rt -> {
        if(not rt.Owned){
          rtFromBundle = bundle.add(rt)
          rtFromBundle.makeOwned()
        }
      })
    })
  }

  function displayMakeOwnedIcon() : boolean {
    return _rateBook.isStage() and AreRateTablesReferenced
  }

}