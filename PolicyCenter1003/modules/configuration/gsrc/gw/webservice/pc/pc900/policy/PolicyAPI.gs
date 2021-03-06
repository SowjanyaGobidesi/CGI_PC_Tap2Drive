package gw.webservice.pc.pc900.policy

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.assignment.AutoAssignAssignee
uses gw.api.assignment.UserAssignee
uses gw.api.util.CoreFilters
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.DataConversionException
uses gw.api.webservice.exception.EntityStateException
uses gw.api.webservice.exception.PermissionException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.SOAPException
uses gw.transaction.Transaction
uses gw.webservice.SOAPUtil
uses gw.webservice.pc.pc900.gxmodel.SimpleValuePopulator
uses gw.webservice.pc.pc900.gxmodel.activitymodel.types.complex.Activity
uses gw.xml.ws.annotation.WsiWebService

uses java.lang.IllegalArgumentException
uses gw.api.database.PCBeanFinder
uses gw.xml.ws.annotation.WsiPermissions

@WsiWebService( "http://guidewire.com/pc/ws/gw/webservice/pc/pc900/policy/PolicyAPI" )
@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class PolicyAPI {

  /**
   * Adds a referral reason if one does not already exist with the given issueTypeCode and key,
   * and otherwise updates the existing referral reason's short description, long description and
   * value fields.
   * 
   * @param policyId The PublicId of an existing Policy to add the referral reason to. Must not be null.
   * @param issueTypeCode The code of an UWIssueType which has a checking point of Referral. Must not be null.
   * @param issueKey Identifier for the referral reason. Must not be null.
   * @param shortDescription Short description for the referral reason.
   * @param longDescription Long description for the referral reason.
   * @param value Value for the referral reason, which must be valid for the UWIssueType's comparator.
   * @returns The PublicId of the new or existing referral reason. The referral reason's status will be Open.
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If any of the policyId, issueKey or issueTypeCode arguments are null.")
  @Throws(BadIdentifierException, "If policyId does not match the PublicId of any existing Policy.")
  @Throws(IllegalArgumentException, "If issueTypeCode does not match the code of any existing UWIssueType, if that type does not have a checking point of Referral, or if the value is incompatible with the issue type.") 
  @Param("policyId", "The PublicId of an existing Policy to add the referral reason to. Must not be null.")
  @Param("issueTypeCode", "The code of an UWIssueType which has a checking point of Referral. Must not be null.")
  @Param("issueKey", "Identifier for the referral reason. Must not be null.")
  @Param("shortDescription", "Short description for the referral reason.")
  @Param("longDescription", "Long description for the referral reason.")
  @Param("value", "Value for the referral reason, which must be valid for the UWIssueType's comparator.")
  @WsiPermissions({SystemPermissionType.TC_CREATEREFERRALREASON})
  @Returns("The PublicId of the new or existing referral reason. The referral reason's status will be Open.")
  function addReferralReason(policyId : String, issueTypeCode : String, issueKey : String, shortDescription : String, longDescription : String, value : String) : String {
    SOAPUtil.require(policyId, "policyId")
    SOAPUtil.require(issueKey, "issueKey")
    SOAPUtil.require(issueTypeCode, "issueTypeCode")

    var policy = Policy.finder.findPolicyByPublicId(policyId)
    if (policy == null) {
      throw new BadIdentifierException(DisplayKey.get("Webservice.Error.CannotFindPolicyByPublicID", policyId))
    }

    var referralReason : UWReferralReason
    Transaction.runWithNewBundle(\ bundle -> {
      policy = bundle.loadBean(policy.ID) as Policy
      referralReason = policy.addReferralReason(issueTypeCode, issueKey, \ -> shortDescription, \ -> longDescription, value)
    })
    return referralReason.PublicID
  }

  /**
   * Closes an existing referral reason on the given policy. If the referral reason is already
   * closed then this operation will have no effect.
   * 
   * @param policyId The PublicId of an existing Policy. Must not be null.
   * @param issueTypeCode The code of an UWIssueType. Must not be null.
   * @param issueKey Identifier for the referral reason to close. Must not be null.
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If any of the policyId, issueKey or issueTypeCode arguments are null.")
  @Throws(BadIdentifierException, "If policyId does not match the PublicId of any existing Policy.")
  @Throws(EntityStateException, "If no referral reason with the given issueTypeCode and issueKey exist on the policy.")
  @Param("policyId", "The PublicId of an existing Policy. Must not be null.")
  @Param("issueTypeCode", "The code of an UWIssueType. Must not be null.")
  @Param("issueKey", "Identifier for the referral reason to close. Must not be null.")
  @WsiPermissions({SystemPermissionType.TC_VIEWRISKREFREASONS})
  function closeReferralReason(policyId : String, issueTypeCode : String, issueKey : String) {
    SOAPUtil.require(policyId, "policyId")
    SOAPUtil.require(issueKey, "issueKey")
    SOAPUtil.require(issueTypeCode, "issueTypeCode")
    
    var policy = Policy.finder.findPolicyByPublicId(policyId)
    if (policy == null) {
      throw new BadIdentifierException(DisplayKey.get("Webservice.Error.CannotFindPolicyByPublicID", policyId))
    }
    var referralReason = policy.UWReferralReasons.firstWhere(\ reason -> reason.IssueKey == issueKey and reason.IssueType.Code == issueTypeCode)
    if (referralReason == null) {
      throw new EntityStateException(DisplayKey.get("Webservice.Error.CannotFindUWReferralReason", policyId, issueKey, issueTypeCode))
    }
    
    Transaction.runWithNewBundle(\ bundle -> {
      var reason = bundle.loadBean(referralReason.ID) as UWReferralReason
      reason.Open = false
    })
  }
  
  /**
   * Adds an activity to a policy using an activity pattern. First, attempts to generate an activity from the given
   * pattern. The new activity is initialized with the following fields from the activity pattern: Pattern, Type,
   * Subject, Description, Mandatory, Priority, Recurring, Command
   * <p/>
   * The activity's target date is calculated using the pattern's TargetStartPoint, TargetDays, TargetHours, and
   * TargetIncludeDays fields. The activity's escalation date is calculated using the pattern's EscalationStartPt,
   * EscalationDays, EscalationHours, and EscalationInclDays fields. If those fields aren't included in the activity
   * pattern, then the target and/or escalation date won't be set. If the target date is calculated to be after the
   * escalation date, then the target date is set to be the same as the escalation date.
   * <p/>
   * The activity's policy Id is set to the given policy Id.  The activity's previousUserId is set to the current user.
   * <p/>
   * The newly created activity is then assigned to a group and/or user using the Assignment Engine.  Finally, the
   * activity is saved in the database, and the Id of the newly created activity is returned.
   * 
   * @param policyId The Id of the policy with which the activity should be associated. Cannot be null.
   * @param activityType The type of the activity pattern that is to be used for the activity. Cannot be null.
   * @param activityPatternCode The pattern code of the activity pattern that is to be used for the activity. Cannot be null.
   * @param activityFields GX model to populate fields for Activity. May be null.
   * @returns The PublicId of the newly created activity.
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "if either policyId, activityType, or activityPatternCode are null")
  @Throws(BadIdentifierException, "if either the policyId or activityPatternId does not exist.")
  @Throws(PermissionException, "if the caller does not have all of the following permissions: VIEW_POLICY, CREATE_ACTIVITY.")
  @Throws(EntityStateException, "if there is an attempt to add an activity using an activity pattern that isn't available to the particular type of the given policy.")
  @Param("policyId", "The Id of the policy with which the activity should be associated. Cannot be null.")
  @Param("activityType", "The type of the activity pattern that is to be used for the activity. Cannot be null.")
  @Param("activityPatternCode", "The pattern code of the activity pattern that is to be used for the activity. Cannot be null.")
  @Param("activityFields", "GX model to populate fields for Activity; may be null.")
  @WsiPermissions({SystemPermissionType.TC_ACTCREATE, SystemPermissionType.TC_ACTRAUNOWN})
  @Returns("The PublicId of the newly created activity.")
  function addActivityFromPatternAndAutoAssign(policyId : String, activityType : ActivityType, activityPatternCode : String, activityFields : Activity) : String {
    SOAPUtil.require(policyId, "policyId");
    SOAPUtil.require(activityType, "activityType");
    SOAPUtil.require(activityPatternCode, "activityPatternCode");
    var policyActivity : entity.Activity
    Transaction.runWithNewBundle(\ bundle -> {
      var policy = getPolicyByID(policyId)
      var activityPattern = getActivityPattern(activityType, activityPatternCode)
      policyActivity = activityPattern.createPolicyActivity(bundle, policy, null, null, null, null, null, null, null)
      if(activityFields != null){
        SimpleValuePopulator.populate(activityFields, policyActivity)
      }
      policyActivity.setUp(AutoAssignAssignee.INSTANCE)
    })
    return policyActivity.PublicID
  }  

  /**
   * Adds an activity to a policy using an activity pattern. First, attempts to generate an activity from the given
   * pattern. The new activity is initialized with the following fields from the activity pattern: Pattern, Type,
   * Subject, Description, Mandatory, Priority, Recurring, Command
   * <p/>
   * The activity's target date is calculated using the pattern's TargetStartPoint, TargetDays, TargetHours, and
   * TargetIncludeDays fields. The activity's escalation date is calculated using the pattern's EscalationStartPt,
   * EscalationDays, EscalationHours, and EscalationInclDays fields. If those fields aren't included in the activity
   * pattern, then the target and/or escalation date won't be set. If the target date is calculated to be after the
   * escalation date, then the target date is set to be the same as the escalation date.
   * <p/>
   * The activity's policy Id is set to the given policy Id.  The activity's previousUserId is set to the current user.
   * <p/>
   * The newly created activity is then assigned to the specified group and user using the Assignment Engine. Finally,
   * the activity is saved in the database, and the Public Id of the newly created activity is returned.
   * 
   * @param policyId The Id of the policy with which the activity should be associated. Cannot be null.
   * @param userId The Id of the user to assign to. Cannot be null.
   * @param groupId The Id of a group the user belongs to for assignment. Cannot be null.
   * @param activityType The type of the activity pattern that is to be used for the activity. Cannot be null.
   * @param activityPatternCode The pattern code of the activity pattern that is to be used for the activity. Cannot be null.
   * @param activityFields GX model to populate fields for Activity. May be null.
   * @returns The Public Id of the newly created activity.
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Throws(PermissionException, "if the caller does not have all of the following permissions: VIEW_POLICY, CREATE_ACTIVITY.")
  @Throws(EntityStateException, "if there is an attempt to add an activity using an activity pattern that isn't available to the particular type of the given policy.")
  @Param("policyId", "The Id of the policy with which the activity should be associated. Cannot be null.")
  @Param("userId", "The Id of the user to assign to. Cannot be null.")
  @Param("groupId", "The Id of a group the user belongs to for assignment. Cannot be null.")
  @Param("activityType", "The type of the activity pattern that is to be used for the activity. Cannot be null.")
  @Param("activityPatternCode", "The pattern code of the activity pattern that is to be used for the activity. Cannot be null.")
  @Param("activityFields", "GX model to populate fields for Activity; may be null.")
  @WsiPermissions({SystemPermissionType.TC_ACTCREATE, SystemPermissionType.TC_ACTRAUNOWN})
  @Returns("The PublicId of the newly created activity.")
  function addActivityFromPatternAndAssignToUser(policyId : String, userId : String, groupId : String, 
                                                 activityType : ActivityType, activityPatternCode : String, activityFields : Activity) : String {
    SOAPUtil.require(policyId, "policyId");
    SOAPUtil.require(userId, "userId");
    SOAPUtil.require(groupId, "groupId");
    SOAPUtil.require(activityType, "activityType");
    SOAPUtil.require(activityPatternCode, "activityPatternCode");
    var policyActivity : entity.Activity
    Transaction.runWithNewBundle(\ bundle -> {
      var policy = getPolicyByID(policyId)
      var activityPattern = getActivityPattern(activityType, activityPatternCode)
      policyActivity = activityPattern.createPolicyActivity(bundle, policy, null, null, null, null, null, null, null)
      if(activityFields != null){
        SimpleValuePopulator.populate(activityFields, policyActivity)
      }
      var user = PCBeanFinder.loadBeanByPublicID<User>(userId, User)
      var group = PCBeanFinder.loadBeanByPublicID<Group>(groupId, Group)
      policyActivity.setUp(new UserAssignee(group, user))
    })
    return policyActivity.PublicID
  }
 
  /**
   * Adds an activity to a policy using an activity pattern. First, attempts to generate an activity from the given
   * pattern. The new activity is initialized with the following fields from the activity pattern: Pattern, Type,
   * Subject, Description, Mandatory, Priority, Recurring, Command
   * <p/>
   * The activity's target date is calculated using the pattern's TargetStartPoint, TargetDays, TargetHours, and
   * TargetIncludeDays fields. The activity's escalation date is calculated using the pattern's EscalationStartPt,
   * EscalationDays, EscalationHours, and EscalationInclDays fields. If those fields aren't included in the activity
   * pattern, then the target and/or escalation date won't be set. If the target date is calculated to be after the
   * escalation date, then the target date is set to be the same as the escalation date.
   * <p/>
   * The activity's policy ID is set to the given policy ID.  The activity's previousUserID is set to the current user.
   * <p/>
   * The newly created activity is then assigned to the specified queue using the Assignment Engine.  Finally, the
   * activity is saved in the database, and the ID of the newly created activity is returned.
   * 
   * @param policyId The ID of the job with which the activity should be associated. Cannot be null.
   * @param queueId The ID of the queue to assign to. Cannot be null.
   * @param activityType The type of the activity pattern that is to be used for the activity. Cannot be null.
   * @param activityPatternCode The pattern code of the activity pattern that is to be used for the activity. Cannot be null.
   * @param activityFields GX model to populate fields for Activity. May be null.
   * @returns The Public ID of the newly created activity.
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Throws(PermissionException, "if the caller does not have all of the following permissions: VIEW_POLICY, CREATE_ACTIVITY.")
  @Throws(EntityStateException, "if there is an attempt to add an activity using an activity pattern that isn't available to the particular type of the given policy.")
  @Param("policyId", "The Id of the policy with which the activity should be associated. Cannot be null.")
  @Param("queueId", "The ID of the queue to assign to. Cannot be null.")
  @Param("activityType", "The type of the activity pattern that is to be used for the activity. Cannot be null.")
  @Param("activityPatternCode", "The pattern code of the activity pattern that is to be used for the activity. Cannot be null.")
  @Param("activityFields", "GX model to populate fields for Activity; may be null.")
  @WsiPermissions({SystemPermissionType.TC_ACTCREATE, SystemPermissionType.TC_ACTRAUNOWN})
  @Returns("The PublicId of the newly created activity.")
  function addActivityFromPatternAndAssignToQueue(policyId : String, queueId : String, activityType : ActivityType, activityPatternCode : String, activityFields : Activity) : String {
    SOAPUtil.require(policyId, "policyId");
    SOAPUtil.require(queueId, "queueId");
    SOAPUtil.require(activityType, "activityType");
    SOAPUtil.require(activityPatternCode, "activityPatternCode");
    var policyActivity : entity.Activity
    Transaction.runWithNewBundle(\ bundle -> {
      var policy = getPolicyByID(policyId)
      var activityPattern = getActivityPattern(activityType, activityPatternCode)
      policyActivity = activityPattern.createPolicyActivity(bundle, policy, null, null, null, null, null, null, null)
      if(activityFields != null){
        SimpleValuePopulator.populate(activityFields, policyActivity)
      }
    
      var queue = PCBeanFinder.loadBeanByPublicID<AssignableQueue>(queueId, AssignableQueue)
      if (queue == null) {
        throw new BadIdentifierException(DisplayKey.get("PolicyAPI.Error.InvalidQueue", queueId))
      }
      policyActivity.setUp(queue)
    })
    return policyActivity.PublicID
  }

  /**
   * Updates commission plan ids for particular producer code. This is done by matching currencies in commission plans
   *
   * @param producerCodeInfo
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Throws(PermissionException, "if the caller does not have all of the following permissions: TC_PCODEUPDATE.")
  @Param("producerCodeInfo", "Object containing producer code data to be updated")
  @WsiPermissions({SystemPermissionType.TC_UPDATEPRODCODES})
  function updateProducerCode(producerCodeInfo : ProducerCodeInfo) {
    SOAPUtil.require(producerCodeInfo, "producerCodeInfo")
    final var producerCodeId = producerCodeInfo.PublicID
    Transaction.runWithNewBundle(\ bundle -> {
      var producerCode = Query.make(ProducerCode).compare(ProducerCode#PublicID, Equals, producerCodeId).select().AtMostOneRow
      if (producerCode == null) {
        throw new BadIdentifierException(DisplayKey.get("PolicyAPI.Error.InvalidProducerCode", producerCodeId))
      }
      producerCode = bundle.add(producerCode)

      final var syncedCommissionPlansByCurrency =
          producerCodeInfo.CommissionPlanInfos.partitionUniquely(\ planInfo -> Currency.get(planInfo.Currency))

      // sync each currency-specific CommissionPlan with the billing system
      producerCode.CommissionPlans.each(\ commissionPlan -> {
        final var syncedCommissionPlanID = syncedCommissionPlansByCurrency[commissionPlan.Currency].PublicID
        if (commissionPlan.CommissionPlanID != syncedCommissionPlanID) {
          commissionPlan.CommissionPlanID = syncedCommissionPlanID
        }
      })
    })
  }


  /**
  * Private methods
  */

  /**
   * Get a policy by ID, or throw a {@link DataConversionException} if it doesn't exist.
   */
  private function getPolicyByID(policyId : String) : Policy {
    var policy = Policy.finder.findPolicyByPublicId(policyId)
    if (policy == null) {
      throw new DataConversionException(DisplayKey.get("PolicyAPI.Error.InvalidPolicyPublicId", policyId))
    }
    return policy
  }
  
  private function getActivityPattern(activityType : ActivityType, activityPatternCode : String) : ActivityPattern{
    var activityPattern = ActivityPattern.finder.getActivityPattern(activityType, activityPatternCode)
    if (activityPattern == null) {
      throw new DataConversionException(DisplayKey.get("PolicyAPI.ActivityPattern.NotFound", activityType, activityPatternCode))
    }
    return activityPattern
  }
}