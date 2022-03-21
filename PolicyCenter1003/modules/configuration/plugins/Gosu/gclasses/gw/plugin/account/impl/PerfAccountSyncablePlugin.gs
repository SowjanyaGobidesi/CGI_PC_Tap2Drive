package gw.plugin.account.impl
uses gw.api.domain.account.AccountSyncable

@Export
class PerfAccountSyncablePlugin extends AccountSyncablePlugin {

  override function refreshAccountInformation(accountSyncable: AccountSyncable) {
    //don't do anything during datagen, this should be unnecessary
  }


}
