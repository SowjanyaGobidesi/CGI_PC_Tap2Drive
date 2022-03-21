package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement WorkersCompLineExclusionEnhancement : entity.WorkersCompLine {
  property get WCWorkCompExMedExcl () : productmodel.WCWorkCompExMedExcl {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCWorkCompExMedExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.WCWorkCompExMedExcl
  }
  
  property get WCWorkCompExMedExclExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("WCWorkCompExMedExcl") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}