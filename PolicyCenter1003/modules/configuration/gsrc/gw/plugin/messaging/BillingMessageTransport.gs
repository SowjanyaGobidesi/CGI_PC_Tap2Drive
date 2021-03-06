package gw.plugin.messaging

uses gw.api.system.PCLoggerCategory
uses gw.plugin.Plugins
uses gw.plugin.billing.IBillingSystemPlugin

uses java.lang.IllegalStateException
uses java.lang.Exception
uses gw.api.system.PLConfigParameters

@Export
class BillingMessageTransport implements MessageTransport {
  public static final var DEST_ID : int = 66
  public static final var TRANSACTION_ID_PREFIX : String = PLConfigParameters.PublicIDPrefix.Value + ":"

  var logger = PCLoggerCategory.BILLING_SYSTEM_PLUGIN

  override function send(message: Message, payLoad: String) {
    var plugin = Plugins.get(IBillingSystemPlugin)
    var policyPeriod = message.PolicyPeriod
    logger.debug("Billing message: ${message.EventName}:${policyPeriod.PolicyNumber}-${policyPeriod.TermNumber}"
      + " ${message.MessageRoot}")
    var pCode : ProducerCode
    try {
      switch(message.EventName){
        case Account.ACCOUNTCHANGED_EVENT:
          var account = message.MessageRoot as Account
          if(not account.Locked){
            plugin.updateAccount(account, getTransactionId(message))
          }
          break
        case Policy.TRANSFERPOLICY_EVENT:
          var policy = message.MessageRoot as Policy
          var accountNumber = policy.Account.AccountNumber
          createAccountIfNecessary(policy.Account, getTransactionId(message))
          plugin.transferPolicyPeriods(accountNumber, policy.Periods, getTransactionId(message) + "-1")
          break

        case PolicyPeriod.CREATEPERIOD_EVENT:
          if(not (policyPeriod.Job typeis Submission or policyPeriod.Job typeis RewriteNewAccount)){
            throw new IllegalStateException("Unexpected job type ${policyPeriod.Job.Subtype} for message ${message.EventName}")
          }
          createAccountIfNecessary(policyPeriod.Policy.Account, getTransactionId(message))
          createAltBillingAccountIfNecessary(policyPeriod.AltBillingAccountNumber, getTransactionId(message) + "-1")
          plugin.createPolicyPeriod(policyPeriod, getTransactionId(message) + "-2")
          break
        case PolicyPeriod.CANCELPERIOD_EVENT:
          if(not (policyPeriod.Job typeis Cancellation)){
            throw new IllegalStateException("Unexpected job type ${policyPeriod.Job.Subtype} for message ${message.EventName}")
          }
          plugin.cancelPolicyPeriod(policyPeriod, getTransactionId(message))
          break
        case PolicyPeriod.CHANGEPERIOD_EVENT:
          if(not (policyPeriod.Job typeis PolicyChange)){
            throw new IllegalStateException("Unexpected job type ${policyPeriod.Job.Subtype} for message ${message.EventName}")
          }
          if(shouldSendPolicyChange(policyPeriod)){
            plugin.issuePolicyChange(policyPeriod, getTransactionId(message))
          }
          break
        case PolicyPeriod.ISSUEPERIOD_EVENT:
          if(not (policyPeriod.Job typeis Issuance)){
            throw new IllegalStateException("Unexpected job type ${policyPeriod.Job.Subtype} for message ${message.EventName}")
          }
          if(shouldSendPolicyChange(policyPeriod)){
            plugin.issuePolicyChange(policyPeriod, getTransactionId(message))
          }
          break

        case PolicyPeriod.REINSTATEPERIOD_EVENT:
          if(not (policyPeriod.Job typeis Reinstatement)){
            throw new IllegalStateException("Unexpected job type ${policyPeriod.Job.Subtype} for message ${message.EventName}")
          }
          plugin.issueReinstatement(policyPeriod, getTransactionId(message))
          break
        case PolicyPeriod.RENEWPERIOD_EVENT:
          if(not (policyPeriod.Job typeis Renewal)){
            throw new IllegalStateException("Unexpected job type ${policyPeriod.Job.Subtype} for message ${message.EventName}")
          }
          createAccountIfNecessary(policyPeriod.Policy.Account, getTransactionId(message))
          createAltBillingAccountIfNecessary(policyPeriod.AltBillingAccountNumber, getTransactionId(message) + "-1")
          plugin.renewPolicyPeriod(policyPeriod, getTransactionId(message) + "-2")
          break
        case PolicyPeriod.REWRITEPERIOD_EVENT:
          if(not (policyPeriod.Job typeis Rewrite)){
            throw new IllegalStateException("Unexpected job type ${policyPeriod.Job.Subtype} for message ${message.EventName}")
          }
          createAltBillingAccountIfNecessary(policyPeriod.AltBillingAccountNumber, getTransactionId(message) + "-1")
          plugin.rewritePolicyPeriod(policyPeriod, getTransactionId(message) + "-2")
          break
        case PolicyPeriod.FINALAUDIT_EVENT:
          if(not (policyPeriod.Job typeis Audit)){
            throw new IllegalStateException("Unexpected job type ${policyPeriod.Job.Subtype} for message ${message.EventName}")
          }
          if(not policyPeriod.Audit.AuditInformation.IsFinalAudit){
            throw new IllegalStateException("Unexpected audit information ${policyPeriod.Audit.AuditInformation.AuditScheduleType} for messsage ${message.EventName}")
          }
          plugin.issueFinalAudit(policyPeriod, getTransactionId(message))
          break
        case PolicyPeriod.PREMIUMREPORT_EVENT:
          if(not (policyPeriod.Job typeis Audit)){
            throw new IllegalStateException("Unexpected job type ${policyPeriod.Job.Subtype} for message ${message.EventName}")
          }
          if(not policyPeriod.Audit.AuditInformation.IsPremiumReport){
            throw new IllegalStateException("Unexpected audit information ${policyPeriod.Audit.AuditInformation.AuditScheduleType} for messsage ${message.EventName}")
          }
          plugin.issuePremiumReport(policyPeriod, getTransactionId(message))
          break
        case PolicyPeriod.WAIVEFINALAUDIT_EVENT:
          plugin.waiveFinalAudit(policyPeriod, getTransactionId(message))
          break
        case PolicyPeriod.SCHEDULEFINALAUDIT_EVENT:
          plugin.scheduleFinalAudit(policyPeriod, getTransactionId(message))
          break

        case Organization.ORGANIZATIONADDED_EVENT:
          createProducer(message.MessageRoot as Organization, getTransactionId(message))
          break
        case Organization.ORGANIZATIONCHANGED_EVENT:
          updateProducer(message.MessageRoot as Organization, getTransactionId(message))
          break
        case ProducerCode.PRODUCERCODEADDED_EVENT:
          pCode = message.MessageRoot as ProducerCode
          plugin.createProducerCode(pCode, getTransactionId(message))
          break
        case ProducerCode.PRODUCERCODECHANGED_EVENT:
          pCode = message.MessageRoot as ProducerCode
          plugin.updateProducerCode(pCode, getTransactionId(message))
          break
        case Contact.CONTACTCHANGED_EVENT:
          var contact = message.MessageRoot as Contact
          updateContact(contact, message)
          break
        default:
          message.ErrorDescription = "Unknown event: " + message.EventName
          message.reportNonRetryableError()
          return
        }
      message.reportAck()
      /*
      It is not recommended to wait for ContactManager to process the contact messages
      before sending messages to BillingCenter. Messages might get lost or ContactManager
      might be shut down. BillingCenter still needs to receive these messages in any case.
      A much better implementation needs PolicyCenter and BillingCenter to be able to talk about the same contact
      without any interaction from ContactManager

      If you absolutely have to ensure that ContactManager processes these messages and you are ok
      with the downsides mentioned above uncomment the following code:

      } catch(e : gw.plugin.messaging.BillingContactUnsyncedException) {
      // description is set to contact's public ID so we can search this message later
      message.ErrorDescription = e.ContactPublicID
      if (message.RetryCount == 0) {
        // This is the first time we encounter this error so it may just be because
        // the contact has not been synced yet. For now, we just wait a bit longer.
        message.Description = "Waiting for contacts to be sent to CM."
        message.reportError(ErrorCategory.TC_CONTACT_UNSYNCED, 30)
      } else {
        // This is NOT the first time we encounter this error so there is probably some
        // permanent error with sending the contact. We will hold off sending this
        // message automatically for about 20 hrs. Before that, if the contact is sent
        // successfully, ContactMessageTransport will cause this message to be retried.
        // If this is just because Contact Manager is down then we can rely on this
        // retry to send the contact again.
        logger.error("Billing Integration Error", e)
        message.Description = "There may be some problems that make contacts not being sent to CM."
        message.reportError(ErrorCategory.TC_CONTACT_UNSYNCED, 72000)
      } */
    } catch(e : Exception) {
      logger.error("Billing Integration Error", e)
      message.ErrorDescription = e.Message
      message.reportError(ErrorCategory.TC_SYSTEM_ERROR)
    }
  }

  private function updateContact(contact : Contact, message : Message) {
    var plugin = Plugins.get(IBillingSystemPlugin)
    if (shouldSendContactUpdate(contact)) {
      plugin.updateContact(contact, getTransactionId(message))
    }
  }

  private function shouldSendContactUpdate(contact : Contact) : boolean {
    if (contact.isProducerContact()) {
      return true
    }
    return false
  }

  private function createAccountIfNecessary(account : Account, transactionId : String) {
    var plugin = Plugins.get(IBillingSystemPlugin)
    if (not plugin.accountExists(account.AccountNumber)) {
      plugin.createAccount(account, transactionId)
    }
  }

  private function createAltBillingAccountIfNecessary(accountNumber : String, transactionId : String) {
    var plugin = Plugins.get(IBillingSystemPlugin)
    if (accountNumber != null and not plugin.accountExists(accountNumber)) {
      var account = Account.finder.findAccountByAccountNumber(accountNumber)
      plugin.createAccount(account, transactionId)
    }
  }

  private function updateProducer(organization : Organization, transactionId : String) {
    if (not organization.Producer) {
      throw new IllegalStateException("Unexpected organization change message when organization is not Producer: ${organization}")
    }
    var plugin = Plugins.get(IBillingSystemPlugin)
    plugin.updateProducer(organization, transactionId)
  }

  private function createProducer(organization : Organization, transactionId : String) {
    // producer created in BC will have the same public id so no need to check for duplicated
    // this check just to make creating sample data does not try to create producer twice
    var plugin = Plugins.get(IBillingSystemPlugin)
    if (organization.Producer and not plugin.producerExists(organization.PublicID)) {
      plugin.createProducer(organization, transactionId)
    }
  }

  private function shouldSendPolicyChange(policyPeriod : PolicyPeriod) : boolean {
    var transactions = policyPeriod.AllTransactions
    var basedOnPeriod = policyPeriod.BasedOn
    var newPrimaryNamedInsured = policyPeriod.PrimaryNamedInsured.AccountContactRole.AccountContact.Contact.PublicID
    var oldPrimaryNamedInsured = basedOnPeriod.PrimaryNamedInsured.AccountContactRole.AccountContact.Contact.PublicID
    return transactions.countWhere(\ t -> t.Charged) > 0
      or policyPeriod.BaseState != basedOnPeriod.BaseState
      or policyPeriod.PeriodStart != basedOnPeriod.PeriodStart
      or policyPeriod.PeriodEnd != basedOnPeriod.PeriodEnd
      or newPrimaryNamedInsured != oldPrimaryNamedInsured
  }

  private function getTransactionId(message : Message) : String {
    if (message.PolicyPeriod != null) {
      return "PC:" + message.PolicyPeriod.ID + "-" + message.EventName + "-" + message.DestinationID
    }

    return TRANSACTION_ID_PREFIX + message.ID
  }

  override function resume() { }

  override property set DestinationID(id: int) { }

  override function shutdown() { }

  override function suspend() {
    logger.debug(BillingMessageTransport.Type.RelativeName + " suspended")
  }
}