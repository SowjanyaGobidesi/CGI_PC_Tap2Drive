package gw.pcf.coverage

uses gw.api.domain.covterm.DirectCovTerm
uses gw.api.locale.DisplayKey

uses java.lang.Double
uses gw.api.util.PCNumberFormatUtil
uses gw.api.upgrade.Coercions

@Export
class CovTermDirectInputSetHelper {

  public static function validate(covTerm : DirectCovTerm): String {
    if (covTerm == null) {
      return DisplayKey.get("Java.Validation.NonNullable", new Object[]{"Term"})
    } else {
      return covTerm.validateValueInRange(covTerm.Value);
    }
  }

  public static function convertFromString(value: String): Object {
    return PCNumberFormatUtil.parse(value)
  }

  public static function convertToString(value: Object): String {
    return PCNumberFormatUtil.render(Coercions.makeDoubleFrom(value))
  }
}
