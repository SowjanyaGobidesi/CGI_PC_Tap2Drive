package gw.bizrules.provisioning.contexts

uses entity.IMSign

@Export
class InlandMarineIMSignIterativeUWContextDefinition extends InlandMarineUWContextDefinition {
  public static final var PARAM_IMSIGN: String = "imSign"

  construct() {
    addIterativeSymbol(PARAM_IMSIGN, IMSign, \ec -> {
      return ec.Period.IMLine.IMSignPart != null ? ec.Period.IMLine.IMSignPart.IMSigns : {}
    })
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_IMPOLICYIMSIGNITERATIVE
  }
}