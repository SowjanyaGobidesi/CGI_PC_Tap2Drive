package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "WCCost.eti;WCCost.eix;WCCost.etx")
enhancement GWWCCostEntityEnhancement : entity.WCCost {
  property get ClassCode () : java.lang.String {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.wc.financials.WCCostMethods") as gw.lob.wc.financials.WCCostMethods).ClassCode
  }
  
  property get Description () : java.lang.String {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.wc.financials.WCCostMethods") as gw.lob.wc.financials.WCCostMethods).Description
  }
  
  property get JurisdictionState () : typekey.Jurisdiction {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.wc.financials.WCCostMethods") as gw.lob.wc.financials.WCCostMethods).JurisdictionState
  }
  
  property get LocationNum () : java.lang.Integer {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.wc.financials.WCCostMethods") as gw.lob.wc.financials.WCCostMethods).LocationNum
  }
  
  property get OwningCoverable () : entity.Coverable {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.wc.financials.WCCostMethods") as gw.lob.wc.financials.WCCostMethods).OwningCoverable
  }
  
  
}