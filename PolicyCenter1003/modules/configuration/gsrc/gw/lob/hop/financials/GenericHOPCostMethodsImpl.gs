package gw.lob.hop.financials

@Export
class GenericHOPCostMethodsImpl<T extends HOPCost> implements HOPCostMethods {
  protected var _owner: T as readonly Cost

  construct(owner: T) {
    _owner = owner
  }

  override property get Coverage(): Coverage {
    return null
  }

  override property get OwningCoverable(): Coverable {
    return null
  }

  override property get Jurisdiction(): Jurisdiction {
    return null
  }

}
