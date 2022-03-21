package gw.bizrules.provisioning.contexts

uses gw.bizrules.IRuleContext
uses gw.pc.bizrules.provisioning.RuleContext

uses java.util.Map

/**
 * Used for constructing contexts in {@link gw.bizrules.ITriggeringPoint} implementations
 */
@Export
internal class ContextBuilder {
  protected var _values: Map<String, Object>
  protected var _contextDefinition: UWRuleContextDefinition

  construct(contextDefinition: UWRuleContextDefinition) {
    _contextDefinition = contextDefinition
    _values = {}
  }

  function withValue(name: String, value: Object): ContextBuilder {
    _values.put(name, value)
    return this
  }

  function create(): List<IRuleContext> {
    assert _contextDefinition.SymbolNames.containsAll(_values.Keys)
    return {new RuleContext(_contextDefinition, _values)}
  }
}
