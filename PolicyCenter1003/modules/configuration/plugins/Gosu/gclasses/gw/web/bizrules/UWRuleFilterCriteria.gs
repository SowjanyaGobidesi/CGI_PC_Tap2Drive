package gw.web.bizrules

uses gw.api.database.ISelectQueryBuilder
uses gw.api.database.InOperation
uses gw.api.database.Queries
uses gw.api.database.Relop
uses gw.api.locale.DisplayKey
uses gw.api.util.LocaleUtil
uses gw.api.web.SessionVar
uses gw.bizrules.PCBizRulesNavigationSupport
uses gw.bizrules.management.FilterCriteria
uses gw.bizrules.management.RuleQueryFactory
uses gw.entity.IEntityType
uses gw.lang.reflect.features.PropertyReference

uses java.io.Serializable

@Export
class UWRuleFilterCriteria implements Serializable, FilterCriteria<UWRule> {
  static var _sessionVar = new SessionVar<UWRuleFilterCriteria>()

  var _jurisdiction: typekey.Jurisdiction as Jurisdiction
  var _job: typekey.Job as Job
  var _policyLine: typekey.PolicyLine as PolicyLine
  var _nameOrDescription: String as NameOrDescription
  var _availability: UWRuleAvailability as Availability
  var _defaultStatus: RuleQueryFactory<UWRule>
  var _status: RuleQueryFactory<UWRule> as Status
  var _availableStatuses: RuleQueryFactory<UWRule>[] as AvailableStatuses

  private construct(helper: UWRulesPageHelper) {
    var queryFactories = helper.RuleQueryFactories
    _defaultStatus = findDefaultStatus(queryFactories)
    _status = _defaultStatus
    _availableStatuses = queryFactories.toTypedArray()
    _availability = TC_ALL
  }

  static function  getInstance(helper: UWRulesPageHelper): UWRuleFilterCriteria {
    var instance = _sessionVar.get()
    if (instance == null) {
      instance = new UWRuleFilterCriteria(helper)
      _sessionVar.set(instance)
    }
    return instance
  }

  property get Specified(): boolean {
    return not(_nameOrDescription == null
        && _status == _defaultStatus
        && _availability == TC_ALL
        && _policyLine == null
        && _job == null
        && _jurisdiction == null
    )
  }

  function clear() {
    _nameOrDescription = null
    _status = _defaultStatus
    _availability = TC_ALL
    _policyLine = null
    _job = null
    _jurisdiction = null
  }

  function copyFrom(criteria: UWRuleFilterCriteria) {
    _nameOrDescription = criteria.NameOrDescription
    _status = criteria.Status
    _availability = criteria.Availability
    _policyLine = criteria.PolicyLine
    _job = criteria.Job
    _jurisdiction = criteria.Jurisdiction
  }

  function copy(helper: UWRulesPageHelper): UWRuleFilterCriteria {
    return new UWRuleFilterCriteria(helper){
        :Jurisdiction = Jurisdiction,
        :PolicyLine = PolicyLine,
        :Job = Job,
        :NameOrDescription = NameOrDescription,
        :Status = Status,
        :Availability = Availability
        }
  }

  function apply(query: ISelectQueryBuilder<UWRule>) {
    if (Specified) {

      if (Jurisdiction != null) {
        appCritMultiselectFilter(query, AppCritJurisdiction#Jurisdiction, Jurisdiction, AppCritJurisdiction#UWRule)
      }
      if (PolicyLine != null) {
        appCritMultiselectFilter(query, AppCritLineOfBusiness#PolicyLine, PolicyLine, AppCritLineOfBusiness#UWRule)
      }
      if (Job != null) {
        appCritMultiselectFilter(query, AppCritPolicyTransaction#Job, Job, AppCritPolicyTransaction#UWRule)
      }
      if (NameOrDescription != null && NameOrDescription.trim() != "") {
        query.or(\r -> {
          r.contains(Rule#Name, NameOrDescription, true)
          r.contains(Rule#Description, NameOrDescription, true)
        })
      }

      switch (Availability) {
        case TC_ALL:
          break
        case TC_AVAILABLE:
          query.compare(Rule#AvailableToRun, Relop.Equals, true)
          break
        case TC_UNAVAILABLE:
          query.compare(Rule#AvailableToRun, Relop.Equals, false)
          break
        case TC_INVALID:
          var invalid = Queries.createQuery(RuleValidationInfo).compare(RuleValidationInfo#Valid, Relop.Equals, false)
          query.subselect(Rule#ID, InOperation.CompareIn, invalid, RuleValidationInfo#Rule)
          query.compare(UWRule#ExternallyManaged, Relop.Equals, false)
          break
        case TC_VALID:
          var valid = Queries.createQuery(RuleValidationInfo).compare(RuleValidationInfo#Valid, Relop.Equals, true)
          query.or(\orRestriction -> {
            orRestriction.subselect(Rule#ID, InOperation.CompareIn, valid, RuleValidationInfo#Rule)
            orRestriction.compare(UWRule#ExternallyManaged, Relop.Equals, true)
          })
          break
        default:
          throw new IllegalAccessException("Unknown availability typekey: ${Availability.Code}")
      }
    }
  }

  private reified function appCritMultiselectFilter<E extends gw.pl.persistence.core.Bean, T>(
      query: ISelectQueryBuilder<UWRule>,
      filterProp: PropertyReference<E, T>,
      filterValue: T,
      ruleProperty: PropertyReference<E, UWRule>) {
    var tableQuery = Queries.createQuery<E>(E as IEntityType)
    var filterQuery = Queries.createQuery<E>(E as IEntityType).compare(filterProp, Equals, filterValue)
    query.and(\andRestr ->
        andRestr.or(\orRestr -> {
          orRestr.subselect(UWRule#ID, CompareIn, filterQuery, ruleProperty)
          orRestr.subselect(UWRule#ID, CompareNotIn, tableQuery, ruleProperty)
        })
    )
  }

  private function findDefaultStatus(queryFactories : List<RuleQueryFactory<UWRule>>) : RuleQueryFactory<UWRule> {
    var allLanguagesAllStatus = new ArrayList<String>()
    LocaleUtil.getAllLanguages().each(\languageType -> {
      var language = LocaleUtil.toLanguage(languageType)
      LocaleUtil.runAsCurrentLocaleAndLanguage(language, language, \-> allLanguagesAllStatus.add(DisplayKey.get("BizRules.RulesPage.Query.All")))
    })

    return queryFactories.singleWhere(\uwRule -> allLanguagesAllStatus.hasMatch(\elt -> elt == uwRule.DisplayName))
  }
}
