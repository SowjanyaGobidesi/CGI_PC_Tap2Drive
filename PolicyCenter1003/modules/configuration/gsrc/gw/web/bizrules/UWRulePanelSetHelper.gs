package gw.web.bizrules

uses gw.api.database.DBDateRange
uses gw.api.locale.DisplayKey
uses gw.api.system.PLConfigParameters
uses gw.bizrules.BizRulesComponentMapper
uses gw.bizrules.pcf.RulePageController
uses gw.bizrules.provisioning.contexts.UWRuleContextDefinition
uses gw.entity.TypeKey
uses pcf.api.Location

uses java.util.function.Supplier

/**
 * Helper class to UWRulePaneSet.pcf
 */
@Export
class UWRulePanelSetHelper {
  private final var _location: Location
  final var _selectedRuleSupplier : Supplier<UWRule>
  var _controller: RulePageController

  construct(final ruleVersion: RuleVersion, controller: RulePageController, location: Location) {
    _selectedRuleSupplier = \-> ruleVersion.Rule as UWRule
    _controller = controller
    _location = location
  }

  function isContextDefinitionsAvailable(contextKey: RuleContextDefinitionKey): boolean {
    var mapper = BizRulesComponentMapper.getInstance()
    if (not mapper.isSupportedContextForTriggeringPoint(_selectedRuleSupplier.get().TriggeringPointKey, contextKey)) {
      return false
    }
    var contextDefinition = mapper.getContextDefinition(contextKey)
    return contextDefinition typeis UWRuleContextDefinition
        and contextDefinition.appliesToPolicyLines(_selectedRuleSupplier.get().LinesOfBusiness*.PolicyLine)
  }

  property get RuleStartDate(): Date {
    return _selectedRuleSupplier.get().StartDate
  }

  property set RuleStartDate(aDate: Date) {
    _selectedRuleSupplier.get().StartDate = normalizeDate(aDate)
  }

  property get RuleEndDate(): Date {
    return _selectedRuleSupplier.get().EndDate
  }

  property set RuleEndDate(aDate: Date) {
    _selectedRuleSupplier.get().EndDate = normalizeDate(aDate)
  }

  /**
   * Validate that the rule's EndDate is not before the StartDate.
   * Note, it is legal to have a null StartDate and a non-null EndDate.
   *
   * @return an error message if the dates are invalid, null otherwise.
   */
  function validateRuleEnd(): String {
    var start = _selectedRuleSupplier.get().StartDate
    var end = _selectedRuleSupplier.get().EndDate
    var isValid = start == null || end == null || end.after(start)
    return !isValid ? DisplayKey.get("Web.BizRules.UWRulePanelSet.EndDateBeforeStartDate") : null;
  }

  property get PolicyTransactionsBundle(): ShuttleListBundle {
    return new ShuttleListBundle(DisplayKey.get('Web.BizRules.UWRules.ApplicabilityCriteria.PolicyTransactions'), PolicyTransactionRange) {
      override property get Selected(): TypeKey[] {
        return _selectedRuleSupplier.get().PolicyTransactions*.Job.sort()
      }

      override property set Selected(selection: TypeKey[]) {
        var jobs = selection.cast(typekey.Job)
        // remove extra entries
        var selectedJobs = jobs.toSet()
        _selectedRuleSupplier.get().PolicyTransactions.where(\j -> not selectedJobs.contains(j.Job))*.remove()
        // add new entries
        var ruleJobs = _selectedRuleSupplier.get().PolicyTransactions*.Job.toSet()
        jobs.each(\job -> {
          if (not ruleJobs.contains(job)) {
            var acPolicyTransaction = new AppCritPolicyTransaction()
            acPolicyTransaction.Job = job
            _selectedRuleSupplier.get().addToPolicyTransactions(acPolicyTransaction)
            ruleJobs.add(job)
          }
        })
      }
    }
  }

  /**
   * @return the jurisdictions in the rule applicability criteria
   */
  property get JurisdictionsBundle(): ShuttleListBundle {
    return new ShuttleListBundle(DisplayKey.get('Web.BizRules.UWRules.ApplicabilityCriteria.Jurisdictions'), JurisdictionRange) {
      override property get Selected(): TypeKey[] {
        return _selectedRuleSupplier.get().Jurisdictions*.Jurisdiction.sort()
      }

      override property set Selected(selection: TypeKey[]) {
        var jurisdictions = selection.cast(Jurisdiction)
        // remove extra entries
        var selectedJurisdictions = jurisdictions.toSet()
        _selectedRuleSupplier.get().Jurisdictions.where(\j -> not selectedJurisdictions.contains(j.Jurisdiction))*.remove()

        // add new entries
        var ruleJurisdictions = _selectedRuleSupplier.get().Jurisdictions*.Jurisdiction.toSet()
        jurisdictions.each(\jurisdiction -> {
          if (not ruleJurisdictions.contains(jurisdiction)) {
            var acJurisdiction = new AppCritJurisdiction()
            acJurisdiction.Jurisdiction = jurisdiction
            _selectedRuleSupplier.get().addToJurisdictions(acJurisdiction)
            ruleJurisdictions.add(jurisdiction)
          }
        })
      }
    }
  }

  property get LinesOfBusinessBundle(): ShuttleListBundle {
    return new ShuttleListBundle(DisplayKey.get('Web.BizRules.UWRules.ApplicabilityCriteria.PolicyLine'), LinesOfBusinessRange) {
      override property get Selected(): TypeKey[] {
        return _selectedRuleSupplier.get().LinesOfBusiness*.PolicyLine.sort()
      }

      override property set Selected(selection: TypeKey[]) {
        var policyLines = selection.cast(typekey.PolicyLine)
        // remove extra entries
        var selectedLines = policyLines.toSet()
        _selectedRuleSupplier.get().LinesOfBusiness.where(\j -> not selectedLines.contains(j.PolicyLine))*.remove()

        // add new entries
        var ruleLines = _selectedRuleSupplier.get().LinesOfBusiness*.PolicyLine.toSet()
        policyLines.each(\policyLine -> {
          if (not ruleLines.contains(policyLine)) {
            var acLineOfBusiness = new AppCritLineOfBusiness()
            acLineOfBusiness.PolicyLine = policyLine
            _selectedRuleSupplier.get().addToLinesOfBusiness(acLineOfBusiness)
            ruleLines.add(policyLine)
          }
        })
        adjustRuleContextDefinitionKey()
      }
    }
  }

  property get Name(): String {
    return _selectedRuleSupplier.get().Name
  }

  property set Name(name: String) {
    _selectedRuleSupplier.get().Name = name
    if (not _selectedRuleSupplier.get().UWIssueType.Code?.HasContent) {
      _selectedRuleSupplier.get().UWIssueType.Code = name
    }
  }

  //----------------------------------------------------------------- private helper methods

  /**
   * Normalize the date according for DB usage.  This appears to currently set the time to midnight.
   *
   * @param aDate
   * @return a normalized date or null if the input was null.
   */
  private function normalizeDate(aDate: Date): Date {
    return aDate != null ? new DBDateRange(aDate, null, true).First : null;
  }

  /**
   * resets the rule context if its current selection does not align to the chosen PolicyLines
   */
  private function adjustRuleContextDefinitionKey() {
    if (_selectedRuleSupplier.get().RuleContextDefinitionKey != null) {
      var context = BizRulesComponentMapper.Instance.getContextDefinition(_selectedRuleSupplier.get().RuleContextDefinitionKey) as UWRuleContextDefinition
      if (not context.appliesToPolicyLines(_selectedRuleSupplier.get().LinesOfBusiness*.PolicyLine)) {
        _controller.RuleContextDefinitionKey = TC_GENERICPOLICY
      }
    }
  }

  //----------------------------------------------------------------- inner classes

  /**
   * Backing bundle supporting the ShuttleList multi-select widget
   */
  abstract class ShuttleListBundle {
    final var _label: String as Label
    final var _range: TypeKey[] as Range
    var _selectorState: SelectorState

    construct(label: String, range: List<TypeKey>) {
      _label = label
      _range = range.toTypedArray()
    }

    abstract property get Selected(): TypeKey[]

    abstract property set Selected(selection: TypeKey[])

    property get SelectorVisible(): boolean {
      return _location.InEditMode or _selectorState.State
    }

    property get ShuttleLabel(): String {
      return _location.InEditMode ? null : Label
    }

    property get SelectorState(): boolean {
      if (not _location.InEditMode) {
        _selectorState.State = Selected.IsEmpty
      }
      return _selectorState.State
    }

    property set SelectorState(state: boolean) {
      // erase selection if "All" pressed
      if (state) {
        Selected = {}
      }
      _selectorState.State = state
    }

    function initSelectorState(state: SelectorState): boolean {
      _selectorState = state
      return true
    }
  }

  /**
   * Class for caching the state of the radio selector so it is not recomputed with each post on change
   */
  static class SelectorState {
    var state: boolean as State

    construct(bundle: ShuttleListBundle) {
      state = bundle.Selected.IsEmpty
    }
  }

  static property get JurisdictionRange(): List<Jurisdiction> {
    var defaultCountryCode = Country.get(PLConfigParameters.DefaultCountryCode.Value)
    if (defaultCountryCode == null) {
      defaultCountryCode = Country.TC_US
    }
    return Jurisdiction.getTypeKeys(false).where(\t -> t.Categories.contains(defaultCountryCode))
  }

  static property get PolicyTransactionRange(): List<typekey.Job> {
    return typekey.Job.TF_UWRULEAPPLICABLE.TypeKeys
  }

  static property get LinesOfBusinessRange(): List<typekey.PolicyLine> {
    return typekey.PolicyLine.TF_UWRULEAPPLICABLE.TypeKeys
  }

  static property get Availability(): List<UWRuleAvailability> {
    return typekey.UWRuleAvailability.AllTypeKeys
  }
}