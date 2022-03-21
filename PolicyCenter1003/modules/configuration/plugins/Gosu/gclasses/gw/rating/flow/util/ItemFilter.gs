package gw.rating.flow.util

uses gw.api.domain.covterm.OptionCovTerm
uses gw.api.domain.covterm.PackageCovTerm
uses gw.api.domain.covterm.TypekeyCovTerm
uses gw.api.productmodel.CovTermOpt
uses gw.api.productmodel.CovTermPack
uses gw.api.productmodel.OptionCovTermPattern
uses gw.api.productmodel.PackageCovTermPattern
uses gw.api.productmodel.PolicyLinePattern
uses gw.lang.reflect.IType
uses gw.pc.rating.flow.util.InScopeUsageBase
uses gw.util.concurrent.LockingLazyVar

uses java.util.regex.Pattern

/**
 * Default implementation of filtering, used by RateRoutinePlugin.filterIrrelevantItems() and the lob-specific
 * config classes.
 *
 * This code used to be in RateRoutinePlugin, but has been extracted in order to make it easy for the lob-specific
 * classes to share it as a default implementation.
 *
 * The majority of the implementation is instance-level, not static, so you can also subclass this.
 */
@Export
class ItemFilter {

  protected construct() { }

  static var _instance = new LockingLazyVar<ItemFilter>() {
    protected override function init(): ItemFilter {
      return new ItemFilter()
    }
  }

  /**
   * Get the (singleton) instance of this class.
   * @return
   */
  static property get Instance(): ItemFilter {
    return _instance.get()
  }

  /**
   * utility method which applies all of the default filtering specified/implemented below
   */
  static function applyDefaultFilters(input : List<InScopeUsageBase>, filterCollections : boolean = true) : List<InScopeUsageBase> {
    // Removes irrelevant items based on <code>IgnoredPaths</code> and <code>IgnoredTypes</code> and
    // arrays or maps of types.
    var usagesSet = input.toSet()

    var i = ItemFilter.Instance

    if(filterCollections) {
      i.filterCollectionsOfTypes(usagesSet)
    }
    i.filterIgnoredTypes(usagesSet)
    i.filterIgnoredPaths(usagesSet)

    return usagesSet.toList()
  }

  /**
   * List of Paths which will be filtered out, by looking at the end of the Path to see if it matches the string below.
   * IMPORTANT: ignored paths should generally start with "." so that we don't unintentionally filter away names that
   * incorporate one of thse paths.  (E.g. this was erroneously eliminating "HasScheduleModifiers")
   */
   var _ignoredPaths : Set<String> as readonly IgnoredPaths = {
      ".EffectiveDate",
      ".ExpirationDate",
      ".Modifiers",
      ".ReferenceDateInternal"
  }

  /**
   * List of Types which will be filtered out.
   */
  var _ignoredTypes : Set<IType> as readonly IgnoredTypes = {
      AutoNumberSequence,
      EffDatedChangeType,
      FrozenSet,
      PolicyLinePattern,
      PolicyPeriod
  }

  // pattern which rejects composite types.
  var _pattern = Pattern.compile("^[^ \\[ \\] \\< \\> ]*$", Pattern.COMMENTS) // accepts characters which are not '[', ']' , '<', '>'

  // list of Generic types which we don't want to exclude
  var _acceptableGenericTypes: Set<IType> = {
      OptionCovTermPattern,
      OptionCovTerm,
      TypekeyCovTerm,
      CovTermOpt,
      PackageCovTermPattern,
      PackageCovTerm,
      CovTermPack
  }

  /**
   * Removes collections of types by excluding square-brackets and angle-brackets, except for those types that
   * are generic that we explicitly want to include
   * Those with brackets, for example QuestionSet[] and Map<CoverageCategory, List<PolicyCondition>>, are removed.
   */
  function filterCollectionsOfTypes(input : Set<InScopeUsageBase>) {
    input.retainWhere(\ i ->
        _pattern.matcher(i.FeatureType.RelativeName).matches() or
            _acceptableGenericTypes.hasMatch( \ t -> gw.api.util.TypeUtil.isNominallyOrStructurallyAssignable(t, i.FeatureType)))
  }

  /**
   * Removes usages whose FeatureType is in the list of ignored types
   */
  function filterIgnoredTypes(input : Set<InScopeUsageBase>) {
    input.removeWhere(\usage -> _ignoredTypes.contains(usage.FeatureType))
  }

  /**
   * Removes usages whose path ends with one of the ignored paths
   */
  function filterIgnoredPaths(input : Set<InScopeUsageBase>) {
    input.removeWhere(\ usage -> _ignoredPaths.hasMatch(\ element -> usage.Path != null and usage.Path.endsWith(element)))
  }
}