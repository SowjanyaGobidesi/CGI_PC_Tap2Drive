package gw.bizrules.provisioning.contexts

@Export
class GeneralLiabilityExposuresIterableUWContextDefinition extends GeneralLiabilityUWContextDefinition {
  public static final var PARAM_EXPOSURE: String = "glExposure"

  construct() {
    addIterativeSymbol(PARAM_EXPOSURE, GLExposure, \ec -> ec.Period.GLLine.Exposures)
  }

  override property get Key(): RuleContextDefinitionKey {
    return RuleContextDefinitionKey.TC_GLPOLICYEXPOSUREITERATIVE
  }
}