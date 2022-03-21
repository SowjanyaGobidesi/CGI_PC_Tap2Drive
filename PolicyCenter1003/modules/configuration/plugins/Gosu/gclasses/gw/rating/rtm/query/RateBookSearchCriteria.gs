package gw.rating.rtm.query

uses java.util.Date
uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.search.EntitySearchCriteria
uses gw.rating.GenericRateBookFieldSearch
uses gw.util.Pair

@Export
class RateBookSearchCriteria extends EntitySearchCriteria<RateBook> implements GenericRateBookFieldSearch {
  var _policyLine : String as PolicyLine
  var _code : String
  var _name : String
  var _uwCompany : Pair<String, UWCompany> as UWCompany
  var _jurisdiction : Pair<String, Jurisdiction> as Jurisdiction
  var _offering : String
  var _status : typekey.RateBookStatus as Status
  var _effectiveDate: Date as EffectiveDate
  var _beforeDate : Boolean as BeforeDate
  var _lastStatusChangeDate: Date as LastStatusChangeDate
  
  construct() {
    _code = ""
    _name = ""
    _beforeDate = true
  }

  property set BookCode(code : String) {
    _code = code ?: ""
  }
  
  property get BookCode() : String {
    return _code
  }
  
  property set BookName(name : String) {
    _name = name ?: ""
  }
  
  property get BookName() : String {
    return _name
  }
  
  property set BookOffering(offering : String) {    
    _offering = offering ?: ""
  }

  property get BookOffering() : String {
    return _offering
  }
  
  protected override function doSearch() : IQueryBeanResult<RateBook> {
    var query = Query.make(RateBook)

    if (BookCode.NotBlank)                      query.contains(RateBook#BookCode, BookCode, true)
    if (BookName.NotBlank)                      query.contains(RateBook#BookName, BookName, true)
    if (Status.Code.NotBlank)                   query.compare(RateBook#Status, Equals, Status)
    if (!BeforeDate and EffectiveDate != null)  query.compare(RateBook#EffectiveDate, GreaterThanOrEquals, EffectiveDate)
    if (BeforeDate and EffectiveDate != null)   query.compare(RateBook#EffectiveDate, LessThanOrEquals, EffectiveDate)
    if (LastStatusChangeDate != null)           query.compare(RateBook#LastStatusChangeDate, GreaterThanOrEquals, LastStatusChangeDate)

    if (PolicyLine.NotBlank) {
      if (PolicyLine == GENERIC_POLICY_LINE_CODE) {
        query.compare(RateBook#PolicyLine, Equals, null)
      } else {
        query.compare(RateBook#PolicyLine, Equals, PolicyLine)
      }
    }

    if (BookOffering.NotBlank) {
      if (BookOffering == GENERIC_OFFERING_CODE) {
        query.compare(RateBook#BookOffering, Equals, null)
      } else {
        query.compare(RateBook#BookOffering, Equals, BookOffering)
      }
    }

    if (UWCompany != null) {
      query.compare(RateBook#UWCompany, Equals, UWCompany.Second)
    }

    if (Jurisdiction != null) {
      query.compare(RateBook#BookJurisdiction, Equals, Jurisdiction.Second)
    }

    return query.select()
  }

  override protected property get InvalidSearchCriteriaMessage() : String {
    return null
  }

  override protected property get MinimumSearchCriteriaMessage() : String {
    return null
  }

}
