package gw.lob.gl.financials

@Export
class GLStateCostMethodsImpl extends GenericGLCostMethodsImpl<GLStateCost> {
  construct( owner : GLStateCost ) {
    super( owner )
  }

  override property get State() : Jurisdiction {
    return Cost.GLState
  }

  override property get DisplayOrder() : int {
    return Cost.StateCostType.Priority
  }
}
