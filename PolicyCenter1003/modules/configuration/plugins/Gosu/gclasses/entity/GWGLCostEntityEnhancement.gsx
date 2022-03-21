package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "GLCost.eti;GLCost.eix;GLCost.etx")
enhancement GWGLCostEntityEnhancement : entity.GLCost {
  property get Coverage () : entity.Coverage {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.gl.financials.GLCostMethods") as gw.lob.gl.financials.GLCostMethods).Coverage
  }
  
  property get DisplayOrder () : int {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.gl.financials.GLCostMethods") as gw.lob.gl.financials.GLCostMethods).DisplayOrder
  }
  
  property get Location () : entity.PolicyLocation {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.gl.financials.GLCostMethods") as gw.lob.gl.financials.GLCostMethods).Location
  }
  
  property get OwningCoverable () : entity.Coverable {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.gl.financials.GLCostMethods") as gw.lob.gl.financials.GLCostMethods).OwningCoverable
  }
  
  property get State () : typekey.Jurisdiction {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.gl.financials.GLCostMethods") as gw.lob.gl.financials.GLCostMethods).State
  }
  
  
}