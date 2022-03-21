package gw.lob.pa.mvr

uses gw.api.name.NameOwnerFieldId
uses gw.api.name.PersonNameFields
uses gw.api.name.ContactNameFields
uses gw.api.name.ContactNameOwner
uses java.util.*

@Export
class MVRDriverNameOwner extends ContactNameOwner{

  construct(fields : ContactNameFields) {
    super(fields)
  }

  construct (fields : PersonNameFields) {
    super(fields)
  }

  override property get RequiredFields() : Set<NameOwnerFieldId> {
    return new HashSet<NameOwnerFieldId>(){ }.freeze()
  }

  override property get HiddenFields() : Set<NameOwnerFieldId> {
    return new HashSet<NameOwnerFieldId>(){NameOwnerFieldId.PREFIX, NameOwnerFieldId.SUFFIX}.freeze()
  }
}