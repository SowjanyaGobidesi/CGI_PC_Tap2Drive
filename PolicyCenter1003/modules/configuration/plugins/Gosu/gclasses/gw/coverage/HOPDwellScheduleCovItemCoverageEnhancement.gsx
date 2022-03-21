package gw.coverage

@javax.annotation.Generated("", "", "com.guidewire.pc.productmodel.codegen.ProductModelCodegen")
enhancement HOPDwellScheduleCovItemCoverageEnhancement : entity.HOPDwellScheduleCovItem {
  property get HOPGolfCartItem () : productmodel.HOPGolfCartItem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zdogeskkpv01dc9p8upk23dne09") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPGolfCartItem
  }
  
  property get HOPGolfCartItemExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zdogeskkpv01dc9p8upk23dne09") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPIncLimitOtherStructuresItem () : productmodel.HOPIncLimitOtherStructuresItem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("z1fhulh3d21qr4o5ktk2e54ndpb") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPIncLimitOtherStructuresItem
  }
  
  property get HOPIncLimitOtherStructuresItemExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("z1fhulh3d21qr4o5ktk2e54ndpb") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPIncLimitPersPropertyAtOtherResidencesItem () : productmodel.HOPIncLimitPersPropertyAtOtherResidencesItem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zm8igrhpt3bfg2lvdnl5lf0iat9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPIncLimitPersPropertyAtOtherResidencesItem
  }
  
  property get HOPIncLimitPersPropertyAtOtherResidencesItemExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zm8igrhpt3bfg2lvdnl5lf0iat9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPPermittedIncidentalOccupanciesItem () : productmodel.HOPPermittedIncidentalOccupanciesItem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zrrhqcqhj768sfnjh0uoas3n5d9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPPermittedIncidentalOccupanciesItem
  }
  
  property get HOPPermittedIncidentalOccupanciesItemExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zrrhqcqhj768sfnjh0uoas3n5d9") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPScheduledLandlordsFurnishingItem () : productmodel.HOPScheduledLandlordsFurnishingItem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zo5h0mvsjli2d8gp47cpa3appfb") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPScheduledLandlordsFurnishingItem
  }
  
  property get HOPScheduledLandlordsFurnishingItemExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zo5h0mvsjli2d8gp47cpa3appfb") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPSpecificStructsAwayFromResidenceItem () : productmodel.HOPSpecificStructsAwayFromResidenceItem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zh5j85vgpge8n6saji15tsonl8b") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPSpecificStructsAwayFromResidenceItem
  }
  
  property get HOPSpecificStructsAwayFromResidenceItemExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zh5j85vgpge8n6saji15tsonl8b") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  property get HOPStructuresRentedToOthersResidencePremisesItem () : productmodel.HOPStructuresRentedToOthersResidencePremisesItem {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zcgjavp5vcr21558v9bucnfqj0b") as com.guidewire.pc.api.productmodel.ClausePatternInternal).getClause(this) as productmodel.HOPStructuresRentedToOthersResidencePremisesItem
  }
  
  property get HOPStructuresRentedToOthersResidencePremisesItemExists () : boolean {
    return (gw.api.productmodel.ClausePatternLookup.getByPublicID("zcgjavp5vcr21558v9bucnfqj0b") as com.guidewire.pc.api.productmodel.ClausePatternInternal).hasClause(this)
  }
  
  
}