package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "BACost.eti;BACost.eix;BACost.etx")
enhancement GWBACostEntityEnhancement : entity.BACost {
  property get Coverage () : entity.Coverage {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.ba.financials.BACostMethods") as gw.lob.ba.financials.BACostMethods).Coverage
  }
  
  property get OwningCoverable () : entity.Coverable {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.ba.financials.BACostMethods") as gw.lob.ba.financials.BACostMethods).OwningCoverable
  }
  
  property get State () : typekey.Jurisdiction {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.ba.financials.BACostMethods") as gw.lob.ba.financials.BACostMethods).State
  }
  
  property get Vehicle () : entity.BusinessVehicle {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.ba.financials.BACostMethods") as gw.lob.ba.financials.BACostMethods).Vehicle
  }
  
  
}