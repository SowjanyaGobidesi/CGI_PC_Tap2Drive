package gw.policy

uses com.guidewire._generated.security.AuditPermKeys
uses com.guidewire._generated.security.CancellationPermKeys
uses com.guidewire._generated.security.IssuancePermKeys
uses com.guidewire._generated.security.PolicyChangePermKeys
uses com.guidewire._generated.security.PolicyPeriodPermKeys
uses com.guidewire._generated.security.ReinstatementPermKeys
uses com.guidewire._generated.security.RenewalPermKeys
uses com.guidewire._generated.security.RewriteNewAccountPermKeys
uses com.guidewire._generated.security.RewritePermKeys
uses com.guidewire._generated.security.SubmissionPermKeys
uses com.guidewire.pl.system.security.PermissionKey
uses entity.Contact
uses gw.account.AccountQueryBuilder
uses gw.api.archive.PCArchivingUtil
uses gw.api.database.IQuery
uses gw.api.database.IQueryBeanResult
uses gw.api.database.QueryOptimizers
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.Product
uses gw.api.system.PCConfigParameters
uses gw.api.util.DisplayableException
uses gw.contact.ContactQueryBuilder
uses gw.contact.PolicyContactRoleQueryBuilder
uses gw.job.JobQueryBuilder
uses gw.job.audit.AuditInformationQueryBuilder
uses gw.search.EntitySearchCriteria
uses gw.search.NameCriteriaImpl
uses pcf.AssignUserRoleOwnerPopup

/**
 * Search criteria supporting the policy/job search pages.
 * <p>
 * Note:  Name searches must search both contact and revisioned data
 * for the periods.  This is done as a UNION query where the one branch
 * restricts against the referenced contact in any period and the other
 * branch restricts against the revisioned data in any bound period.
 */
@Export
class PolicyPeriodSearchCriteria extends EntitySearchCriteria<PolicyPeriodSummary> implements gw.search.NameCriteria {

  /**
   * Enumerates the different ways to search for a PolicyPeriod with the PolicyPeriodSearchCriteria and encapsulates
   * the varying behavior.
   */
  enum PolicyPeriodSearchType {

    Cancellation("Web.PolicySearch.PolicyPeriodSearchType.Cancellation", CancellationPermKeys.VIEW, TC_JOBEXCLUSIVE, TC_CANCELLATION),
    FinalAudit("Web.PolicySearch.PolicyPeriodSearchType.FinalAudit", AuditPermKeys.VIEW, TC_JOBEXCLUSIVE, TC_AUDIT, TC_FINALAUDIT),
    Issuance("Web.PolicySearch.PolicyPeriodSearchType.Issuance", IssuancePermKeys.VIEW, TC_JOBEXCLUSIVE, TC_ISSUANCE, null, null),
    Policy("Web.PolicySearch.PolicyPeriodSearchType.Policy", PolicyPeriodPermKeys.VIEW, TC_POLICYEXCLUSIVE, null, null, \ pps -> entity.Policy.finder.findPolicyByPolicyNumber(pps.PolicyNumber)),
    PolicyChange("Web.PolicySearch.PolicyPeriodSearchType.PolicyChange", PolicyChangePermKeys.VIEW, TC_JOBEXCLUSIVE, TC_POLICYCHANGE),
    PremiumReport("Web.PolicySearch.PolicyPeriodSearchType.PremiumReport", AuditPermKeys.VIEW, TC_JOBEXCLUSIVE, TC_AUDIT, TC_PREMIUMREPORT),
    Reinstatement("Web.PolicySearch.PolicyPeriodSearchType.Reinstatement", ReinstatementPermKeys.VIEW, TC_JOBEXCLUSIVE, TC_REINSTATEMENT),
    Renewal("Web.PolicySearch.PolicyPeriodSearchType.Renewal", RenewalPermKeys.VIEW, TC_JOBEXCLUSIVE, TC_RENEWAL),
    Rewrite("Web.PolicySearch.PolicyPeriodSearchType.Rewrite", RewritePermKeys.VIEW, TC_JOBEXCLUSIVE, TC_REWRITE),
    RewriteNewAccount("Web.PolicySearch.PolicyPeriodSearchType.RewriteNewAccount", RewriteNewAccountPermKeys.VIEW, TC_JOBEXCLUSIVE, TC_REWRITENEWACCOUNT),
    Submission("Web.PolicySearch.PolicyPeriodSearchType.Submission", SubmissionPermKeys.VIEW, TC_JOBEXCLUSIVE, TC_SUBMISSION)

    static property get CopyPolicyDataValues() : List<PolicyPeriodSearchType> {
      return {Policy, Submission, PolicyChange, Renewal, Rewrite, RewriteNewAccount}
    }

    var _displaykeyString : String
    var _permissionKey : PermissionKey as readonly PermissionKey
    var _multipleAssignmentCategory : UserRoleConstraint as readonly MultipleAssignmentCategory
    var _jobSubtype : typekey.Job as readonly JobSubtype
    var _auditScheduleType : AuditScheduleType as readonly AuditScheduleType
    var _mapPolicyPeriodSummaryToUserRoleOwner : block(PolicyPeriodSummary) : UserRoleOwner = \ pps -> pps.Job

    private construct(displayKeyString : String,
                      permissionKey: PermissionKey,
                      multipleAssignmentCategory : UserRoleConstraint,
                      jobSubtype: typekey.Job,
                      auditScheduleType : AuditScheduleType = null,
                      mapOverride : block(PolicyPeriodSummary) : UserRoleOwner = null) {
      _displaykeyString = displayKeyString
      _permissionKey = permissionKey
      _multipleAssignmentCategory = multipleAssignmentCategory
      _jobSubtype = jobSubtype
      _auditScheduleType = auditScheduleType
      if (mapOverride != null) {
        _mapPolicyPeriodSummaryToUserRoleOwner = mapOverride
      }
    }

    /**
     * Maps a <code>PolicyPeriodSummary</code> array to an <code>UserRoleOwner</code> array. By default, this maps
     * to the period's job, but other enums (e.g. Policy) may behave differently.
     */
    function mapPolicyPeriodSummariesToUserRoleOwners(policyPeriodSummaries : PolicyPeriodSummary[]) : UserRoleOwner[] {
      return policyPeriodSummaries.map(\pps -> _mapPolicyPeriodSummaryToUserRoleOwner(pps))
    }

    property get DateFieldsSearchType() : List<DateFieldsToSearchType> {
      return AuditSearch ? DateFieldsToSearchType.TF_AUDITSEARCHTYPES.TypeKeys : DateFieldsToSearchType.TF_NONAUDITSEARCHTYPES.TypeKeys
    }

    property get AuditSearch() : boolean {
      return _jobSubtype == TC_AUDIT
    }

    property get PolicySearch() : boolean {
      return this == Policy
    }

    override function toString() : String {
      return DisplayKey.get(_displaykeyString)
    }

  }

  /**
   * If true, the search criteria uses producer code security to limit the results to jobs and policy periods that
   * are viewable by the user.
   */
  var _secure : boolean as Secure = false

  /**
   * If true, includes archived policy periods in the search.
   */
  var _includeArchived: boolean as IncludeArchived = false

  /**
   * Account number to search on.
   */
  var _accountNumber: String as AccountNumber

  /**
   * PolicyNumber to search on.
   */
  var _policyNumber: String as PolicyNumber

  /**
   * Search on policy periods of a specific Product.
   */
  var _product: Product as Product                      // The Product for which to search

  var _asOfDate: java.util.Date as AsOfDate                           // POLICY ONLY: As Of Date for which to search. Only applies to policy searches; ignored for job searches.

  var _primaryInsuredCity: String as PrimaryInsuredCity              // Primary Insured city for which to search
  var _primaryInsuredState: State as PrimaryInsuredState             // Primary Insured state for which to search.
  var _primaryInsuredPostalCode: String as PrimaryInsuredPostalCode  // Primary Insured postal code for which to search
  var _primaryInsuredCountry : Country as PrimaryInsuredCountry      // Primary Insured country for which to search.
  var _primaryInsuredPhone : String as PrimaryInsuredPhone           // PrimaryInsured Phone number for which to search
  var _primaryInsuredCityKanji : String as PrimaryInsuredCityKanji   // Primary Insured city in Kanji for which to search

  var _jobNumber: String as JobNumber                             // Job number for which to search.
  var _jobOpen: boolean as JobOpen = false                        // Search for only open jobs if true.  Search for all jobs otherwise.
  var _multiVersionSearch: boolean as MultiVersionSearch = false  // Search multiple versions of a job instead of only searching for the selected one. Ignored for policy searches.  // todo mky: change this to "OnlyJobSelectedVersion"

  var _searchType: PolicyPeriodSearchType as SearchObjectType = Policy  // Distinguishes between various job types (e.g., Submission, Cancellations) and Policies  // todo mky rename to SearchType
  var _permissiveSearch : boolean as PermissiveSearch = true  // Use the most permissive search possible. May cause performance problems if set to true. Setting this to false may break legacy behavior.
  var _state: Jurisdiction as State // State that policy-associated contacts are in.
  var _ignoreSubmissionPolicyNumber : boolean as IgnoreSubmissionPolicyNumber = true  // If true, ignores the PolicyNumber field if the SearchObjectType is set to Submission

  var _cancellationReasonCode: ReasonCode as CancelReasonCode                     // Cancellation reason codes; filter on CancelSource
  var _cancellationRefundCalcMethod: CalculationMethod as CancelRefundCalcMethod  // The method use to calculate the amount of refund due
  var _cancellationSource : CancellationSource as CancelSource                    // Party that initiated cancellation (carrier or insures)

  var _dateCriteria : DateCriteria as DateCriteria = new DateCriteria()  // use the non-persistent entity and maybe replace it in the future with a Gosu class

  delegate _nameCriteria represents gw.search.NameCriteria
  var _taxId : String as TaxId          // The contact's tax identification number.
  var _name : String as Name            // The last name or the first name.
  var _nameKanji : String as NameKanji
  var _accountHolderContact : Contact as AccountHolder  // The account holder for which to search.  If specified, any name criteria will be ignored.

  var _actualAuditMethod : AuditMethod as ActualAuditMethod // The actual audit method used in auditInformation

  var _producer : Organization as Producer  // The organization for which to search
  var _producerCode : ProducerCode as ProducerCode  //Searching against the producer code
  var _excludedPolicyPeriod : PolicyPeriod as ExcludedPolicyPeriod // A policy period to exclude from the search results.

  var _assignedRisk : boolean as AssignedRisk // Flag for policy/risk assigned by state requirement
  var _uwCompany : UWCompany as UWCompany //Underwriting company that insures this policy
  var _rejectReason : ReasonCode as RejectReason  // The reason that this job was declined
  var _nonRenewalCode : NonRenewalCode as NonRenewalCode // NonRenewal reason codes

  var _securityUser = User.util.CurrentUser
  var _archiveEnabled = PCArchivingUtil.isArchiveEnabled()

  construct() {
    _nameCriteria = new NameCriteriaImpl()
  }

  static property get MaxSearchResults() : int {
    return PCConfigParameters.PolicySearchMaxResult.Value
  }

  internal property set SecurityUser(value : User) {  // internally accessible for testing
    _securityUser = value
  }

  internal property get SecurityUser() : User {  // internally accessible for testing
    return _securityUser
  }

  internal property get ArchiveEnabled() : boolean {  // internally accessible for testing
    return _archiveEnabled
  }

  internal property set ArchiveEnabled(value : boolean) {  // internally accessible for testing
    _archiveEnabled = value
  }

  override protected property get InvalidSearchCriteriaMessage(): String {
    return null
  }

  override protected property get MinimumSearchCriteriaMessage(): String {
    return MeetsMinimumSearchCriteria ? null : DisplayKey.get("Web.Policy.MinimumSearchCriteria")
  }

  protected property get MeetsMinimumSearchCriteria() : boolean {
    return _nameCriteria.OfficialId.NotBlank
        or _accountNumber.NotBlank
        or _policyNumber.NotBlank
        or _primaryInsuredPhone.NotBlank
        or (_producer != null and not User.util.CurrentUser.ExternalUser) // Producer is force-populated for external users and therefore ignored
        or _producerCode != null
        or _jobNumber.NotBlank
        or AnyKanjiNameNotBlank
        or MeetsMinimumCompanyNameCriteria
        or (MeetsMinimumPersonNameCriteria and (_nameCriteria.LastNameExact or MeetsMinimumLocationCriteria or _permissiveSearch))
  }

  protected property get MeetsMinimumCompanyNameCriteria() : boolean {
    return _nameCriteria.CompanyName.NotBlank and (_nameCriteria.CompanyNameExact or _nameCriteria.CompanyName.length >= 5 or _permissiveSearch)
  }

  protected property get MeetsMinimumPersonNameCriteria() : boolean {
    return isNotBlankAndLongEnoughOrExactMatching(_nameCriteria.FirstName, 3, _nameCriteria.FirstNameExact)
        and isNotBlankAndLongEnoughOrExactMatching(_nameCriteria.LastName, 3, _nameCriteria.LastNameExact)
  }

  protected property get MeetsMinimumLocationCriteria() : boolean {
    return (PrimaryInsuredCityNotBlank and _primaryInsuredState != null) or _primaryInsuredPostalCode.NotBlank
  }

  protected property get AnyKanjiNameNotBlank() : boolean {
    return _nameCriteria.CompanyNameKanji.NotBlank or _nameCriteria.FirstNameKanji.NotBlank or  _nameCriteria.LastNameKanji.NotBlank
  }

  protected property get PrimaryInsuredCityNotBlank() : boolean {
    return _primaryInsuredCity.NotBlank or _primaryInsuredCityKanji.NotBlank
  }

  protected function isNotBlankAndLongEnoughOrExactMatching(value: String, minLength: int, exactMatching: boolean) : boolean {
    return value.NotBlank and (value.length >= minLength or exactMatching)
  }

  protected override function doSearch(): IQueryBeanResult<gw.pl.persistence.core.Bean> {
    var normalBuilder     = makeQueryBuilderForNormalSearches()
    var revisionedBuilder = makeQueryBuilderForRevisionedNameSearches()
    var archivedBuilder   = makeQueryBuilderForArchivedNameSearches()
    var results = unionResultSet(unionResultSet(normalBuilder.build(), revisionedBuilder?.build()), archivedBuilder?.build()).select()
    return limitResultCount(results)
  }

  /**
   * Add the normal restrictions, and then search for name and primary insured address criteria on the contact table
   * via the policy contact roles.
   */
  protected function makeQueryBuilderForNormalSearches() : PolicyPeriodSummaryQueryBuilder {
    var builder = configurePolicyPeriodSummaryQueryBuilder(new PolicyPeriodSummaryQueryBuilder())
    if (HasAnyNameCriteria or HasPrimaryInsuredAddressCriteria) {
      // The normal builder adds name and primary insured address criteria on the contact table via the policy contact roles.
      var contactQueryBuilder = new ContactQueryBuilder()
      if (HasAnyNameCriteria) {
        configureFromNameCriteria(contactQueryBuilder)
      }
      if (HasPrimaryInsuredAddressCriteria) {
        configureContactQueryBuilderWithPrimaryInsuredAddress(contactQueryBuilder)
      }
      builder.withPolicyContactRole(new PolicyContactRoleQueryBuilder().withSubtype(TC_POLICYPRINAMEDINSURED).withContactDenorm(contactQueryBuilder))
    }
    return builder
  }

  /**
   * Make a query builder to search for revisioned name searches. It returns null if there's no need for such searches,
   * which happens when there are no revisioned fields specified in the name criteria.
   * If it creates a query builder, it adds the normal restrictions, and then searches for the name criteria within
   * the policy contact roles' internal fields. It then adds the primary insured address criteria on the contact table
   * via the policy contact roles.
   */
  protected function makeQueryBuilderForRevisionedNameSearches() : PolicyPeriodSummaryQueryBuilder {
    var builder : PolicyPeriodSummaryQueryBuilder
    if (HasAnyNameCriteriaOtherThanOfficialID) {
      var policyContactRoleQueryBuilder = _nameCriteria.configureFromNameCriteria(new PolicyContactRoleQueryBuilder().withSubtype(TC_POLICYPRINAMEDINSURED))  // this method doesn't handle OfficialID
      builder = configurePolicyPeriodSummaryQueryBuilder(new PolicyPeriodSummaryQueryBuilder())
          .withPolicyContactRole(policyContactRoleQueryBuilder)
      if (HasPrimaryInsuredAddressCriteria or _nameCriteria.OfficialId.NotBlank) {
        var contactQueryBuilder = new ContactQueryBuilder()
        policyContactRoleQueryBuilder.withContactDenorm(contactQueryBuilder)
        if (HasPrimaryInsuredAddressCriteria) {
          configureContactQueryBuilderWithPrimaryInsuredAddress(contactQueryBuilder)
        }
        if (_nameCriteria.OfficialId.NotBlank) {
          contactQueryBuilder.withOfficialId(_nameCriteria.OfficialId)
        }
      }
    }
    return builder
  }

  /**
   * Make a query builder that includes archived policies. It returns null if there's no need for such searches.
   * If it creates a query builder, it adds the normal restrictions, and then searches for the name and primary
   * insured address criteria on the contact table via the primary named insured contact denorm (this is different
   * from how the normal searches get to the contact table).
   */
  protected function makeQueryBuilderForArchivedNameSearches() : PolicyPeriodSummaryQueryBuilder {
    var builder : PolicyPeriodSummaryQueryBuilder
    if ((HasAnyNameCriteria or HasPrimaryInsuredAddressCriteria) and _includeArchived) {
      var contactQueryBuilder = new ContactQueryBuilder()
      if (HasAnyNameCriteria) {
        configureFromNameCriteria(contactQueryBuilder)
      }
      if (HasPrimaryInsuredAddressCriteria) {
        configureContactQueryBuilderWithPrimaryInsuredAddress(contactQueryBuilder)
      }
      builder = configurePolicyPeriodSummaryQueryBuilder(new PolicyPeriodSummaryQueryBuilder())
          .withPrimaryNamedInsuredContactDenorm(contactQueryBuilder)
    }
    return builder
  }

  protected function configureContactQueryBuilderWithPrimaryInsuredAddress(contactQueryBuilder : ContactQueryBuilder) : ContactQueryBuilder {
    return contactQueryBuilder.withCityDenormStarting(_primaryInsuredCity)
        .withCityKanjiDenormStarting(_primaryInsuredCityKanji)
        .withStateDenorm(_primaryInsuredState)
        .withPostalCodeDenormStarting(_primaryInsuredPostalCode)
        .withCountryDenorm(_primaryInsuredCountry)
        .withWorkPhone(_primaryInsuredPhone)
  }

  protected function unionResultSet(query1 : IQuery, query2 : IQuery) : IQuery {
    if (query1 == null and query2 == null) {
      throw new java.lang.IllegalArgumentException("query1 and query2 cannot both be null")
    }
    if (query1 == null) {
      return query2
    }
    if (query2 == null) {
      return query1
    }
    var union = query1.union(query2)
    if (PCConfigParameters.DisableIndexFastFullScanForPolicySearch.Value) {
      union.getRawQuery().addOptimizer(QueryOptimizers.createDisableIndexFastFullScan())
    }
    if (PCConfigParameters.DisableHashJoinPolicySearch.Value) {
      union.getRawQuery().addOptimizer(QueryOptimizers.createDisableHashJoin())
    }
    if (PCConfigParameters.DisableSortMergeJoinPolicySearch.Value) {
      union.getRawQuery().addOptimizer(QueryOptimizers.createDisableSortMergeJoin())
    }
    return union;
  }

  protected function limitResultCount(results : IQueryBeanResult) : IQueryBeanResult {
    if (results.getCountLimitedBy(MaxSearchResults + 1) > MaxSearchResults) {
      throw new DisplayableException((new com.guidewire.pl.system.locale.DisplayKey("Java.Search.TooManyResults")).localize({MaxSearchResults}))
    }
    return results
  }

  protected function configurePolicyPeriodSummaryQueryBuilder(builder : PolicyPeriodSummaryQueryBuilder) : PolicyPeriodSummaryQueryBuilder {
    if (_searchType == Policy) {
      builder.withMostRecentModel(true)  // in force
          .withAsOfDate(_asOfDate)
    } else {
      var jobQueryBuilder = new JobQueryBuilder()
          .isOpen(_jobOpen ? true : null)  // we either search for open jobs, or don't care
          .withJobNumber(_jobNumber)
          .cast(_searchType.JobSubtype)

      builder.withJob(jobQueryBuilder)
          .withOnlyJobSelectedVersion(!_multiVersionSearch)
          .withExcludedPolicyPeriod(_excludedPolicyPeriod)

      if (_searchType == Cancellation) {
        jobQueryBuilder.withCancellationReasonCode(_cancellationReasonCode)
            .withCancellationSource(_cancellationSource)
        builder.withRefundCalcMethod(_cancellationRefundCalcMethod)
      }

      if (_searchType == Submission) {
        jobQueryBuilder.withSubmissionReasonCode(_rejectReason)
      }

      if (_searchType == Renewal) {
        jobQueryBuilder.withNonRenewalCode(_nonRenewalCode)
      }

      if (_searchType.JobSubtype == TC_AUDIT) {
        var auditInformationQueryBuilder = new AuditInformationQueryBuilder()
        jobQueryBuilder.withAuditInformation(auditInformationQueryBuilder)
        auditInformationQueryBuilder.withAuditScheduleType(_searchType.AuditScheduleType)
            .withActualAuditMethod(_actualAuditMethod)
        // the date criteria stuff would be cleaner without the non-persistent entity, but go with it for now
        if (_dateCriteria.Set) {
          var dateRange = _dateCriteria.getDateRangeToSearch()
          if (_dateCriteria.DateFieldToSearch == TC_AUDITDUEDATE) {
            auditInformationQueryBuilder.withDueDateWithin(dateRange.BeginDate, dateRange.EndDate)
          } else if (_dateCriteria.DateFieldToSearch == TC_AUDITPERIODENDDATE) {
            auditInformationQueryBuilder.withAuditPeriodEndDateWithin(dateRange.BeginDate, dateRange.EndDate)
          }
        }
      } else {
        if (_dateCriteria.Set) {
          if (_dateCriteria.DateFieldToSearch == TC_EFFECTIVEDATE) {
            var dateRange = _dateCriteria.getDateRangeToSearch()
            builder.withEditEffectiveDateWithin(dateRange.BeginDate, dateRange.EndDate)
          } else if (_dateCriteria.DateFieldToSearch == TC_CREATIONDATE) {
            var dateRange = _dateCriteria.getDateRangeToSearch()
            if (_searchType == Submission) {
              jobQueryBuilder.withSubmissionDateWithin(dateRange.BeginDate, dateRange.EndDate)
            } else {
              jobQueryBuilder.withCreateTimeWithin(dateRange.BeginDate, dateRange.EndDate)
            }
          }
        }
      }
    }

    builder.withProducer(_producer).withProducerCode(_producerCode)
    if (_secure) {
      builder.withProducerCodeSecurityFor(_securityUser, _searchType.PermissionKey)
    }

    if (_searchType != Submission or !_ignoreSubmissionPolicyNumber) {
      builder.withPolicyNumber(_policyNumber)
    }

    if (_product != null or _accountNumber != null) {
      var policyQueryBuilder = new PolicyQueryBuilder()
      policyQueryBuilder.withProduct(_product)
      if (_accountNumber != null) {
        policyQueryBuilder.withAccount(new AccountQueryBuilder().withAccountNumber(_accountNumber))
      }
      builder.withPolicy(policyQueryBuilder)
    }

    // Use ANY(ARRAY()) function on PostgreSQL when searching on Contact but not PolicyNumber or AccountNumber
    if (_accountNumber.NotBlank or _policyNumber.NotBlank) {
      builder.withUseAnyArrayForPolicyContactRoleSearch(false)
    }

    builder.withBaseState(_state)
      .withAssignedRisk(_assignedRisk)
      .withUWCompany(_uwCompany)

    if (!_includeArchived and _archiveEnabled) {
      builder.withPolicyTerm(new PolicyTermQueryBuilder().withPolicyTermArchiveState(TC_NOTARCHIVED))
    }

    return builder
  }

  protected property get HasPrimaryInsuredAddressCriteria() : boolean {
    return _primaryInsuredCity.NotBlank
        or _primaryInsuredCityKanji.NotBlank
        or _primaryInsuredPostalCode.NotBlank
        or _primaryInsuredState != null
        or _primaryInsuredCountry != null
        or _primaryInsuredPhone.NotBlank
  }

  //---------- Miscellaneous functionality

  /**
   * Used to reset the search for search items, typically after a search failure.
   */
  function resetForSearchItems(policyPeriodSearchType : PolicyPeriodSearchType, searchText : String) {
    this.SearchObjectType = policyPeriodSearchType
    if (policyPeriodSearchType == Policy) {
      this.PolicyNumber = searchText
      this.JobNumber = null
    } else {
      this.PolicyNumber = null
      this.JobNumber = searchText
    }
  }

  property get DateFieldsSearchType() : List<DateFieldsToSearchType> {
    return _searchType.DateFieldsSearchType
  }

  /**
   * Returns the appropriate PolicySearch LV mode to use in the UI.
   */
  property get ResultsLVMode() : String {
    return AuditSearch ? "Audit" : this.SearchObjectType.name()
  }

  property get AuditSearch() : boolean {
    return _searchType.AuditSearch
  }

  property get PolicySearch() : boolean {
    return _searchType.PolicySearch
  }

  static function getIncludeArchivedLabel(value : boolean): String {
    return value ? DisplayKey.get("Web.PolicySearch.ArchivedChoices.IncludeArchived") : DisplayKey.get("Web.PolicySearch.ArchivedChoices.ExcludeArchived")
  }

  function jumpToAssignUserRoleOwnerPopup(periodSummaries: PolicyPeriodSummary[], role: typekey.UserRole) {
    AssignUserRoleOwnerPopup.push(_searchType.mapPolicyPeriodSummariesToUserRoleOwners(periodSummaries), role)
  }

}
