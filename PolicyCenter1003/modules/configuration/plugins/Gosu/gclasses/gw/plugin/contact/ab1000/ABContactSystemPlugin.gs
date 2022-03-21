package gw.plugin.contact.ab1000

uses entity.Contact
uses gw.api.database.Query
uses gw.api.domain.contact.XmlElementByteContainerAccess
uses gw.api.locale.DisplayKey
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.api.util.DisplayableException
uses gw.api.util.LocaleUtil
uses gw.contactmapper.ab1000.ContactIntegrationMapperFactory
uses gw.entity.IEntityType
uses gw.lang.reflect.TypeSystem
uses gw.plugin.contact.ContactCommunicationException
uses gw.plugin.contact.ContactCreator
uses gw.plugin.contact.ContactResult
uses gw.plugin.contact.ContactSystemPlugin
uses gw.plugin.contact.DuplicateContactResultContainer
uses gw.webservice.contactapi.ContactAPIUtil
uses gw.webservice.contactapi.beanmodel.XmlBackedInstance
uses gw.xml.XmlException
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.ABContactAPI
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.faults.AlreadyExecutedException
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.faults.BadIdentifierException
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.faults.DataConversionException
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.faults.EntityStateException
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.faults.RequiredFieldException
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.faults.SOAPException
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.faults.SOAPSenderException
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.types.complex.ABContactAPISearchCriteria
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.types.complex.ABContactAPISearchSpec
uses wsi.remote.gw.webservice.ab.ab1000.abcontactapi.types.complex.AddressBookUIDContainer

/**
 * Contact system plugin that integrates to ContactManager.
 */
@Export
class ABContactSystemPlugin implements ContactSystemPlugin {
  private var _logger = PCLoggerCategory.CONTACT_SYSTEM
  private var _mapper = ContactIntegrationMapperFactory.ContactIntegrationMapper

  /**
   * Notifies ContactManager about the creation of a a new contact and if successful, updates
   * the contact, primary address and secondary addresses with their AddressBookUIDs.
   * If unsuccessful, it creates an activity for the update user describing the
   * update that failed.
   *
   * @param contact The {@link entity.Contact} being sent to Contact Manager
   * @param transactionId the transactionID for this transaction
   *
   */
  override function addContact(contact : Contact, transactionId : String) {
    var xml = _mapper.populateXMLFromContact(contact)
    addContact(contact, xml.asUTFString(), transactionId)
  }

  /**
   * @param contact The {@link entity.Contact} being sent to Contact Manager
   * @param payload An {@link XmlBackedInstance}
   * @param transactionId the transactionID for this transaction
  **/
  override function addContact(contact : Contact, payload : String,  transactionId : String) {
    if (contact.AddressBookUID != null) {
      throw new IllegalArgumentException("Cannot add a contact that already exists in ContactManager; should this be a call to updateContact() instead?")
    }
    _logger.info("Adding '${contact}' to ContactManager with transaction id '${transactionId}'")
    try {
      var abuidContainer : AddressBookUIDContainer
      var abXmlBackedInstance = wsi.remote.gw.webservice.ab.ab1000.beanmodel.XmlBackedInstance.parse(payload)
      abuidContainer = callWebService(\ api -> api.createContact(abXmlBackedInstance), transactionId)
      updateAddressBookUIDs(contact, abuidContainer)
    }  catch (e : Exception){
      handleErrors(e)
    }
  }



  /**
   * Notifies ContactManager about changes to a contact and if successful, updates
   * the contact, primary address and secondary addresses with their AddressBookUIDs.
   * If unsuccessful, it creates an activity for the update user describing the
   * update that failed.
   * If unsuccessful with EntityStateException (version conflict), it creates an activity
   * and also tries to retrive the latest version of the contact.
   *
   * @param contact contact that ContactManager is being notified about.
   * @param changes XML of changes that conforms to ContactManager's ABContactModel.xsd
   * @param transactionId the transactionID to make this call
   */
  override function updateContact(contact : Contact, changes : String, transactionId : String) {
    _logger.info("Sending updates to ContactManager for '${contact}' with transaction id '${transactionId}'")
    if (contact.AddressBookUID == null) {
      throw new IllegalArgumentException("Cannot update a contact in ContactManager unless the contact parameter is linked to it; should this be a call to addContact() instead?")
    }
    try {
      var abuidContainer : AddressBookUIDContainer
      _logger.debug("Sending contact info,\n${changes}")
      var abXmlBackedInstance = wsi.remote.gw.webservice.ab.ab1000.beanmodel.XmlBackedInstance.parse(changes)
      abuidContainer = callWebService(\ api -> api.updateContact(abXmlBackedInstance), transactionId)
      updateAddressBookUIDs(contact, abuidContainer)
    } catch (ese : EntityStateException) {
      // Non retryable, just ack the message. Will be fixed by activity
      retrieveLatestContactForFailedUpdateContact(contact)
      handleErrors(ese)
    } catch (e : Exception){
      handleErrors(e)
    }
  }

  override function removeContact(contact : Contact, removeInfo : String, transactionId : String) {
    try {
      _logger.info("Sending remove instruction to ContactManager for '${contact}'")
      if (contact.AddressBookUID == null) {
        throw new IllegalArgumentException("Cannot remove a contact in ContactManager unless the contact parameter is linked to it")
      }
      var abXmlBackedInstance = wsi.remote.gw.webservice.ab.ab1000.beanmodel.XmlBackedInstance.parse(removeInfo)
      callWebService(\ api -> api.removeContact(abXmlBackedInstance), transactionId)
    } catch (e : Exception){
      handleErrors(e)
    }
  }

  override function retrieveContact(addressBookUID : String, creator : ContactCreator) : Contact {
    var returnedContact : Contact = null
    var contactXml = retrieveContactXML(addressBookUID)
    if (contactXml != null) {
      var contactType = _mapper.NameMapper.getLocalEntityName(contactXml.EntityType)
      returnedContact = creator.loadOrCreateContact(contactXml.LinkID, typekey.Contact.get(contactType))

      validateAutoSyncState(returnedContact, addressBookUID)
      overwriteContactFromXml(returnedContact, contactXml)
    }
    return returnedContact
  }


  override function overwriteContactWithLatestValues(contact : Contact, addressBookUID : String) {
    validateAutoSyncState(contact, addressBookUID)
    var contactXml = retrieveContactXML(addressBookUID)
    overwriteContactFromXml(contact, contactXml)
  }

  override function searchContacts(searchCriteria : ContactSearchCriteria) : ContactResult[] {
    if (searchCriteria == null) {
      throw new NullPointerException("Search criteria cannot be null")
    }
    var abSearchCriteria = new ABContactAPISearchCriteria()
    abSearchCriteria.sync(searchCriteria)
    try {
      var searchSpec = new ABContactAPISearchSpec()
      if ("ABPerson".equals(abSearchCriteria.ContactType)) {
        searchSpec.SubtypeFilter.Subtypes.Entry = new ArrayList<String>() { "ABUserContact" }
      }
      searchSpec.LocaleCode = LocaleUtil.getCurrentLocaleType().Code
      searchSpec.ChunkSize = PCConfigParameters.MaxContactSearchResults.Value
      searchSpec.GetNumResultsOnly = true
      var result = callWebService(\ api -> {
        return api.searchContact(abSearchCriteria, searchSpec)
      })
      if (result.TotalResults > PCConfigParameters.MaxContactSearchResults.Value) {
        throwTooManyResultsException()
      }
      searchSpec.GetNumResultsOnly = false
      result = callWebService(\ api -> {
        return api.searchContact(abSearchCriteria, searchSpec)

      })
      return result.Results.Entry.map(\ a -> new gw.plugin.contact.ab1000.ContactResultFromSearch(a.$TypeInstance)).toTypedArray()
    } catch (e : RequiredFieldException) {
      throw new DisplayableException(e.Message)
    } catch (e : SOAPSenderException) {
      wrap(e)
    } catch (e : SOAPException) {
      wrap(e)
    } catch (e : gw.xml.ws.WebServiceException) {
      wrap(e)
    }
    return null
  }

  override function supportsFindingDuplicates() : boolean {
    return true
  }

  override function findDuplicates(contact : Contact) : DuplicateContactResultContainer {
    var searchSpec = new ABContactAPISearchSpec()
    searchSpec.LocaleCode = LocaleUtil.getCurrentLocaleType().Code
    searchSpec.ChunkSize = PCConfigParameters.MaxContactSearchResults.Value
    searchSpec.TagMatcher.Tags.Entry = { ContactTagType.TC_CLIENT.Code }
    searchSpec.TagMatcher.MatchAllTags = false
    var xml = _mapper.populateXMLFromContact(contact)
    // don't send LinkID
    var linkIDField = xml.Field.firstWhere(\ i -> i.Name == "LinkID")
    xml.Field.remove(linkIDField)
    return new gw.plugin.contact.ab1000.DuplicateContactResultContainerImpl(callWebService(\api -> {
      var abXmlBackedInstance = wsi.remote.gw.webservice.ab.ab1000.beanmodel.XmlBackedInstance.parse(xml.bytes())
      return api.findDuplicates(abXmlBackedInstance, searchSpec)
    }))
  }

  override function getReplacementAddressABUID(oldAddressUID : String) : String {
    return callWebService(\ a -> {
      return a.getReplacementAddress(oldAddressUID)
    })
  }


  override function createAsyncMessage(messageContext : MessageContext, contact : Contact, lateBoundABUID : boolean) {
    var contactMapper = ContactIntegrationMapperFactory.ContactIntegrationMapper
    var contactXML = contactMapper.populateXMLFromContact(contact, lateBoundABUID)
    messageContext.createMessage(contactXML.asUTFString())
  }


  protected reified function callWebService<T>(call : block(api : ABContactAPI) : T) : T {
    return callWebService(call, null)
  }

  protected function makeNewABContactAPI() : ABContactAPI {
    return new ABContactAPI()
  }

  protected reified function callWebService<T>(call : block(api : ABContactAPI) : T, transactionId : String) : T {
    var abContactAPI = makeNewABContactAPI()
    if (transactionId != null) {
      ContactAPIUtil.setTransactionId(abContactAPI.Config, transactionId)
    }
    try {
      return call(abContactAPI)
    } catch (e : AlreadyExecutedException) {
      handleAlreadyExecutedException(e)
    }
    return null
  }

  protected function handleAlreadyExecutedException(e : AlreadyExecutedException) {
    _logger.warn(e as String)
  }

  private function wrap(e : Exception) {
    _logger.error(DisplayKey.get("Web.ContactManager.Error.GeneralException", e.Message), e)
    throw new DisplayableException(DisplayKey.get("Web.ContactManager.Error.GeneralException", e.Message))
  }

  private function throwTooManyResultsException() {
    throw new DisplayableException(DisplayKey.get("Web.ContactManager.Error.TooManyResults"))
  }

  /**
   * Updates the contact, its primary address, and secondary addresses with the AddressBookUIDs from ContactManager.
   */
  private function updateAddressBookUIDs(contact : Contact, abuidContainer : AddressBookUIDContainer) {
    contact.AddressBookUID = abuidContainer.ContactABUID

    var beans = contact.Bundle.InsertedBeans.iterator().toList().union(contact.Bundle.UpdatedBeans.iterator().toList())
    var removedBeans = contact.Bundle.RemovedBeans.iterator().toList()

    for (tuple in abuidContainer.AddressBookUIDTuples.Entry) {
      if (tuple.External_PublicID == null) continue
      var localEntityName = _mapper.NameMapper.getLocalEntityName(tuple.EntityType)
      var entityType = TypeSystem.getByRelativeName(localEntityName) as IEntityType
      if (findBeanByRelativeNameAndPublicID(removedBeans, entityType.RelativeName, tuple.External_PublicID) != null)
        continue
      var bean = findBeanByRelativeNameAndPublicID(beans, entityType.RelativeName, tuple.External_PublicID)
      if (bean == null)
        bean = contact.Bundle.loadByPublicId(entityType, tuple.External_PublicID)
      bean.setFieldValue("AddressBookUID", tuple.LinkID)
    }
  }

  private static function findBeanByRelativeNameAndPublicID(beans : Collection<KeyableBean>, relativeName : String, publicID : String) : KeyableBean {
    return beans.firstWhere(\ k -> (typeof k).RelativeName == relativeName and k.PublicID == publicID)
  }

  /**
   *  So far only updateContact, addContact and removeContact are called from the ContactMessageTransport.
   *  We need to handle the Exception based on Retryable or not
   */

  protected function handleErrors(e : Exception) {
    if (e typeis IllegalArgumentException or
        e typeis EntityStateException or
        e typeis RequiredFieldException or
        e typeis DataConversionException or
        e typeis BadIdentifierException or
        e typeis XmlException){
      // Non retryable, just ack the message. Will be fixed by activity
      throw new ContactCommunicationException(e.Message, e.Cause, false)
    } else if (e typeis SOAPSenderException or  // this has to be the last
                 e typeis SOAPException) {
      throw new ContactCommunicationException(e.Message, e.Cause, true, true) // retryable and should notifyAdmin
    } else  {
      throw e  // Let it through for other type of exception
    }
  }

  private function retrieveContactXML(addressBookUID : String) : XmlBackedInstance {
    var abContactXML : wsi.remote.gw.webservice.ab.ab1000.beanmodel.XmlBackedInstance
    try {
     abContactXML = callWebService(\ api -> api.retrieveContact(addressBookUID))
    } catch (e : SOAPException) {
      wrap(e)
    }
    return abContactXML == null
      ? null
      : XmlBackedInstance.parse(abContactXML.bytes())
  }

  /**
   * This function is called when updateContact is failed because of EntityStateException.
   * It retrieves the contact in the new bundle and ignores the exception if it failed.
   */
  private function retrieveLatestContactForFailedUpdateContact(contact : Contact) {
    try {
      retrieveContact(contact.AddressBookUID, new ContactCreator(contact.Bundle))
    } catch(e : Exception) {
      // do nothing here. exception is already logged.
    }
  }

  private function overwriteContactFromXml(contact :Contact, contactXml : XmlBackedInstance) {
    if (contactXml != null) {
      if(contact.AddressBookUID == null) {
        contact.setOriginalValuesXML(XmlElementByteContainerAccess.getContainerForElement(contactXml))
      }
      _mapper.populateContactFromXML(contact, XmlBackedInstance.parse(contactXml.bytes()))
    }

    //Ensure that Addresses are linked.
    for (anAddress in contact.AllAddresses){
      //lookup the corresponding existing address by AddressBookUID if it exists and setup the LinkedAddress
      //The ContactSystem probeble does not support LinkedAddresses, so we must query against any local copies of the address
      //for the LinkedAddress and link it into the given contact/address
      if (anAddress.LinkedAddress == null){
        var linkedAddress = findLinkedAddressForAddressByABUID(anAddress.AddressBookUID)
        if (linkedAddress != null){
          anAddress.linkAddress(linkedAddress.Addresses.first(), contact)
        }
      }
    }
    contact.AutoSync = TC_ALLOW
  }

  protected function findLinkedAddressForAddressByABUID(addressAddressBookUID : String) : LinkedAddress{
    /**
     * SELECT la.*
     *   FROM LinkedAddress la
     *  WHERE la.ID in
     *       (SELECT a.LinkedAddress
     *          FROM Address a
     *         WHERE a.AddressBookUID == <addressAddressBookUID>)
     */
    var query = Query.make(LinkedAddress)
      .subselect("ID", CompareIn, Address, "LinkedAddress")
      .compare("AddressBookUID", Equals, addressAddressBookUID)
    var linkedAddress = query.select().AtMostOneRow
    return linkedAddress
  }

  private function validateAutoSyncState(contact : Contact, addressBookUID : String) {
    if (contact.AutoSync == AutoSync.TC_DISALLOW) {
      throw new IllegalStateException(DisplayKey.get("Web.Contact.Error.CannotRetrieveContactWhenAutoSyncDisallowed", addressBookUID))
    }
  }

}
