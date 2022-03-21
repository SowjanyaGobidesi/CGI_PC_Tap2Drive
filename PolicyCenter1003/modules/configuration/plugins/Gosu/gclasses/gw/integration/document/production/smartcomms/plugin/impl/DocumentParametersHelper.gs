package gw.integration.document.production.smartcomms.plugin.impl

uses org.slf4j.LoggerFactory

uses java.lang.invoke.MethodHandles

@Export
class DocumentParametersHelper {

  static final var LOGGER = LoggerFactory.getLogger(MethodHandles.lookup().lookupClass())

  private construct() {
  }

  /**
   * Populates document from untyped collection of parameters and final document
   * so payloadSource can be used as a source for gxmodel.
   * <p>
   * Note: it is going to flat out every parameter (e.g. extract
   * policy from policy period and put it as Document.Policy) thus
   * you should not persist changes in payloadSource.
   *
   * @param parameters    Parameters usually originate on pcf file as all available
   *                      variables; we only pick ones that have types we can pass
   *                      to gx model
   * @param document      Document that is going to be persisted and visible to user
   * @param payloadSource source for payload generation
   */
  internal static function populatePayloadSource(
      parameters: Map, document: Document, payloadSource: Document) {
    if (payloadSource == null)
      return
    if (document != null) {
        setPolicyPeriod(payloadSource, document.PolicyPeriod)
        setPolicy(payloadSource, document.Policy)
        setAccount(payloadSource, document.Account)
        setContingency(payloadSource, document.Contingency)
        setJob(payloadSource, document.Job)
    }
    if (parameters != null) {
      for (value in parameters.values()) {
        if (value typeis PolicyPeriod)
          setPolicyPeriod(payloadSource, value)
        if (value typeis Policy)
          setPolicy(payloadSource, value)
        if (value typeis Account)
          setAccount(payloadSource, value)
        if (value typeis Contingency)
          setContingency(payloadSource, value)
        if (value typeis Job)
          setJob(payloadSource, value)
      }
    }
  }

  private static function setPolicyPeriod(document: Document, policyPeriod: PolicyPeriod) {
    if (policyPeriod == null)
      return
    LOGGER.maybeDebug(\-> 'set policy period ${policyPeriod.DisplayName}')
    if ((document.PolicyPeriod != null) and (document.PolicyPeriod != policyPeriod)) {
      throw new UnsupportedOperationException(
          "There are multiple PolicyPeriods in parameters.\n" +
              "If parameter map is correct then you have to update " +
              "DocumentParametersHelper to property process your parameters")
    }
    document.PolicyPeriod = policyPeriod
    setPolicy(document, policyPeriod.Policy)
  }

  private static function setPolicy(document: Document, policy: Policy) {
    if (policy == null)
      return
    LOGGER.maybeDebug(\-> 'set policy ${policy.DisplayName}')
    if ((document.Policy != null) and (document.Policy != policy)) {
      throw new UnsupportedOperationException(
          "There are multiple Policies in parameters.\n" +
              "If parameter map is correct then you have to update " +
              "DocumentParametersHelper to property process your parameters")
    }
    document.Policy = policy
    setAccount(document, policy.Account)
  }

  private static function setAccount(document: Document, account: Account) {
    if (account == null)
      return
    LOGGER.maybeDebug(\-> 'set account ${account.DisplayName}')
    if ((document.Account != null) and (document.Account != account)) {
      throw new UnsupportedOperationException(
          "There are multiple Accounts in parameters.\n" +
              "If parameter map is correct then you have to update " +
              "DocumentParametersHelper to property process your parameters")
    }
    document.Account = account
  }

  private static function setContingency(document: Document, contingency: Contingency) {
    if (contingency == null)
      return
    LOGGER.maybeDebug(\-> 'set contingency ${contingency.DisplayName}')
    if ((document.Contingency != null) and (document.Contingency != contingency)) {
      throw new UnsupportedOperationException(
          "There are multiple Contingencies in parameters.\n" +
              "If parameter map is correct then you have to update " +
              "DocumentParametersHelper to property process your parameters")
    }
    document.Contingency = contingency
    setPolicyPeriod(document, contingency.PolicyPeriod)
  }

  private static function setJob(document: Document, job: Job) {
    if (job == null)
      return
    LOGGER.maybeDebug(\-> 'set job ${job.DisplayName}')
    if ((document.Job != null) && (document.Job != job)) {
      throw new UnsupportedOperationException(
          "There are multiple Jobs in parameters.\n" +
              "If parameter map is correct then you have to update " +
              "DocumentParametersHelper to property process your parameters")
    }
    document.Job = job
    setPolicy(document, job.Policy)
  }
}