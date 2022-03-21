package gw.job

uses entity.PolicyLine

enhancement JobProcessEnhancement: gw.job.JobProcess {

  function requestQuote(skipValidation: boolean) {
    requestQuote(skipValidation, false)
  }

  function requestQuote(skipValidation: boolean, skipEvaluation: boolean) {
    doMaybeSkippingValidationAndEvaluation(skipValidation, skipEvaluation, \-> this.requestQuote())
  }

  function requestRate(skipValidation: boolean) {
    requestRate(skipValidation, false)
  }

  function requestRate(skipValidation: boolean, skipEvaluation: boolean) {
    doMaybeSkippingValidationAndEvaluation(skipValidation, skipEvaluation, \-> this.requestRate())
  }

  function requestPostRatingQuote(skipValidation: boolean) {
    requestPostRatingQuote(skipValidation, false)
  }

  function requestPostRatingQuote(skipValidation: boolean, skipEvaluation: boolean) {
    doMaybeSkippingValidationAndEvaluation(skipValidation, skipEvaluation, \-> this.requestPostRatingQuote())
  }

  function requestRatingOverride(skipValidation: boolean, line: PolicyLine) {
    requestRatingOverride(skipValidation, false, line)
  }

  function requestRatingOverride(skipValidation: boolean, skipEvaluation: boolean, line: PolicyLine) {
    doMaybeSkippingValidationAndEvaluation(skipValidation, skipEvaluation, \-> this.requestRatingOverride(line))
  }

  function bindOnly(skipValidation: boolean) {
    bindOnly(skipValidation, false)
  }

  function bindOnly(skipValidation: boolean, skipEvaluation: boolean) {
    doMaybeSkippingValidationAndEvaluation(skipValidation, skipEvaluation, \-> (this as SubmissionProcess).bindOnly())
  }

  function bind(skipValidation: boolean) {
    bind(skipValidation, false)
  }

  function bind(skipValidation: boolean, skipEvaluation: boolean) {
    doMaybeSkippingValidationAndEvaluation(skipValidation, skipEvaluation, \-> this.bind())
  }

  protected function doMaybeSkippingValidationAndEvaluation(skipValidation: boolean, skipEvaluation: boolean, action()) {
    var prevValidator = this.JobProcessValidator
    var prevEvaluator = this.JobProcessEvaluator
    try {
      if (skipValidation) {
        this.JobProcessValidator = JobProcessValidator.NO_OP_VALIDATOR
      }
      if (skipEvaluation) {
        this.JobProcessEvaluator = JobProcessUWIssueEvaluator.NO_OP_EVALUATOR
      }
      action()
    } finally {
      this.JobProcessValidator = prevValidator
      this.JobProcessEvaluator = prevEvaluator
    }
  }

}
