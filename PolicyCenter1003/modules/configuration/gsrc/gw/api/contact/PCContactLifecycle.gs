package gw.api.contact
uses gw.api.locale.DisplayKey
uses java.lang.IllegalArgumentException
uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.api.util.ExternalIDUtil
uses gw.api.util.PCSequenceUtilKeyRegistry

uses java.util.HashSet
uses java.util.Set

@Export
class PCContactLifecycle extends ContactLifecycleImpl {

  private var _contact : Contact
  
  construct(contact : Contact) {
    super(contact)
    _contact = contact
  }

  override function handleInitNew() {
    _contact.TagTypes = {ContactTagType.TC_CLIENT}
  }

  override function handleBeforeInsert() {
    _contact.mintContactExternalIDIfNecessary()
    _contact.mintPrimaryAddressExternalIDIfNecessary()
    beforeCommit()
  }

  override function handleBeforeUpdate() {
    _contact.mintPrimaryAddressExternalIDIfNecessary()
    beforeCommit()
  }
  private function beforeCommit() {
    verifyOfficialIDsAndSyncTaxID()
    ensureClientTagTypeOnContact()
    updatePolicyPeriodContactDenorms()
  }

  private function updatePolicyPeriodContactDenorms() {
    var orginalContactVersion = _contact.OriginalVersion as Contact
    if (orginalContactVersion.DisplayName != _contact.DisplayName) {      
      var bundle = _contact.Bundle
      for (period in PeriodsReferencingContactFromDBAndBundle) {
        if (!bundle.equals(period.getBundle())) {
          period = bundle.loadBean(period.ID) as PolicyPeriod
        }
        if (period.Archived) {
          period.updateContactDenormsWhenArchived(_contact)
        } else {
          period.updateContactDenorms()
        }
      }
    }
  }
  
  private property get PeriodsReferencingContactFromDBAndBundle() : Set<PolicyPeriod> {
      var periods = new HashSet<PolicyPeriod>()

      if (not _contact.ID.Temporary) {
        for (period in PeriodsReferencingContactFromDB) {
          period = period.getSlice(period.PeriodEnd.addSeconds(-1))
          periods.add(period)
        }
      }

      var bundle = _contact.Bundle
      for (bean in bundle.UpdatedBeans) {
        if (bean typeis PolicyPeriod) {
          bean = bean.getSlice(bean.PeriodEnd.addSeconds(-1))            
          if (_contact.equals(bean.PrimaryNamedInsured.AccountContactRole.AccountContact.Contact)) {
            periods.add(bean)
          } else {
            periods.remove(bean)
          }
        }
      }

      for (bean in bundle.RemovedBeans) {
        if (bean typeis PolicyPeriod) {
          periods.remove(bean)
        }
      }
      return periods    
  }

  private property get PeriodsReferencingContactFromDB() : IQueryBeanResult<PolicyPeriod> {
    var query = Query.make(PolicyPeriod)
    query.compare(PolicyPeriod#PNIContactDenorm, Equals, _contact)
    return query.select()
  }
    
  function verifyOfficialIDsAndSyncTaxID() {
    var ssnOrFEIN = _contact.OfficialIDs.where(\ o -> o.OfficialIDType == OfficialIDType.TC_SSN or 
                                      o.OfficialIDType == OfficialIDType.TC_FEIN)
    if (ssnOrFEIN.length > 0) {
      if (ssnOrFEIN.length > 1) {
        throw new IllegalArgumentException(DisplayKey.get("Web.Policy.Contact.NoMoreThanOneSSNOrFEIN"))
      } 
      _contact.TaxID = ssnOrFEIN.single().OfficialIDValue
    }

    if (not _contact.TagTypes.contains(ContactTagType.TC_CLIENT)) {
      var tag = new ContactTag(_contact.Bundle)
      tag.Type = ContactTagType.TC_CLIENT
      _contact.addToTags(tag)
    }
  }

  private function ensureClientTagTypeOnContact() {
    if (not _contact.TagTypes.contains(ContactTagType.TC_CLIENT)) {
      var tag = new ContactTag(_contact.Bundle)
      tag.Type = ContactTagType.TC_CLIENT
      _contact.addToTags(tag)
    }
  }


}
