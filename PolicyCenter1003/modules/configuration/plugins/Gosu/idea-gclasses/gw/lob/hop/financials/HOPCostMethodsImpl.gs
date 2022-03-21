package gw.lob.hop.financials

@Export
class HOPCostMethodsImpl extends GenericHOPCostMethodsImpl<HOPCost> {
  construct(owner: HOPCost) {
    super(owner)
  }

  override property get Jurisdiction(): Jurisdiction {
    return _owner.HOPLine.Branch.BaseState
  }

}
