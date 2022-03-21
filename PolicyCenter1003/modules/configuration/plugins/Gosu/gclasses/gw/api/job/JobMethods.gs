package gw.api.job

/**
 * Defines Gosu methods that can be overriden by subtypes of the Job class.
 */
@Export
structure JobMethods {

  /**
   * Specifies if any account-syncing behavior should occur in this job.
   */
  property get AccountSyncingEnabled() : boolean

  /**
   * Specifies if account-syncing behavior should take the job's edit effective date
   * into account.
   */
  property get AccountSyncingIsDateAware() : boolean

  /**
   * Return a string describing the type of this job.  Typically, this is
   * the display name of the job subtype, but it may reutrn specialized display keys
   * for certain jobs.
   */
  property get DisplayType() : String

  /**
   * Return the name of the icon that corresponds with this type of job.
   */
  property get Icon() : String

  /**
   * True if the user has the appropriate permission to view this type of job.
   */
  property get Viewable() : boolean

  /**
   * True if the policyPeriod on this job should be open for edit because
   * it's in the correct state and the user has the appropriate job permissions.
   */
  function isOpenForEdit(policyPeriod : PolicyPeriod) : boolean

  /**
   * True if the policyPeriod on this job should be available for side-by-side
   * quoting because it's in the correct state and the user has the appropriate
   * job permissions.
   */
  function isAvailableForSideBySideEdit(policyPeriod : PolicyPeriod) : boolean

  /**
   * The validation level for the policyPeriod on this job.
   */
  function getValidationLevel(policyPeriod : PolicyPeriod) : ValidationLevel

  /**
   * The rating style for the policyPeriod on this job.
   */
  function getRatingStyle(policyPeriod : PolicyPeriod) : RatingStyle

  /**
   * Specifies if the job can update the PolicyPeriod's PeriodStart and PeriodEnd.
   */
  property get CanUpdatePeriodDates() : boolean

  /**
   * Specifies if the job can copy coverages.
   */
  property get CanCopyCoverages() : boolean

  /**
   * True if the policyPeriod on this job can view modifiers because
   * it's in the correct state and the user has the appropriate permissions.
   */
  function canViewModifiers(policyPeriod : PolicyPeriod) : boolean

  /**
   * Create an activity indicating an asynchronous rate has completed successfully.
   */
  function createSuccessfulAsyncRateActivity(user : User, policyPeriod : PolicyPeriod) : Activity

  /**
   * Create an activity indicating an asynchronous quote has completed successfully.
   */
  function createSuccessfulAsyncQuoteActivity(user : User, policyPeriod : PolicyPeriod) : Activity

  /**
   * Create an activity indicating an asynchronous rate failed.
   */
  function createFailedAsyncRateActivity(user : User, policyPeriod : PolicyPeriod) : Activity

  /**
   * Create an activity indicating an asynchronous quote failed.
   */
  function createFailedAsyncQuoteActivity(user : User, policyPeriod : PolicyPeriod) : Activity

  /**
   * Create an activity indicating an asynchronous rate has completed successfully with warnings.
   */
  function createSuccessfulAsyncRateActivityWithWarnings(user : User, policyPeriod : PolicyPeriod) : Activity

  /**
   * Create an activity indicating an asynchronous quote has completed successfully with warnings.
   */
  function createSuccessfulAsyncQuoteActivityWithWarnings(user : User, policyPeriod : PolicyPeriod) : Activity
}
