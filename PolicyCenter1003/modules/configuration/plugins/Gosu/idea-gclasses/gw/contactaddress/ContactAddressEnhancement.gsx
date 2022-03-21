package gw.contactaddress

enhancement ContactAddressEnhancement : ContactAddress {

  /**
   * @return true if this ContactAddress is not linked to any external address book
   */
  property get IsLocalOnly() : boolean {
    return this.AddressBookUID == null
  }

  property get NeedsNewExternalID() : boolean {
    return IsLocalOnly
  }
}
