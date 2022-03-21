package gw.web.bizrules

uses gw.api.locale.DisplayKey
uses gw.bizrules.pcf.RuleComparisonRow
uses gw.bizrules.pcf.RuleVersionComparisonController
uses gw.entity.TypeKey
uses pcf.api.Location

@Export
class UWRuleVersionComparisonHelper extends RuleVersionComparisonController {

  final var _nameRow : RuleComparisonRow<String> as readonly NameRow
  final var _codeRow: RuleComparisonRow<String> as readonly CodeRow
  final var _checkingSetRow: RuleComparisonRow<TypeKey> as readonly CheckingSetRow
  final var _blockingPointRow: RuleComparisonRow<TypeKey> as readonly BlockingPointRow
  final var _defaultDurationRow: RuleComparisonRow<TypeKey> as readonly DefaultDurationRow
  final var _contextRow: RuleComparisonRow<TypeKey> as readonly ContextRow
  final var _descriptionRow: RuleComparisonRow<String> as readonly DescriptionRow
  final var _availableToRunRow: RuleComparisonRow<Boolean> as readonly AvailableToRunRow

  final var _jurisdictionRow: RuleComparisonRow<String[]> as readonly JurisdictionRow
  final var _policyLineRow: RuleComparisonRow<String[]> as readonly PolicyLineRow
  final var _policyTransactionRow: RuleComparisonRow<String[]> as readonly PolicyTransactionRow
  final var _startDateRow: RuleComparisonRow<Date> as readonly StartDateRow
  final var _endDateRow: RuleComparisonRow<Date> as readonly EndDateRow

  final var _autoApprovableRow: RuleComparisonRow<Boolean> as readonly AutoApprovableRow
  final var _defaultEditBeforeBindRow: RuleComparisonRow<Boolean> as readonly DefaultEditBeforeBindRow
  final var _defaultApprovalBlockingPointRow: RuleComparisonRow<TypeKey> as readonly DefaultApprovalBlockingPointRow
  final var _comparatorRow: RuleComparisonRow<TypeKey> as readonly ComparatorRow
  final var _valueFormatterTypeRow: RuleComparisonRow<TypeKey> as readonly ValueFormatterTypeRow
  final var _defaultValueAssignmentTypeRow: RuleComparisonRow<TypeKey> as readonly DefaultValueAssignmentTypeRow
  final var _defaultValueOffsetAmountRow: RuleComparisonRow<String> as readonly DefaultValueOffsetAmountRow
  final var _defaultValueOffsetCurrencyRow: RuleComparisonRow<TypeKey> as readonly DefaultValueOffsetCurrencyRow

  construct(left: RuleVersion, right: RuleVersion, location: Location) {
    super(left, right, 1/* total number of columns used to display each Rule */, {} /*UWRulePanelSetHelper.UIConfigs*/, location)

    _nameRow = createRow(DisplayKey.get("BizRules.RuleDetailsPage.Name"), \r -> r.Name)
    _codeRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.Code"), \r -> r.UWIssueType.Code)
    _blockingPointRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.BlockingPoint"), \r -> r.UWIssueType.BlockingPoint)
    _checkingSetRow = createRow(DisplayKey.get("Web.BizRules.UWRules.CheckingSet"), \r -> r.TriggeringPointKey)
    _defaultDurationRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.DefaultDurationType"), \r -> r.UWIssueType.DefaultDurationType)
    _contextRow = createRow(DisplayKey.get("BizRules.RuleDetailsPage.Context"), \r -> r.RuleContextDefinitionKey)
    _descriptionRow = createRow(DisplayKey.get("BizRules.RuleDetailsPage.Description"), \r -> r.Description)
    _availableToRunRow = createRow(DisplayKey.get("BizRules.RuleDetailsPage.AvailableToRun"), \r -> r.AvailableToRun)
    _startDateRow = createRow(DisplayKey.get("Web.BizRules.UWRules.ApplicabilityCriteria.RuleStartDate"), \r -> r.StartDate)
    _endDateRow = createRow(DisplayKey.get("Web.BizRules.UWRules.ApplicabilityCriteria.RuleEndDate"), \r -> r.EndDate)

    var jurisdictions = RuleVersions*.Rule.map(\r -> (r as UWRule).Jurisdictions*.Jurisdiction).toList()
    _jurisdictionRow = createRow(DisplayKey.get("Web.BizRules.UWRules.ApplicabilityCriteria.Jurisdictions"), \r -> getJurisdictions(r.Jurisdictions), arrayValuesDiffer(jurisdictions))

    var policyLines = RuleVersions*.Rule.map(\r -> (r as UWRule).LinesOfBusiness*.PolicyLine).toList()
    _policyLineRow = createRow(DisplayKey.get("Web.BizRules.UWRules.ApplicabilityCriteria.PolicyLine"), \r -> getPolicyLines(r.LinesOfBusiness), arrayValuesDiffer(policyLines))

    var transactions = RuleVersions*.Rule.map(\r -> (r as UWRule).PolicyTransactions*.Job).toList()
    _policyTransactionRow = createRow(DisplayKey.get("Web.BizRules.UWRules.ApplicabilityCriteria.PolicyTransactions"), \r -> getPolicyTransactions(r.PolicyTransactions), arrayValuesDiffer(transactions))

    _autoApprovableRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.AutoApprovable"), \r -> r.UWIssueType.AutoApprovable)
    _defaultEditBeforeBindRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.DefaultEditBeforeBind"), \r -> r.UWIssueType.DefaultEditBeforeBind)
    _defaultApprovalBlockingPointRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.DefaultApprovalBlockingPoint"), \r -> r.UWIssueType.DefaultApprovalBlockingPoint)
    _comparatorRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.ValueComparator"), \r -> r.UWIssueType.Comparator.Value)
    _valueFormatterTypeRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.ValueFormatterType"), \r -> r.UWIssueType.ValueFormatterType)
    _defaultValueAssignmentTypeRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.DefaultValueAssignmentType"), \r -> r.UWIssueType.DefaultValueAssignmentType)
    _defaultValueOffsetAmountRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.DefaultValueOffsetAmount"), \r -> r.UWIssueType.DefaultValueOffsetAmount.DisplayValue)
    _defaultValueOffsetCurrencyRow = createRow(DisplayKey.get("Web.BizRules.UWRulePanelSet.DefaultValueOffsetCurrency"), \r -> r.UWIssueType.DefaultValueOffsetCurrency)
  }

  property get DescriptionRowVisible(): boolean {
    return NonExternallyManaged or DescriptionRow.HasDifferences
  }

  property get AvailableToRunRowVisible(): boolean {
    return NonExternallyManaged or AvailableToRunRow.HasDifferences
  }

  property get StartDateRowVisible(): boolean {
    return NonExternallyManaged or StartDateRow.HasDifferences
  }

  property get EndDateRowVisible(): boolean {
    return NonExternallyManaged or EndDateRow.HasDifferences
  }

  property get RuleContextVisible(): boolean {
    return NonExternallyManaged or ContextRow.HasDifferences
  }

  property get ApplicabilityCriteriaHeaderVisible(): boolean {
    return PolicyLineRowVisible or JurisdictionRowVisible or PolicyTransactionRowVisible
  }

  property get PolicyLineRowVisible(): boolean {
    return NonExternallyManaged or PolicyLineRow.HasDifferences
  }

  property get JurisdictionRowVisible(): boolean {
    return NonExternallyManaged or JurisdictionRow.HasDifferences
  }

  property get PolicyTransactionRowVisible(): boolean {
    return NonExternallyManaged or PolicyTransactionRow.HasDifferences
  }

  property get RuleVariablesVisible() : boolean  {
    return NonExternallyManaged
  }

  property get RuleConditionVisible(): boolean {
    return NonExternallyManaged or ConditionRow.HasDifferences
  }

  property get ActionsVisible(): boolean {
    return NonExternallyManaged or CommandDefinitionDiffs.hasMatch(\diffPair -> diffPair.DiffType != NONE)
  }

  private property get NonExternallyManaged(): boolean {
    return not (RuleVersions.first().Rule as UWRule).ExternallyManaged  }

  private function getJurisdictions(jurisdictions : AppCritJurisdiction[]) : String[] {
    if (jurisdictions == null or jurisdictions.IsEmpty) {
      return {DisplayKey.get("Web.BizRules.ApplicationCriteriaInputSet.All")}
    }
    return jurisdictions*.Jurisdiction*.DisplayName.sort()
  }

  private function getPolicyLines(lines : AppCritLineOfBusiness[]): String[] {
    if (lines == null or lines.IsEmpty) {
      return {DisplayKey.get("Web.BizRules.ApplicationCriteriaInputSet.All")}
    }
    return lines*.PolicyLine*.DisplayName.sort()
  }

  private function getPolicyTransactions(transactions : AppCritPolicyTransaction[])  : String[] {
    if (transactions == null or transactions.IsEmpty) {
      return {DisplayKey.get("Web.BizRules.ApplicationCriteriaInputSet.All")}
    }
    return transactions*.Job*.DisplayName.sort()
  }

  private reified function createRow<T>(label: String, getter(r: UWRule): T, isDifferent: Boolean = null): RuleComparisonRow<T> {
    var values = RuleVersions.map(\v -> getter(v.Rule as UWRule))
    if (isDifferent == null) {
      isDifferent = valuesDiffer(values)
    }
    return new RuleComparisonRow<T>(label, isDifferent, values)
  }

}
