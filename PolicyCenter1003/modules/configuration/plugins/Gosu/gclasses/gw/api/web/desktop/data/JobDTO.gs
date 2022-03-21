package gw.api.web.desktop.data

uses com.fasterxml.jackson.annotation.JsonFormat
uses com.fasterxml.jackson.annotation.JsonIgnore
uses com.fasterxml.jackson.annotation.JsonInclude
uses com.google.common.collect.ImmutableSet
uses entity.Job
uses gw.api.database.Query
uses gw.api.web.desktop.data.common.ContactDTO
uses gw.api.web.desktop.data.common.ContactDTOImpl
uses gw.api.web.desktop.data.common.HashedAuditableDTO
uses gw.api.web.desktop.data.common.MonetaryAmountDTO
uses gw.lang.reflect.IPropertyInfo
uses gw.plugin.multicluster.federateddata.FederatedDataConstants
uses gw.riskassessment.JacksonEnabledSerializable

@Export
class JobDTO extends HashedAuditableDTO<Job> implements DesktopDataDTO, JacksonEnabledSerializable, ContactDTO {

  public static final var JOB_SELECTED_VERSION_FIELDS : ImmutableSet<IPropertyInfo> =
      ImmutableSet.builder<IPropertyInfo>()
          .add(PolicyPeriod#Status.PropertyInfo)
          .add(PolicyPeriod#EditEffectiveDate.PropertyInfo)
          .add(PolicyPeriod#TotalPremiumRPT_cur.PropertyInfo)
          .add(PolicyPeriod#TotalPremiumRPT_amt.PropertyInfo)
          .add(PolicyPeriod#PrimaryNamedInsured.PropertyInfo)
          .add(PolicyPeriod#Locked.PropertyInfo)
          .add(PolicyPeriod#ModelNumber.PropertyInfo)
          .add(PolicyPeriod#EstimatedPremium_cur.PropertyInfo)
          .add(PolicyPeriod#EstimatedPremium_amt.PropertyInfo)
          .build()

  @JsonIgnore
  delegate _contactDTO:ContactDTO represents ContactDTO

  protected var _publicId : String as PublicId
  protected var _editEffectiveDate : Date
  protected var _closeDate : Date
  protected var _jobNumber : String as JobNumber
  protected var _displayStatus : String as DisplayStatus
  protected var _policyProduct : String as PolicyProduct
  protected var _policyProductCode : String as PolicyProductCode
  protected var _policyNumber : String as PolicyNumber
  protected var _totalPremiumRPT : MonetaryAmountDTO as TotalPremiumRPT
  protected var _statusPriority : int as StatusPriority
  protected var _statusCode : String as StatusCode
  protected var _viewable : boolean as Viewable

  protected var _accountPublicId : String as AccountPublicId
  protected var _policyPublicId : String as PolicyPublicId
  protected var _displayType : String as DisplayType
  protected var _jobType : String as JobType
  protected var _producerCodeOfService : String as ProducerCodeOfService

  @JsonInclude(JsonInclude.Include.NON_NULL)
  protected var _producer : String as Producer

  @JsonInclude(JsonInclude.Include.NON_NULL)
  protected var _underwriter : String as Underwriter

  @JsonInclude(JsonInclude.Include.NON_NULL)
  protected var _allAssignedUserIds : List<String> as AllAssignedUserIds
  protected var _locked : boolean as Locked
  protected var _bound : boolean as Bound

  protected construct() {
    _contactDTO = new ContactDTOImpl()
  }

  protected construct(job : Job) {
    super(job.CreateTime, job.UpdateTime)
    _publicId = job.PublicID
    _editEffectiveDate = job.SelectedVersion.EditEffectiveDate
    _closeDate = job.CloseDate
    _jobNumber = job.JobNumber
    _displayStatus = job.DisplayStatus
    _policyProduct = job.Policy.Product.DisplayName
    _policyProductCode = job.Policy.ProductCode
    _policyNumber = job.PolicyNumberOrJobNumber
    _totalPremiumRPT = MonetaryAmountDTO.from(job.SelectedVersion.TotalPremiumRPT)
    _statusPriority = job.SelectedVersion.Status?.Priority
    _statusCode = job.SelectedVersion.Status.Code
    _viewable = job.Viewable
    _accountPublicId = job.Policy.Account.PublicID
    _policyPublicId = job.Policy.PublicID
    _jobType = job.Subtype.Code
    _displayType = job.DisplayType
    _contactDTO = ContactDTOImpl.from(job.SelectedVersion.PrimaryNamedInsured.ContactDenorm)
    _producerCodeOfService = job.Policy.ProducerCodeOfService.Code
    _locked = job.SelectedVersion.Locked
    _bound = job.SelectedVersion.ModelNumber != null
  }

  protected override function createHashGenerator() : HashGenerator<Job> {
    return new JobHashGeneratorBuilder().build()
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property get EditEffectiveDate() : Date {
    return _editEffectiveDate
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property set EditEffectiveDate(editEffectiveDate : Date) {
    _editEffectiveDate = editEffectiveDate
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property get CloseDate() : Date {
    return _closeDate
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property set CloseDate(closeDate : Date) {
    _closeDate = closeDate
  }

  function writeAsJSONString() : String {
    return DesktopDTOSerializationHelper.Mapper.writeValueAsString(this)
  }

  public property get AllAssigned() : String {
    return _allAssignedUserIds == null or _allAssignedUserIds.Empty ? "" :
        Query.make(User).compareIn(User#PublicID, _allAssignedUserIds.toArray()).select()
            .map(\user -> user.DisplayName)
            .join(", ");
  }

  public property get ProducerDisplayName() : String {
    return Query.make(User).compare(User#PublicID, Equals, Producer).select().AtMostOneRow.DisplayName
  }

  public property get UnderwriterDisplayName() : String {
    return Query.make(User).compare(User#PublicID, Equals, Underwriter).select().AtMostOneRow.DisplayName
  }

  public static function from(json : String) : JobDTO {
    return DesktopDTOSerializationHelper.Mapper.readValue(json, JobDTO)
  }

  protected static class JobHashGeneratorBuilder extends HashGenerator.Builder<Job> {

    construct() {
      with(\job -> job.PublicID)
      with(\job -> job.SelectedVersion.EditEffectiveDate)
      with(\job -> job.CloseDate)
      with(\job -> job.CreateTime)
      with(\job -> job.JobNumber)
      with(\job -> job.PolicyNumberOrJobNumber)
      with(\job -> job.SelectedVersion.TotalPremiumRPT.Amount)
      with(\job -> job.SelectedVersion.TotalPremiumRPT.Currency.Code)
      with(\job -> job.SelectedVersion.Status?.Priority)
      with(\job -> job.SelectedVersion.Status.Code)
      with(\job -> job.Viewable)
      with(\job -> job.Policy.PublicID)
      with(\job -> job.Subtype.Code)
      with(\job -> job.SelectedVersion.PrimaryNamedInsured.ContactDenorm.PublicID)
      with(\job -> job.SelectedVersion.Locked)
      with(\job -> job.SelectedVersion.ModelNumber != null)
    }

  }
}