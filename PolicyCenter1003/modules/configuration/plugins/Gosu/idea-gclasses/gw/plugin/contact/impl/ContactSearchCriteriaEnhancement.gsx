package gw.plugin.contact.impl
uses gw.api.locale.DisplayKey
uses java.util.ArrayList
uses java.util.HashSet
uses gw.plugin.contact.ContactResult
uses java.lang.Exception

enhancement ContactSearchCriteriaEnhancement : entity.ContactSearchCriteria {

  function performSearch() : ContactResultWrapper {

    var internalResults = this.searchInternal()
    var iter = internalResults.iterator()
    var results = new ArrayList<ContactResult>()
    var uids = new HashSet()
    var waningMsg : String
    while (iter.hasNext()){
      var contact = iter.next()
      results.add(new ContactResultInternal(contact))
      if(contact.AddressBookUID != null){
        uids.add(contact.AddressBookUID)
      }
    }

    var currentUser: User = User.util.CurrentUser
    if (not currentUser.isUseProducerCodeSecurity()) {
      try {
        var remoteResults = this.searchExternalContacts()
        for(result in remoteResults){
          if(not uids.contains(result.ContactAddressBookUID)){
            results.add(result)
          }
        }
      } catch (e : Exception) {
        if (results.Empty) {
          waningMsg = e.Message
        } else {
          // we need to explain that we have local results, but none from ContactCenter
          waningMsg = DisplayKey.get("Contact.Search.Warning.NoExternalResults", e.Message)
        }
      }
    }
    return new ContactResultWrapper(results.toTypedArray(), waningMsg)
  }

  property get ContactType() : typekey.ContactType{
    return gw.api.util.TypeUtil.isNominallyOrStructurallyAssignable(Person.Type, this.ContactIntrinsicType) ?
      typekey.ContactType.TC_PERSON : typekey.ContactType.TC_COMPANY
  }
}
