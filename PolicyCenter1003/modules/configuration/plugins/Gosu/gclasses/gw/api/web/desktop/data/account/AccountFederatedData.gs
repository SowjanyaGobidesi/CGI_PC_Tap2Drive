package gw.api.web.desktop.data.account

uses gw.api.iterator.IteratorBackingDataSorting
uses gw.api.web.desktop.data.FederatedDataIteratorBackingData

@Export
class AccountFederatedData extends FederatedDataIteratorBackingData<AccountDTO> {

  override function getEntries(startIndex : int, numEntries : int, sortings : List<IteratorBackingDataSorting>) : List<AccountDTO> {
    return Plugin.findAccounts(UserId, Filter, startIndex, numEntries, sortings) as List<AccountDTO>
  }

  override protected property get EntryCount() : int {
    return Plugin.getAccountCount(UserId, Filter)
  }
}