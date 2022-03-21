package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement BOPLocationCoverageEnhancement : entity.BOPLocation {
  property get BOPBurgRobCov () : productmodel.BOPBurgRobCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPBurgRobCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPBurgRobCov
  }
  
  property get BOPBurgRobCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPBurgRobCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPLocWindHailCov () : productmodel.BOPLocWindHailCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPLocWindHailCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPLocWindHailCov
  }
  
  property get BOPLocWindHailCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPLocWindHailCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPMoneySecCov () : productmodel.BOPMoneySecCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPMoneySecCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPMoneySecCov
  }
  
  property get BOPMoneySecCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPMoneySecCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPOutSignCov () : productmodel.BOPOutSignCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPOutSignCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPOutSignCov
  }
  
  property get BOPOutSignCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPOutSignCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPOutdoorProp () : productmodel.BOPOutdoorProp {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPOutdoorProp") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPOutdoorProp
  }
  
  property get BOPOutdoorPropExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPOutdoorProp") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPOverflowCov () : productmodel.BOPOverflowCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPOverflowCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPOverflowCov
  }
  
  property get BOPOverflowCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPOverflowCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPPersPropOffPrem () : productmodel.BOPPersPropOffPrem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPPersPropOffPrem") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPPersPropOffPrem
  }
  
  property get BOPPersPropOffPremExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPPersPropOffPrem") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPPersonalEffects () : productmodel.BOPPersonalEffects {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPPersonalEffects") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPPersonalEffects
  }
  
  property get BOPPersonalEffectsExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPPersonalEffects") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPSpoilageCov () : productmodel.BOPSpoilageCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPSpoilageCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPSpoilageCov
  }
  
  property get BOPSpoilageCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPSpoilageCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get BOPY2KIncomeExpenseCov () : productmodel.BOPY2KIncomeExpenseCov {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPY2KIncomeExpenseCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.BOPY2KIncomeExpenseCov
  }
  
  property get BOPY2KIncomeExpenseCovExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("BOPY2KIncomeExpenseCov") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}