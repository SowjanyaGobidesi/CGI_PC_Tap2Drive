package gw.plugin.sharding

uses gw.entity.IEntityType
uses gw.pl.util.ArgCheck

@Export
class PCAccountTransferPlugin implements AccountTransferPlugin {

  override function additionalCustomerAccountRelationships(sourceAccount : Account) : Set<Account> {
    ArgCheck.nonNull(sourceAccount, "Source account")
    return {}
  }

  override function maxAllowedNumberOfAccountsToBeFrozen(account : Account) : int {
    return 4
  }

  override function contactRelatedEntityTypesToCopy() : Set<IEntityType> {
    return {
        Contact,
        Address, // Address also includes LinkedAddress for account transfer
        ContactTag,
        ContactAddress,
        ContactCategoryScore,
        OfficialID,
        ContactFingerprint,
        PendingAddressUpdate,
        AddressCorrection,
        AddressReplacement,
        PendingContactUpdate,
        // Adding Activity and History to this list will transfer Account related
        // Contact's activity and history data during account transfer.
        // However, any History or Activity attached to an Account gets
        // automatically transferred.
        Activity,
        History
    }
  }
}