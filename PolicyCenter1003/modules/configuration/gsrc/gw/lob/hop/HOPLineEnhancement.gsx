package gw.lob.hop

uses gw.web.line.hop.policy.HOPCoverageCategoryHelper

enhancement HOPLineEnhancement: entity.HOPLine {

  property get HOPDwellings(): HOPDwelling[] {
    return this.HOPCoverageParts*.HOPDwellings
  }

  function createAndAddHOPDwelling(): HOPDwelling {
    var coveragePart = this.HOPCoverageParts.single()  // TODO: Check assumption is fine
    var dwelling = new HOPDwelling(this.Branch)
    coveragePart.addToHOPDwellings(dwelling)
    if (this.Branch.PrimaryLocation != null) {
      dwelling.Location = this.Branch.PrimaryLocation
    }
    dwelling.PreferredCoverageCurrency = this.PreferredCoverageCurrency
    dwelling.syncModifiers()
    dwelling.createCoveragesConditionsAndExclusions()
    return dwelling
  }

  /**
   * Calls createOrSyncCoverages, Conditions and Exclusions on all coverables for this line and triggers their initialization script
   *
   * Most HOP clause availability depends on the coverage form, this will clear out any clauses or terms no longer available and
   * set default values (through the init script) where we can
   */
  function resyncAndInitClauses() {
    var coverables = this.AllCoverables.where(\ coverable -> !(coverable typeis ScheduledItem))
    coverables.each(\ coverable -> {
      coverable.createOrSyncCoverages()
      coverable.createOrSyncConditions()
      coverable.createOrSyncExclusions()
      coverable.CoveragesFromCoverable.each(\elt -> elt.fireInitializeEvent())
    })
  }

  function removeFromHOPDwellings(dwelling: HOPDwelling) {
    dwelling.getHOPCoveragePart().removeFromHOPDwellings(dwelling)
  }

  function removeHOPDwelling(cbl: HOPDwelling) {
    cbl.HOPCoveragePart.removeFromHOPDwellings(cbl)
  }

  function createAndAddHOPCoveragePart(): HOPCoveragePart {
    var newCoveragePart = new HOPCoveragePart(this.Branch)
    this.addToHOPCoverageParts(newCoveragePart)

    newCoveragePart.syncModifiers()
    newCoveragePart.syncCoverages()
    return newCoveragePart
  }

  function removeHOPCoveragePart(coveragePart: HOPCoveragePart) {
    this.removeFromHOPCoverageParts(coveragePart)
  }

  /**
   * Base Premium Costs are costs associated with either Cov A or Cov C depending
   * on the policy type. For 'dwelling' policy type, it is associated with
   * Cov A, otherwise it is part of Cov C.
   */
  property get BasePremiumCosts(): List<HOPCost> {
    var dwelling = this.HOPDwellings.single()
    var allCostVersions = (dwelling.HOPCoveragePart.CoveragePartType == CoveragePartType.TC_HOPDWELLING) ?
        dwelling.HOPCovA.VersionList.HOPDwellingCovCosts.flatMap(\h -> h.AllVersions) :
        dwelling.HOPCovC.VersionList.HOPDwellingCovCosts.flatMap(\h -> h.AllVersions)
    var baseCosts = allCostVersions.where(\cost -> cost.HOPPremiumType == HOPPremiumType.TC_BASEPREMIUM)
    return baseCosts
  }

  property get DwellingSectionIChangedCovCosts(): List<HOPCost> {
    return getSecIChangedCosts(getAllCostVersions<HOPDwellingCovCost>())
  }

  property get LineSectionIChangedCovCosts(): List<HOPCost> {
    return getSecIChangedCosts(getAllCostVersions<HOPLineCovCost>())
  }

  property get DwellingSectionIIChangedCovCosts(): List<HOPCost> {
    return getSecIIChangedCosts(getAllCostVersions<HOPDwellingCovCost>())
  }

  property get LineSectionIIChangedCovCosts(): List<HOPCost> {
    return getSecIIChangedCosts(getAllCostVersions<HOPLineCovCost>())
  }

  property get AdjustmentsToBasePremiumCosts(): List<HOPCost> {
    var allAdjToBasePremiumCosts = new ArrayList<HOPCost>()
    allAdjToBasePremiumCosts.addAll(DwellingSectionIChangedCovCosts)
    allAdjToBasePremiumCosts.addAll(LineSectionIChangedCovCosts)
    allAdjToBasePremiumCosts.addAll(DwellingSectionIIChangedCovCosts)
    allAdjToBasePremiumCosts.addAll(LineSectionIIChangedCovCosts)
    return allAdjToBasePremiumCosts
  }

  property get DwellingAdditionalCovCosts(): List<HOPCost> {
    return getAdditionalCosts(getAllCostVersions<HOPDwellingCovCost>())
  }

  property get LineAdditionalCovCosts(): List<HOPCost> {
    return getAdditionalCosts(getAllCostVersions<HOPLineCovCost>())
  }

  property get DwellingOptionalCovCosts(): List<HOPCost> {
    return getOptionalCosts(getAllCostVersions<HOPDwellingCovCost>())
  }

  property get DwellingOptionalScheduledItemCovCosts(): List<HOPCost> {
    return getOptionalCosts(getAllCostVersions<HOPDwellSchCovItemCovCost>())
  }

  property get LineOptionalCovCosts(): List<HOPCost> {
    return getOptionalCosts(getAllCostVersions<HOPLineCovCost>())
  }

  property get LineOptionalScheduledItemCovCosts(): List<HOPCost> {
    return getOptionalCosts(getAllCostVersions<HOPLineSchCovItemCovCost>())
  }

  property get OtherCosts(): List<HOPCost> {
    var allOtherPremiumCosts = new ArrayList<HOPCost>()
    allOtherPremiumCosts.addAll(DwellingAdditionalCovCosts)
    allOtherPremiumCosts.addAll(LineAdditionalCovCosts)
    allOtherPremiumCosts.addAll(DwellingOptionalCovCosts)
    allOtherPremiumCosts.addAll(DwellingOptionalScheduledItemCovCosts)
    allOtherPremiumCosts.addAll(LineOptionalCovCosts)
    allOtherPremiumCosts.addAll(LineOptionalScheduledItemCovCosts)
    return allOtherPremiumCosts
  }

  property get ModifierCosts(): List<HOPCost> {
    return getModifierCosts(getAllCostVersions<HOPCost>())
  }

  //---------------- private methods -----------------------

  private reified function getAllCostVersions<T extends HOPCost>(): List<HOPCost> {
    return this.VersionList.HOPCosts.where(\cost -> cost.AllVersions.first() typeis T).flatMap(\h -> h.AllVersions)
  }

  private function getSecIChangedCosts(allCosts: List<HOPCost>): List<HOPCost> {
    return allCosts.where(\cost ->
        cost.HOPPremiumType == HOPPremiumType.TC_ADJUSTMENTTOBASEPREMIUM
            and isSectionICoverage(cost.Coverage))
  }

  private function getSecIIChangedCosts(allCosts: List<HOPCost>): List<HOPCost> {
    return allCosts.where(\cost ->
        cost.HOPPremiumType == HOPPremiumType.TC_ADJUSTMENTTOBASEPREMIUM
            and isSectionIICoverage(cost.Coverage))
  }

  private function getAdditionalCosts(allCosts: List<HOPCost>): List<HOPCost> {
    return allCosts.where(\cost ->
        cost.HOPPremiumType == HOPPremiumType.TC_OTHERPREMIUM
            and cost.Modification == Modification.TC_BASE
            and isAdditionalCoverage(cost.Coverage))
  }

  private function getOptionalCosts(allCosts: List<HOPCost>): List<HOPCost> {
    return allCosts.where(\cost ->
        cost.HOPPremiumType == HOPPremiumType.TC_OTHERPREMIUM
            and cost.Modification == Modification.TC_BASE
            and isOptionalCoverage(cost.Coverage))
  }

  private function isSectionICoverage(coverage: Coverage): Boolean {
    var covCatCodeIdentifier = coverage.CoverageCategory.CodeIdentifier
    return covCatCodeIdentifier == HOPCoverageCategoryHelper.HOPSECICOVCAT
        or covCatCodeIdentifier == HOPCoverageCategoryHelper.HOPSECIPCCOVCAT
  }

  private function isSectionIICoverage(coverage: Coverage): Boolean {
    var covCatCodeIdentifier = coverage.CoverageCategory.CodeIdentifier
    return covCatCodeIdentifier == HOPCoverageCategoryHelper.HOPSECIICOVCAT
        or covCatCodeIdentifier == HOPCoverageCategoryHelper.HOPSECIIPCCOVCAT
  }

  private function isAdditionalCoverage(coverage: Coverage): Boolean {
    var covCatCodeIdentifier = coverage.CoverageCategory.CodeIdentifier
    return covCatCodeIdentifier == HOPCoverageCategoryHelper.HOPADDITIONALCOVCAT
        or covCatCodeIdentifier == HOPCoverageCategoryHelper.HOPPCADDITIONALCOVCAT
  }

  private function isOptionalCoverage(coverage: Coverage): Boolean {
    var covCatCodeIdentifier = coverage.CoverageCategory.CodeIdentifier
    return covCatCodeIdentifier == HOPCoverageCategoryHelper.HOPOPTIONALCOVCAT
        or covCatCodeIdentifier == HOPCoverageCategoryHelper.HOPPCOPTIONALCOVCAT
        or covCatCodeIdentifier == HOPCoverageCategoryHelper.HOPSCHEDULEDITEMCOVCAT
  }

  private function getModifierCosts(allCosts: List<HOPCost>): List<HOPCost> {
    return allCosts.where(\cost -> cost.Modification == Modification.TC_MODIFICATION)
  }
}
