package gw.web.line.hop.policy

uses gw.api.productmodel.ConditionPattern
uses gw.api.productmodel.CoveragePattern
uses gw.api.productmodel.ExclusionPattern

@Export
class HOPClausePanelSetHelper {

  static function getLineConditionPatterns(hopLine: HOPLine, openForEdit: boolean): ConditionPattern[] {
    var lineConditionPatterns = hopLine.Pattern.getCoverageCategoryByCodeIdentifier("HOPConditions").conditionPatternsForEntity(entity.HOPLine).whereSelectedOrAvailable(hopLine, openForEdit)
    var pcLineConditionPatterns = hopLine.Pattern.getCoverageCategoryByCodeIdentifier("HOPPCConditions").conditionPatternsForEntity(entity.HOPLine).whereSelectedOrAvailable(hopLine, openForEdit)
    return lineConditionPatterns.concat(pcLineConditionPatterns)
  }

  static function getDwellingConditionPatterns(hopDwelling: HOPDwelling, openForEdit: boolean): ConditionPattern[] {
    var dwellingConditionPatterns = hopDwelling.HOPCoveragePart.HOPLine.Pattern.getCoverageCategoryByCodeIdentifier("HOPConditions").conditionPatternsForEntity(entity.HOPDwelling).whereSelectedOrAvailable(hopDwelling, openForEdit)
    var pcDwellingConditionPatterns = hopDwelling.HOPCoveragePart.HOPLine.Pattern.getCoverageCategoryByCodeIdentifier("HOPPCConditions").conditionPatternsForEntity(entity.HOPDwelling).whereSelectedOrAvailable(hopDwelling, openForEdit)
    return dwellingConditionPatterns.concat(pcDwellingConditionPatterns)
  }

  static function getLineExclusionPatterns(hopLine: HOPLine, openForEdit: boolean): ExclusionPattern[] {
    var lineExclusionPatterns = hopLine.Pattern.getCoverageCategoryByCodeIdentifier("HOPExclusions").exclusionPatternsForEntity(entity.HOPLine).whereSelectedOrAvailable(hopLine, openForEdit)
    var pcLineExclusionPatterns = hopLine.Pattern.getCoverageCategoryByCodeIdentifier("HOPPCExclusions").exclusionPatternsForEntity(entity.HOPLine).whereSelectedOrAvailable(hopLine, openForEdit)
    return lineExclusionPatterns.concat(pcLineExclusionPatterns)
  }

  static function getDwellingExclusionPatterns(hopDwelling: HOPDwelling, openForEdit: boolean): ExclusionPattern[] {
    var dwellingExclusionPatterns = hopDwelling.HOPCoveragePart.HOPLine.Pattern.getCoverageCategoryByCodeIdentifier("HOPExclusions").exclusionPatternsForEntity(entity.HOPDwelling).whereSelectedOrAvailable(hopDwelling, openForEdit)
    var pcDwellingExclusionPatterns = hopDwelling.HOPCoveragePart.HOPLine.Pattern.getCoverageCategoryByCodeIdentifier("HOPPCExclusions").exclusionPatternsForEntity(entity.HOPDwelling).whereSelectedOrAvailable(hopDwelling, openForEdit)
    return dwellingExclusionPatterns.concat(pcDwellingExclusionPatterns)
  }

  static function getLineAdditionalCoveragesPatterns(hopLine: HOPLine, openForEdit: boolean): CoveragePattern[] {
    return getLineCoveragePatterns(hopLine, openForEdit, "HOPAdditionalCovCat", "HOPPCAdditionalCovCat")
  }

  static function getDwellingAdditionalCoveragesPatterns(hopDwelling: HOPDwelling, openForEdit: boolean): CoveragePattern[] {
    return getDwellingCoveragePatterns(hopDwelling, openForEdit, "HOPAdditionalCovCat", "HOPPCAdditionalCovCat")
  }

  static function getDwellingSectionICoveragesPatterns(hopDwelling: HOPDwelling, openForEdit: boolean): CoveragePattern[] {
    return getDwellingCoveragePatterns(hopDwelling, openForEdit, "HOPSectionICovCat", "HOPSectionIPCCovCat")
  }

  static function getLineSectionIICoveragesPatterns(hopLine: HOPLine, openForEdit: boolean): CoveragePattern[] {
    return getLineCoveragePatterns(hopLine, openForEdit, "HOPSectionIICovCat", "HOPSectionIIPCCovCat")
  }

  static function getLineOptionalCoveragesPatterns(hopLine: HOPLine, openForEdit: boolean): CoveragePattern[] {
    return getLineCoveragePatterns(hopLine, openForEdit, "HOPOptionalCovCat", "HOPPCOptionalCovCat")
  }

  static function getDwellingOptionalCoveragesPatterns(hopDwelling: HOPDwelling, openForEdit: boolean): CoveragePattern[] {
    return getDwellingCoveragePatterns(hopDwelling, openForEdit, "HOPOptionalCovCat", "HOPPCOptionalCovCat")
  }

  private static function getLineCoveragePatterns(hopLine: HOPLine, openForEdit: boolean, lineCategory: String, pcLineCategory: String): CoveragePattern[] {
    var lineCoveragePatterns = hopLine.Pattern.getCoverageCategoryByCodeIdentifier(lineCategory).coveragePatternsForEntity(entity.HOPLine).whereSelectedOrAvailable(hopLine, openForEdit)
    var pcLineCoveragePatterns = hopLine.Pattern.getCoverageCategoryByCodeIdentifier(pcLineCategory).coveragePatternsForEntity(entity.HOPLine).whereSelectedOrAvailable(hopLine, openForEdit)
    return lineCoveragePatterns.concat(pcLineCoveragePatterns)
  }

  private static function getDwellingCoveragePatterns(hopDwelling: HOPDwelling, openForEdit: boolean, lineCategory: String, pcLineCategory: String): CoveragePattern[] {
    var dwellingCoveragePatterns = hopDwelling.HOPCoveragePart.HOPLine.Pattern.getCoverageCategoryByCodeIdentifier(lineCategory).coveragePatternsForEntity(entity.HOPDwelling).whereSelectedOrAvailable(hopDwelling, openForEdit)
    var pcDwellingCoveragePatterns = hopDwelling.HOPCoveragePart.HOPLine.Pattern.getCoverageCategoryByCodeIdentifier(pcLineCategory).coveragePatternsForEntity(entity.HOPDwelling).whereSelectedOrAvailable(hopDwelling, openForEdit)
    return dwellingCoveragePatterns.concat(pcDwellingCoveragePatterns)
  }
}