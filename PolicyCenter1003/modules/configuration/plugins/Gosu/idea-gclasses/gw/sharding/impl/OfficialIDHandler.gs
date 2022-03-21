package gw.sharding.impl

uses gw.api.database.Query
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.beantransfer.impl.BeanImportGraph
uses gw.sharding.XmlAccountBeanImportHandler
uses org.w3c.dom.Document

/**
 * Processes {@link OfficialID} during bean import.
 *
 * If the uniqueness constraints for {@link OfficialIDType} on {@link Contact#getOfficialIDs} are updated, then
 * {@link #handlePostImport} and {@link #UNIQUE_OFFICIAL_ID_TYPES} should be updated accordingly.
 */
@Export
class OfficialIDHandler extends XmlAccountBeanImportHandler {

  static final var UNIQUE_OFFICIAL_ID_TYPES : Set<OfficialIDType> = {OfficialIDType.TC_SSN, OfficialIDType.TC_FEIN}

  construct(importGraph : BeanImportGraph, additionalInfo : Document) {
    super(importGraph, additionalInfo)
  }

  /**
   * Per the constraints for OfficialIDTypes in {@link gw.api.contact.PCContactLifecycle#verifyOfficialIDsAndSyncTaxID},
   * if an OfficialID of either type SSN or FEIN exists on a Contact, then another OfficalID of type SSN or FEIN cannot
   * be added to that Contact. In that case we retain the OfficialID already in this system and do not import the new
   * one.
   *
   * If the constraints for OfficialIDTypes are changed, this method should be updated to match them.
   */
  function handlePostImport(info : Set<RootInfo>) {
    var officialIDs = extractImportedBeansFromRootBundle(OfficialID, info, true)
    for (officialID in officialIDs) {
      if (UNIQUE_OFFICIAL_ID_TYPES.contains(officialID.OfficialIDType)
          and contactHasAnExistingUniqueOfficialID(officialID.Contact)) {
        officialID.Bundle.delete(officialID)
      }
    }
  }

  private function contactHasAnExistingUniqueOfficialID(contact : Contact) : boolean {
    if(contact.isNew()) {
      return false
    }

    var existingUniqueOfficialIDs = Query.make(OfficialID)
        .compareIn(OfficialID#OfficialIDType, UNIQUE_OFFICIAL_ID_TYPES.toTypedArray())
        .join(OfficialID#Contact)
        .compare(Contact#ID, Relop.Equals, contact.ID)
        .select()

    return existingUniqueOfficialIDs.HasElements
  }

}