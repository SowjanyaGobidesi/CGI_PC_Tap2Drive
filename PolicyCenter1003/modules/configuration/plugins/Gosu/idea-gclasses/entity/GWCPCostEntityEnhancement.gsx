package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "CPCost.eti;CPCost.eix;CPCost.etx")
enhancement GWCPCostEntityEnhancement : entity.CPCost {
  property get Building () : entity.CPBuilding {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.cp.financials.CPCostMethods") as gw.lob.cp.financials.CPCostMethods).Building
  }
  
  property get Coverage () : entity.Coverage {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.cp.financials.CPCostMethods") as gw.lob.cp.financials.CPCostMethods).Coverage
  }
  
  property get Location () : entity.CPLocation {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.cp.financials.CPCostMethods") as gw.lob.cp.financials.CPCostMethods).Location
  }
  
  property get OwningCoverable () : entity.Coverable {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.cp.financials.CPCostMethods") as gw.lob.cp.financials.CPCostMethods).OwningCoverable
  }
  
  property get State () : typekey.Jurisdiction {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.cp.financials.CPCostMethods") as gw.lob.cp.financials.CPCostMethods).State
  }
  
  
}