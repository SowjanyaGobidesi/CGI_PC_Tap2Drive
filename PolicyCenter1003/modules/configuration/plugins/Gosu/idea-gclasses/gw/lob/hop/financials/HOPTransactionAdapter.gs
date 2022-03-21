package gw.lob.hop.financials

uses gw.api.domain.financials.TransactionAdapter

@Export
class HOPTransactionAdapter implements TransactionAdapter {
  var _owner: HOPTransaction

  construct(owner: HOPTransaction) {
    _owner = owner
  }

  override property get Cost(): Cost {
    return _owner.HOPCost
  }

}
