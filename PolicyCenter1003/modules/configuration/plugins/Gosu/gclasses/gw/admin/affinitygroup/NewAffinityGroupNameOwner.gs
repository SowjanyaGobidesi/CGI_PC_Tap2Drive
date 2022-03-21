package gw.admin.affinitygroup

uses gw.api.locale.DisplayKey
uses gw.api.name.ContactNameOwner
uses gw.api.name.ContactNameFields
uses java.util.Set
uses gw.api.name.NameOwnerFieldId
uses java.util.HashSet

@Export
class NewAffinityGroupNameOwner extends ContactNameOwner {

  construct(fields : ContactNameFields) {
    super(fields)
  }

  override property get RequiredFields() : Set<NameOwnerFieldId> {
    return new HashSet<NameOwnerFieldId> (){ NameOwnerFieldId.NP_NAME }.freeze()
  }

  override property get ContactNameLabel() : String {
    return DisplayKey.get("Web.Admin.AffinityGroupDetail.BasicsDV.GroupName")
  }

  override property get ContactNamePhoneticLabel() : String {
    return DisplayKey.get("Web.Admin.AffinityGroupDetail.BasicsDV.GroupNamePhonetic")
  }

  override property get ShowNameSummary(): boolean {
    return false
  }
}
