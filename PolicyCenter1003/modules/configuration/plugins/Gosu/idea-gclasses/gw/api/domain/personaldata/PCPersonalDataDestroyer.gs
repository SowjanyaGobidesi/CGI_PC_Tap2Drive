package gw.api.domain.personaldata

uses gw.api.database.Query
uses gw.api.personaldata.purge.PersonalDataPurgeResult
uses gw.api.personaldata.purge.PersonalDataPurgeStatus
uses gw.api.system.PLLoggerCategory

@Export
class PCPersonalDataDestroyer extends PinnablePersonalDataDestroyer {

  /**
   * destruction of a contact based on its type, if the contact is a UserContact, destroy through obfuscation
   * otherwise destroy through purging
   *
   * @param contact contact to be destroyed
   * @return true if the contact was destroyed, else false
   */
  override function destroyContact(contact : Contact) : boolean {
    if (contact typeis UserContact) {
      return obfuscateUserContact(contact)
    } else {
      var result = doPurgeContact(contact)
      return result.getStatus() == PersonalDataPurgeStatus.CompletePurgeExecuted
    }
  }

  override public function destroyContact(purgeRequest : PersonalDataContactDestructionRequest) : ContactDestructionStatus {
    var contact = Query.make(Contact).withFindRetired(true).compare(Contact#PublicID, Equals, purgeRequest.ContactPublicID).select().AtMostOneRow

    if (contact == null) { //in case called again when already destroyed
      return TC_COMPLETED
    }

    if (contact typeis UserContact) {
      return obfuscateUserContact(contact) ? TC_COMPLETED : TC_NOTDESTROYED
    } else {
      var status = doPurgeContact(contact)
      return convertPersonalDataPurgeStatusToContactDestructionStatus(status)
    }
  }

  protected function obfuscateUserContact(userContact : UserContact) : boolean {
    try {
      gw.transaction.Transaction.runWithNewBundle(\bundle -> {
        userContact = bundle.add(userContact)
        userContact.obfuscate()
      })
    } catch (e : Exception) {
      PLLoggerCategory.DATA_DESTRUCTION_REQUEST.error("Failed to obfuscate userContact: " + userContact, e)
    }

    return userContact.Obfuscated
  }

  protected function doPurgeContact(contact: Contact) : PersonalDataPurgeResult {
    var purgeResult = purgeContact(contact)
    purgeResult.getPinnablesWithUnpurgeableReasons().each(\pinnable -> {
      var reasons = purgeResult.getUnpurgeableReasonsFor(pinnable)
      //process the reasons why contact cannot be purged

    })

    return purgeResult
  }
}