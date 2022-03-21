package gw.rating

uses gw.api.productmodel.PolicyLinePatternLookup
uses gw.rating.rtm.util.ProductModelUtils
uses gw.api.locale.DisplayKey

enhancement GenericRateBookFieldEnhancement: gw.rating.GenericRateBookFieldSearch {

  static function policyLineCodeToDescription(code : String) : String {
    return code == GenericRateBookFieldSearch.GENERIC_POLICY_LINE_CODE
        ? DisplayKey.get("Web.Rating.Filter.Generic")
        : PolicyLinePatternLookup.getByPublicID(code).DisplayName
  }

  static function offeringCodeToDescription(code : String) : String {
    return code == GenericRateBookFieldSearch.GENERIC_OFFERING_CODE
        ? DisplayKey.get("Web.Rating.Filter.Generic")
        : ProductModelUtils.getOfferingDisplayName(code)
  }

}
