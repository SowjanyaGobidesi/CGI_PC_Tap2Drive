package gw.lob.hop.financials

@Export
class HOPDwellingCovCostMethodsImpl extends GenericHOPCostMethodsImpl<HOPDwellingCovCost> {
  construct(owner : HOPDwellingCovCost) {
    super(owner)
  }

  override property get Coverage() : Coverage {
    return _owner.HOPDwellingCov
  }

  override property get OwningCoverable() : entity.HOPDwelling {
    return _owner.HOPDwellingCov.HOPDwelling
  }

  override property get Jurisdiction() : Jurisdiction {
    return _owner.Branch.BaseState
  }
}
