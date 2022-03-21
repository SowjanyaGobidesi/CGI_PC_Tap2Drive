package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "IMCost.eti;IMCost.eix;IMCost.etx")
enhancement GWIMCostEntityEnhancement : entity.IMCost {
  property get Coverage () : entity.Coverage {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.im.financials.IMCostMethods") as gw.lob.im.financials.IMCostMethods).Coverage
  }
  
  property get Location () : entity.PolicyLocation {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.im.financials.IMCostMethods") as gw.lob.im.financials.IMCostMethods).Location
  }
  
  property get OwningCoverable () : entity.Coverable {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.im.financials.IMCostMethods") as gw.lob.im.financials.IMCostMethods).OwningCoverable
  }
  
  property get State () : typekey.Jurisdiction {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.im.financials.IMCostMethods") as gw.lob.im.financials.IMCostMethods).State
  }
  
  
}