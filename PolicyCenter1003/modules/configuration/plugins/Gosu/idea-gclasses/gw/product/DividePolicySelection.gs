package gw.product

uses gw.api.locale.DisplayKey
uses java.lang.IllegalStateException
uses gw.policy.PolicyPeriodCopier

/**
 * The selections necessary to divide a policy into new submissions.
 */
@Export
class DividePolicySelection {

  /**
   * The producer selection to use when creating the new submission.
   */
  var _producerSelection : ProducerSelection as readonly ProducerSelection

  /**
   * The type of quote to use when creating the new submission.
   */
  var _quoteType : QuoteType as QuoteType

  /**
   * The account contact to use as the primary named insured when creating the new submission.
   */
  var _primaryNamedInsuredCandidate : AccountContact as PrimaryNamedInsuredCandidate

  /**
   * The policy period copier used to copy data to the new submission policy.
   */
  var _copier : PolicyPeriodCopier as readonly Copier

  var _periodToDivide : PolicyPeriod

  /**
   * The selections necessary to divide a policy into new submissions.
   */
  public construct(periodToDivide : PolicyPeriod) {
    _producerSelection = new ProducerSelection()
    _producerSelection.State        = periodToDivide.BaseState
    _producerSelection.Producer     = periodToDivide.ProducerCodeOfRecord.Organization
    _producerSelection.ProducerCode = periodToDivide.Policy.ProducerCodeOfService
    _quoteType      = typekey.QuoteType.TC_FULL
    _copier         = new PolicyPeriodCopier(periodToDivide)
    _periodToDivide = periodToDivide
  }

  public final function handleAccountChange() {
    _primaryNamedInsuredCandidate = _producerSelection.Account.AccountHolder.AccountContact
    if (_producerSelection.Account != null and _producerSelection.DefaultPPEffDate != null) {
      var productSelection = ProducerSelection.Account.getAvailableProduct(ProducerSelection.SubmissionPolicyProductRoot, _periodToDivide.Policy.Product)
      if (productSelection == null) {
        throw new IllegalStateException(DisplayKey.get("Web.SubmissionManagerLV.UnavailableProduct", _periodToDivide.Policy.Product))
      }
    }
  }

  /**
   * Creates a submission in the current bundle and configures it based on the
   * selection settings.
   */
  function createSubmission() : Submission {
    if (ProducerSelection.DefaultPPEffDate == null) {
      throw new IllegalStateException(DisplayKey.get("Web.SubmissionManagerLV.DefaultPPEffDateRequired"))
    }
    var productSelection = ProducerSelection.Account.getAvailableProduct(ProducerSelection.SubmissionPolicyProductRoot, _periodToDivide.Policy.Product)
    if (productSelection == null) {
      throw new IllegalStateException(DisplayKey.get("Web.SubmissionManagerLV.UnavailableProduct", _periodToDivide.Policy.Product))
    }
    var submission = productSelection.createSubmission(ProducerSelection.Account, ProducerSelection)
    initializeSubmission(submission)
    return submission
  }

  /**
   * Initializes the submission after creation.
   */
  private function initializeSubmission(submission : Submission) {
    submission.QuoteType = _quoteType
    submission.Policy.DividedSourcePolicy = _periodToDivide.Policy
    var latestPeriod = submission.LatestPeriod
    latestPeriod.changePrimaryNamedInsuredTo(PrimaryNamedInsuredCandidate.Contact)
    latestPeriod.SubmissionProcess.beginEditing()
    latestPeriod.PolicyTerm.AffinityGroup = _periodToDivide.PolicyTerm.AffinityGroup
    _copier.copyInto(latestPeriod)
  }
}
