package gw.lob.cp.financials

@Export
class CPStateTaxCostMethodsImpl extends GenericCPCostMethodsImpl<CPStateTaxCost>
{
  construct(owner : CPStateTaxCost) {
    super(owner)
  }
  
  override property get State() : Jurisdiction {
    return Cost.TaxState
  }
}
