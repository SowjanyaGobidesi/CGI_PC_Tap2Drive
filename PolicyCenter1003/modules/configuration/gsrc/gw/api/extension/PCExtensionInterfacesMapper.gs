package gw.api.extension

uses gw.api.database.ISelectQueryBuilder
uses gw.api.domain.financials.TransactionFinderFactory
uses gw.api.domain.financials.TransactionFinderFactoryImpl
uses gw.api.productmodel.IProductExtensions
uses gw.api.rating.dtobased.DTORatingExtensions
uses gw.contact.AddressQueryBuilderExtendedRestrictions
uses gw.contact.AddressQueryBuilderExtensions
uses gw.contact.ContactQueryBuilderExtendedRestrictions
uses gw.contact.ContactQueryBuilderExtensions
uses gw.contact.PolicyContactRoleQueryBuilderExtendedRestrictions
uses gw.contact.PolicyContactRoleQueryBuilderExtensions
uses gw.currency.IMonetaryAmountExtensions
uses gw.entity.*
uses gw.exportimport.ExcelExporterFactoryImpl
uses gw.exportimport.ExcelFileWriter
uses gw.exportimport.ExportImportConfigurableConstants
uses gw.exportimport.IExcelExporterFactory
uses gw.exportimport.IExcelFileWriterExtensions
uses gw.exportimport.IExportImportConfigurableConstantsExtensions
uses gw.exportimport.entityimport.IImportStrategyRegistryExtensions
uses gw.exportimport.entityimport.ImportStrategyRegistry
uses gw.exportimport.resolver.ColumnDataResolverFactory
uses gw.exportimport.resolver.IColumnDataResolverFactoryExtensions
uses gw.financials.IPostedTransactionFinderExtensions
uses gw.financials.PostedTransactionFinder
uses gw.financials.jobtypes.JobType
uses gw.job.ICancellationProcess
uses gw.job.IJobProcess
uses gw.job.IJobProcessExtensions
uses gw.job.IJobProcessValidatorExtensions
uses gw.job.IQuoteHaltedExceptionFactory
uses gw.job.IRenewalProcess
uses gw.job.JobProcess
uses gw.job.JobProcessValidator
uses gw.job.QuoteHaltedException
uses gw.lob.ITaxLocationQueryBuilderFactory
uses gw.lob.ITerritoryLookupQueryBuilderFactory
uses gw.lob.common.TaxLocationQueryBuilder
uses gw.lob.common.TerritoryLookupQueryBuilder
uses gw.lob.cp.CPClassCodeSearchCriteria
uses gw.lob.ICPClassCodeSearchCriteriaFactory
uses gw.pcf.rating.flow.IRateRoutineParameterSetHelperFactory
uses gw.pcf.rating.flow.RateRoutineParameterSetHelper
uses gw.pcf.rating.rtm.IRateTableParameterSetHelperFactory
uses gw.pcf.rating.rtm.RateTableParameterSetHelper
uses gw.pl.persistence.core.Bean
uses gw.pl.persistence.core.Bundle
uses gw.policy.IPolicyPeriodValidationFactory
uses gw.policy.PolicyPeriodValidation
uses gw.question.IIncorrectAnswerChangedActionExtensions
uses gw.question.IncorrectAnswerChangedAction
uses gw.rating.flow.CalcRoutineRoundingMethod
uses gw.rating.flow.ICalcRoutineRoundingMethodExtensions
uses gw.rating.flow.util.IQueryUtilsExtensions
uses gw.rating.flow.util.QueryUtilsExtensionsImpl
uses gw.rating.impact.IImpactTestingSearchCriteriaExtensions
uses gw.rating.impact.ImpactTestingSearchCriteria
uses gw.rating.rtm.domain.OrderedPersistenceAdapter
uses gw.rating.rtm.domain.migration.IRateBookImportValidatorExtensions
uses gw.rating.rtm.domain.migration.RateBookImportValidator
uses gw.rating.rtm.domain.table.IRateTableCellExtensions
uses gw.rating.rtm.domain.table.RateTableCell
uses gw.rating.rtm.excel.ExcelAutoSizer
uses gw.rating.rtm.excel.IExcelAutoSizerExtensions
uses gw.rating.rtm.matchop.StatelessMatchOperator
uses gw.rating.rtm.query.IInterpolationStateExtensions
uses gw.rating.rtm.query.IInterpolationStateFactory
uses gw.rating.rtm.query.IRateBookMatcher
uses gw.rating.rtm.query.IRateBookQueryFilter
uses gw.rating.rtm.query.IRatingQueryFacadeExtensions
uses gw.rating.rtm.query.InterpolationState
uses gw.rating.rtm.query.RateBookMatcher
uses gw.rating.rtm.query.RateBookQueryFilter
uses gw.rating.rtm.query.RatingQueryFacade
uses gw.rating.rtm.util.IRatingUIUtilExtensions
uses gw.rating.rtm.util.RatingUIUtil
uses gw.rating.rtm.validation.RateTableDefinitionValidation
uses gw.rating.rtm.valueprovider.RateTableCellValueProvider
uses gw.rating.worksheet.IWorksheetConfigExtensions
uses gw.rating.worksheet.WorksheetConfig
uses gw.search.StringColumnRestrictor
uses gw.solr.ISolrPolicyDeleteRequestFactory
uses gw.solr.ISolrPolicyIndexDocumentExtensions
uses gw.solr.ISolrPolicyIndexRequestExtensions
uses gw.solr.ISolrPolicyIndexRequestFactory
uses gw.solr.ISolrPolicySearchCriteriaFactory
uses gw.solr.ISolrPolicySearchRequestFactory
uses gw.solr.SolrPolicyDeleteRequest
uses gw.solr.SolrPolicyIndexDocument
uses gw.solr.SolrPolicyIndexRequest
uses gw.solr.SolrPolicySearchCriteria
uses gw.solr.SolrPolicySearchRequest
uses gw.solr.utils.IPCSolrUtilsExtensions
uses gw.solr.utils.ISolrClientFactory
uses gw.solr.utils.PCSolrUtils
uses gw.solr.utils.SolrClient
uses gw.validation.IPCValidationResultFactory
uses gw.validation.PCValidationContext
uses gw.validation.PCValidationResultFactory
uses gw.web.productmodel.IProductModelSyncIssueWrapper
uses gw.web.productmodel.IProductModelSyncIssueWrapperExtensions
uses gw.web.productmodel.IProductModelSyncIssuesHandlerExtensions
uses gw.web.productmodel.ProductModelSyncIssuesHandler
uses org.apache.poi.xssf.usermodel.XSSFSheet
uses org.slf4j.Logger

uses java.lang.Comparable
uses java.util.Comparator
uses java.util.Date

/**
 * Extension interfaces mapper implementation.
 * <p/>
 * WARNING: Customers must never modify this mapping class file. Treat this file as read-only, despite the @Export
 * annotation that is in this file for internal reasons. However, you can edit the writable implementation classes
 * that this file references.
 */
@Export
class PCExtensionInterfacesMapper implements ExtensionInterfacesMapper {

  override function bindImplementations(config: ExtensionInterfacesConfig) {
    config.setImplementation<IRateBookImportValidatorExtensions>(\ book -> RateBookImportValidator.currentUserCanImportActiveRateBook(book))
    config.setImplementation<IJobProcessValidatorExtensions>(\ level -> JobProcessValidator.isSupportedValidationLevel(level))
    config.setImplementation<ISolrPolicyIndexRequestFactory>(\ -> new SolrPolicyIndexRequest())
    config.setImplementation<ISolrPolicyDeleteRequestFactory>(\ -> new SolrPolicyDeleteRequest())
    config.setImplementation<ITerritoryLookupQueryBuilderFactory>(\ -> new TerritoryLookupQueryBuilder())
    config.setImplementation<ICoverageExtensions>(\ coverage -> coverage.RICoverageGroupType)
    config.setImplementation<gw.contactmapper.ab900.IPCNameMapperExtensions>(new gw.contactmapper.ab900.PCNameMapperExtensionsImpl()) // 900 version
    config.setImplementation<gw.contactmapper.ab1000.IPCNameMapperExtensions>(new gw.contactmapper.ab1000.PCNameMapperExtensionsImpl()) // 1000 version
    config.setImplementation<IPolicyLocationExtensions>(\ policyLocation -> policyLocation.newBuilding())
    config.setImplementation<IPolicyPeriodValidationFactory>(\ valContext, branch -> new PolicyPeriodValidation(valContext, branch))
    config.setImplementation<IExcelFileWriterExtensions>(\ workbook, data, template -> ExcelFileWriter.saveExcelFile(workbook, data, template))
    config.setImplementation<IIncorrectAnswerChangedActionExtensions>(\ container, question, originalValue, newValue -> IncorrectAnswerChangedAction.execute(container, question, originalValue, newValue))
    config.setImplementation<ICPClassCodeSearchCriteriaFactory>(\ -> new CPClassCodeSearchCriteria())
    config.setImplementation<ICalcRoutineRoundingMethodExtensions>(\ -> CalcRoutineRoundingMethod.Type)
    config.setImplementation<IMonetaryAmountExtensions>(\ monetaryAmount, rate -> monetaryAmount.convertAndScale(rate))
    config.setImplementation<IImportStrategyRegistryExtensions>(\ entityType -> ImportStrategyRegistry.getStrategy(entityType))
    config.setImplementation<IJobProcessExtensions>(\ branch -> JobProcess.checkBranchAgainstProductModel(branch))
    config.setImplementation<ITaxLocationQueryBuilderFactory>(\ -> new TaxLocationQueryBuilder())
    config.setImplementation<ISolrPolicySearchRequestFactory>(\ searchCriteria -> new SolrPolicySearchRequest(searchCriteria as SolrPolicySearchCriteria))
    config.setImplementation<IInterpolationStateExtensions>(new InterpolationStateExtensionsImpl())
    config.setImplementation<ISolrPolicySearchCriteriaFactory>(\ -> new SolrPolicySearchCriteria())
    config.setImplementation<IProductModelSyncIssueWrapperExtensions>(\ wrappers: List<IProductModelSyncIssueWrapper>, provider -> wrappers.fixDuringQuoteIfNecessary(provider))
    config.setImplementation<IImpactTestingSearchCriteriaExtensions>(\ -> ImpactTestingSearchCriteria.getImpactTestingPageSize())
    config.setImplementation<IQuoteHaltedExceptionFactory>(\ issues: Collection<IProductModelSyncIssueWrapper> -> new QuoteHaltedException(issues))
    config.setImplementation<TransactionFinderFactory>(new TransactionFinderFactoryImpl())
    config.setImplementation<IRenewalExtensions>(\ renewal, period -> renewal.hasAnotherPendingPeriod(period))
    config.setImplementation<IProductExtensions>(\ product -> product.DiffTreeConfig)
    config.setImplementation<ISolrPolicyIndexRequestExtensions>(\ period -> SolrPolicyIndexRequest.effDatesForPeriod(period))
    config.setImplementation<ICancellationExtensions>(\ cancellation, inForcePeriod, refundCalcMethod -> cancellation.getEarliestEffectiveDate(inForcePeriod, refundCalcMethod))
    config.setImplementation<IPostedTransactionFinderExtensions>(\ thisPeriod -> PostedTransactionFinder.findPostedTransactions(thisPeriod))
    config.setImplementation<IRatingQueryFacadeExtensions>(new RatingQueryFacadeExtensionsImpl())
    config.setImplementation<IRatingUIUtilExtensions>(new RatingUIUtilExtensionsImpl())
    config.setImplementation<IInterpolationStateFactory>(\ ordered, tableDef, op, matchOpIndex, paramValues -> new InterpolationState(ordered, tableDef, op, matchOpIndex, paramValues))
    config.setImplementation<gw.webservice.pc.pc900.contact.IAddressServiceExtensions>(\ -> gw.webservice.pc.pc900.contact.AddressService.Instance) // 900 version
    config.setImplementation<gw.webservice.pc.pc1000.contact.IAddressServiceExtensions>(\ -> gw.webservice.pc.pc1000.contact.AddressService.Instance) // 1000 version
    config.setImplementation<IExportImportConfigurableConstantsExtensions>(new ExportImportConfigurableConstantsExtensionsImpl())
    config.setImplementation<IProductModelSyncIssuesHandlerExtensions>(\ coverables -> ProductModelSyncIssuesHandler.syncCoveragesAndFindIssues(coverables))
    config.setImplementation<IExcelExporterFactory>(new ExcelExporterFactoryImpl())
    config.setImplementation<ICostExtensions>(\ cost -> cost.SubjectToAccrual)
    config.setImplementation<IUWIssueExtensions>(new UWIssueExtensionsImpl())
    config.setImplementation<gw.webservice.pc.pc900.contact.IAddressDataExtensions>(\ address -> gw.webservice.pc.pc900.contact.AddressData.of(address)) // 900 version
    config.setImplementation<gw.webservice.pc.pc1000.contact.IAddressDataExtensions>(\ address -> gw.webservice.pc.pc1000.contact.AddressData.of(address)) // 1000 version
    config.setImplementation<IContactExtensions>(\ contact, address -> contact.removeOrDelinkAddress(address))
    config.setImplementation<IContactAddressExtensions>(\contactAddress -> contactAddress.NeedsNewExternalID)
    config.setImplementation<IAddressExtensions>(\address -> address.NeedsNewExternalID)
    config.setImplementation<gw.webservice.pc.pc900.contact.IAddressDataCopierFactory>(\ addressData, shouldCopyNulls -> new gw.webservice.pc.pc900.contact.AddressDataCopier(addressData as gw.webservice.pc.pc900.contact.AddressData, shouldCopyNulls)) // 900 version
    config.setImplementation<gw.webservice.pc.pc1000.contact.IAddressDataCopierFactory>(\ addressData, shouldCopyNulls -> new gw.webservice.pc.pc1000.contact.AddressDataCopier(addressData as gw.webservice.pc.pc1000.contact.AddressData, shouldCopyNulls)) // 1000 version
    config.setImplementation<ISolrPolicyIndexDocumentExtensions>(\ period, contact -> SolrPolicyIndexDocument.createDocument(period, contact))
    config.setImplementation<IPolicyPeriodExtensions>(new PolicyPeriodExtensionsImpl())
    config.setImplementation<ISolrClientFactory>(\ -> new SolrClient())
    config.setImplementation<IPCSolrUtilsExtensions>(new PCSolrUtilsExtensionsImpl())
    config.setImplementation<IColumnDataResolverFactoryExtensions>(\ -> ColumnDataResolverFactory.Instance)
    config.setImplementation<IWorksheetConfigExtensions>(new WorksheetConfigExtensionsImpl())
    config.setImplementation<IQueryUtilsExtensions>(new QueryUtilsExtensionsImpl())
    config.setImplementation<IRateTableCellExtensions>(new RateTableCellExtensionsImpl())
    config.setImplementation<IExcelAutoSizerExtensions>(new ExcelAutoSizerExtensionsImpl())
    config.setImplementation<IRateTableParameterSetHelperFactory>(\ tableDefinition -> new RateTableParameterSetHelper(tableDefinition))
    config.setImplementation<IRateRoutineParameterSetHelperFactory>(\ rateRoutine -> new RateRoutineParameterSetHelper(rateRoutine))
    config.setImplementation<PolicyContactRoleQueryBuilderExtensions>(new PolicyContactRoleQueryBuilderExtensionsImpl())
    config.setImplementation<AddressQueryBuilderExtensions>(new AddressQueryBuilderExtensionsImpl())
    config.setImplementation<ContactQueryBuilderExtensions>(new ContactQueryBuilderExtensionsImpl())
    config.setImplementation<DTORatingExtensions>(\ line -> line.Branch.getProductModifierFactor())
    config.setImplementation<IPCValidationResultFactory>(new PCValidationResultFactory())
  }

  private static class InterpolationStateExtensionsImpl implements IInterpolationStateExtensions {
    override function findHighestScoringRow(comparator: Comparator<OrderedPersistenceAdapter>, factorRows: List<OrderedPersistenceAdapter>): OrderedPersistenceAdapter {
      return InterpolationState.findHighestScoringRow(comparator, factorRows)
    }

    override function getComparator(matchOps: List<StatelessMatchOperator>, numActiveOps: int, params: Comparable[]): Comparator<OrderedPersistenceAdapter> {
      return InterpolationState.getComparator(matchOps, numActiveOps, params)
    }
  }

  private static class RatingQueryFacadeExtensionsImpl implements IRatingQueryFacadeExtensions {
    override function matchRateBook(filter: IRateBookQueryFilter, matchers: List<IRateBookMatcher>): List<RateBook> {
      return RatingQueryFacade.matchRateBook(filter as RateBookQueryFilter, matchers as List<RateBookMatcher>)
    }

    override function matchers(filter: IRateBookQueryFilter): List<IRateBookMatcher> {
      return RatingQueryFacade.matchers(filter as RateBookQueryFilter)
    }

    override function latestActiveBook(books: List<RateBook>): RateBook {
      return RatingQueryFacade.latestActiveBook(books)
    }

    override function matchLatestActiveRateBook(filter: IRateBookQueryFilter, matchers: List<IRateBookMatcher>): RateBook {
      return RatingQueryFacade.matchLatestActiveRateBook(filter as RateBookQueryFilter, matchers as List<RateBookMatcher>)
    }
  }

  private static class RatingUIUtilExtensionsImpl implements IRatingUIUtilExtensions {
    override function getTypekeysForTypelist(selectedTypelist: String): List<TypeKey> {
      return RatingUIUtil.getTypekeysForTypelist(selectedTypelist)
    }

    override property get TypekeyPrefix(): String {
      return RatingUIUtil.TypekeyPrefix
    }
  }

  private static class ExportImportConfigurableConstantsExtensionsImpl implements IExportImportConfigurableConstantsExtensions {
    override property get MAX_VALIDATED_ROWS(): int {
      return ExportImportConfigurableConstants.MAX_VALIDATED_ROWS
    }

    override property get ADDITIONAL_UNLOCKED_COLUMNS(): int {
      return ExportImportConfigurableConstants.ADDITIONAL_UNLOCKED_COLUMNS
    }
  }

  private static class UWIssueExtensionsImpl implements IUWIssueExtensions {
    override function getNonCurrencyReferenceValue(uwIssue: UWIssue): String {
      return uwIssue.NonCurrencyReferenceValue
    }

    override function setNonCurrencyReferenceValue(uwIssue: UWIssue, value: String) {
      uwIssue.NonCurrencyReferenceValue = value
    }

    override function getApprovalValueCurrency(uwIssue: UWIssue): Currency {
      return uwIssue.ApprovalValueCurrency
    }

    override function createApprovalHistoryFromCurrentValues(uwIssue: UWIssue): UWIssue {
      return uwIssue.createApprovalHistoryFromCurrentValues()
    }
  }

  private static class PolicyPeriodExtensionsImpl implements IPolicyPeriodExtensions {
    override function getJobProcess(policyPeriod: PolicyPeriod): IJobProcess {
      return policyPeriod.JobProcess
    }

    override function getCancellationProcess(policyPeriod: PolicyPeriod): ICancellationProcess {
      return policyPeriod.CancellationProcess
    }

    override function getRenewalProcess(policyPeriod: PolicyPeriod): IRenewalProcess {
      return policyPeriod.RenewalProcess
    }

    override function getAllModifiables(policyPeriod: PolicyPeriod): Modifiable[] {
      return policyPeriod.AllModifiables
    }

    override function getAllCoverables(policyPeriod: PolicyPeriod): Coverable[] {
      return policyPeriod.AllCoverables
    }

    override function doesBusinessAutoLineExist(policyPeriod: PolicyPeriod): boolean {
      return policyPeriod.BusinessAutoLineExists
    }

    override function getBusinessAutoLine(policyPeriod: PolicyPeriod): entity.BusinessAutoLine {
      return policyPeriod.BusinessAutoLine
    }

    override function getCPLine(policyPeriod: PolicyPeriod): entity.CommercialPropertyLine {
      return policyPeriod.CPLine
    }

    override function getCoverageEndDate(policyPeriod: PolicyPeriod): Date {
      return policyPeriod.getCoverageEndDate()
    }

    override function editIfRatedOrQuoted(policyPeriod: PolicyPeriod) {
      policyPeriod.editIfRatedOrQuoted()
    }

    override function getValidationLevel(policyPeriod: PolicyPeriod): ValidationLevel {
      return policyPeriod.ValidationLevel
    }

    override function validatePeriod(policyPeriod: PolicyPeriod, level: ValidationLevel): PCValidationContext {
      return policyPeriod.validatePeriod(level)
    }

    override function getRatingStyle(policyPeriod: PolicyPeriod): RatingStyle {
      return policyPeriod.RatingStyle
    }

    override function isUWLockedAndNoOverride(policyPeriod: PolicyPeriod): boolean {
      return policyPeriod.UWLockedAndNoOverride
    }

    override function isWithinValidPeriod(policyPeriod: PolicyPeriod, date: Date): boolean {
      return policyPeriod.isWithinValidPeriod(date)
    }

    override function determineJobType(policyPeriod: PolicyPeriod, subjectToReporting: boolean, whenWritten: boolean): JobType {
      return policyPeriod.determineJobType(subjectToReporting, whenWritten)
    }

    override function getStartOfRatedTerm(policyPeriod: PolicyPeriod): Date {
      return policyPeriod.StartOfRatedTerm
    }
  }

  private static class PCSolrUtilsExtensionsImpl implements IPCSolrUtilsExtensions {
    override property get Logger(): Logger {
      return PCSolrUtils.Logger
    }

    override function shouldIndexPeriod(period: PolicyPeriod): boolean {
      return PCSolrUtils.shouldIndexPeriod(period)
    }

    override function getBeanFromBundle(bean: KeyableBean, bundle: Bundle): KeyableBean {
      return PCSolrUtils.getBeanFromBundle(bean, bundle)
    }
  }

  private static class WorksheetConfigExtensionsImpl implements IWorksheetConfigExtensions {
    override property get IncludeTimestamps(): boolean {
      return WorksheetConfig.IncludeTimestamps
    }

    override property get IncludePseudoCodeAsComment(): boolean {
      return WorksheetConfig.IncludePseudoCodeAsComment
    }
  }

  private static class ExcelAutoSizerExtensionsImpl implements IExcelAutoSizerExtensions {

    override property get TABLE_AUTO_SIZE_THRESHOLD(): int {
      return ExcelAutoSizer.TABLE_AUTO_SIZE_THRESHOLD
    }

    override function autoSizeForLargeRateTables(worksheet: XSSFSheet) {
      ExcelAutoSizer.autoSizeForLargeRateTables(worksheet)
    }
  }

  private static class RateTableCellExtensionsImpl implements IRateTableCellExtensions {

    override reified function getValueRange<T extends Comparable>(rateTableCell: RateTableCell<T>, vp: RateTableCellValueProvider): List<T> {
      return rateTableCell.getValueRange(vp)
    }
  }

  private static class PolicyContactRoleQueryBuilderExtensionsImpl implements PolicyContactRoleQueryBuilderExtensions {
    override function restrictCompanyNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor: StringColumnRestrictor, value: String) {
      PolicyContactRoleQueryBuilderExtendedRestrictions.restrictCompanyNameKanjiInternal(selectQueryBuilder, restrictor, value);
    }

    override function restrictFirstNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor: StringColumnRestrictor, value: String) {
      PolicyContactRoleQueryBuilderExtendedRestrictions.restrictFirstNameKanjiInternal(selectQueryBuilder, restrictor, value);
    }

    override function restrictLastNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor: StringColumnRestrictor, value: String) {
      PolicyContactRoleQueryBuilderExtendedRestrictions.restrictLastNameKanjiInternal(selectQueryBuilder, restrictor, value);
    }
  }

  private static class AddressQueryBuilderExtensionsImpl implements AddressQueryBuilderExtensions {
    override function restrictAddressLine1KanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor: StringColumnRestrictor, value: String) {
      AddressQueryBuilderExtendedRestrictions.restrictAddressLine1KanjiInternal(selectQueryBuilder, restrictor, value);
    }

    override function restrictAddressLine2KanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor: StringColumnRestrictor, value: String) {
      AddressQueryBuilderExtendedRestrictions.restrictAddressLine2KanjiInternal(selectQueryBuilder, restrictor, value);
    }

    override function restrictCityKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor: StringColumnRestrictor, value: String) {
      AddressQueryBuilderExtendedRestrictions.restrictCityKanjiInternal(selectQueryBuilder, restrictor, value);
    }
  }

  private static class ContactQueryBuilderExtensionsImpl implements ContactQueryBuilderExtensions {
    override function restrictFirstNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor: StringColumnRestrictor, value: String) {
      ContactQueryBuilderExtendedRestrictions.restrictFirstNameKanjiInternal(selectQueryBuilder, restrictor, value);
    }

    override function restrictLastNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor: StringColumnRestrictor, value: String) {
      ContactQueryBuilderExtendedRestrictions.restrictLastNameKanjiInternal(selectQueryBuilder, restrictor, value);
    }

    override function restrictNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor: StringColumnRestrictor, value: String) {
      ContactQueryBuilderExtendedRestrictions.restrictNameKanjiInternal(selectQueryBuilder, restrictor, value);
    }

    override function restrictParticleInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor: StringColumnRestrictor, value: String) {
      ContactQueryBuilderExtendedRestrictions.restrictParticleInternal(selectQueryBuilder, restrictor, value);
    }
  }
}
