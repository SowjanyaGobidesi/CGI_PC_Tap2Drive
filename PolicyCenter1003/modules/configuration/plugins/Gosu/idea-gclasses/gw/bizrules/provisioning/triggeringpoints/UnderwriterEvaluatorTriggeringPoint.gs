package gw.bizrules.provisioning.triggeringpoints

uses gw.api.system.BizRulesDependenciesGateway
uses gw.bizrules.IRuleContext
uses gw.bizrules.ITriggeringPoint
uses gw.bizrules.provisioning.contexts.UWRuleContextDefinition
uses gw.policy.PolicyEvalContext

uses java.util.function.Predicate

@Export
class UnderwriterEvaluatorTriggeringPoint implements ITriggeringPoint {

  final var _evalContext: PolicyEvalContext
  final var _applicabilityCriteria: UWRuleApplicabilityCriteriaPredicate
  final var _key: TriggeringPointKey

  construct(key: TriggeringPointKey, evalContext: PolicyEvalContext) {
    _key = key
    _evalContext = evalContext
    _applicabilityCriteria = new UWRuleApplicabilityCriteriaPredicate(evalContext)
  }

  override property get Key(): TriggeringPointKey {
    return _key
  }

  override function supportedContexts(): Set<RuleContextDefinitionKey> {
    return {
        TC_GENERICPOLICY,
        TC_PAPOLICY,
        TC_PAPOLICYDRIVERITERATIVE,
        TC_PAPOLICYVEHICLEITERATIVE,

        TC_CPPOLICY,
        TC_CPPOLICYLOCATIONITERATIVE,
        TC_CPPOLICYBUILDINGITERATIVE,

        TC_BAPOLICY,
        TC_BAPOLICYDRIVERITERATIVE,
        TC_BAPOLICYVEHICLEITERATIVE,

        TC_GLPOLICY,
        TC_GLPOLICYEXPOSUREITERATIVE,

        TC_IMPOLICY,
        TC_IMPOLICYLOCATIONITERATIVE,
        TC_IMPOLICYBUILDINGITERATIVE,
        TC_IMPOLICYACCOUNTSRECEIVABLEITERATIVE,
        TC_IMPOLICYIMSIGNITERATIVE,
        TC_IMPOLICYCONTRACTORSEQUIPMENTITERATIVE,

        TC_WCPOLICY,
        TC_WCPOLICYCOVEREDEMPLOYEEITERATIVE,

        TC_BOPPOLICY,
        TC_BOPPOLICYLOCATIONITERATIVE,
        TC_BOPPOLICYBUILDINGITERATIVE,

        TC_HOPPOLICY,
        TC_HOPPOLICYCOVPARTITERATIVE,
        TC_HOPPOLICYDWELLINGITERATIVE,
        TC_HOPPOLICYDWELLINGHAZARDITERATIVE,
        TC_HOPPOLICYDWELLINGANIMALITERATIVE,
        TC_HOPPOLICYSCHEDPERSPROPERTYITEMITERATIVE

    }
  }

  override function generateContexts(contextDefinitionKey: RuleContextDefinitionKey): List<IRuleContext> {
    var contextDef = BizRulesDependenciesGateway.getBizRulesComponentMapper().getContextDefinition(contextDefinitionKey) as UWRuleContextDefinition
    return contextDef.generateContexts(_evalContext)
  }

  override property get RuleApplicabilityPredicate(): Predicate<RuleVersion> {
    return _applicabilityCriteria
  }
}
