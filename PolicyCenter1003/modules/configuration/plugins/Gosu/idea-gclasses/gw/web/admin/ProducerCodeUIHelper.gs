package gw.web.admin

uses gw.api.database.MultipleMatchesException
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.locale.DisplayKey
uses gw.api.system.PLConfigParameters
uses gw.api.util.CurrencyUtil
uses gw.api.util.DisplayableException
uses gw.plugin.billing.CommissionPlanSearchCriteria
uses gw.plugin.billing.CommissionPlanSummary

@Export
class ProducerCodeUIHelper {

  var _producerCode : ProducerCode as readonly ProducerCode
  var _planSummaries : CommissionPlanSummary[]
  var _displayableCommissionPlans : List<MultiCurrencyCommissionPlan> as DisplayableCommissionPlans
  var _commissionPlanToAdd : String as CommissionPlanToAdd

  construct(producerCode : ProducerCode) {
    _producerCode = producerCode
    _planSummaries = CommissionPlanSearchCriteria.getCommissionPlans(_producerCode.Organization.Tier)
    _displayableCommissionPlans = new ArrayList<MultiCurrencyCommissionPlan>()

    if (CurrencyUtil.isSingleCurrencyMode()) {
      addDefaultPlanIfNoneExist()
    } else {
      resetPlans()
    }
  }

  public function convertCommissionPlanToAdd() : CommissionPlanSummary {
    var BillingSystem = gw.plugin.Plugins.get(gw.plugin.billing.IBillingSystemPlugin)
    var commissionPlanSummary : CommissionPlanSummary
    try {
      commissionPlanSummary = BillingSystem.retrieveAllCommissionPlans().singleWhere(\planSummary -> planSummary.Id == _commissionPlanToAdd)
    } catch (e : IllegalStateException){
      throw new DisplayableException(DisplayKey.get("Web.CommissionPlanSearchPopup.CommissionPlanDoesNotExist"))
    }

    return commissionPlanSummary
  }

  public function addDefaultPlanIfNoneExist() {
    if(_producerCode.CommissionPlans.IsEmpty) {
      var defaultPlanSummary = new CommissionPlanSummary()
      defaultPlanSummary.Id = null
      defaultPlanSummary.Name = DisplayKey.get("Web.ProducerCodeDetailDV.AcceptDefault")
      defaultPlanSummary.Currencies = {CurrencyUtil.DefaultCurrency}

      var plan = new MultiCurrencyCommissionPlan(defaultPlanSummary, {})
      plan.configureAvailableCurrencies()
      _displayableCommissionPlans.add(plan)
    }
  }

  public function resetPlans() {
    if(CurrencyUtil.isSingleCurrencyMode()) {
      return
    }

    _displayableCommissionPlans.clear()
    var refreshedCommissionPlans = ExistingCommissionPlans

    var plansByID = refreshedCommissionPlans.partition(\elt -> elt.CommissionPlanID)
    plansByID.eachKeyAndValue(\planID, plans -> {
      var associatedSummaries = _planSummaries.where(\elt -> elt.Id == planID)
      if (associatedSummaries.Count == 1) {
        var plan = new MultiCurrencyCommissionPlan(associatedSummaries.single(), refreshedCommissionPlans)
        _displayableCommissionPlans.add(plan)
      }
    })
  }

  property get PlansNotExistingInBillingSystem() : List<CommissionPlan> {
    return ExistingCommissionPlans.where(\commissionPlan ->
        not _planSummaries.hasMatch(\commissionPlanSummary -> commissionPlanSummary.Id == commissionPlan.CommissionPlanID)).toList()
  }

  property get CommissionPlansWarningMessage() : String {
    var commissionPlansById = PlansNotExistingInBillingSystem.partition(\commissionPlan -> commissionPlan.CommissionPlanID)
    var commissionPlanStr : List<String> = {}
    commissionPlansById.eachKeyAndValue(\planID, commissionPlans -> {
      var planString = DisplayKey.get("Web.Admin.ProducerCodeDetail.CommissionPlans.PlanID", planID)
      var currenciesString = DisplayKey.get("Web.Admin.ProducerCodeDetail.CommissionPlans.Currencies", commissionPlans*.Currency*.DisplayName.join(","))
      commissionPlanStr.add(planString + currenciesString)
    })

    return DisplayKey.get("Web.Admin.ProducerCodeDetail.CommissionPlans.NoPlansFound", commissionPlanStr.join("; "))
  }

  private property get ExistingCommissionPlans() : CommissionPlan[] {
    if (not _producerCode.New) {
      //Existing organization commission plans are synced with BC in the background when Commission Plans
      //are displayed in the UI. So, reload plans from the database for updated plan information
      return Query.make(CommissionPlan)
          .compare(CommissionPlan#ProducerCode, Relop.Equals, _producerCode).select().toTypedArray()
    } else {
      return _producerCode.CommissionPlans
    }
  }

  public function createCommissionPlans() {
    _displayableCommissionPlans.removeWhere(\elt -> elt.SelectedCurrencies.IsEmpty)
    _displayableCommissionPlans.each(\elt -> elt.createCommissionPlanEntitiesForNewCurrencies())
    validateCommissionPlansDuringProducerCodeCreation()
  }

  public static function performBranchSearch(name: String): Group {
    var criteria = new GroupSearchCriteria().asBranchSearch()
    criteria.BranchName = name
    var rtn: Group
    try {
      rtn = criteria.performSearch().getAtMostOneRow() as Group
    } catch (e: MultipleMatchesException) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.Admin.ProducerCodeDetail.Error.MultipleBranchesFound", name))
    }
    if (rtn == null) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.Admin.ProducerCodeDetail.Error.NoBranchFound", name))
    }
    return rtn
  }

  public static function initializeCommissionPlans(producerCode: ProducerCode, org: Organization) {
    producerCode.CommissionPlans.each(\elt -> elt.remove())
    if (CurrencyUtil.SingleCurrencyMode) {
      producerCode.addCommissionPlanForCurrency(CurrencyUtil.DefaultCurrency)
    }
  }

  /**
   * Note:  for BillingCenter, each producer code requires a commission plan (in each currency defined).
   * This may not be a requirement for other billing systems and is not a requirement for PolicyCenter.
   */
  function validateCommissionPlansDuringProducerCodeCreation() {
    if(not _displayableCommissionPlans.HasElements and PLConfigParameters.MulticurrencyDisplayMode.Value == "MULTIPLE") {
      throw new DisplayableException(DisplayKey.get("Validation.ProducerCode.NoCommissionPlans"))
    }
  }

  function removeProducerCodeRole(p : ProducerCodeRole) {
    if (p.Role == null) {
      p.remove()
    } else {
      p.ProducerCode.removeRole(p.Role)
    }
  }

  public property get ConfiguredCurrenciesAcrossCommissionPlans() : List<Currency> {
    var allCurrencies =_displayableCommissionPlans*.SelectedCurrencies.toList()
    allCurrencies.addAll(PlansNotExistingInBillingSystem*.Currency.toList())
    return allCurrencies
  }

  public function addCommissionPlanFromPicker(pickedValue : String) {
    _commissionPlanToAdd = pickedValue
    var plan = new MultiCurrencyCommissionPlan(convertCommissionPlanToAdd(), _producerCode.CommissionPlans)
    if(_displayableCommissionPlans*.PlanName.contains(plan.PlanName)) {
      throw new DisplayableException(DisplayKey.get("Web.CommissionPlanSearchPopup.CannotAddDuplicateCommissionPlan"))
    }
    plan.configureAvailableCurrencies()
    _displayableCommissionPlans.add(plan)
    _commissionPlanToAdd = null
  }

  public function isCurrencyCheckboxAvailable(commissionPlan : MultiCurrencyCommissionPlan, currency : Currency) : boolean {
    if (commissionPlan.isCurrencyRemovable(currency) and not PlansNotExistingInBillingSystem.hasMatch(\elt -> elt.Currency == currency)) {
      if(commissionPlan.SelectedCurrencies.contains(currency) or not ConfiguredCurrenciesAcrossCommissionPlans.contains(currency)) {
        return true
      }
    }
    return false
  }

  class CommissionPlanCurrency {
    construct(currency : Currency, configured : Boolean, isNew : Boolean) {
      _currency = currency
      _configured = configured
      _isNewCurrency = isNew
    }

    var _currency : Currency as Currency
    var _configured : Boolean as Configured
    var _isNewCurrency : Boolean as IsNew

    override function hashCode() : int {
      return 31 * _currency.hashCode() + _configured.hashCode()
    }

    override function equals(obj : Object) : boolean {
      if (this === obj) {
        return true;
      }
      if (obj typeis CommissionPlanCurrency) {
        return  _currency == obj._currency
            and _configured == obj._configured;
      }

      return false
    }
  }

  class MultiCurrencyCommissionPlan {
    private var _planSummary : CommissionPlanSummary
    private var _currencies : List<CommissionPlanCurrency> as readonly Currencies

    construct(planSummary : CommissionPlanSummary, commissionPlans : CommissionPlan[]) {
      _planSummary = planSummary
      _currencies = new ArrayList<CommissionPlanCurrency>()

      var existingPlansCurrencies = commissionPlans.where(\elt -> elt.CommissionPlanID == planSummary.Id)*.Currency
      var noLongerFoundPlansCurrencies = PlansNotExistingInBillingSystem.where(\elt -> elt.CommissionPlanID == planSummary.Id)*.Currency

      AvailableCurrencies.each(\currency -> {
        var configured = existingPlansCurrencies.contains(currency) or noLongerFoundPlansCurrencies.contains(currency)
        _currencies.add(new CommissionPlanCurrency(currency, configured, not configured))
      })
    }

    public function configureAvailableCurrencies() {
      var currenciesToAdd = AvailableCurrencies.toList()
      currenciesToAdd.removeAll(SelectedCurrencies.toList())
      currenciesToAdd.removeAll(ConfiguredCurrenciesAcrossCommissionPlans)

      _currencies.where(\elt -> currenciesToAdd.contains(elt.Currency)).each(\elt -> {
        elt.Configured = true
      })
    }

    public property get SelectedCurrencies() : Currency[] {
      return _currencies.where(\elt -> elt.Configured)*.Currency
    }

    public property get AvailableCurrencies() : Currency[] {
      return _planSummary.Currencies
    }

    public property get PlanID() : String {
      return _planSummary.Id
    }

    public property get PlanName() : String {
      return _planSummary.Name
    }

    public function isPlanRemovable() : boolean {
      return not _producerCode.CommissionPlans.hasMatch(\elt -> elt.CommissionPlanID == _planSummary.Id)
    }

    public function isCurrencyRemovable(currency : Currency) : boolean {
      return not _producerCode.CommissionPlans.hasMatch(\elt1 -> elt1.Currency == currency and elt1.CommissionPlanID == PlanID)
    }

    private function addCommissionPlanForCurrency(currency : Currency) {
      var planCurrency = _currencies.singleWhere(\elt -> elt.Currency == currency)
      if (planCurrency.IsNew) {
        var newCommissionPlan = new CommissionPlan() {:Currency = currency, :CommissionPlanID = PlanID}
        _producerCode.addToCommissionPlans(newCommissionPlan)
      }
    }

    public function createCommissionPlanEntitiesForNewCurrencies() {
      SelectedCurrencies.each(\currency -> {
        if (isCurrencyRemovable(currency)) {
          addCommissionPlanForCurrency(currency)
        }
      })
    }


    override function hashCode() : int {
      var code = 31 * _planSummary.hashCode()
          + 37 * _producerCode.hashCode()
      return code
    }

    override function equals(obj : Object) : boolean {
      if (this === obj) {
        return true;
      }
      if (obj typeis MultiCurrencyCommissionPlan) {
        return _planSummary == obj._planSummary
      }

      return false
    }
  }
}