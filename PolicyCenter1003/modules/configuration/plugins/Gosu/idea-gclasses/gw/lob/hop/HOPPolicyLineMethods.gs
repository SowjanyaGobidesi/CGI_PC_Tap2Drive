package gw.lob.hop

uses java.util.ArrayList
uses java.util.HashSet
uses java.util.Map
uses java.util.Set
uses java.math.BigDecimal
uses java.lang.Iterable

uses entity.windowed.HOPDwellingVersionList
uses gw.api.domain.Schedule
uses gw.api.locale.DisplayKey
uses gw.api.policy.AbstractPolicyLineMethodsImpl
uses gw.api.productmodel.CoveragePattern
uses entity.windowed.HOPCostVersionList
uses gw.api.util.JurisdictionMappingUtil
uses gw.lob.hop.rating.HOPDemoRatingEngine
uses gw.lob.hop.schedule.HOPScheduleHelper
uses gw.pl.persistence.core.Key
uses gw.plugin.diff.impl.HOPDiffHelper
uses gw.validation.PCValidationContext
uses gw.policy.PolicyLineValidation
uses gw.rating.worksheet.treenode.WorksheetTreeNodeUtil
uses gw.rating.worksheet.treenode.WorksheetTreeNodeContainer
uses gw.api.tree.RowTreeRootNode
uses gw.rating.AbstractRatingEngine
uses gw.lob.hop.rating.HOPRatingEngine

@Export
class HOPPolicyLineMethods extends AbstractPolicyLineMethodsImpl {
  var _line: entity.HOPLine

  construct(line: entity.HOPLine) {
    super(line)
    _line = line
  }

  override property get CoveredStates(): Jurisdiction[] {
    var states = new HashSet<Jurisdiction>()
    if (_line.Branch.BaseState != null) {
      states.add(_line.Branch.BaseState)
    }
    for (n in _line.HOPDwellings) {
      states.add(JurisdictionMappingUtil.getJurisdiction(n.Location))
    }
    return states.toTypedArray()
  }

  override property get AllCoverables(): Coverable[] {
    var list: ArrayList<Coverable> = {_line}
    list.addAll(_line.HOPDwellings.toList())
    list.addAll(_line.HOPCoverageParts.toList())
    list.addAll(AllSchedules*.ScheduledItems.whereTypeIs(Coverable).toList())

    return list.toTypedArray()
  }

  override property get AllCoverages(): Coverage[] {
    var list = new ArrayList<Coverage>()
    for (cb in AllCoverables) {
      list.addAll(cb.CoveragesFromCoverable.toList())
    }
    return list.toTypedArray()
  }

  override property get AllExclusions(): Exclusion[] {
    var list = new ArrayList<Exclusion>()
    for (cb in AllCoverables) {
      list.addAll(cb.ExclusionsFromCoverable.toList())
    }
    return list.toTypedArray()
  }

  override property get AllConditions(): PolicyCondition[] {
    var list = new ArrayList<PolicyCondition>()
    for (cb in AllCoverables) {
      list.addAll(cb.ConditionsFromCoverable.toList())
    }
    return list.toTypedArray()
  }

  override property get AllModifiables(): Modifiable[] {
    var list: ArrayList<Modifiable> = {_line}
    list.addAll(_line.HOPDwellings.toList())
    list.addAll(_line.HOPCoverageParts.toList())

    return list.toTypedArray()
  }

  override property get AllSchedules(): Schedule[] {
    var list = new ArrayList<Schedule>()
    list.addAll(_line.CoveragesConditionsAndExclusionsFromCoverable.whereTypeIs(Schedule).toList())
    list.addAll(_line.HOPDwellings*.CoveragesConditionsAndExclusionsFromCoverable.whereTypeIs(Schedule).toList())
    list.addAll(_line.HOPCoverageParts*.CoveragesConditionsAndExclusionsFromCoverable.whereTypeIs(Schedule).toList())

    return list.toTypedArray()
  }

  /**
   * All costs across the term, in window mode.
   */
  override property get CostVLs(): Iterable<HOPCostVersionList> {
    return _line.VersionList.HOPCosts
  }

  override property get Transactions(): Set<Transaction> {
    var branch = _line.Branch
    return branch.getSlice(branch.PeriodStart).HOPTransactions.toSet()
  }

  override function getAllCostsForCoverage(covered: Coverable, covPat: CoveragePattern): List<Cost> {
    return _line.Branch.AllCosts.where(\cost -> {
      return cost typeis HOPCost and
          cost.Coverage != null and
          cost.Coverage.Pattern.PublicID.equals(covPat.PublicID) and
          cost.Coverage.OwningCoverable == covered
    })
  }

  override function onPrimaryLocationCreation(location: PolicyLocation) {
    if (_line.HOPDwellings == null or _line.HOPDwellings.length == 0) {
      var dwelling = _line.createAndAddHOPDwelling()
      dwelling.Location = location
    }
  }

  override function getExistingOrFutureSchedulesRelatedTo(location : PolicyLocation) : List<ScheduledItem> {
    var hopScheduleHelper = new HOPScheduleHelper()
    return hopScheduleHelper.getCurrentAndFutureScheduledItemsForPolicyLine(_line)
        .where(\item -> item.PolicyLocation.FixedId == location.FixedId and item.ExpirationDate > location.SliceDate)
  }

  override function createPolicyLineValidation(validationContext: PCValidationContext): PolicyLineValidation<entity.HOPLine> {
    return new HOPLineValidation(validationContext, _line)
  }

  override function createPolicyLineDiffHelper(reason: DiffReason, policyLine: PolicyLine): HOPDiffHelper {
    return new HOPDiffHelper(reason, this._line, policyLine as entity.HOPLine)
  }

  override function initialize() {
    if (_line.HOPCoverageParts == null or _line.HOPCoverageParts.length == 0) {
      _line.createAndAddHOPCoveragePart()
    }
  }

  override function getWorksheetRootNode(showConditionals: boolean): RowTreeRootNode {
    var treeNodes: List <WorksheetTreeNodeContainer> = {}
    var beanContainerMap: HashMap<Key,WorksheetTreeNodeContainer> = {}
    var allCosts = _line.Costs.cast(HOPCost)

    //add the worksheets for line coverage costs
    addCoverableWorksheetNodes(_line, allCosts, showConditionals, beanContainerMap, treeNodes)

    //add the worksheets for dwelling coverage costs
    for (dwelling in _line.HOPDwellings) {
      addCoverableWorksheetNodes(dwelling, allCosts, showConditionals, beanContainerMap, treeNodes)
      var keyFactorWorksheet = _line.Branch.getWorksheetFor(dwelling)
      if (keyFactorWorksheet != null) {
        var keyFactorContainer = new WorksheetTreeNodeContainer(DisplayKey.get("Web.Policy.RatingWorksheet.KeyFactor"))
        beanContainerMap.get(dwelling.FixedId).addChild(keyFactorContainer)
        keyFactorContainer.addChildren(WorksheetTreeNodeUtil.buildTreeNodes(keyFactorWorksheet, showConditionals))
      }
    }

    //scheduled items require special processing since we want them to be in the containers for their
    //parent coverage's coverable (line or dwelling) and not on their coverable
    //additionally we also identify them by the item most descriptive property rather than the coverage name
    addScheduledItemWorksheetNodes(allCosts, showConditionals, beanContainerMap, treeNodes)

    addModifierWorksheetNodes(allCosts, showConditionals, beanContainerMap, treeNodes)

    // non-cost worksheets.
    // Note that this is only worksheets created by the current branch.
    var nonCost = _line.Branch.AllBeansWithWorksheets.entrySet().where(\e -> not(e.Key typeis HOPCost) && not (e.Key typeis HOPDwelling))
    nonCost.each(\ nc -> {

      //if we have a container on the worksheet tree for this worksheet's owner, use that
      var parentContainer = beanContainerMap.get(nc.Key.FixedId)
      if (parentContainer == null) {
        parentContainer = new WorksheetTreeNodeContainer(nc.Key.DisplayName)
        treeNodes.add(parentContainer)
      }

      nc.Value.each(\ ws -> {
        //for each worksheet create a new container with the description to organize them within the parent
        var wsContainer = new WorksheetTreeNodeContainer(ws.Description)
        wsContainer.addChildren(WorksheetTreeNodeUtil.buildTreeNodes(ws, showConditionals))
        parentContainer.addChild(wsContainer)
      })
    })

    return WorksheetTreeNodeUtil.buildRootNode(treeNodes)
  }

  /**
   * Navigates up the 'BasedOn' property and returns the first cost with a worksheet, or the first cost without a BasedOn
   *
   * @param cost Cost to traverse up the revisioning graph
   * @return First cost with a worksheet or original cost (BasedOn == null)
   */
  private function getCostWithWorksheet(cost : HOPCost) : HOPCost {
    var costWithWorksheet = cost
    while (costWithWorksheet.RatingWorksheet == null and costWithWorksheet.BasedOn != null) {
      costWithWorksheet = costWithWorksheet.BasedOn
    }
    return costWithWorksheet
  }

  private function addCoverableWorksheetNodes(coverable : Coverable,
                                              allCosts : Set<HOPCost>,
                                              showConditionals : boolean,
                                              beanContainerMap : Map<Key, WorksheetTreeNodeContainer>,
                                              treeNodes: List <WorksheetTreeNodeContainer>) {
    var coverableContainer = new WorksheetTreeNodeContainer(coverable.DisplayName)
    coverableContainer.ExpandByDefault = true
    var coverableCosts = allCosts.where(\cost -> cost.Coverable.FixedId == coverable.FixedId).orderBy(\cost -> getProratedCostDisplayName(cost))

    var sortedCostMap = new TreeMap<String, HOPCost>()
    coverableCosts.each(\cost -> {
      var costWithWorksheet = getCostWithWorksheet(cost)
      sortedCostMap.put(getProratedCostDisplayName(cost), costWithWorksheet)
    })
    sortedCostMap.eachKeyAndValue(\displayName, cost -> {
      var costContainer = new WorksheetTreeNodeContainer(displayName)
      coverableContainer.addChild(costContainer)
      beanContainerMap.put(coverable.FixedId, coverableContainer)
      costContainer.addChildren(WorksheetTreeNodeUtil.buildTreeNodes(cost, showConditionals))
    })
    treeNodes.add(coverableContainer)
  }

  private function addModifierWorksheetNodes(allCosts : Set<HOPCost>,
                                             showConditionals: boolean,
                                             beanContainerMap: Map<Key, WorksheetTreeNodeContainer>,
                                             treeNodes: List<WorksheetTreeNodeContainer>): void {

    var modifierCosts = allCosts.where(\cost -> cost.Modification == Modification.TC_MODIFICATION).orderBy(\cost -> getProratedCostDisplayName(cost))

    if (modifierCosts.Empty) {
      return
    }

    var allModifiersContainer = new WorksheetTreeNodeContainer(DisplayKey.get("Web.Policy.RatingWorksheet.Modifiers"))
    for (cost in modifierCosts) {
      var costWithWorksheet = getCostWithWorksheet(cost)
      var singleModifierContainer = new WorksheetTreeNodeContainer(getProratedCostDisplayName(cost))
      singleModifierContainer.addChildren(WorksheetTreeNodeUtil.buildTreeNodes(costWithWorksheet, showConditionals))
      allModifiersContainer.addChild(singleModifierContainer)
    }

    treeNodes.add(allModifiersContainer)
  }


  private function addScheduledItemWorksheetNodes(allCosts : Set<HOPCost>,
                                                      showConditionals : boolean,
                                                      beanContainerMap : Map<Key, WorksheetTreeNodeContainer>,
                                                      treeNodes: List <WorksheetTreeNodeContainer>) {
    var scheduledCoverageCosts = allCosts.where(\cost -> cost.Coverage typeis ScheduledItemClause).orderBy(\cost -> getScheduleCostItemDisplayName(cost))
    var scheduledCoverageCostsPerParentCoverage = scheduledCoverageCosts.partition(\cost -> (cost.Coverage.OwningCoverable as ScheduledItem).ScheduleParent)

    scheduledCoverageCostsPerParentCoverage.eachKeyAndValue(\schedule, costList -> {
      var scheduleOwner = (schedule as Clause).OwningCoverable
      var scheduleContainer = new WorksheetTreeNodeContainer(schedule.ScheduleName)
      costList.each(\scheduleCost -> {
        var costWithWorksheet = getCostWithWorksheet(scheduleCost)
        var scheduleItemContainer = new WorksheetTreeNodeContainer(getScheduleCostItemDisplayName(scheduleCost))
        scheduleContainer.addChild(scheduleItemContainer)
        scheduleItemContainer.addChildren(WorksheetTreeNodeUtil.buildTreeNodes(costWithWorksheet, showConditionals))
      })

      //if we have a container on the worksheet tree for this schedule's owner, use that
      var scheduleTypeContainer = beanContainerMap.get(scheduleOwner.FixedId)
      if (scheduleTypeContainer != null) {
        scheduleTypeContainer.addChild(scheduleContainer)
      } else {
        //otherwise just add it as a top level item
        treeNodes.add(scheduleContainer)
      }
    })
  }

  private function getScheduleCostItemDisplayName(scheduleCost : HOPCost) : String {
    var schedItem = scheduleCost.Coverage.OwningCoverable as ScheduledItem
    var displayName = schedItem.getScheduledItemEntityLabel()
    if (scheduleCost.Prorated) {
      displayName += " (${scheduleCost.EffectiveDate.ShortFormat} - ${scheduleCost.ExpirationDate.ShortFormat})"
    }
    return displayName
  }

  override property get LocationsInUseOnOrAfterSliceDate() : Set<Key> {
    var policyLocationsReferencedByDwellings = _line.VersionList.HOPCoverageParts.arrays<HOPDwellingVersionList>("HOPDwellings")
        .allVersionsFlat<HOPDwelling>().where(\hopDwell -> hopDwell.ExpirationDate > _line.SliceDate)*.Location*.FixedId

    var hopScheduleHelper = new HOPScheduleHelper()
    var policyLocationsReferencedBySchedules =  hopScheduleHelper.getCurrentAndFutureScheduledItemsForPolicyLine(_line)
        .where(\item -> item.ExpirationDate > _line.SliceDate)*.PolicyLocation*.FixedId

    return policyLocationsReferencedByDwellings
        .union(policyLocationsReferencedBySchedules)
        .union({_line.Branch.PrimaryLocation.FixedId})
  }

  private function getProratedCostDisplayName(cost : Cost) : String {
    var displayName = cost.DisplayName
    if (cost.Prorated) {
      displayName += " (${cost.EffectiveDate.ShortFormat} - ${cost.ExpirationDate.ShortFormat})"
    }
    return displayName
  }

  /***
   * This function decides whether to allow a location to be removed in the UI.
   * This default implementation is provided simply as a reminder that you are likely to want to override default behavior here, too.
   */
  override function canSafelyDeleteLocation(location: PolicyLocation): String {
    var notSafeReason = super.canSafelyDeleteLocation(location)

    if (notSafeReason.equalsIgnoreCase("")) {
      // Put line-specific reasons why a location cannot safely be deleted here.
    }

    return notSafeReason
  }

  override function doGetTIVForCoverage(cov: Coverage): BigDecimal {
    switch (cov.FixedId.Type) {
      // Enter case statements for each type of coverage here
    }
    return BigDecimal.ZERO
  }

  override property get AllCurrentAndFutureScheduledItems() : List<ScheduledItem> {
    return new HOPScheduleHelper().getCurrentAndFutureScheduledItemsForPolicyLine(_line)
  }

  override function createRatingEngine(method: RateMethod, parameters: Map<RateEngineParameter, Object>): AbstractRatingEngine<HOPLine> {
    if (RateMethod.TC_SYSTABLE == method) {
      return new HOPDemoRatingEngine(_line as HOPLine)
    }
    return new HOPRatingEngine(_line as HOPLine, parameters[RateEngineParameter.TC_RATEBOOKSTATUS] as RateBookStatus)
  }

  override property get BaseStateRequired(): boolean {
    // Change this if you want to force a base state to be set for this line of business.
    return false
  }
}