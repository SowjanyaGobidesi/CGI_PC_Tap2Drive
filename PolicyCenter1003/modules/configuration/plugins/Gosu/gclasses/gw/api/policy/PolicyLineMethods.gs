package gw.api.policy

uses gw.api.copy.CompositeCopier
uses gw.pl.currency.MonetaryAmount
uses gw.api.match.MatchableTreeTraverserConfig
uses gw.api.productmodel.CoveragePattern
uses gw.entity.IEntityType
uses gw.job.sxs.SideBySideInitialConfig
uses gw.lob.common.SegmentEvaluator
uses gw.lob.common.UnderwriterEvaluator
uses gw.plugin.diff.impl.DiffHelper
uses gw.policy.PolicyLineValidation
uses gw.policy.PolicyEvalContext
uses gw.validation.PCValidationContext

uses gw.api.tree.RowTreeRootNode
uses gw.api.domain.Schedule
uses java.util.Date
uses java.util.Set
uses gw.rating.AbstractRatingEngine
uses java.util.Map
uses java.util.List

/**
 * This interface defines all the methods that can be overridden by subtypes of the PolicyLine class.  All
 * PolicyLine subtypes must define a delegate using this interface and some line-specific implementation class,
 * generally one that extends the AbstractPolicyLineMethods class.  Adding methods to this interface and
 * then implementing those methods on the delegate implementations is the only real way to obtain polymorphic
 * behavior among PolicyLine subtypes.
 */
@Export
structure PolicyLineMethods extends gw.api.policy.PolicyLineJavaMethods {

  /**
   * Returns all Modifiables on the policy line.
   */
  property get AllModifiables() : Modifiable[]

  /**
   * Returns all Schedules on the policy line.
   */
  property get AllSchedules() : Schedule[]

  /**
   * Return true if this line supports rating overrides; false otherwise.
   */
  property get SupportsRatingOverrides() : boolean

  /**
   * Clones autonumbering sequences for this policy line
   */
  function cloneAutoNumberSequences()

  /**
   * Resets autonumbering sequences for this policy line
   */
  function resetAutoNumberSequences()

  /**
   * Binds autonumbering sequences for this policy line
   */
  function bindAutoNumberSequences()

  /**
   * Finds new sequenced beans to renumber, called after changes have been
   * applied to a branch, e.g. from preemption or apply a PolicyChange to
   * a future period.
   */
  function renumberAutoNumberSequences()

  /**
   * Callback executed during the beginEditing method of IssuanceProcess.
   */
  function onIssuanceBeginEditing()

  /**
   * Callbacks executed during the beginEditing method of SubmissionProcess
   */
  function onSubmissionBeginEditing()

  /**
   * Callback executed as part of the initialize() method on the RenewalProcess, which is called
   * when a renewal is started and before the workflow is kicked off.
   */
  function onRenewalInitialize()

  /**
   * True if this line requires an audit, false otherwise.
   */
  property get Auditable() : boolean

  /**
   * True if this line allows Premium Audits, false otherwise.
   */
  property get AllowsPremiumAudit() : boolean

  /**
   * Create the appropriate line-specific subclass of PolicyLineValidation to use in validating this line.
   *
   * @param validationContext the PCValidationContext to pass to the validation object being created
   */
  function createPolicyLineValidation(validationContext : PCValidationContext) : PolicyLineValidation

  /**
   * Executed before the period start date changed on submission
   */
  function prePeriodStartChanged(newDate : Date)

  /**
   * Instantiates a DiffHelper based on the type of policyline
   * @param reason The reason for the diff
   * @param policyLine The policy line of the second period to compare
   * @return the diff helper for the LOB
   */
  function createPolicyLineDiffHelper(reason : DiffReason, policyLine : PolicyLine) : DiffHelper

  /**
   * Returns all costs given the coverable and coverage pattern.
   * @param covered Coverable associated with cost
   * @param covPat Coverage pattern for which cost is sought for
   * @return The costs associated with coverable and coveragepattern passed in
   */
  function getAllCostsForCoverage(covered : Coverable, covPat : CoveragePattern) : List<Cost>

  /**
   * Returns whether the cost for the given coverable and coverage pattern are visible
   * @param covered Coverable associated with cost
   * @param covPat Coverage pattern for which cost is sought for
   * @return True if the cost is visible otherwise returns false
   */
  function isCostVisible(covered : Coverable, covPat : CoveragePattern) : boolean

  /**
   * Returns validation level to use during quoting based on the policy period
   */
  function getQuoteValidationLevel(qType : QuoteType) : ValidationLevel

  /**
   * Returns ratingStyle to use during quoting based on the policy period
   */
  function getQuoteRatingStyle(qType : QuoteType) : RatingStyle

  /**
   * Returns whether the policy line should be quoted asynchronously.
   */
  function shouldQuoteAsynchronously() : boolean

  /**
   * Returns whether two-step quoting is available for this policy line
   * This will only be used in the UI level, which means with builder you should always be able
   * to create a rated policy period, regardless what value this method returns.
   */
  property get TwoStepQuotingAvailable(): boolean

  /**
   * Returns the Copier to use for copying data within this policy line, or null if copying is not
   * supported for this line.
   */
  property get Copier() : CompositeCopier<PolicyPeriod, PolicyLine >

  /**
   * Called before the job is bound/issued.  The last chance to change any effective dated entities in the policy
   * before the bind process begins and locks the branch containing these entities.
   *
   */
  function onBeginIssueJob()

  /**
   * Calculate the Total Insured Value for a Reinsurable Risk, given all its coverages.
   * Ignore (i.e. value at zero) any coverage that is not recognized.
   *
   * @param coverages all coverages of a single Reinsurable Risk
   * @return the total insured value (TIV) (aka Sum Insured)
   */
  function calculateTotalInsuredValue(coverages : List<Coverage>) : MonetaryAmount


  /**
   * Calculate the Total Insured Value for a Reinsurable Risk, given all its coverages.
   *
   * @param coverages all coverages of a single Reinsurable Risk
   * @param currency currency to be used for TIV summation
   * @return the total insured value (TIV) (aka Sum Insured)
   */
  function calculateTotalInsuredValue(coverages : List<Coverage>, currency : Currency) : MonetaryAmount

  /**
   * Some beans (for example, exposures in GL and WC lines) can be sliced
   * but a property change applied as of a certain date will cause incorrect prorating.
   *
   * @param bean that has a property change diff
   * @return true if a property change on this bean can be sliced, false otherwise.
   */
  function canDateSliceOnPropertyChange(bean : KeyableBean) : boolean

  /**
   * Some beans (for example, Jurisdiction in  WC lines) apply to the whole period,
   * and should never be split.  Applying a diff as of a particular date should not
   * be allowed to create a date split for these beans.
   *
   * @return The types of the beans that should never be date sliced when applying a diff.
   */
  property get TypesToNotDateSliceOnApplyDiff() : Set<IEntityType>

  /**
   * Replaces LOB-specific code contained in the (now deleted) rule set PolicyEvalNew.
   * The default behavior is to return a null evaluator for the given line as most LOBs
   * only use the default evaluator. Be sure to check for a null evaluator when implementing.
   *
   * @param context the PolicyEvalContext that the underwriter is to evaluate
   * @return the evaluator
   */
  function createUnderwriterEvaluator(context : PolicyEvalContext) : UnderwriterEvaluator

  /**
   * Creates the evaluator for a segment that a underwriting company is eligible to provide insurance for.
   * The default behavior is to return a null evaluator for the given line as most LOBs
   * only use the default evaluator. Be sure to check for a null evaluator when implementing.
   *
   * @param policyPeriod the policy period that is to be evaluated
   * @return the evaluator
   */
  function createSegmentEvaluator(policyPeriod : PolicyPeriod) : SegmentEvaluator

  /**
   * Some lines (only WC at the moment) are allowed to have an annual term with a duration different from the
   * 1-year standard. This property allows each line to specify if there are additional days in an annual term.
   * The default value is 0.
   *
   * @return the number of additional days.
   */
  property get AdditionalDaysInAnnualTerm() : int

  /**
   * Determines if a line has been configured to support Side By Side quoting.
   */
  property get SideBySideEnabled() : boolean

  property get SideBySideBaseDataConfig() : MatchableTreeTraverserConfig

  property get SideBySideInitialConfig() : SideBySideInitialConfig

  /**
   * Marks lines that are used in determining funding for emergency services.
   * OOTB these are BOP, CP, WC
   *
   * @return true: Line is used in determining funding for emergency services
   */
  property get EmergencyServiceFunding() : boolean

  /**
   * Determine if a policy location can be removed without first removing associated risks
   *
   * @return true:
   */
  property get PolicyLocationCanBeRemovedWithoutRemovingAssociatedRisks() : boolean

  /**
   * Build a RowTreeRootNode suitable for displaying the worksheets for a line.
   * @param showConditionals flag to display worksheet conditionals
   * @return a row tree root node.
   */
  function getWorksheetRootNode(showConditionals: boolean) : RowTreeRootNode

  /**
   * True: The line supports buildings and as such has a meaningful {@link #canSafelyDeleteBuilding} implementation.
   */
  property get ContainsBuildings() : boolean

  /*
   * True if line supports non-specific locations (e.g. GL, IM or WC)
   *
   * @return true: Line supports non-specific locations
   */
  property get SupportsNonSpecificLocations() : boolean

  /**
   * True if Base State is required for this line
   *
   * @return boolean: Line requires Base State
   */
  property get BaseStateRequired() : boolean

  /**
   * Run validation on a specific location
   * @param location the policy location to be validated
   * @throws EntityValidationException if a validation error is found
   */
  function validateLocations(location : PolicyLocation)

  /**
   * Run validation of policy info fields associated with a submission
   * @param period the policy period to be validated
   * @throws EntityValidationException if a validation error is found
   */
  function validateSubmissionWizardPolicyInfo(period : PolicyPeriod)

  /**
   * Creates a new rating engine supporting given {@link RateMethod} and {@link RateEngineParamater} map.
   *
   * @return The created rating engine
   */
  function createRatingEngine(method : RateMethod, parameters : Map<RateEngineParameter, Object>) : AbstractRatingEngine

}
