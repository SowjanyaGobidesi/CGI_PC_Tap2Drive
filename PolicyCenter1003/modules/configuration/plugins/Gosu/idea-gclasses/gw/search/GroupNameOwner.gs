package gw.search

uses gw.api.locale.DisplayKey
uses gw.api.name.ContactNameFields
uses gw.api.name.ContactNameOwner
uses gw.api.name.NameOwnerFieldId
uses gw.api.name.PersonNameFields

uses java.util.*

@Export
class GroupNameOwner extends ContactNameOwner{

  construct(fields : ContactNameFields) {
    super(fields)
  }

  override property get RequiredFields() : Set<NameOwnerFieldId> {
    return new HashSet<NameOwnerFieldId>(){ }.freeze()
  }

  override property get HiddenFields() : Set<NameOwnerFieldId> {
    return new HashSet<NameOwnerFieldId>() {NameOwnerFieldId.PREFIX, NameOwnerFieldId.SUFFIX, NameOwnerFieldId.MIDDLENAME}.freeze()
  }

  override property get ContactNamePhoneticLabel() : String {
    return DisplayKey.get("Web.Admin.GroupSearch.NamePhonetic")
  }

  override property get ContactNameLabel() : String {
    return DisplayKey.get("Web.Admin.GroupSearch.Name")
  }

  override property get ShowNameSummary(): boolean {
    return false
  }
}