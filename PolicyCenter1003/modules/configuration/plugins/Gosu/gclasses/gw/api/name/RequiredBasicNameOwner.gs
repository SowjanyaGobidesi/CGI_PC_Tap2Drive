package gw.api.name

uses gw.search.BasicNameOwner
uses java.util.Set
uses java.util.HashSet

@Export
class RequiredBasicNameOwner extends BasicNameOwner {

  construct(fields : ContactNameFields) {
    super(fields)
  }

  override property get RequiredFields() : Set<NameOwnerFieldId> {
    return NameOwnerFieldId.FIRST_LAST_FIELDS
  }

  override property get HiddenFields() : Set<NameOwnerFieldId> {
    return new HashSet<NameOwnerFieldId>() {NameOwnerFieldId.PREFIX, NameOwnerFieldId.SUFFIX, NameOwnerFieldId.MIDDLENAME}.freeze()
  }
}