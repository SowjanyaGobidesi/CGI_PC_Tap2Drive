package gw.pcf.rating.rateroutine

uses gw.api.util.LocationUtil

@Export
class RateRoutineDetailUIHelper {
  final var _rateRoutine : CalcRoutineDefinition as RateRoutine

  construct(rateRoutine : CalcRoutineDefinition) {
    _rateRoutine = rateRoutine

    _rateRoutine.loadSteps()
  }

  function performValidation() : boolean {
    var validationMessages = RateRoutine.performPreDisplayValidation()
    for (msg in validationMessages) {
      LocationUtil.addRequestScopedErrorMessage(msg)
    }
    return validationMessages.IsEmpty
  }
}