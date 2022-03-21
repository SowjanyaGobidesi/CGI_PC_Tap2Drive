package gw.admin.affinitygroup

uses gw.api.locale.DisplayKey
uses gw.api.name.ContactNameOwner
uses gw.api.name.NameOwnerFieldId
uses gw.api.name.PersonNameFields

uses java.util.*

@Export
class AffinityGroupContactOwner extends ContactNameOwner {

  construct (fields : PersonNameFields) {
    super(fields)
  }

  override property get FirstNameLabel() : String {
    return DisplayKey.get("Web.Admin.AffinityGroupDetail.BasicsDV.PrimaryContactFirstName")
  }

  override property get FirstNamePhoneticLabel() : String {
    return DisplayKey.get("Web.Admin.AffinityGroupDetail.BasicsDV.PrimaryContactPhoneticFirstName")
  }

  override property get LastNameLabel() : String {
    return DisplayKey.get("Web.Admin.AffinityGroupDetail.BasicsDV.PrimaryContactLastName")
  }

  override property get LastNamePhoneticLabel(): String {
    return DisplayKey.get("Web.Admin.AffinityGroupDetail.BasicsDV.PrimaryContactPhoneticLastName")
  }

  override property get RequiredFields() : Set<NameOwnerFieldId> {
    return new HashSet<NameOwnerFieldId>() { }.freeze()
  }

  override property get HiddenFields() : Set<NameOwnerFieldId> {
    return new HashSet<NameOwnerFieldId>() { NameOwnerFieldId.PREFIX, NameOwnerFieldId.SUFFIX,
        NameOwnerFieldId.MIDDLENAME, NameOwnerFieldId.PARTICLE }
        .freeze()
  }

  override property get ShowNameSummary() : boolean {
    return false
  }
 }