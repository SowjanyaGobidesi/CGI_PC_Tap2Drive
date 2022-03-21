package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement HOPLineConditionEnhancement : entity.HOPLine {
  property get HOPAddlResidenceRentedToOthers () : productmodel.HOPAddlResidenceRentedToOthers {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zfqj66u8ieogne2rpukobappaca") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPAddlResidenceRentedToOthers
  }
  
  property get HOPAddlResidenceRentedToOthersExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zfqj66u8ieogne2rpukobappaca") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPFireDeptSub () : productmodel.HOPFireDeptSub {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("z1jg2crrqf62jansntd859612e9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPFireDeptSub
  }
  
  property get HOPFireDeptSubExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("z1jg2crrqf62jansntd859612e9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPOtherMembersOfHousehold () : productmodel.HOPOtherMembersOfHousehold {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zbtjeorlj3icresdsmqolgac40b") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPOtherMembersOfHousehold
  }
  
  property get HOPOtherMembersOfHouseholdExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zbtjeorlj3icresdsmqolgac40b") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPSpecialLimitations () : productmodel.HOPSpecialLimitations {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ztsg0okd8lvaha25n1nr1cmt9n9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPSpecialLimitations
  }
  
  property get HOPSpecialLimitationsExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("ztsg0okd8lvaha25n1nr1cmt9n9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPTrust () : productmodel.HOPTrust {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zn2jq51fencbp7a30cd7hqkjno8") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPTrust
  }
  
  property get HOPTrustExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zn2jq51fencbp7a30cd7hqkjno8") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}