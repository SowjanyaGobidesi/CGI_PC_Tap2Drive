package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "BOPCost.eti;BOPCost.eix;BOPCost.etx")
enhancement GWBOPCostEntityEnhancement : entity.BOPCost {
  property get Building () : entity.BOPBuilding {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.bop.financials.BOPCostMethods") as gw.lob.bop.financials.BOPCostMethods).Building
  }
  
  property get Coverage () : entity.Coverage {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.bop.financials.BOPCostMethods") as gw.lob.bop.financials.BOPCostMethods).Coverage
  }
  
  property get Location () : entity.BOPLocation {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.bop.financials.BOPCostMethods") as gw.lob.bop.financials.BOPCostMethods).Location
  }
  
  property get OwningCoverable () : entity.Coverable {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.bop.financials.BOPCostMethods") as gw.lob.bop.financials.BOPCostMethods).OwningCoverable
  }
  
  property get State () : typekey.Jurisdiction {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.bop.financials.BOPCostMethods") as gw.lob.bop.financials.BOPCostMethods).State
  }
  
  
}