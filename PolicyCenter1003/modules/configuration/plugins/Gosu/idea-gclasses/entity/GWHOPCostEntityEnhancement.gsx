package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "HOPCost.eti;HOPCost.eix;HOPCost.etx")
enhancement GWHOPCostEntityEnhancement : entity.HOPCost {
  property get Coverage () : entity.Coverage {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.hop.financials.HOPCostMethods") as gw.lob.hop.financials.HOPCostMethods).Coverage
  }
  
  property get Jurisdiction () : typekey.Jurisdiction {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.hop.financials.HOPCostMethods") as gw.lob.hop.financials.HOPCostMethods).Jurisdiction
  }
  
  property get OwningCoverable () : entity.Coverable {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.hop.financials.HOPCostMethods") as gw.lob.hop.financials.HOPCostMethods).OwningCoverable
  }
  
  
}