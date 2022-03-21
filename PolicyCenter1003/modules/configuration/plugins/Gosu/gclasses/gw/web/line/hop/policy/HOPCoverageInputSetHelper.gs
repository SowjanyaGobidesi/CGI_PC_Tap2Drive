package gw.web.line.hop.policy

uses gw.api.domain.covterm.OptionCovTerm


@Export
class HOPCoverageInputSetHelper {

  public static function onCovALimitChange(aDwelling : HOPDwelling) {
    recalculateCovBDirectLimit(aDwelling)
    recalculateCovCDirectLimit(aDwelling)
    recalculateCovDDirectLimit(aDwelling)
  }

  public static function onCovACauseOfLossChange(aDwelling : HOPDwelling) {
    if (aDwelling.HOPCoveragePart.CoveragePartType != CoveragePartType.TC_HOPCONDO) {
      if (aDwelling.CoverageForm != HOPCoverageForm.TC_HO2) {
        copyOptionCovTerm(aDwelling.HOPCovC.HOPCovCCauseOfLossTerm, aDwelling.HOPCovA.HOPCovACauseOfLossTerm)
      }
    }
  }

  public static function onCovBLimitChange(aDwelling : HOPDwelling) {
    recalculateCovBDirectLimit(aDwelling)
  }

  public static function copyOptionCovTerm(destOptionCovTerm: OptionCovTerm, srcOptionCovTerm: OptionCovTerm){
    destOptionCovTerm.OptionValue = destOptionCovTerm.Pattern.getCovTermOpt(srcOptionCovTerm.OptionValue.getOptionCode())
  }

  private static function recalculateCovBDirectLimit(aDwelling : HOPDwelling) {
    var covBDirectLimitTerm = aDwelling.HOPCovB.HOPCovBDirectLimitTerm
    var covBPercentLimitTerm = aDwelling.HOPCovB.HOPCovBLimitTerm
    if (aDwelling.HOPCoveragePart.CoveragePartType == CoveragePartType.TC_HOPDWELLING) {
      var covALimitTerm = aDwelling.HOPCovA.HOPCovALimitTerm
      if (covALimitTerm.Value != null and covBPercentLimitTerm.OptionValue != null) {
        covBDirectLimitTerm.Value = covALimitTerm.Value * (covBPercentLimitTerm.OptionValue.Value / 100)
      }
    }
    else {
      var covCLimitTerm = aDwelling.HOPCovC.HOPCovCDirectLimitTerm
      if (covCLimitTerm.Value != null and covBPercentLimitTerm.OptionValue != null) {
        covBDirectLimitTerm.Value = covCLimitTerm.Value * (covBPercentLimitTerm.OptionValue.Value / 100)
      }

    }
  }

  public static function onCovCLimitChange(aDwelling : HOPDwelling) {
    recalculateCovCDirectLimit(aDwelling)
  }

  public static function onCovCDirectLimitChange(aDwelling : HOPDwelling) {
    recalculateCovBDirectLimit(aDwelling)
    recalculateCovDDirectLimit(aDwelling)
  }

  private static function recalculateCovCDirectLimit(aDwelling : HOPDwelling) {
    var covALimitTerm = aDwelling.HOPCovA.HOPCovALimitTerm
    var covCDirectLimitTerm = aDwelling.HOPCovC.HOPCovCDirectLimitTerm
    var covCPercentLimitTerm = aDwelling.HOPCovC.HOPCovCLimitTerm
    if (covALimitTerm.Value != null and covCPercentLimitTerm.OptionValue != null) {
      covCDirectLimitTerm.Value = covALimitTerm.Value * (covCPercentLimitTerm.OptionValue.Value / 100)
    }
  }

  public static function onCovDLimitChange(aDwelling : HOPDwelling) {
    recalculateCovDDirectLimit(aDwelling)
  }

  private static function recalculateCovDDirectLimit(aDwelling : HOPDwelling) {
    var covDDirectLimitTerm = aDwelling.HOPCovD.HOPCovDDirectLimitTerm
    var covDPercentLimitTerm = aDwelling.HOPCovD.HOPCovDLimitTerm
    if (aDwelling.HOPCoveragePart.CoveragePartType == CoveragePartType.TC_HOPDWELLING) {
      var covALimitTerm = aDwelling.HOPCovA.HOPCovALimitTerm
      if (covALimitTerm.Value != null and covDPercentLimitTerm.OptionValue != null) {
        covDDirectLimitTerm.Value = covALimitTerm.Value * (covDPercentLimitTerm.OptionValue.Value / 100)
      }
    }
    else {
      var covCLimitTerm = aDwelling.HOPCovC.HOPCovCDirectLimitTerm
      if (covCLimitTerm.Value != null and covDPercentLimitTerm.OptionValue != null) {
        covDDirectLimitTerm.Value = covCLimitTerm.Value * (covDPercentLimitTerm.OptionValue.Value / 100)
      }
    }
  }
}