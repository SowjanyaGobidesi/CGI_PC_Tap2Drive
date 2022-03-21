package gw.pcf.rating.flow

uses com.google.common.annotations.VisibleForTesting
uses com.google.common.collect.ImmutableList
uses com.google.common.collect.ImmutableListMultimap
uses gw.api.locale.DisplayKey
uses gw.api.web.PebblesUtil
uses gw.pl.persistence.core.Bundle
uses gw.rating.flow.util.CostDataWrapperUtil
uses gw.rating.flow.util.InScopeUsage
uses gw.rating.flow.util.RatingEntityGraphTraverser
uses gw.rating.flow.validation.RateRoutineValidation
uses gw.rating.flow.validation.ValidationGroup
uses pcf.ConfigureRateRoutine
uses pcf.RateRoutines

uses java.lang.IllegalArgumentException
uses java.lang.Integer
uses java.lang.Math
uses java.util.HashMap
uses java.util.Map
uses java.util.Set
uses java.util.List

/**
 * Helper class for _rateRoutineEditScreen.pcf
 */
@Export
class RateRoutineEditScreenHelper {
  /**
   * Rate routines with fewer than INDEXING_THRESHOLD rows do not need an index
   */
  static property get INDEXING_THRESHOLD() : int {
    return gw.api.system.PCConfigParameters.RateRoutineIndexingThreshold.Value
  }
  // this helper needs to be bound to the CalcRoutineDefinition and PCF Page
  final var _rateRoutine: CalcRoutineDefinition
  final var _currentLocation: pcf.api.Location
  final var _parameterSetHelper: RateRoutineParameterSetHelper
  var _orderedSteps: List<CalcStepDefinition>
  /** A map of step loop blocks each identified by the outermost 1st loop step. */
  var _loopSections: ImmutableListMultimap<CalcStepDefinition, CalcStepDefinition>

  // Used to restore checkmarks after certain operations.   This set is used by startChecked()
  // to return a per-row boolean value to the RowIterator's "startChecked" property.
  //
  // IMPORTANT: in order for this to give correct results, all operations that modify rows must
  // update _lastCheckedSet.
  //
  // IMPORTANT: This implementation assumes that there will be an instance of _rateRoutineEditScreenHelper
  // bound to an instance of the edit screen.  If this changes (e.g. changing the helper to be stateless)
  // the value _lastCheckedSet will need to be stored in a PCF variable instead.
  var _lastCheckedSet: Set<CalcStepDefinition> = {}

  static class RateRoutineSection {
    final var _startRow: int as readonly Start
    final var _endRow: int as readonly End
    final var _header: String as readonly Label

    function showRow(rowNum: int): boolean {
      return Start <= rowNum and (rowNum < Math.max(Start + INDEXING_THRESHOLD, End))
    }

    function isShowAllSection(routine : CalcRoutineDefinition) : boolean {
      return Start == 1 and End == routine.Steps.Count + 1
    }

    function getErrorNumber(errorMap : java.util.Map<CalcStepDefinition, java.util.List<java.lang.Integer>>): int {
       return errorMap.keySet().stream()
           .map( \ step -> step.SortOrder)
           .filter( \ stepOrder -> this.Start <= stepOrder and this.End > stepOrder)
           .count() as int
    }

    construct(startRow: int, endRow: int, header: String) {
      _startRow = startRow
      _endRow = endRow
      _header = header
    }

    override function equals(o : Object) : boolean {
      if (o === this) return true
      if (o typeis RateRoutineSection) {
        return _startRow == o._startRow and _endRow == o._endRow and _header == o._header
      } else {
        return false
      }
    }

    override function hashCode() : int {
      return 31*_startRow + 17*_endRow +  _header.hashCode()
    }
  }

  /**
   * Create a helper class instance bound to the given CalcRoutineDefinition and PCF Location.
   * @param routine The CalcRoutine being edited
   * @location The associated PCF page (probably New_rateRoutine or Edit_rateRoutine)
   */
  construct(routine: CalcRoutineDefinition, location: pcf.api.Location) {
    _rateRoutine = routine
    _currentLocation = location
    _parameterSetHelper = new RateRoutineParameterSetHelper(routine)
  }

  static function bundleContainsChanges(bundle: Bundle): boolean {
    return (bundle.InsertedBeans.size() + bundle.UpdatedBeans.size() + bundle.RemovedBeans.size()) != 0
  }

  private static function getIndex0(orderedSteps: List<CalcStepDefinition>,
                                    lastSection: int,
                                    lastLabel: String,
                                    isSection: block(s: CalcStepDefinition): boolean,
                                    makeLabel: block(s: CalcStepDefinition): String): List<RateRoutineSection> {
    var result: List<RateRoutineSection> = {}
    for (s in orderedSteps) {
      if (isSection(s)) {
        if (lastLabel != null and lastSection != s.SortOrder) {
          var size = s.SortOrder - lastSection
          var numOfPieces = (size + INDEXING_THRESHOLD - 1 ) / INDEXING_THRESHOLD
          for (i in 0..|numOfPieces) {
            var sectionBegin = Math.round(size * ((i as float) / numOfPieces))
            var sectionEnd = Math.round(size * (((i + 1) as float) / numOfPieces))
            result.add(new RateRoutineSection(lastSection + sectionBegin, lastSection + sectionEnd, i == 0 ? lastLabel : makeLabel(null)))
          }
        }
        lastLabel = makeLabel(s)
        lastSection = s.SortOrder
      }
    }
    if (lastLabel != null) {
      var endIndex = orderedSteps.last().SortOrder
      if (lastSection != endIndex) {
        result.add(new RateRoutineSection(lastSection, endIndex + 1, lastLabel))
      }
    }
    return result
  }

  function makeSectionLabel(section: RateRoutineSection, rateRoutine : CalcRoutineDefinition, errorMap : java.util.Map<CalcStepDefinition, java.util.List<java.lang.Integer>>): String {
    var errorNo = section.getErrorNumber(errorMap)
    if (section.Label == DisplayKey.get("Web.Rating.Flow.CalcRoutine.IndexAllSteps", rateRoutine.Steps.Count)) {
      return section.Label
    } else if (errorNo != 0) {
      return DisplayKey.get("Web.Rating.Flow.CalcRoutine.ErrorMsgInSection", section.Start, section.Label, errorNo)
    } else {
      return DisplayKey.get("Web.Rating.Flow.CalcRoutine.MsgInSection", section.Start, section.Label)
    }
  }

  static function getIndex(routine: CalcRoutineDefinition, orderedStepMap: HashMap<CalcStepDefinition, Integer>): List<RateRoutineSection> {
    if (routine.Steps.length < INDEXING_THRESHOLD) return null
    var steps = routine.OrderedSteps
    var indexList = getIndex0(steps, steps.first().SortOrder,
        DisplayKey.get("Web.Rating.Flow.CalcRoutine.IndexFirstSection"),
        \s -> s.IsSectionCommentStep and countAsSectionComment(s, orderedStepMap),
        \s -> (s.SectionComment == null) ? DisplayKey.get("Web.Rating.Flow.CalcRoutine.BlankComment") : s.SectionComment.split("\n").first())
    var numSteps = routine.Steps.Count
    // Q: if numSteps is really large, do we even want this?
    var all = new RateRoutineSection(1, indexList.last()._endRow,
        DisplayKey.get("Web.Rating.Flow.CalcRoutine.IndexAllSteps", numSteps))
    indexList.add(all)
    return indexList
  }

  static function countAsSectionComment(row: CalcStepDefinition, orderedStepMap: HashMap<CalcStepDefinition, Integer>): boolean {
    return orderedStepMap.get(row) == 0
  }

  function getTitleBarHeadingInSection(currentSection: RateRoutineSection, rateRoutine : CalcRoutineDefinition): String {
    return currentSection.isShowAllSection(rateRoutine) ?
        DisplayKey.get("Web.Rating.Flow.CalcRoutine.StepsRange", currentSection.Start, currentSection.End-1, currentSection.Label):
        DisplayKey.get("Web.Rating.Flow.CalcRoutine.StepsRange", currentSection.Start,
        Math.min(currentSection.Start + INDEXING_THRESHOLD - 1, _rateRoutine.Steps.Count),
        currentSection.Label.substring(0, Math.min(50,currentSection.Label.length)).trim())
  }

  property get OrderedSteps(): List<CalcStepDefinition> {
    // recalculate each time accessed from UI...
    _loopSections = null
    _orderedSteps = _rateRoutine.OrderedSteps
    return _orderedSteps
  }

  function isStepInLoopBlock(calcStep: CalcStepDefinition): boolean {
    return LoopSections.containsValue(calcStep)
  }

  function stepStartsLoopBlock(calcStep: CalcStepDefinition): boolean {
    return LoopSections.containsKey(calcStep)
  }

  private property get LoopSections(): ImmutableListMultimap<CalcStepDefinition, CalcStepDefinition> {
    if (_loopSections == null) {
      _loopSections = collectLoopSections()
    }
    return _loopSections
  }

  /**
   * Collect all {@link CalcStepDefinition step}s that are part of a (top-level)
   * loop including the loop {@link CalcStepType#TC_LOOP beginning} and
   * {@link CalcStepType#TC_ENDLOOP ending} steps as well as a map between the
   * 1st loop step of the section and all steps that belong to (are below) it.
   *
   * @param orderedSteps  a list of the steps in step order
   * @return a multi-map between the 1st step in a loop block (the loop step itself)
   * and all steps that are part of the loop (including both the loop step and its
   * end loop step)
   */
  private function collectLoopSections(): ImmutableListMultimap<CalcStepDefinition, CalcStepDefinition> {
    var inLoopBlock = 0
    final var mapBuilder = ImmutableListMultimap.builder<CalcStepDefinition, CalcStepDefinition>()
    var currentKey: CalcStepDefinition
    _orderedSteps.forEach(\step -> {
      if (step.StepType == TC_LOOP) {
        inLoopBlock++
        if (inLoopBlock == 1) {
          currentKey = step;
        }
      }
      if (inLoopBlock > 0) {
        if (step.StepType == TC_ENDLOOP) {
          inLoopBlock--
        }
        mapBuilder.put(currentKey, step)
      }
    })
    return mapBuilder.build()
  }

  /**
   * Implementation for the "save draft" button.
   */
  function saveDraft() {
    _currentLocation.commit()
    ConfigureRateRoutine.push(false, _rateRoutine.refresh() as CalcRoutineDefinition, UNDEFINED)
  }

  /**
   * Create a Map of in-scope usages for the parameters that are in scope.
   * This is used to initialize a PCF variable; eventually we will just go to a cache for this info.
   * @param routine: the CalcStepDefinition being edited
   * @return a map of CalcRoutineParameter -> InScopeUsage references rooted to that parameter
   */
  static function initializeInScopeParamInScopeUsageMap(routine: CalcRoutineDefinition): Map<CalcRoutineParamName, List<InScopeUsage>> {
    return RatingEntityGraphTraverser.initializeMapFromParameterSet(routine.ParameterSet)
  }

  /**
   * Consults the set of rows that were checked at the beginning of the last operation,
   * returning true for any row that was checked.   This is used in conjunction with startChecked
   * on the RowIterator, to maintain checked status after an operation.
   *
   * @param calcStep the CalcStepDefinition corresponding to a row on the screen
   * @return true if the Operator field on calcStep's row should be available, false otherwise.
   */
  static function operatorAvailable(calcStep: CalcStepDefinition): boolean {
    return (calcStep.StepType == null) or !(calcStep.StepType.hasCategory(CalcStepCategory.TC_FLOWCONTROL)
        or calcStep.IsSectionCommentStep)
  }

  /**
   * Provide values to RowIterator's startChecked parameter.
   * @param row the CalcStepDefinition instance corresponding to the ListView row
   * @return true if the row should have its checkbox set, false otherwise
   */
  function startChecked(row: CalcStepDefinition): boolean {
    return _lastCheckedSet.contains(row)
  }

  /**
   * Make duplicates of the given (checked) rows, storing the "checked" status
   * of the original rows.
   *
   * Given any set of rows, insert a copy of all the checked rows, after the last checked row
   *<p/>
   * Assumes for loop blocks that only the 1st loop step that defines the block is selected,
   * in which case, the entire loop block is copied.
   *
   * @param rows The steps to be copied
   */
  function copySteps(rows: CalcStepDefinition[], currentSection: RateRoutineSection): RateRoutineSection {
    updateCheckedSet(rows)
    var sortedRows = rows.sortBy(\step -> step.SortOrder)
    final var lastCopyStep = sortedRows.last()
    var lastPosition = lastCopyStep.SortOrder
    if (stepStartsLoopBlock(lastCopyStep)) {
      // skip loop block...
      lastPosition += getLoopBlockSize(lastCopyStep) - 1
    }
    var count = 0
    for (step in sortedRows) {
      final var isLoopBlock = stepStartsLoopBlock(step)
      var numAddedRows = isLoopBlock ? getLoopBlockSize(step) : 1
      makeSpaceAfter(lastPosition, numAddedRows)
      count += numAddedRows
      if (isLoopBlock) {
        final var offset = lastPosition + 1 - step.SortOrder
        getLoopBlock(step).forEach(\blockStep -> {
          final var newStep = blockStep.copy() as CalcStepDefinition
          newStep.SortOrder = blockStep.SortOrder + offset
          _rateRoutine.addToSteps(newStep)
        })
        lastPosition += getLoopBlockSize(step)
      } else {
        final var newStep = step.copy() as CalcStepDefinition
        newStep.SortOrder = lastPosition + 1
        lastPosition += 1
        _rateRoutine.addToSteps(newStep) // is this necessary, or is the copy properly owned already?
      }
    }
    invalidateIterators()
    return currentSection == null
        ? null : new RateRoutineSection(currentSection.Start, currentSection.End + count, currentSection.Label)
  }

  /**
   * Append numRows rows to the end of the list.
   * @param numRows the number of rows to insert
   */
  function appendRows(numRows : int) {
    if (numRows < 1) throw new IllegalArgumentException("numRows must be at least 1")
    updateCheckedSet(null)
    var n = _rateRoutine.Steps.Count
    for (location in n|..(n + numRows)) {
      createAndAdd(location)
    }
    invalidateIterators()
  }

  function changeParameterSet(highlightedRows: Map<CalcStepDefinition, List<Integer>>) {
    if (_rateRoutine.Steps.Count > 0) {
      RateRoutineValidation.validateForRateRoutineEditScreen(_rateRoutine, TC_DEFAULT, ValidationGroup.PARAM_SET, highlightedRows)
    } else {
      appendRows(1)
    }
  }

  /**
   * Updates the operand on the given step when switching operators.
   * @param step The CalcStepDefinition for the step whose operator is being changed.
   */
  function updateOperandForOperatorChange(step: CalcStepDefinition) {
    // updateOperandForOperatorChange doesn't change row locations, so it doesn't need to clear checkedSet
    final var primaryOperand = step.PrimaryOperand
    var operatorType = primaryOperand.OperatorType
    step.setStepTypeFromOperatorType(operatorType)

    // For conditional operands, we may need to clear out suboperands. Only clean them out
    // if the new step is not a flow control step.  NOTE:  You can't actually change the
    // operator type for FLOW CONTROL steps so it really only applies for TC_CONTINUE steps.
    //   e.g. "IF" -> "ELSE" will not reset the operand; "IF" -> "+" will.
    if ((primaryOperand.OperandType == TC_CONDITIONAL) and
        (!step.StepType.hasCategory(CalcStepCategory.TC_FLOWCONTROL))) {
      step.Operands.each(\opAd -> step.removeFromOperands(opAd))
      var operand = new CalcStepDefinitionOperand()
      operand.OperandType = TC_CONSTANT // default operand is an untyped constant
      operand.OperatorType = operatorType
      step.addToOperands(operand)
    }
    if (primaryOperand.OperatorType != null and primaryOperand.OperatorType.Categories.contains(CalcStepOperatorCategory.TC_ROUNDING)) {
      primaryOperand.OperandType = TC_ROUNDING
      primaryOperand.InScopeValueType = null
    } else if (primaryOperand.OperandType == TC_ROUNDING) {
      // if the Operator type is not in the rounding category but the Operand type is still rounding, reset it to a BLANK constant.
      primaryOperand.OperandType = TC_CONSTANT
      primaryOperand.InScopeValueType = null
      primaryOperand.ConstantValue = null
    }
  }

  /**
   * Remove all of the checked rows. Called as the action of a CheckedValuesToolbarButton instead of
   * a RemoveButton so that it can operate on loop blocks and invoke {@link #invalidateIterators()}.
   *
   * @param steps to be removed
   * @param currentSection to be updated for removal of steps
   * @return current section updated for the removed steps
   */
  function removeRows(steps : CalcStepDefinition[], currentSection: RateRoutineSection): RateRoutineSection {
    updateCheckedSet(null)
    for (step in steps.sortByDescending(\step -> step.SortOrder)) {
      currentSection = removeRow(step, currentSection)
    }
    invalidateIterators()
    return currentSection
  }

  /**
   * Remove a step from the list. If a step is an outermost loop step that defines a loop block, then the entire
   * loop block is removed. Do not call as toRemove action of a RowIterator since that will remove only the
   * checked step, which in the case of a loop block is incorrect.
   *
   * @param step the step that is the row that should be removed.
   */
  @VisibleForTesting
  internal function removeRow(step: CalcStepDefinition, currentSection: RateRoutineSection = null): RateRoutineSection {
    var count = 0
    if (stepStartsLoopBlock(step)) {
      var loopSteps = LoopSections.get(step)
      loopSteps.forEach(\inLoopStep -> _rateRoutine.removeFromSteps(inLoopStep))
      count = loopSteps.size()
      // remove space starting after last step of block...
      removeSpaceAt(step.SortOrder + loopSteps.size() - 1, count)
    } else {
      _rateRoutine.removeFromSteps(step)
      removeSpaceAt(step.SortOrder)
      count = 1
    }
    return currentSection == null
        ? null : new RateRoutineSection(currentSection.Start, currentSection.End - count, currentSection.Label)
  }

  /**
   * Move checked rows up one line, retaining their checked status. This will effectively move a block of steps
   * <i>en masse</i> although each is processed individually, so if, for example, rows 3 and 4 are both checked,
   * this will put both of them above row 2.
   *<p/>
   * Assumes for loop blocks that only the 1st loop step that defines the block is selected. Also, moves loop
   * blocks <i>en masse</i> both when they have been selected for move or precede a moved step or loop block.
   *
   * @param rows The steps to be moved up
   */
  function moveUp(rows: CalcStepDefinition[]) {
    updateCheckedSet(rows)
    // Used to prevent movement of contiguous steps where the first step is checked
    var lowWaterMark = rows.hasMatch(\r -> r.SortOrder == 1) ? 1 : 0
    rows.sortBy(\row -> row.SortOrder).each(\currentStep -> {
      final var currentStepOrder = currentStep.SortOrder
      if (currentStepOrder > (lowWaterMark + 1)) {
        var indexBefore = currentStepOrder - 1
        var beforeStep = currentStep.CalcRoutineDefinition.Steps.singleWhere(\step -> step.SortOrder == indexBefore)
        if (isStepInLoopBlock(beforeStep)) {
          // find loop section containing immediately before step...
          beforeStep = findLoopStartForStep(beforeStep)
          var moveOffset: int
          if (stepStartsLoopBlock(currentStep)) {
            moveOffset = currentStep.SortOrder - beforeStep.SortOrder
            moveLoopSectionUp(currentStep, moveOffset)
          } else {
            currentStep.SortOrder = beforeStep.SortOrder
            moveOffset = 1
          }
          // move loop section down en masse...
          moveLoopSectionDown(beforeStep, moveOffset)
        } else {
          if (stepStartsLoopBlock(currentStep)) {
            moveLoopSectionUp(currentStep, 1)
            beforeStep.SortOrder = currentStep.SortOrder + getLoopBlockSize(currentStep)
          } else {
            currentStep.SortOrder--
            beforeStep.SortOrder = currentStepOrder
          }
        }
      } else {
        lowWaterMark = currentStep.SortOrder
        if (stepStartsLoopBlock(currentStep)) {
          lowWaterMark += getLoopBlockSize(currentStep) - 1
        }
      }
    })
    invalidateIterators()
  }

  /* "down" means higher in order... */
  private function moveLoopSectionDown(loopStep: CalcStepDefinition, offset: int) {
    getLoopBlock(loopStep).forEach(\sectionStep -> { sectionStep.SortOrder += offset })
  }

  /* "up" means lower in order... */
  private function moveLoopSectionUp(loopStep: CalcStepDefinition, offset: int) {
    getLoopBlock(loopStep).forEach(\sectionStep -> { sectionStep.SortOrder -= offset })
  }

  private function findLoopStartForStep(loopStep: CalcStepDefinition): CalcStepDefinition {
    // assert: isStepInLoopBlock(loopStep) otherwise will throw NullPointerException...
    return LoopSections.entries().stream()
        .filter(\entry -> entry.Value == loopStep)
        .findAny().get().Key
  }

  /**
   * Move checked rows down one line, retaining their checked status. This will effectively move a block of
   * steps <i>en masse</i> although each is processed individually, so if for example, rows 3 and 4 are both
   * checked, moveDown will put both of them below row 5.
   *<p/>
   * Assumes for loop blocks that only the 1st loop step that defines the block is selected. Also, moves loop
   * blocks <i>en masse</i> both when they have been selected for move or follow a moved step or loop block.
   *
   * @param rows The steps to be moved down
   */
  function moveDown(rows: CalcStepDefinition[]) {
    updateCheckedSet(rows)
    // Used to prevent movement of the contiguous steps where effective last step is checked
    final var stepCount = _rateRoutine.Steps.Count
    var highWaterMark = rows.hasMatch(\r -> r.SortOrder == stepCount) ? stepCount : stepCount + 1
    rows.sortByDescending(\r -> r.SortOrder).each(\r -> {
      final var currentStepOrder = r.SortOrder
      // if step is loop start then its entire block must precede highwater mark...
      if ((stepStartsLoopBlock(r) ? currentStepOrder + getLoopBlockSize(r) - 1 : currentStepOrder) < (highWaterMark - 1)) {
        // step is not the last so move it...
        var currentIsLoop = false
        if (stepStartsLoopBlock(r)) {
          currentIsLoop = true
        }
        final var indexAfter = currentStepOrder + (currentIsLoop ? getLoopBlockSize(r) : 1)
        var afterStep = r.CalcRoutineDefinition.Steps.singleWhere(\rateAction -> rateAction.SortOrder == indexAfter)
        var afterIsLoop = false
        if (stepStartsLoopBlock(afterStep)) {
          afterIsLoop = true
        } else {
          afterStep.SortOrder = r.SortOrder
        }
        if (!currentIsLoop) {
          if (afterIsLoop) {
            r.SortOrder = afterStep.SortOrder + getLoopBlockSize(afterStep) - 1
          } else {
            r.SortOrder++
          }
        }
        final var moveOffset = (afterIsLoop && currentIsLoop) ? afterStep.SortOrder - r.SortOrder : 1
        if (afterIsLoop) {
          moveLoopSectionUp(afterStep, moveOffset)
        }
        if (currentIsLoop) {
          moveLoopSectionDown(r, moveOffset)
        }
      } else {
        highWaterMark = r.SortOrder
      }
    })
    invalidateIterators()
  }

  /**
   * Insert a new, blank row above each of the checked rows.   Unlike move, insertion is not <i>en masse</i> so if
   * rows 2 and 3 are checked, you will get a new blank row above 2 and another one between 2 and 3.
   * @rows the insertion points
   */
  function insertBefore(rows: CalcStepDefinition[], currentSection: RateRoutineSection, numRows: int = 1): RateRoutineSection {
    updateCheckedSet(rows)
    for (step in rows.sortByDescending(\step -> step.SortOrder)) {
      var spot = step.SortOrder - 1
      makeSpaceAfter(spot, numRows) // might be last step in loop block, but that's ok...
      for (location in spot|..(spot + numRows))
        createAndAdd(location)
    }
    invalidateIterators()
    return currentSection == null ? null
        : new RateRoutineSection(currentSection.Start, currentSection.End + numRows * rows.length, currentSection.Label)
  }

  /**
   * Insert a new, blank row below each of the checked rows.   Unlike move, insertion is not <i>en masse</i> so if
   * rows 2 and 3 are checked, you will get a new blank row between 2 and 3 and another one below 3.
   * @rows the insertion points
   */
  function insertAfter(rows: CalcStepDefinition[], currentSection: RateRoutineSection, numRows: int = 1): RateRoutineSection {
    updateCheckedSet(rows)
    for (step in rows.sortByDescending(\step -> step.SortOrder)) {
      var spot = step.SortOrder
      if (stepStartsLoopBlock(step)) {
        // skip past loop block...
        spot += getLoopBlockSize(step) - 1
      }
      makeSpaceAfter(spot, numRows)
      for (location in spot|..(spot + numRows)) {
        createAndAdd(location)
      }
    }
    invalidateIterators()
    return currentSection == null ? null
        : new RateRoutineSection(currentSection.Start, currentSection.End + numRows * rows.length, currentSection.Label)
  }

  private function getLoopBlock(loopStep: CalcStepDefinition): ImmutableList<CalcStepDefinition> {
    // assert: stepStartsLoopBlock(loopStep)
    return LoopSections.get(loopStep)
  }

  @VisibleForTesting
  internal function getLoopBlockSize(loopStep: CalcStepDefinition): int {
    // assert: stepStartsLoopBlock(loopStep) or will throw NullPointerException
    return getLoopBlock(loopStep).size()
  }

  /**
   * Clears last checked set
   */
  function resetLastCheckedSet() {
    updateCheckedSet(null)
  }

  /**
   * update _lastCheckedSet to contain the new rows.  Existing contents are cleared.
   * null is a legal value, in which case the result is to empty _lastCheckedSet
   */
  private function updateCheckedSet(newRows: CalcStepDefinition[]) {
    _lastCheckedSet.clear()
    if (newRows != null) {
      _lastCheckedSet.addAll(newRows.toSet())
    }
  }

  /**
   * Increment the SortOrder of all rows whose SortOrder is higher than stepNum; the effect
   * is to open up an empty space beneath step #stepNum.
   * @param stepNum: the insertion point; insertion is always below
   */
  private function makeSpaceAfter(stepNum: int, numRows: int = 1) {
    Arrays.stream(_rateRoutine.Steps)
        .filter(\row -> row.SortOrder > stepNum)
        .forEach(\row -> {
          row.SortOrder = row.SortOrder + numRows
        })
  }

  /**
   * Decrement the SortOrder of all rows whose SortOrder is higher than stepNum; the effect
   * is to close up an empty space beneath step #stepNum.
   * @param stepNum the deletion point or last step of loop if one was deleted
   * @param deleteCount the number of deleted rows
   */
  private function removeSpaceAt(stepNum: int, deleteCount: int = 1) {
    Arrays.stream(_rateRoutine.Steps)
        .filter(\row -> row.SortOrder > stepNum)
        .forEach(\row -> {
          row.SortOrder = row.SortOrder - deleteCount
        })
  }

  /**
   * create and add a new blank row with its SortOrder = location
   * @param location the insertion point
   */
  private function createAndAdd(location: int): CalcStepDefinition {
    return NewRateRoutineHelper.createNewRow(_rateRoutine, location)
  }

  function getAllLOBsWithParamSets(): String[] {
    return _parameterSetHelper.AllLOBsWithParamSets
  }

  function getAvailableParamSets(): List<CalcRoutineParameterSet> {
    return _parameterSetHelper.ParamSets
  }

  function getHelpStringForParamTypes(): String {
    return _parameterSetHelper.getHelpStringForParamTypes()
  }

  function getStringForParamTypes(): String {
    return _parameterSetHelper.getStringForParamTypes()
  }

  function resetCalcRoutine(resetParamSet: boolean) {
    if (resetParamSet) {
      _rateRoutine.ParameterSet = null
    }
    _rateRoutine.Steps.each(\step -> {
      step.remove()
    })
    invalidateIterators()
  }

  static function getCostDataUsages(paramSet: CalcRoutineParameterSet): List<InScopeUsage> {
    return CostDataWrapperUtil.getCostDataUsages(paramSet).sortBy(\costDataItem -> costDataItem.Path)
  }

  static function getRateRoutineStepOperandMode(ratingRoutineStep: entity.CalcStepDefinition): String {
    final var primaryOperand = ratingRoutineStep.PrimaryOperand
    if (primaryOperand.IsRounding) {
      return "rounding"
    } else if (primaryOperand.IsEditableConstant) {
      return "constant"
    } else {
      return "default"
    }
  }

  function deleteRoutine() {
    if (!_rateRoutine.New) {
      _rateRoutine.canDelete()
      _rateRoutine.remove()
      _rateRoutine.Bundle.commit()
    }
    RateRoutines.go()
  }

  function getParamSetValidation(): String {
    var validationResults = ""
    _rateRoutine.Steps.each(\c -> {
      if (c.StoreLocation.HasContent) {
        var validateResult = c.validateVariableNameAgainstParamSet()
        if (validateResult != null) {
          validationResults = validationResults + "\n" + validateResult
        }
      }
    })
    return validationResults.Empty ? null : validationResults
  }

  function getStepEditInstructionMode(ratingRoutineStep: CalcStepDefinition): String {
    if (ratingRoutineStep.IsSectionCommentStep) {
      return "comment"
    }
    var stepCategory = ratingRoutineStep.StepType.Categories.whereTypeIs(CalcStepCategory).first()
    switch (stepCategory) {
      case TC_ASSIGNMENT:
          if (ratingRoutineStep.InScopeParam == null) {
            return "assignment"
          } else {
            return "inscope"
          }
      case TC_FLOWCONTROL:
          return "flowcontrol"
      case TC_CONTINUE:
          return "continue"
      case TC_VOIDFUNCTION:
          return "voidfunction"
      default:
        break
    }
    return "default"
  }

  /**
   * @returns true if parameter set on this calc routine is deleted.
   */
  function isParameterSetDeleted() : boolean {
    return _parameterSetHelper.isParameterSetDeleted(_rateRoutine.ParameterSet)
  }

  protected function invalidateIterators() {
    PebblesUtil.invalidateIterators(_currentLocation, CalcStepDefinition)
  }
}
