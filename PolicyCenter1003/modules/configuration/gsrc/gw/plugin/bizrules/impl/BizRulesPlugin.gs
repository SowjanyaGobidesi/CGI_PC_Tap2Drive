package gw.plugin.bizrules.impl

uses gw.bizrules.DefaultBizRulesPlugin
uses gw.bizrules.IRuleAction
uses gw.bizrules.IRuleContextDefinition
uses gw.bizrules.PCBizRulesNavigationSupport
uses gw.bizrules.pcf.BizRulesPageNavigationSupport
uses gw.bizrules.provisioning.AddUWIssueRuleAction
uses gw.bizrules.provisioning.contexts.BusinessAutoDriversIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.BusinessAutoUWContextDefinition
uses gw.bizrules.provisioning.contexts.BusinessAutoVehiclesIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.BusinessOwnersBuildingsIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.BusinessOwnersLocationsIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.BusinessOwnersUWContextDefinition
uses gw.bizrules.provisioning.contexts.CommercialPropertyBuildingsIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.CommercialPropertyLocationsIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.CommercialPropertyUWContextDefinition
uses gw.bizrules.provisioning.contexts.GeneralLiabilityExposuresIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.GeneralLiabilityUWContextDefinition
uses gw.bizrules.provisioning.contexts.GenericUWRuleContextDefinition
uses gw.bizrules.provisioning.contexts.HomeownersCoveragePartIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.HomeownersDwellingAnimalIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.HomeownersDwellingHazardIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.HomeownersDwellingIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.HomeownersSchedPersPropertyItemUWContextDefinition
uses gw.bizrules.provisioning.contexts.HomeownersUWContextDefinition
uses gw.bizrules.provisioning.contexts.InlandMarineAccountsReceivableIterativeUWContextDefinition
uses gw.bizrules.provisioning.contexts.InlandMarineBuildingIterativeUWContextDefinition
uses gw.bizrules.provisioning.contexts.InlandMarineContractorsEquipmentIterativeUWContextDefinition
uses gw.bizrules.provisioning.contexts.InlandMarineIMSignIterativeUWContextDefinition
uses gw.bizrules.provisioning.contexts.InlandMarineLocationIterativeUWContextDefinition
uses gw.bizrules.provisioning.contexts.InlandMarineUWContextDefinition
uses gw.bizrules.provisioning.contexts.PersonalAutoDriversIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.PersonalAutoUWContextDefinition
uses gw.bizrules.provisioning.contexts.PersonalAutoVehiclesIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.PolicyContextDefinitionLibrary
uses gw.bizrules.provisioning.contexts.WorkersCompCoveredEmployeeIterableUWContextDefinition
uses gw.bizrules.provisioning.contexts.WorkersCompUWContextDefinition
uses gw.lang.reflect.features.IMethodReference
uses gw.lang.reflect.features.IPropertyReference
uses pcf.CreateLookup
uses pcf.api.Location

@Export
class BizRulesPlugin extends DefaultBizRulesPlugin {
  private final var _uwContexts: IRuleContextDefinition[]

  construct() {
    _uwContexts = {
        new GenericUWRuleContextDefinition(),
        new PersonalAutoUWContextDefinition(),
        new PersonalAutoDriversIterableUWContextDefinition(),
        new PersonalAutoVehiclesIterableUWContextDefinition(),

        new CommercialPropertyUWContextDefinition(),
        new CommercialPropertyLocationsIterableUWContextDefinition(),
        new CommercialPropertyBuildingsIterableUWContextDefinition(),

        new BusinessAutoUWContextDefinition(),
        new BusinessAutoDriversIterableUWContextDefinition(),
        new BusinessAutoVehiclesIterableUWContextDefinition(),

        new GeneralLiabilityUWContextDefinition(),
        new GeneralLiabilityExposuresIterableUWContextDefinition(),

        new WorkersCompUWContextDefinition(),
        new WorkersCompCoveredEmployeeIterableUWContextDefinition(),

        new InlandMarineUWContextDefinition(),
        new InlandMarineLocationIterativeUWContextDefinition(),
        new InlandMarineBuildingIterativeUWContextDefinition(),
        new InlandMarineAccountsReceivableIterativeUWContextDefinition(),
        new InlandMarineIMSignIterativeUWContextDefinition(),
        new InlandMarineContractorsEquipmentIterativeUWContextDefinition(),

        new BusinessOwnersUWContextDefinition(),
        new BusinessOwnersLocationsIterableUWContextDefinition(),
        new BusinessOwnersBuildingsIterableUWContextDefinition(),

        new HomeownersUWContextDefinition(),
        new HomeownersCoveragePartIterableUWContextDefinition(),
        new HomeownersDwellingIterableUWContextDefinition(),
        new HomeownersDwellingHazardIterableUWContextDefinition(),
        new HomeownersDwellingAnimalIterableUWContextDefinition(),
        new HomeownersSchedPersPropertyItemUWContextDefinition()

    }
  }

  override property get TriggeringPointMap(): Map<TriggeringPointKey, IRuleContextDefinition[]> {
    return TriggeringPointKey.TF_UWRULECHECKINGSETFILTER.TypeKeys.mapToKeyAndValue(\t -> t, \t -> _uwContexts)
  }

  override property get RuleActions(): Set<IRuleAction> {
    return {new AddUWIssueRuleAction()}
  }

  override property get BlackListedProperties(): Set<IPropertyReference> {
    return {}
  }

  override property get WhiteListedMethods(): Map<IMethodReference, String> {
    return {
        Object#toString() -> "converts instance to readable text",
        PolicyContextDefinitionLibrary#hasGoodDriverDiscount(PolicyDriver) -> "determines whether a driver qualifies for GoodDriverDiscount"
    }
  }

  /**
   * @return join between platform and application blacklist methods
   */
  override property get BlackListedMethods(): Set<IMethodReference> {
    return _blackListedMethods
  }

  override property get LookupEnabled() : boolean {
    return true
  }

  override function getAppBizRulesPageNavigation(rule: Rule): BizRulesPageNavigationSupport {
    return PCBizRulesNavigationSupport.Instance
  }

}
