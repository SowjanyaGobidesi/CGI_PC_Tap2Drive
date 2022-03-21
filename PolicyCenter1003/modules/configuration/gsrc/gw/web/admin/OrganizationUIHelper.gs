package gw.web.admin

uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.locale.DisplayKey
uses gw.api.util.CurrencyUtil
uses gw.plugin.billing.AgencyBillPlanSearchCriteria
uses gw.plugin.billing.AgencyBillPlanSummary
uses typekey.Currency
uses entity.Contact

@Export
class OrganizationUIHelper {
  var _organization: Organization as readonly Organization
  var _planSummaries: List<AgencyBillPlanSummary> as readonly AllAgencyBillPlans
  var _displayableAgencyBillPlans : List<MultiCurrencyAgencyBillPlan> as DisplayableAgencyBillPlans

  construct(organization: Organization) {
    _organization = organization
    _planSummaries = AgencyBillPlanSearchCriteria.AllAgencyBillPlans.toList()
    resetAgencyBillPlans()
  }

  function createUser() : User {
    var user = new User()
    user.ExternalUser = not _organization.Carrier
    user.UseOrgAddress = false
    user.setOrganizationWithUpdate(_organization)
    user.Credential = new Credential()
    _organization.Contact = user.Contact
    return user
  }

  static function getUser(c : Contact) : User{
    var u = gw.api.database.Query.make(User).compare(User#Contact.PropertyInfo.Name, Equals, c).select().FirstResult
    if(u == null){
      u = c.Bundle.InsertedBeans.toCollection().whereTypeIs(User).firstWhere(\ x -> x.Contact == c)
    }
    return u
  }

  property get AllOrganizationUsers() : List<User>{
    var users = _organization.AllUsers.toList()
    users = users.Count > 10 ? users.subList(0, 10) : users
    var newUsers = _organization.Bundle.InsertedBeans.toCollection().whereTypeIs( User ).toList()
    users.addAll( newUsers )
    return users
  }

  static function createCriteria(activeProducersOnly : java.lang.Boolean, includesCarrier : java.lang.Boolean) : OrganizationSearchCriteria {
    var criteria = new OrganizationSearchCriteria()
    if( activeProducersOnly )
    {
      criteria.ProducerStatus = TC_ACTIVE
    }
    criteria.Carrier = includesCarrier
    return criteria
  }

  function newDefaultCurrencyAgencyBillPlan(): SingleCurrencyAgencyBillPlan {
    return new SingleCurrencyAgencyBillPlan(CurrencyUtil.DefaultCurrency)
  }

  property get SingleBillPlanVisible(): boolean {
    return _organization.Producer and perm.System.orgviewagency and CurrencyUtil.SingleCurrencyMode
  }

  property get AgencyBillTabVisible(): boolean {
    return _organization.Producer and perm.System.orgviewagency and CurrencyUtil.MultiCurrencyMode
  }

  property get AgencyBillPlansWarningMessage() : String {
    var agencyPlanById = PlansNotExistingInBillingSystem.partition(\agencyBillPlan -> agencyBillPlan.PlanID)
    var agencyPlanStr : List<String> = {}
    agencyPlanById.eachKeyAndValue(\planID, agencyBillPlans -> {
      var planString = DisplayKey.get("Web.Admin.OrganizationDetail.AgencyBillPlans.PlanID", planID)
      var currenciesString = DisplayKey.get("Web.Admin.OrganizationDetail.AgencyBillPlans.Currencies", agencyBillPlans*.Currency*.DisplayName.join(","))
      agencyPlanStr.add(planString + currenciesString)
    })

    return DisplayKey.get("Web.Admin.OrganizationDetail.AgencyBillPlans.NoPlansFound", agencyPlanStr.join("; "))
  }

  property get PlansNotExistingInBillingSystem() : List<AgencyBillPlan> {
    return ExistingAgencyBillPlans.where(\agencyBillPlan ->
        not _planSummaries.hasMatch(\agencyBillPlanSummary -> agencyBillPlanSummary.Id == agencyBillPlan.PlanID)).toList()
  }

  private property get ExistingAgencyBillPlans() : AgencyBillPlan[] {
    if (not _organization.New) {
      //Existing organization agency bill plans are synced with BC in the background when Agency Bill Plans
      //are displayed in the UI. So, reload plans from the database for updated plan information
      return Query.make(AgencyBillPlan)
          .compare(AgencyBillPlan#Organization, Relop.Equals, _organization).select().toTypedArray()
    } else {
      return _organization.AgencyBillPlans
    }
  }

  final function resetAgencyBillPlans() {
    _displayableAgencyBillPlans = new ArrayList<MultiCurrencyAgencyBillPlan>()
    var refreshedAgencyBillPlans = ExistingAgencyBillPlans
    var plansByID = refreshedAgencyBillPlans.partition(\plan -> plan.PlanID)
    plansByID.eachKeyAndValue(\planID, plans -> {
      var associatedSummaries = _planSummaries.where(\plan -> plan.Id == planID)
      if (associatedSummaries.Count == 1) {
        var plan = new MultiCurrencyAgencyBillPlan(associatedSummaries.single(), refreshedAgencyBillPlans)
        _displayableAgencyBillPlans.add(plan)
      }
    })
  }

  function createAgencyBillPlans() {
    _displayableAgencyBillPlans.removeWhere(\plan -> plan.SelectedCurrencies.IsEmpty)
    _displayableAgencyBillPlans.each(\plan -> plan.createAgencyBillPlansForSelectedCurrencies())
  }

  property get SelectedCurrenciesAcrossAgencyBillPlans() : List<Currency> {
    var allCurrencies = _displayableAgencyBillPlans*.SelectedCurrencies.toList()
    allCurrencies.addAll(PlansNotExistingInBillingSystem*.Currency.toList())
    return allCurrencies
  }

  function addToSelectedAgencyBillPlans(planSummary : AgencyBillPlanSummary) : MultiCurrencyAgencyBillPlan {
    var agencyBillPlan = new MultiCurrencyAgencyBillPlan(planSummary, _organization.AgencyBillPlans)
    agencyBillPlan.configureAvailableCurrencies()
    _displayableAgencyBillPlans.add(agencyBillPlan)
    return agencyBillPlan
  }

  function isCurrencyCheckboxAvailable(agencyBillPlan : MultiCurrencyAgencyBillPlan, currency : Currency) : boolean {
    if (agencyBillPlan.isCurrencyRemovable(currency) and not PlansNotExistingInBillingSystem.hasMatch(\elt1 -> elt1.Currency == currency)) {
      if (agencyBillPlan.SelectedCurrencies.contains(currency) or not SelectedCurrenciesAcrossAgencyBillPlans.contains(currency)) {
        return true
      }
    }
    return false
  }

  /**
   * Agency bill plan for single currency configuration
   */
  class SingleCurrencyAgencyBillPlan {
    var _currency: Currency
    var _planBean: AgencyBillPlan
    var _availablePlans: List<AgencyBillPlanSummary>

    construct(currency: Currency) {
      _currency = currency
      _planBean = _organization.AgencyBillPlans.firstWhere(\plan -> plan.Currency == _currency)
      _availablePlans = _planSummaries.where(\plan -> plan.Currencies.contains(_currency))
    }

    property get IsNew(): boolean {
      return _planBean == null or _planBean.New
    }

    property get Editable(): boolean {
      var result = IsNew and perm.Organization.editagency(_organization)
      return result
    }

    property get Currency(): Currency {
      return _currency
    }

    property get AvailableBillPlans(): List<AgencyBillPlanSummary> {
      return _availablePlans
    }

    property get AgencyBillPlan(): AgencyBillPlanSummary {
      return _planBean == null ? null : _availablePlans?.firstWhere(\plan -> plan.Id == _planBean.PlanID)
    }

    property set AgencyBillPlan(plan: AgencyBillPlanSummary) {
      if (plan == null) {
        Available = false
      } else {
        Available = true
        _planBean.PlanID = plan.Id
      }
    }

    property get Available(): boolean {
      return _planBean != null
    }

    property set Available(state: boolean) {
      if (_planBean == null) {
        if (state) {
          _planBean = new AgencyBillPlan(_organization.Bundle)
          _planBean.Organization = _organization
          _planBean.Currency = _currency
        }
      } else if (not state) {
        _planBean.remove()
        _planBean = null
      }
    }
  }

  /**
   * Agency bill plan for multi-currency configuration
   */
  class MultiCurrencyAgencyBillPlan {
    private var _planSummary : AgencyBillPlanSummary
    private var _currencies : List<MultiCurrencyBillPlanCurrency> as readonly Currencies

    construct(planSummary : AgencyBillPlanSummary, existingPlans : AgencyBillPlan[]) {
      _planSummary = planSummary
      _currencies = new ArrayList<MultiCurrencyBillPlanCurrency>()
      var existingPlansCurrencies = existingPlans.where(\plan -> plan.PlanID == planSummary.Id)*.Currency
      var noLongerFoundPlansCurrencies = PlansNotExistingInBillingSystem.where(\elt -> elt.PlanID == planSummary.Id)*.Currency
      AvailableCurrencies.each(\currency -> {
        var configured = existingPlansCurrencies.contains(currency) or noLongerFoundPlansCurrencies.contains(currency)
        _currencies.add(new MultiCurrencyBillPlanCurrency(currency, configured, not configured))
      })
    }

    function configureAvailableCurrencies() {
      var currenciesAvailable = AvailableCurrencies.toList()
      currenciesAvailable.removeAll(SelectedCurrencies.toList())
      currenciesAvailable.removeAll(SelectedCurrenciesAcrossAgencyBillPlans)

      _currencies.where(\elt -> currenciesAvailable.contains(elt.Currency)).each(\elt -> {
        elt.Selected = true
      })
    }

    property get SelectedCurrencies() : Currency[] {
      return _currencies.where(\elt -> elt.Selected)*.Currency
    }

    property get AvailableCurrencies() : Currency[] {
      return _planSummary.Currencies
    }

    property get PlanID() : String {
      return _planSummary.Id
    }

    property get PlanName() : String {
      return _planSummary.Name
    }

    property get IsPlanRemovable() : boolean {
      return not _organization.AgencyBillPlans.hasMatch(\elt -> elt.PlanID == PlanID)
    }

    function isCurrencyRemovable(currency : Currency) : boolean {
      return not _organization.AgencyBillPlans.hasMatch(\plan -> plan.Currency == currency and plan.PlanID == PlanID)
    }

    private function addAgencyBillPlanForCurrency(currency : Currency) {
      var planCurrency = _currencies.singleWhere(\elt -> elt.Currency == currency)
      if (planCurrency.IsNew) {
        var newAgencyBillPlan = new AgencyBillPlan() {:Currency = currency, :PlanID = PlanID}
        _organization.addToAgencyBillPlans(newAgencyBillPlan)
      }
    }

    function createAgencyBillPlansForSelectedCurrencies() {
      SelectedCurrencies.each(\currency -> {
        if (isCurrencyRemovable(currency)) {
          addAgencyBillPlanForCurrency(currency)
        }
      })
    }

    override function hashCode() : int {
      return 31 * _planSummary.hashCode()
    }

    override function equals(obj : Object) : boolean {
      if (this === obj) {
        return true;
      }
      if (obj typeis MultiCurrencyAgencyBillPlan) {
        return _planSummary == obj._planSummary
      }
      return false
    }
  }

  /**
   * For currency configuration on multi-currency agency bill plans
   */
  class MultiCurrencyBillPlanCurrency {
    var _currency : Currency as Currency
    var _selected : Boolean as Selected
    var _isNew : Boolean as IsNew

    construct(currency : Currency, selected : Boolean, isNew : Boolean) {
      _currency = currency
      _selected = selected
      _isNew = isNew
    }

    override function hashCode() : int {
      return 31 * _currency.hashCode() + _selected.hashCode()
    }

    override function equals(obj : Object) : boolean {
      if (this === obj) {
        return true
      }
      if (obj typeis MultiCurrencyBillPlanCurrency) {
        return  _currency == obj._currency and _selected == obj._selected
      }
      return false
    }
  }
}
