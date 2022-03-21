package gw.web.product
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.PolicyLinePattern
uses gw.lob.common.RiskClassQueryBuilder
uses gw.api.util.DisplayableException

/**
 * Custom widget for picking ClassCodes.
 */
@Export
class RiskClassPickerUtil {

  static function findRiskClass(description : String, policyLinePattern : PolicyLinePattern) : RiskClass {
    if (description.NotBlank) {
      var riskClass = new RiskClassQueryBuilder()
          .withPolicyLinePatternCode(policyLinePattern.PublicID)
          .withDescription(description)
          .build().select().AtMostOneRow as RiskClass
      if (riskClass == null) {
        throw new DisplayableException(DisplayKey.get("Java.RiskClassPickerWidget.InvalidCode", description))
      }
      return riskClass
    }
    return null
  }
  
}
