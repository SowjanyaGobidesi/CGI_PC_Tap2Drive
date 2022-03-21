package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "PolicyLine.eti;PolicyLine.eix;PolicyLine.etx")
enhancement GWPolicyLineEntityEnhancement : entity.PolicyLine {
  function bindAutoNumberSequences () : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).bindAutoNumberSequences()
  }
  
  function calculateTotalInsuredValue (coverages :  java.util.List<entity.Coverage>) : gw.pl.currency.MonetaryAmount {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).calculateTotalInsuredValue(coverages)
  }
  
  function calculateTotalInsuredValue (coverages :  java.util.List<entity.Coverage>, currency :  typekey.Currency) : gw.pl.currency.MonetaryAmount {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).calculateTotalInsuredValue(coverages, currency)
  }
  
  function canDateSliceOnPropertyChange (bean :  entity.KeyableBean) : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).canDateSliceOnPropertyChange(bean)
  }
  
  function cloneAutoNumberSequences () : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).cloneAutoNumberSequences()
  }
  
  function createPolicyLineDiffHelper (reason :  typekey.DiffReason, policyLine :  entity.PolicyLine) : gw.plugin.diff.impl.DiffHelper {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).createPolicyLineDiffHelper(reason, policyLine)
  }
  
  function createPolicyLineValidation (validationContext :  gw.validation.PCValidationContext) : gw.policy.PolicyLineValidation {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).createPolicyLineValidation(validationContext)
  }
  
  function createRatingEngine (method :  typekey.RateMethod, parameters :  java.util.Map<typekey.RateEngineParameter, java.lang.Object>) : gw.rating.AbstractRatingEngine {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).createRatingEngine(method, parameters)
  }
  
  function createSegmentEvaluator (policyPeriod :  entity.PolicyPeriod) : gw.lob.common.SegmentEvaluator {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).createSegmentEvaluator(policyPeriod)
  }
  
  function createUnderwriterEvaluator (context :  gw.policy.PolicyEvalContext) : gw.lob.common.UnderwriterEvaluator {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).createUnderwriterEvaluator(context)
  }
  
  function getAllCostsForCoverage (covered :  entity.Coverable, covPat :  gw.api.productmodel.CoveragePattern) : java.util.List<entity.Cost> {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).getAllCostsForCoverage(covered, covPat)
  }
  
  function getQuoteRatingStyle (qType :  typekey.QuoteType) : typekey.RatingStyle {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).getQuoteRatingStyle(qType)
  }
  
  function getQuoteValidationLevel (qType :  typekey.QuoteType) : typekey.ValidationLevel {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).getQuoteValidationLevel(qType)
  }
  
  function getWorksheetRootNode (showConditionals :  boolean) : gw.api.tree.RowTreeRootNode {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).getWorksheetRootNode(showConditionals)
  }
  
  function isCostVisible (covered :  entity.Coverable, covPat :  gw.api.productmodel.CoveragePattern) : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).isCostVisible(covered, covPat)
  }
  
  function onBeginIssueJob () : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).onBeginIssueJob()
  }
  
  function onIssuanceBeginEditing () : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).onIssuanceBeginEditing()
  }
  
  function onRenewalInitialize () : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).onRenewalInitialize()
  }
  
  function onSubmissionBeginEditing () : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).onSubmissionBeginEditing()
  }
  
  function prePeriodStartChanged (newDate :  java.util.Date) : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).prePeriodStartChanged(newDate)
  }
  
  function renumberAutoNumberSequences () : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).renumberAutoNumberSequences()
  }
  
  function resetAutoNumberSequences () : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).resetAutoNumberSequences()
  }
  
  function shouldQuoteAsynchronously () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).shouldQuoteAsynchronously()
  }
  
  function validateLocations (location :  entity.PolicyLocation) : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).validateLocations(location)
  }
  
  function validateSubmissionWizardPolicyInfo (period :  entity.PolicyPeriod) : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).validateSubmissionWizardPolicyInfo(period)
  }
  
  property get AdditionalDaysInAnnualTerm () : int {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).AdditionalDaysInAnnualTerm
  }
  
  property get AllModifiables () : entity.Modifiable[] {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).AllModifiables
  }
  
  property get AllSchedules () : gw.api.domain.Schedule[] {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).AllSchedules
  }
  
  property get AllowsPremiumAudit () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).AllowsPremiumAudit
  }
  
  property get Auditable () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).Auditable
  }
  
  property get BaseStateRequired () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).BaseStateRequired
  }
  
  property get ContainsBuildings () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).ContainsBuildings
  }
  
  property get Copier () : gw.api.copy.CompositeCopier<entity.PolicyPeriod, entity.PolicyLine> {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).Copier
  }
  
  property get EmergencyServiceFunding () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).EmergencyServiceFunding
  }
  
  property get PolicyLocationCanBeRemovedWithoutRemovingAssociatedRisks () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).PolicyLocationCanBeRemovedWithoutRemovingAssociatedRisks
  }
  
  property get SideBySideBaseDataConfig () : gw.api.match.MatchableTreeTraverserConfig {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).SideBySideBaseDataConfig
  }
  
  property get SideBySideEnabled () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).SideBySideEnabled
  }
  
  property get SideBySideInitialConfig () : gw.job.sxs.SideBySideInitialConfig {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).SideBySideInitialConfig
  }
  
  property get SupportsNonSpecificLocations () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).SupportsNonSpecificLocations
  }
  
  property get SupportsRatingOverrides () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).SupportsRatingOverrides
  }
  
  property get TwoStepQuotingAvailable () : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).TwoStepQuotingAvailable
  }
  
  property get TypesToNotDateSliceOnApplyDiff () : java.util.Set<gw.entity.IEntityType> {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.api.policy.PolicyLineMethods") as gw.api.policy.PolicyLineMethods).TypesToNotDateSliceOnApplyDiff
  }
  
  
}