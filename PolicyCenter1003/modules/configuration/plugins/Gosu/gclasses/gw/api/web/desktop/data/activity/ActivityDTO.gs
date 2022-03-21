package gw.api.web.desktop.data.activity

uses com.fasterxml.jackson.annotation.JsonFormat
uses com.fasterxml.jackson.annotation.JsonIgnore
uses com.fasterxml.jackson.core.type.TypeReference
uses entity.Activity
uses gw.api.web.color.GWColor
uses gw.api.web.desktop.data.DesktopDTOSerializationHelper
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.desktop.data.HashGenerator
uses gw.api.web.desktop.data.common.ContactDTO
uses gw.api.web.desktop.data.common.ContactDTOImpl
uses gw.api.web.desktop.data.common.HashedAuditableDTO
uses gw.plugin.multicluster.federateddata.FederatedDataConstants
uses gw.plugin.multicluster.federateddata.UserRoleAssignmentType
uses gw.riskassessment.JacksonEnabledSerializable

@Export
class ActivityDTO extends HashedAuditableDTO<Activity> implements DesktopDataDTO, JacksonEnabledSerializable, ContactDTO {

  @JsonIgnore
  delegate _contactDTO:ContactDTO represents ContactDTO

  var _publicId : String as PublicId
  var _id : String as Id
  var _targetDate : Date
  var _subject : String as Subject
  var _priorityValue : int as PriorityValue
  var _priorityCode : String as PriorityCode
  var _statusPriority : int as StatusPriority
  var _statusCode : String as StatusCode
  var _assignmentStatus : String as AssignmentStatus
  var _accountHolderContact : String as AccountHolderContact
  var _escalationDate : Date
  var _closeDate : Date
  var _product : String as Product
  var _updatedSinceLastViewed : boolean as UpdatedSinceLastViewed
  var _overdue : boolean as Overdue
  var _recurring : boolean as Recurring
  var _policyNumberOrJobNumber : String as PolicyNumberOrJobNumber
  var _policyProduct : String as PolicyProduct
  var _policyProductCode : String as PolicyProductCode
  var _assignedByUser : String as AssignedByUser
  var _escalated : boolean as Escalated
  var _searchResultID : String as SearchResultID
  var _isArchived : boolean as IsArchived
  var _isMandatory : boolean as IsMandatory
  var _type : String as Type
  var _assignedByUserPublicId : String as AssignedByUserPublicId
  var _assignedUserPublicId : String as AssignedUserPublicId
  var _assignedUser : String as AssignedUser

  var _accountPublicId : String as AccountPublicId
  var _policyPublicId : String as PolicyPublicId
  var _jobPublicId : String as JobPublicId

  var _userId : String as UserId
  var _previousUserId : String as PreviousUserId
  var _queueId : String as QueueId
  var _previousQueueId : String as PreviousQueueId
  var _groupId : String as GroupId

  var _userRoleOwnerPublicId : String as UserRoleOwnerPublicId
  var _userRoleOwnerType : String as UserRoleOwnerType

  var _producerCodeOfService : String as ProducerCodeOfService
  var _producerCodes : List<String>as ProducerCodes

  var _assignedToSystemUser : boolean as AssignedToSystemUser
  var _assignedUserInGroup : boolean as AssignedUserInGroup

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property get TargetDate() : Date {
    return _targetDate
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property set TargetDate(targetDate : Date) {
    _targetDate = targetDate
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property get EscalationDate() : Date {
    return _escalationDate
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property set EscalationDate(escalationDate : Date) {
    _escalationDate = escalationDate
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property get CloseDate() : Date {
    return _closeDate
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property set CloseDate(closeDate : Date) {
    _closeDate = closeDate
  }

  private construct() {
    _contactDTO = new ContactDTOImpl()
  }

  private construct(activity : Activity) {
    super(activity.CreateTime, activity.UpdateTime)
    _publicId = activity.PublicID
    _id = activity.ID.Value as String
    _targetDate = activity.TargetDate
    _subject = activity.Subject
    _priorityValue = activity.Priority.Priority
    _priorityCode = activity.Priority.Code
    _statusPriority = activity.Status.Priority
    _statusCode = activity.Status.Code
    _assignmentStatus = activity.AssignmentStatus.Code
    _escalationDate = activity.EscalationDate
    _closeDate = activity.CloseDate
    _product = activity.Policy.Product.DisplayName
    _updatedSinceLastViewed = activity.UpdatedSinceLastViewed
    _overdue = activity.Overdue
    _recurring = activity.Recurring
    _policyNumberOrJobNumber = activity.Job.PolicyNumberOrJobNumber
    _policyProduct = getPolicyProduct(activity).DisplayName
    _policyProductCode = getPolicyProductCode(activity)
    _assignedByUser = activity.AssignedByUser.DisplayName
    _escalated = activity.Escalated
    _searchResultID = activity.SearchResultID
    _isArchived = activity.associatedItemIsArchived()
    _isMandatory = activity.Mandatory
    _accountPublicId = activity.Account.PublicID
    _policyPublicId = activity.Policy.PublicID
    _jobPublicId = activity.Job.PublicID
    _userId = activity.AssignedUser.PublicID
    _previousUserId = activity.PreviousUser.PublicID
    _queueId = activity.AssignedQueue.PublicID
    _previousQueueId = activity.PreviousQueue.PublicID
    _groupId = activity.AssignedGroup.PublicID
    _userRoleOwnerPublicId = activity.UserRoleOwner.PublicID
    _userRoleOwnerType = UserRoleAssignmentType.from(activity.UserRoleOwner)?.name()
    _contactDTO = ContactDTOImpl.from(activity.Account.AccountHolderContact ?: activity.Job.Policy.Account.AccountHolderContact)
    _type = activity.Type.Code
    _assignedByUserPublicId = activity.AssignedByUser.PublicID
    _assignedUserPublicId = activity.AssignedUser.PublicID
    _assignedUser = activity.AssignedUser.DisplayName
    _producerCodeOfService = activity.Job.Policy.ProducerCodeOfService.Code
    _assignedToSystemUser = activity.AssignedUser.isSystemUser()
    _assignedUserInGroup = activity.AssignedUser.GroupUsers?.hasMatch(\groupUser -> groupUser.Group == activity.AssignedGroup)
    generateHashes(activity)
  }

  protected override function createHashGenerator() : HashGenerator<Activity> {
    return new HashGenerator.Builder<Activity>()
        .with(\activity -> activity.PublicID)
        .with(\activity -> activity.ID.Value)
        .with(\activity -> activity.TargetDate)
        .with(\activity -> activity.Subject)
        .with(\activity -> activity.Priority.Priority)
        .with(\activity -> activity.Priority.Code)
        .with(\activity -> activity.Status.Priority)
        .with(\activity -> activity.Status.Code)
        .with(\activity -> activity.AssignmentStatus.Code)
        .with(\activity -> activity.EscalationDate)
        .with(\activity -> activity.CloseDate)
        .with(\activity -> activity.UpdatedSinceLastViewed)
        .with(\activity -> activity.Overdue)
        .with(\activity -> activity.Recurring)
        .with(\activity -> activity.Job.PolicyNumberOrJobNumber)
        .with(\activity -> activity.AssignedByUser.PublicID)
        .with(\activity -> activity.Escalated)
        .with(\activity -> activity.SearchResultID)
        .with(\activity -> activity.associatedItemIsArchived())
        .with(\activity -> activity.Mandatory)
        .with(\activity -> activity.Account.PublicID)
        .with(\activity -> activity.Policy.PublicID)
        .with(\activity -> activity.Job.PublicID)
        .with(\activity -> activity.AssignedUser.PublicID)
        .with(\activity -> activity.PreviousUser.PublicID)
        .with(\activity -> activity.AssignedQueue.PublicID)
        .with(\activity -> activity.PreviousQueue.PublicID)
        .with(\activity -> activity.AssignedGroup.PublicID)
        .with(\activity -> activity.UserRoleOwner.PublicID)
        .with(\activity -> activity.Type.Code)
        .build()
  }

  static function from(activity : Activity) : ActivityDTO {
    return new ActivityDTO(activity)
  }

  private static function getPolicyProduct(activity : Activity) : gw.api.productmodel.Product {
    return activity.Policy.Product ?: activity.Job.Policy.Product
  }

  private static function getPolicyProductCode(activity : Activity) : String {
    return activity.Policy.Product != null ? activity.Policy.ProductCode : activity.Job.Policy.ProductCode
  }

  static function from(json : String) : ActivityDTO {
    return DesktopDTOSerializationHelper.Mapper.readValue(json, ActivityDTO)
  }

  static function fromCollection(jsonCollection : String) : List<ActivityDTO> {
    return DesktopDTOSerializationHelper.Mapper.readValue(jsonCollection, new TypeReference<List<ActivityDTO>>() {
    })
  }

  function writeAsJSONString() : String {
    return DesktopDTOSerializationHelper.Mapper.writeValueAsString(this)
  }

  @JsonIgnore
  property get UIDisplayState() : State {
    if (ContactState == null) {
      return null
    }
    return typekey.State.get(ContactState)
  }

  @JsonIgnore
  property get UIPriorityColor() : GWColor {
    if (typekey.Priority.TC_URGENT.Priority == PriorityValue) {
      return GWColor.THEME_IMPORTANCE_CRITICAL
    } else if (typekey.Priority.TC_HIGH.Priority == PriorityValue) {
      return GWColor.THEME_IMPORTANCE_HIGH
    }
    return null
  }

  @JsonIgnore
  property get UIOverdueColor() : GWColor {
    return this.Overdue ? GWColor.THEME_PROGRESS_OVERDUE : null
  }

}