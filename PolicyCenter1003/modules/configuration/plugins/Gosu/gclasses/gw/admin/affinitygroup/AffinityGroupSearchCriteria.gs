package gw.admin.affinitygroup

uses gw.api.locale.DisplayKey
uses gw.api.database.Query
uses java.util.Date
uses gw.api.productmodel.Product
uses gw.api.util.DisplayableException
uses gw.search.EntitySearchCriteria
uses gw.api.database.IQueryBeanResult

@Export
class AffinityGroupSearchCriteria extends EntitySearchCriteria<AffinityGroup> {

  var _affinityGroupName: String as AffinityGroupName
  var _affinityGroupNameKanji: String as AffinityGroupNameKanji
  var _organization: String as Organization
  var _groupType: AffinityGroupType as AffinityGroupType
  var _producerCode: String as ProducerCode
  var _product: Product as Product
  var _jurisdiction: Jurisdiction as Jurisdiction
  var _onlyAvailableGroups: boolean as OnlyAvailableGroups
  var _startDate: Date as AffinityGroupStartDate
  var _endDate: Date as AffinityGroupEndDate

  override function doSearch() : IQueryBeanResult<AffinityGroup> {
    var query = constructBaseQuery()
    return query.select() as IQueryBeanResult<AffinityGroup>
  }

  function performExactSearch() : IQueryBeanResult<AffinityGroup> {
    var query = constructBaseQuery()
    return query.select() as IQueryBeanResult<AffinityGroup>
  }

  private function constructBaseQuery(): Query {
    var groupQuery = Query.make(AffinityGroup)
    if (this.AffinityGroupName != null) {
      groupQuery.contains(AffinityGroup#Name, this.AffinityGroupName.trim(), true)
    }
    if (this.AffinityGroupNameKanji != null) {
      groupQuery.contains(AffinityGroup#NameKanji, this.AffinityGroupNameKanji.trim(), true)
    }
    if (this.Organization != null) {
      var orgSubQuery = Query.make(entity.Organization)
      orgSubQuery.compare(entity.Organization#Name, Equals, this.Organization)
      groupQuery.or(\r1 -> {
        r1.compare(AffinityGroup#Organization, Equals, null)
        r1.subselect(AffinityGroup#Organization, CompareIn, orgSubQuery, entity.Organization#ID)
      })
    }
    if (this.AffinityGroupType != null) {
      groupQuery.compare(AffinityGroup#AffinityGroupType, Equals, this.AffinityGroupType)
    }
    if (ProducerCode != null) {
      var prodCodeSubQuery = Query.make(AffinityGroupProducerCode)
      prodCodeSubQuery.join(AffinityGroupProducerCode#ProducerCode).startsWith(
          entity.ProducerCode.CODE_PROP.get(), ProducerCode, true)
      groupQuery.and(\r1 ->
        r1.or(\r2 -> {
          r2.subselect(AffinityGroup#ID, CompareNotIn, AffinityGroupProducerCode#AffinityGroup)
          r2.subselect(AffinityGroup#ID, CompareIn, prodCodeSubQuery, AffinityGroupProducerCode#AffinityGroup)
        })
      )
    }
    if (Product != null) {
      var productSubQuery = Query.make(AffinityGroupProduct)
      productSubQuery.compare(AffinityGroupProduct#ProductCode, Equals, Product.PublicID)
      groupQuery.and(\r1 ->
        r1.or(\r2 -> {
          r2.subselect(AffinityGroup#ID, CompareNotIn, AffinityGroupProduct#AffinityGroup)
          r2.subselect(AffinityGroup#ID, CompareIn, productSubQuery, AffinityGroupProduct#AffinityGroup)
        })
      )
    }
    if (Jurisdiction != null) {
      var jurisdictionSubQuery = Query.make(AffinityGroupJurisdiction)
      jurisdictionSubQuery.compare(AffinityGroupJurisdiction#Jurisdiction, Equals, Jurisdiction)
      groupQuery.and(\r1 ->
        r1.or(\r2 -> {
          r2.subselect(AffinityGroup#ID, CompareNotIn, AffinityGroupJurisdiction#AffinityGroup)
          r2.subselect(AffinityGroup#ID, CompareIn, jurisdictionSubQuery, AffinityGroupJurisdiction#AffinityGroup)
        })
      )
    }
    if (AffinityGroupStartDate != null) {
      groupQuery.and(\r1 ->
        r1.or(\r2 -> {
          r2.compare(AffinityGroup#StartDate, Equals, null)
          r2.compare(AffinityGroup#StartDate, LessThanOrEquals, AffinityGroupStartDate)
        })
      )
    }
    if (AffinityGroupEndDate != null) {
      groupQuery.and(\r1 ->
        r1.or(\r2 -> {
          r2.compare(AffinityGroup#EndDate, Equals, null)
          r2.compare(AffinityGroup#EndDate, GreaterThanOrEquals, AffinityGroupEndDate)
        })
      )
    }
    if (this.OnlyAvailableGroups) {
      if (AffinityGroupStartDate != null || AffinityGroupEndDate != null) {
        throw new DisplayableException(DisplayKey.get("Web.PolicyLine.Validation.OnlyAvailableGroupPropertyNotSearchable"))
      }
      var today = Date.Today
      groupQuery.and(\r1 -> {
        r1.or(\r2 -> {
          r2.compare(AffinityGroup#StartDate, Equals, null)
          r2.compare(AffinityGroup#StartDate, LessThanOrEquals, today)
        })
        r1.or(\r2 -> {
          r2.compare(AffinityGroup#EndDate, Equals, null)
          r2.compare(AffinityGroup#EndDate, GreaterThanOrEquals, today)
        })
      })
    }
    return groupQuery
  }

  override property get InvalidSearchCriteriaMessage(): String {
    return null
  }

  override property get MinimumSearchCriteriaMessage(): String {
    return null
  }
}
