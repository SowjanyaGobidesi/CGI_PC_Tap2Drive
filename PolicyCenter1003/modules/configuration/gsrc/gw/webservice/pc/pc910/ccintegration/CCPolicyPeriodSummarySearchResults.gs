package gw.webservice.pc.pc910.ccintegration

uses gw.account.AccountQueryBuilder
uses gw.api.address.AddressJurisdictionHandler
uses gw.api.database.IQuery
uses gw.api.database.IQueryBeanResult
uses gw.api.productmodel.ProductLookup
uses gw.api.web.producer.ProducerUtil
uses gw.api.web.product.ProducerCodePickerUtil
uses gw.contact.ContactQueryBuilder
uses gw.contact.PolicyContactRoleQueryBuilder
uses gw.job.JobQueryBuilder
uses gw.policy.PolicyPeriodSummaryQueryBuilder
uses gw.policy.PolicyQueryBuilder
uses gw.policy.PolicyTermQueryBuilder
uses gw.search.NameCriteriaImpl
uses gw.webservice.pc.pc910.ccintegration.entities.types.complex.CCPCSearchCriteria

/**
 * This should only be used for integration between CC and PC in the CCPolicySearchIntegration
 */
@Export
class CCPolicyPeriodSummarySearchResults {
  private var _ccCriteria : CCPCSearchCriteria
  private var _nameCriteria : NameCriteriaImpl

  construct(ccCriteria : CCPCSearchCriteria) {
    _ccCriteria = ccCriteria == null ? new CCPCSearchCriteria() : ccCriteria
    _nameCriteria = new NameCriteriaImpl()
    _nameCriteria.FirstName = _ccCriteria.FirstName
    _nameCriteria.FirstNameKanji = _ccCriteria.FirstNameKanji
    _nameCriteria.LastName = _ccCriteria.LastName
    _nameCriteria.LastNameKanji = _ccCriteria.LastNameKanji
    _nameCriteria.CompanyName = _ccCriteria.CompanyName
    _nameCriteria.CompanyNameKanji = _ccCriteria.CompanyNameKanji
    _nameCriteria.OfficialId = _ccCriteria.TaxID
  }

  private property get HasPrimaryInsuredAddressCriteria() : boolean {
    return _ccCriteria.PrimaryInsuredCity.NotBlank
        or _ccCriteria.PrimaryInsuredCityKanji.NotBlank
        or _ccCriteria.PrimaryInsuredPostalCode.NotBlank
        or _ccCriteria.PrimaryInsuredState != null
        or _ccCriteria.PrimaryInsuredCountry != null
  }

  private function configureContactNormalSearch() : PolicyPeriodSummaryQueryBuilder {
    var builder = setupPolicyPeriodSummaryQueryBuilder()
    if (_nameCriteria.HasAnyNameCriteria or HasPrimaryInsuredAddressCriteria) {
      var contactQueryBuilder = new ContactQueryBuilder()
      if (_nameCriteria.HasAnyNameCriteria) {
        _nameCriteria.configureFromNameCriteria(contactQueryBuilder)
      }
      if (HasPrimaryInsuredAddressCriteria) {
        configurePrimaryInsuredAddressCritieria(contactQueryBuilder, builder)
      }
      builder.withPolicyContactRole(new PolicyContactRoleQueryBuilder().withSubtype(TC_POLICYPRINAMEDINSURED).withContactDenorm(contactQueryBuilder))
    }
    return builder
  }

  private function configureContactWithRevisionedSearch() : PolicyPeriodSummaryQueryBuilder {
    var builder : PolicyPeriodSummaryQueryBuilder
    if (_nameCriteria.HasAnyNameCriteria) {
      var policyContactRoleQueryBuilder = _nameCriteria.configureFromNameCriteria(new PolicyContactRoleQueryBuilder().withSubtype(TC_POLICYPRINAMEDINSURED))
      builder = setupPolicyPeriodSummaryQueryBuilder()
      builder.withPolicyContactRole(policyContactRoleQueryBuilder)

      if (HasPrimaryInsuredAddressCriteria or _nameCriteria.OfficialId.NotBlank) {
        var contactQueryBuilder = new ContactQueryBuilder()
        policyContactRoleQueryBuilder.withContactDenorm(contactQueryBuilder)

        if (HasPrimaryInsuredAddressCriteria) {
          configurePrimaryInsuredAddressCritieria(contactQueryBuilder, builder)
        }
        if (_nameCriteria.OfficialId.NotBlank) {
          contactQueryBuilder.withOfficialId(_nameCriteria.OfficialId)
        }
      }
    }
    return builder
  }

  private function configureContactWithIncludeArchiveSearch() : PolicyPeriodSummaryQueryBuilder {
    var builder : PolicyPeriodSummaryQueryBuilder
    if ((_nameCriteria.HasAnyNameCriteria or HasPrimaryInsuredAddressCriteria) and _ccCriteria.IncludeArchived) {
      builder = setupPolicyPeriodSummaryQueryBuilder()
      var contactQueryBuilder = new ContactQueryBuilder()
      _nameCriteria.configureFromNameCriteria(contactQueryBuilder)
      if (HasPrimaryInsuredAddressCriteria) {
        configurePrimaryInsuredAddressCritieria(contactQueryBuilder, builder)
      }
      builder.withPrimaryNamedInsuredContactDenorm(contactQueryBuilder)
    }
    return builder
  }

  private function configurePrimaryInsuredAddressCritieria(contactQueryBuilder : ContactQueryBuilder, builder : PolicyPeriodSummaryQueryBuilder) {
    var country = Country.get(_ccCriteria.PrimaryInsuredCountry)
    var state = State.get(_ccCriteria.PrimaryInsuredState)
    var jurisdiction = AddressJurisdictionHandler.getJurisdiction(state, country)

    contactQueryBuilder.withCityDenormStarting(_ccCriteria.PrimaryInsuredCity)
        .withCityKanjiDenormStarting(_ccCriteria.PrimaryInsuredCityKanji)
        .withStateDenorm(state)
        .withPostalCodeDenormStarting(_ccCriteria.PrimaryInsuredPostalCode)
        .withCountryDenorm(country)

    if (_ccCriteria.PrimaryInsuredState != null) {
      builder.withBaseState(jurisdiction)
    }
  }

  private function configurePolicyQueryBuilder(builder : PolicyPeriodSummaryQueryBuilder) {
    var productCode = ProductLookup.getByPublicID(_ccCriteria.ProductCode)
    if (productCode != null or _ccCriteria.AccountNumber != null) {
      var policyBuilder = new PolicyQueryBuilder()
      policyBuilder.withProduct(productCode)
      if (_ccCriteria.AccountNumber != null) {
        policyBuilder.withAccount(new AccountQueryBuilder().withAccountNumber(_ccCriteria.AccountNumber))
      }
      builder.withPolicy(policyBuilder)
    }
  }

  private function setupPolicyPeriodSummaryQueryBuilder() : PolicyPeriodSummaryQueryBuilder {
    var builder = new PolicyPeriodSummaryQueryBuilder()

    builder.withMostRecentModel(true)  // in force
    builder.withAsOfDate(_ccCriteria.AsOfDate)
    builder.withPolicyNumber(_ccCriteria.PolicyNumber)
    builder.withPolicyPeriodStatus(PolicyPeriodStatus.get(_ccCriteria.PolicyStatus))
    builder.withProducer(ProducerUtil.convertValueFromString(_ccCriteria.ProducerString, null))
    builder.withProducerCode(ProducerCodePickerUtil.convertValueFromString(_ccCriteria.ProducerCodeString, null))

    configurePolicyQueryBuilder(builder)

    if (not _ccCriteria.IncludeArchived) {
      builder.withPolicyTerm(new PolicyTermQueryBuilder().withPolicyTermArchiveState(TC_NOTARCHIVED))
    }

    var nonRenewalCode = NonRenewalCode.get(_ccCriteria.NonRenewalCode)
    if (nonRenewalCode != null) {
      builder.withMostRecentModel(false)
      builder.withJob(new JobQueryBuilder().withNonRenewalCode(nonRenewalCode))
    }

    return builder
  }

  private function unionResultSet(query1 : IQuery, query2 : IQuery) : IQuery {
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
    return union;
  }

  function results() : IQueryBeanResult<PolicyPeriodSummary> {
    var normalBuilder = configureContactNormalSearch()
    var revisionedBuilder = configureContactWithRevisionedSearch()
    var archivedBuilder = configureContactWithIncludeArchiveSearch()

    var results = unionResultSet(unionResultSet(normalBuilder.build(), revisionedBuilder?.build()), archivedBuilder?.build()).select()
    return results as IQueryBeanResult<PolicyPeriodSummary>
  }
}