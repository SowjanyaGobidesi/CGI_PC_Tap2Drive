package gw.personaldata.obfuscation

uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.util.PCDeleteBuilder
uses gw.pl.persistence.core.Bean
uses gw.pl.persistence.core.Bundle
uses gw.transaction.AbstractBundleTransactionCallback

/**
 * Performs the deletion of addresses, linked addresses, and official IDs after data has been
 * written to the database, but before the transaction is committed.
 */

@Export
class UserContactObfuscatorBundleTransactionCallback extends AbstractBundleTransactionCallback {

  private var _addressesToDelete : Collection<Address>
  private var _linkedAddressesToDelete : Collection<LinkedAddress>
  private var _officialIDsToDelete : Collection<OfficialID>

  construct(addressesToDelete : Collection<Address>, linkedAddressesToDelete : Collection<LinkedAddress>,
            officialIDsToDelete : Collection<OfficialID>) {
    _addressesToDelete = addressesToDelete
    _linkedAddressesToDelete = linkedAddressesToDelete
    _officialIDsToDelete = officialIDsToDelete
  }

  override function afterWriteToDatabase(bundle: Bundle) {
    super.afterWriteToDatabase(bundle);
    deleteBeans(Address, _addressesToDelete)
    deleteBeans(LinkedAddress, _linkedAddressesToDelete)
    deleteBeans(OfficialID, _officialIDsToDelete)
  }

  private function deleteBeans<T extends Retireable>(type: Type<Bean>, beans: Collection<T>) {
    if (beans == null or beans.Empty) {
      return
    }

    var query = Query.make(type)
    query.compare(Retireable.RETIRED_DYNPROP.get(type), Relop.NotEquals, 0L)
    query.compareIn(Retireable.ID_DYNPROP.get(type), beans)
    query.withFindRetired(true)
    PCDeleteBuilder.executeDelete(query)
  }
}