package gw.api.databuilder.wc
uses gw.api.databuilder.DataBuilder
uses java.math.BigDecimal

@Export
class ParticipatingPlanBuilder extends DataBuilder<WCParticipatingPlan, ParticipatingPlanBuilder> {

  construct() {
    super(WCParticipatingPlan)
    withPlanID(TC_1YSTD)
    withRetentionAmount(1)
    withLossConversionFactor(2)
  }
  
  final function withPlanID(id : WCParticipatingPlanID) : ParticipatingPlanBuilder {
    set(WCParticipatingPlan.Type.TypeInfo.getProperty("PlanID"), id)
    return this
  }

  final function withRetentionAmount(amount : BigDecimal) : ParticipatingPlanBuilder {
    set(WCParticipatingPlan.Type.TypeInfo.getProperty("Retention"), amount)
    return this
  }    
  
  final function withLossConversionFactor(factor : BigDecimal) : ParticipatingPlanBuilder {
    set(WCParticipatingPlan.Type.TypeInfo.getProperty("LossConversionFactor"), factor)
    return this
  }  
}
