package gw.api.web.desktop.data.submission

uses com.fasterxml.jackson.annotation.JsonFormat
uses com.fasterxml.jackson.annotation.JsonIgnore
uses com.fasterxml.jackson.core.type.TypeReference
uses gw.api.web.desktop.data.DesktopDTOSerializationHelper
uses gw.api.web.desktop.data.HashGenerator
uses gw.api.web.desktop.data.JobDTO
uses gw.api.web.desktop.data.common.MonetaryAmountDTO
uses gw.plugin.multicluster.federateddata.FederatedDataConstants

@Export
class SubmissionDTO extends JobDTO {

  @JsonIgnore
  private var _hashGenerator : HashGenerator<Job>

  var _dateQuoteNeeded : Date
  var _policyIssued : boolean as PolicyIssued
  var _estimatedPremium : MonetaryAmountDTO as EstimatedPremium

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property get DateQuoteNeeded() : Date {
    return _dateQuoteNeeded
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  public property set DateQuoteNeeded(dateQuoteNeeded : Date) {
    _dateQuoteNeeded = dateQuoteNeeded
  }

  private construct() {
  }

  private construct(submission : Submission) {
    super(submission)
    _dateQuoteNeeded = submission.DateQuoteNeeded
    _policyIssued = submission.Policy.Issued
    _estimatedPremium = MonetaryAmountDTO.from(submission.SelectedVersion.EstimatedPremium)

    _hashGenerator = new JobHashGeneratorBuilder()
        .with(\sub -> sub.DateQuoteNeeded)
        .with(\sub -> sub.SelectedVersion.EstimatedPremium.Amount)
        .with(\sub -> sub.SelectedVersion.EstimatedPremium.Currency.Code)
        .build()

    generateHashes(submission)
  }

  private construct(issuance : Issuance) {
    super(issuance)
    _hashGenerator = new JobHashGeneratorBuilder().build()
    generateHashes(issuance)
  }

  protected override function createHashGenerator() : HashGenerator<Job> {
    return _hashGenerator
  }

  static function from(submission : Submission) : SubmissionDTO {
    return new SubmissionDTO(submission)
  }

  static function from(issuance : Issuance) : SubmissionDTO {
    return new SubmissionDTO(issuance)
  }

  static function from(json : String) : SubmissionDTO {
    return DesktopDTOSerializationHelper.Mapper.readValue(json, SubmissionDTO)
  }

  static function fromCollection(jsonCollection : String) : List<SubmissionDTO> {
    return DesktopDTOSerializationHelper.Mapper.readValue(jsonCollection, new TypeReference<List<SubmissionDTO>>() {
    })
  }
}