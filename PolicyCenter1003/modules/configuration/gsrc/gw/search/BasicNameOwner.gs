package gw.search

uses gw.api.locale.DisplayKey
uses gw.api.name.ContactNameOwner
uses gw.api.name.NameOwnerFieldId
uses java.util.Set
uses gw.api.name.ContactNameFields
uses java.util.HashSet

@Export
class BasicNameOwner extends ContactNameOwner{

  construct(fields : ContactNameFields) {
    super(fields)
  }

  override property get RequiredFields() : Set<NameOwnerFieldId> {
    return new HashSet<NameOwnerFieldId>(){ }.freeze()
  }

  override property get HiddenFields() : Set<NameOwnerFieldId> {
    return new HashSet<NameOwnerFieldId>(){NameOwnerFieldId.PREFIX, NameOwnerFieldId.SUFFIX, NameOwnerFieldId.MIDDLENAME, NameOwnerFieldId.PARTICLE}
        .freeze()
  }

  override property get ContactNamePhoneticLabel() : String {
    return DisplayKey.get("Web.ContactDetail.Company.CompanyNamePhonetic")
  }

  override property get ContactNameLabel() : String {
    return DisplayKey.get("Web.ContactDetail.Company.CompanyName")
  }

  override property get ShowNameSummary() : boolean {
    return false
  }
}