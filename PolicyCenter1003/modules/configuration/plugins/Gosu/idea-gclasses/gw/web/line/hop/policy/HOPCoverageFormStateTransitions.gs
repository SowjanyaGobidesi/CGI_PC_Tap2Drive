package gw.web.line.hop.policy

uses gw.api.domain.covterm.OptionCovTerm
uses gw.api.productmodel.CovTermOpt
uses productmodel.HOPLine

/**
 * This class encapsulates the state transitions and the resulting "sync cov term option values" behavior when user selects "Policy Type" and/or "Coverage Form" in a HOP submission
 * The following state transition table naturally lends itself to a State Design Pattern based solution
 *
 * /--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------\
 * / #  | IF current Policy Type is  | AND current CoverageForm is   | AND select PolicyType/CoverageForm | THEN                                | AND                                                                  |
 * /--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 * / 1. | Any                        | None                          | Any                                | DO NOT syncDwellingValues(dwelling) | DO NOT setOptionCovTerm(dwelling.HOPCovC.HOPCovCValuationTerm, "ACV") |
 * /--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 * / 2. | Rental                     | HO4                           | Any                                | DO NOT syncDwellingValues(dwelling) | DO NOT setOptionCovTerm(dwelling.HOPCovC.HOPCovCValuationTerm, "ACV") |
 * /--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 * / 3. | Condominium                | HO6                           | Any                                | DO NOT syncDwellingValues(dwelling) | DO NOT setOptionCovTerm(dwelling.HOPCovC.HOPCovCValuationTerm, "ACV") |
 * /--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 * / 4. | Dwelling                   | HO2/HO3/HO5                   | Rental/H04                         | DO NOT syncDwellingValues(dwelling) | DO NOT setOptionCovTerm(dwelling.HOPCovC.HOPCovCValuationTerm, "ACV") |
 * /--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 * / 5. | Dwelling                   | HO2/HO3/HO5                   | Condominium/H06                    | DO NOT syncDwellingValues(dwelling) | DO NOT setOptionCovTerm(dwelling.HOPCovC.HOPCovCValuationTerm, "ACV") |
 * /--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 * / 6. | Dwelling                   | HO2                           | Dwelling/H02/HO3/HO5               | syncDwellingValues(dwelling)        | Call setOptionCovTerm(dwelling.HOPCovC.HOPCovCValuationTerm, "ACV")   |
 * /--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 / / 7. | Dwelling                   | HO3/HO5                       | Dwelling/H02/HO3/HO5               | syncDwellingValues(dwelling)        | DO NOT setOptionCovTerm(dwelling.HOPCovC.HOPCovCValuationTerm, "ACV") |
 * /--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
 */

@Export
class HOPCoverageFormStateTransitions {

  private final var _hopLine : HOPLine
  private var _fromState : CoverageFormState as readonly CurrentCoverageFormState

  static function create(hopLine : HOPLine) : HOPCoverageFormStateTransitions{
    return new HOPCoverageFormStateTransitions(hopLine)
  }

  private construct(hopLine : HOPLine) {
    _hopLine = hopLine
    _fromState = select(_hopLine.HOPDwellings.first().CoverageForm)
  }

  function switchTo(coverageForm : HOPCoverageForm) {
    var toState = select(coverageForm)
    _hopLine.resyncAndInitClauses()
    _fromState.syncOptionValues(toState)
    _fromState = toState
  }

  private function select(coverageForm : HOPCoverageForm) : CoverageFormState {
    switch (coverageForm) {
      case HOPCoverageForm.TC_HO2:
        return new HO2CoverageFormState()
      case HOPCoverageForm.TC_HO3:
      case HOPCoverageForm.TC_HO5:
        return new HO3_HO5CoverageFormState()
      case HOPCoverageForm.TC_HO4:
      case HOPCoverageForm.TC_HO6:
        return new HO4_HO6_CoverageFormState()
      default:
        return new UnspecifiedCoverageFormState()
    }
  }

  internal interface CoverageFormState {
    function syncOptionValues(toState : CoverageFormState)
    function syncOptionValuesCalled(): boolean

    function syncDwellingValues(dwelling : HOPDwelling)
    function syncDwellingValuesCalled(): boolean

    function setCovCValuationTerm(hopCovCValuationTerm : OptionCovTerm<OptionHOPCovCValuationType>, value : String)
    function setCovCValuationTermCalled(): boolean
  }

  internal class UnspecifiedCoverageFormState extends NoOpState {
  }

  internal class HO4_HO6_CoverageFormState extends NoOpState {
  }

  private class NoOpState extends AbstractCoverageFormState {
    override function syncOptionValues(toState : CoverageFormState) {
      doNotSyncOptionValues()
    }

    override function syncDwellingValues(dwelling : HOPDwelling) {
      doNotSyncDwellingValues()
    }

    override function setCovCValuationTerm(hopCovCValuationTerm : OptionCovTerm<OptionHOPCovCValuationType>, value : String) {
      doNotSetCovCValuationTerm()
    }
  }

  internal class HO3_HO5CoverageFormState extends DwellingCoverageFormState {
    override function syncOptionValues(toState : CoverageFormState) {
      super.syncOptionValues(toState)
      for (dwelling in _hopLine.HOPDwellings) {
        toState.syncDwellingValues(dwelling)
      }
    }
  }

  internal class HO2CoverageFormState extends DwellingCoverageFormState {
    override function syncOptionValues(toState : CoverageFormState) {
      super.syncOptionValues(toState)
      var dwelling = _hopLine.HOPDwellings.single()
      if (dwelling.HOPCovC.HasHOPCovCValuationTerm) {
        toState.setCovCValuationTerm(dwelling.HOPCovC.HOPCovCValuationTerm, "ACV")
        toState.syncDwellingValues(dwelling)
      }
    }
  }

  private abstract class DwellingCoverageFormState extends AbstractCoverageFormState {
    override function syncOptionValues(toState : CoverageFormState) {
      syncOptionValuesCalled = true
    }

    function syncDwellingValues(aDwelling : HOPDwelling) {
      syncDwellingValuesCalled = true
      if (aDwelling.HOPCovA.HasHOPCovACauseOfLossTerm) {
        var causeOfLossValueOptionCode = getAvailableOptionValues(aDwelling.HOPCovA.HOPCovACauseOfLossTerm).single().getOptionCode()
        setOptionCovTerm(aDwelling.HOPCovA.HOPCovACauseOfLossTerm, causeOfLossValueOptionCode)
        setOptionCovTerm(aDwelling.HOPCovC.HOPCovCCauseOfLossTerm, causeOfLossValueOptionCode)
      }
    }

    override function setCovCValuationTerm(hopCovCValuationTerm : OptionCovTerm<OptionHOPCovCValuationType>, value : String) {
      setOptionCovTerm(hopCovCValuationTerm, value)
      setCovCValuationTermCalled = true
    }

    private function setOptionCovTerm(optionCovTerm : OptionCovTerm, covTermCode : String) {
      optionCovTerm.OptionValue = optionCovTerm?.Pattern.getCovTermOpt(covTermCode)
    }

    private function getAvailableOptionValues(optionCovTerm : OptionCovTerm) : List<CovTermOpt> {
      return optionCovTerm?.Pattern.getOrderedAvailableValues(optionCovTerm)
    }
  }

  private abstract class AbstractCoverageFormState implements CoverageFormState{
    internal var syncOptionValuesCalled: boolean
    internal var syncDwellingValuesCalled : boolean
    internal var setCovCValuationTermCalled : boolean

    protected function doNotSyncOptionValues() {
      syncOptionValuesCalled = false
    }
    protected function doNotSyncDwellingValues() {
      syncDwellingValuesCalled = false
    }
    protected function doNotSetCovCValuationTerm() {
      setCovCValuationTermCalled = false
    }
    function syncOptionValuesCalled(): boolean {
      return syncOptionValuesCalled
    }
    function syncDwellingValuesCalled(): boolean {
      return syncDwellingValuesCalled
    }
    function setCovCValuationTermCalled() : boolean {
      return setCovCValuationTermCalled
    }
  }
}