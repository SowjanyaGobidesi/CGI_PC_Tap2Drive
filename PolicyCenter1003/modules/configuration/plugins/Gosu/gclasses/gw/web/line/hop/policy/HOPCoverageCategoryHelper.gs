package gw.web.line.hop.policy

uses entity.HOPLine
uses gw.api.domain.covterm.CovTerm
uses gw.api.domain.covterm.PackageCovTerm
uses gw.api.domain.covterm.TypekeyCovTerm
uses gw.api.productmodel.DirectCovTermPattern
uses gw.api.productmodel.GenericCovTermPattern
uses gw.api.productmodel.OptionCovTermPattern
uses gw.api.productmodel.PackageCovTermPattern
uses gw.api.productmodel.TypekeyCovTermPattern

/***
 * Helper class for PolicyLineSummaryPanelSet.HOPLine.pcf and RatingCumulDetailsPanelSet.HOPLine.pcf
 */
@Export
class HOPCoverageCategoryHelper {
  public final static var HOPSECICOVCAT: String = "HOPSectionICovCat"
  public final static var HOPSECIPCCOVCAT: String = "HOPSectionIPCCovCat"
  public final static var HOPSECIICOVCAT: String = "HOPSectionIICovCat"
  public final static var HOPSECIIPCCOVCAT: String = "HOPSectionIIPCCovCat"
  public final static var HOPADDITIONALCOVCAT: String = "HOPAdditionalCovCat"
  public final static var HOPPCADDITIONALCOVCAT: String = "HOPPCAdditionalCovCat"
  public final static var HOPOPTIONALCOVCAT: String = "HOPOptionalCovCat"
  public final static var HOPPCOPTIONALCOVCAT: String = "HOPPCOptionalCovCat"
  public final static var HOPEXCLUSIONS: String = "HOPExclusions"
  public final static var HOPPCEXCLUSIONS: String = "HOPPCExclusions"
  public final static var HOPCONDITIONS: String = "HOPConditions"
  public final static var HOPPCCONDITIONS: String = "HOPPCConditions"
  public final static var HOPSCHEDULEDITEMCOVCAT: String = "HOPScheduledItemCovCat"

  var _hopLine: HOPLine as readonly HOPLine

  construct(hopLine: HOPLine) {
    _hopLine = hopLine
  }

  property get SectionIDeductible() : Coverage {
    return HOPLine.HOPDwellings.single().HOPSectionIDeductibles
  }

  property get SectionICoverages(): List<Clause> {
    var categoryMap = getCoverageCategoryToCoveragesMap(HOPLine)
    return getClausesForCategories(categoryMap, HOPSECICOVCAT, HOPSECIPCCOVCAT)
  }

  property get SectionIICoverages() : List<Clause> {
    var categoryMap = getCoverageCategoryToCoveragesMap(HOPLine)
    return getClausesForCategories(categoryMap, HOPSECIICOVCAT, HOPSECIIPCCOVCAT)
  }

  property get AdditionalCoverages(): List<Clause> {
    var categoryMap = getCoverageCategoryToCoveragesMap(HOPLine)
    return getClausesForCategories(categoryMap, HOPADDITIONALCOVCAT, HOPPCADDITIONALCOVCAT)
  }

  property get OptionalCoverages(): List<Clause> {
    var categoryMap = getCoverageCategoryToCoveragesMap(HOPLine)
    return getClausesForCategories(categoryMap, HOPOPTIONALCOVCAT, HOPPCOPTIONALCOVCAT)
  }

  property get Exclusions(): List<Clause> {
    var categoryMap = getCoverageCategoryToExclusionsMap(HOPLine)
    return getClausesForCategories(categoryMap, HOPEXCLUSIONS, HOPPCEXCLUSIONS)
  }

  property get PolicyConditions(): List<Clause> {
    var categoryMap = getCoverageCategoryToConditionsMap(HOPLine)
    return getClausesForCategories(categoryMap, HOPCONDITIONS, HOPPCCONDITIONS)
  }

  property get Modifiers(): Modifier[] {
    var allModifiers = HOPLine.Modifiers
        .concat(HOPLine.HOPCoverageParts*.Modifiers)
        .concat(HOPLine.HOPDwellings*.Modifiers)
    return allModifiers
  }

  private static function getCoverageCategoryToCoveragesMap(line: HOPLine): Map<String, List<Coverage>> {
    var allCoverages = new ArrayList<Coverage>()
    allCoverages.addAll(line.HOPLineCoverages.toList())
    allCoverages.addAll(line.HOPCoverageParts*.Coverages.toList())
    allCoverages.addAll(line.HOPDwellings*.Coverages.toList())
    return allCoverages.partition(\cov -> cov.CoverageCategory.CodeIdentifier)
  }

  private static function getCoverageCategoryToExclusionsMap(line: HOPLine): Map<String, List<Exclusion>> {
    var allExclusions = new ArrayList<Exclusion>()
    allExclusions.addAll(line.HOPLineExclusions.toList())
    allExclusions.addAll(line.HOPCoverageParts*.Exclusions.toList())
    allExclusions.addAll(line.HOPDwellings*.Exclusions.toList())
    return allExclusions.partition(\excl -> excl.Pattern.CoverageCategory.CodeIdentifier)
  }

  private static function getCoverageCategoryToConditionsMap(line: HOPLine): Map<String, List<PolicyCondition>> {
    var allConditions = new ArrayList<PolicyCondition>()
    allConditions.addAll(line.HOPLineConditions.toList())
    allConditions.addAll(line.HOPCoverageParts*.Conditions.toList())
    allConditions.addAll(line.HOPDwellings*.Conditions.toList())
    return allConditions.partition(\cond -> cond.Pattern.CoverageCategory.CodeIdentifier)
  }

  /***
   * This methods reads the CoverageCategory to Coverages map and creates a list of coverages
   * that has categories matching with one of the two method params (categoryCodeIdentifier or pcCategoryCodeIdentifier)
   * @param categoryMap
   * @param categoryCodeIdentifier
   * @param pcCategoryCodeIdentifier
   * @return list of coverages belonging to the categories mentioned by the method params.
   */
  private static function getClausesForCategories(
      categoryMap: Map<String, List<Clause>>,
      categoryCodeIdentifier: String,
      pcCategoryCodeIdentifier: String): List<Clause> {

    var allCoverages = new ArrayList<Clause>()
    if (categoryMap.containsKey(categoryCodeIdentifier)) {
      allCoverages.addAll(categoryMap.get(categoryCodeIdentifier))
    }
    if (categoryMap.containsKey(pcCategoryCodeIdentifier)) {
      allCoverages.addAll(categoryMap.get(pcCategoryCodeIdentifier))
    }
    return allCoverages
  }
}