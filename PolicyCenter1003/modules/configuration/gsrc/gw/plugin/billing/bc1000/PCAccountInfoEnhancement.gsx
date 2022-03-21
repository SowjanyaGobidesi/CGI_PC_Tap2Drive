package gw.plugin.billing.bc1000

uses wsi.remote.gw.webservice.bc.bc1000.entity.anonymous.elements.PCAccountInfo_BillingContacts
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PCAccountInfo
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PCContactInfo

@Export
enhancement PCAccountInfoEnhancement : PCAccountInfo
{
  function sync(account : Account){
    this.AccountNumber = account.AccountNumber
    this.AccountName = account.AccountHolderContact.AccountName
    this.AccountNameKanji = account.AccountHolderContact.AccountNameKanji

    this.CustomerServiceTier = account.ServiceTier.Code

    var insuredContact = new PCContactInfo()
    insuredContact.sync( account.AccountHolderContact )
    this.InsuredContact.$TypeInstance = insuredContact

    var insuredContactID = account.AccountHolderContact.ID

    var billingContacts = new ArrayList<PCContactInfo>()
    var accountBillingContacts = account.getAccountContactsWithRole( typekey.AccountContactRole.TC_BILLINGCONTACT)
    for(b in accountBillingContacts){
      if(insuredContactID == b.Contact.ID){
        this.InsuredIsBilling = true
      }else{
        var PCContactInfo = new PCContactInfo()
        PCContactInfo.sync( b.Contact )
        billingContacts.add( PCContactInfo )
      }
    }
    if(this.InsuredIsBilling == null) {
      this.InsuredIsBilling = false
    }
    billingContacts.each(\ p -> {
      var element = new PCAccountInfo_BillingContacts()
      element.$TypeInstance = p
      this.BillingContacts.add(element)
    })
  }
}
