package gw.bizrules.provisioning.contexts

uses entity.IMAccountsReceivable

@Export
class InlandMarineAccountsReceivableIterativeUWContextDefinition extends InlandMarineUWContextDefinition {
  public static final var PARAM_ACCOUNTSRECEIVABLE: String = "imAccountsReceivable"

  construct() {
    addIterativeSymbol(PARAM_ACCOUNTSRECEIVABLE, IMAccountsReceivable, \ec -> {
      return ec.Period.IMLine.IMAccountsRecPart != null ? ec.Period.IMLine.IMAccountsRecPart.IMAccountsReceivables : {}
    })
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_IMPOLICYACCOUNTSRECEIVABLEITERATIVE
  }
}