package gw.policy

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement PolicyPeriodLineEnhancement : entity.PolicyPeriod {
  property get BOPLine () : productmodel.BOPLine {
    return this.getLine(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("BOPLine")) as productmodel.BOPLine
  }
  
  property get BOPLineExists () : boolean {
    return this.getLineExists(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("BOPLine"))
  }
  
  property get BusinessAutoLine () : productmodel.BusinessAutoLine {
    return this.getLine(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("BusinessAutoLine")) as productmodel.BusinessAutoLine
  }
  
  property get BusinessAutoLineExists () : boolean {
    return this.getLineExists(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("BusinessAutoLine"))
  }
  
  property get CPLine () : productmodel.CPLine {
    return this.getLine(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("CPLine")) as productmodel.CPLine
  }
  
  property get CPLineExists () : boolean {
    return this.getLineExists(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("CPLine"))
  }
  
  property get GLLine () : productmodel.GLLine {
    return this.getLine(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("GLLine")) as productmodel.GLLine
  }
  
  property get GLLineExists () : boolean {
    return this.getLineExists(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("GLLine"))
  }
  
  property get HOPLine () : productmodel.HOPLine {
    return this.getLine(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("HOPLine")) as productmodel.HOPLine
  }
  
  property get HOPLineExists () : boolean {
    return this.getLineExists(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("HOPLine"))
  }
  
  property get IMLine () : productmodel.IMLine {
    return this.getLine(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("IMLine")) as productmodel.IMLine
  }
  
  property get IMLineExists () : boolean {
    return this.getLineExists(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("IMLine"))
  }
  
  property get PersonalAutoLine () : productmodel.PersonalAutoLine {
    return this.getLine(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("PersonalAutoLine")) as productmodel.PersonalAutoLine
  }
  
  property get PersonalAutoLineExists () : boolean {
    return this.getLineExists(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("PersonalAutoLine"))
  }
  
  property get WorkersCompLine () : productmodel.WorkersCompLine {
    return this.getLine(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("WorkersCompLine")) as productmodel.WorkersCompLine
  }
  
  property get WorkersCompLineExists () : boolean {
    return this.getLineExists(gw.api.productmodel.PolicyLinePatternLookup.getByPublicID("WorkersCompLine"))
  }
  
  
}