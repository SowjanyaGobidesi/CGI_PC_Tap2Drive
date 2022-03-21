package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "PACost.eti;PACost.eix;PACost.etx")
enhancement GWPACostEntityEnhancement : entity.PACost {
  property get Coverage () : entity.Coverage {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.pa.financials.PACostMethods") as gw.lob.pa.financials.PACostMethods).Coverage
  }
  
  property get OwningCoverable () : entity.Coverable {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.pa.financials.PACostMethods") as gw.lob.pa.financials.PACostMethods).OwningCoverable
  }
  
  property get Vehicle () : entity.PersonalVehicle {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.lob.pa.financials.PACostMethods") as gw.lob.pa.financials.PACostMethods).Vehicle
  }
  
  
}