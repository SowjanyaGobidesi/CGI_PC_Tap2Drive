package gw.reinsurance.agreement

uses gw.api.locale.DisplayKey
uses gw.api.validation.EntityValidationException
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.reinsurance.RIUtil
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext
uses gw.validation.ValidationUtil

@Export
class RIAgreementValidation extends PCValidationBase {

  var _agreement : RIAgreement
  var _agreementUnchanged : RIAgreement

  construct(valContext : PCValidationContext, agreement : RIAgreement) {
    super(valContext)
    _agreement = agreement
    _agreementUnchanged = agreement
  }

  override protected function validateImpl() {
    Context.addToVisited(this, "validateImpl")

    validateDates()
    validateAgreementItself()
    validateActivePrograms()
  }

  function validateDates() {
    // validate effDate and expDate -- they should be normalized
    if (_agreement.EffectiveDate != RIUtil.adjustEffectiveTimeForRI(_agreement.EffectiveDate)) {
        Result.addError(_agreementUnchanged, TC_DEFAULT,
            DisplayKey.get("Web.Reinsurance.Program.Validation.EffectiveDateNormalization", _agreementUnchanged))
        // should we fix this one so it doesn't generate anything spurious?
        // _agreement.setEffectiveDateWithDefaultTime(_agreement.EffectiveDate)
    }
    if (_agreement.ExpirationDate != RIUtil.adjustEffectiveTimeForRI(_agreement.ExpirationDate)) {
        Result.addError(_agreementUnchanged, TC_DEFAULT,
            DisplayKey.get("Web.Reinsurance.Program.Validation.ExpirationDateNormalization", _agreementUnchanged))
        // should we fix this one so it doesn't generate anything spurious?
        // _agreement.setExpirationDateWithDefaultTime(_agreement.ExpirationDate)
    }
    if (_agreement.ExpirationDate <= _agreement.EffectiveDate) {
      Result.addError(_agreementUnchanged, TC_DEFAULT,
          DisplayKey.get("Web.Reinsurance.Program.Validation.ExpiresBeforeEffective", _agreementUnchanged))
    }
  }

  function validateAgreementItself() {
    validateRequiredFieldErrorAgreementFieldsAreSet()
    validateCoverageLimitLargerThanOrEqualToAttachmentPoint()
    validateMaxRetentionLessThanOrEqualToAttachmentPoint()
    validateParticipants()
    validateCoverageGroups()
  }

  private function validateActivePrograms(){
    var query = Query.make(RIProgram)
    query.compare(RIProgram#Status, Relop.Equals, ContractStatus.TC_ACTIVE)
    var joinTable = query.join(ProgramTreaty#Program)
    joinTable.compare(ProgramTreaty#Treaty, Relop.Equals, _agreement)
    var iter = query.select().iterator()
    while(iter.hasNext()){
      var program = iter.next()
      // load program to this bundle so that program.Treaties returns this treaty with all the changes
      program = _agreement.Bundle.add(program)
      try {
        PCValidationContext.doPageLevelValidation( \ ctx -> new RIProgramValidation(ctx, program).validateProgram())
      } catch (e : EntityValidationException) {
        Result.addWarning(_agreement, TC_DEFAULT, DisplayKey.get("Web.Reinsurance.Program.Validation.InvalidProgram", program.Name))
      }
    }
  }

  private function validateCoverageGroups() {
    if (_agreement typeis Treaty && _agreement.CoverageGroups.Empty) {
      Result.addError(_agreementUnchanged, TC_DEFAULT, DisplayKey.get("Web.Reinsurance.Agreement.Verify.MissingCoverageGroup"))
    }
  }

  /**
   * check that requiredFieldError fields are set based on subtype
   */
  private function validateRequiredFieldErrorAgreementFieldsAreSet() {
    //coverage fields
    if (_agreement typeis QuotaShareRITreaty || _agreement typeis NonProportionalRIAgreement) {
      requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.CededShare"), _agreement.CededShare)
    }
    //Amount of coverage is amount ceded for fac prop agreements and amoutn of RI otherwise
    if (!(_agreement typeis FacProportionalRIAgreement)) {
      requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.AmountOfCoverage"), _agreement.AmountOfCoverage)
    }
    if (_agreement typeis SurplusRITreaty || _agreement typeis NonProportionalRIAgreement) {
      requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.AttachmentPoint"), _agreement.AttachmentPoint)
    }
    if (!(_agreement typeis FacProportionalRIAgreement)) {
      requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.CoverageLimit"), _agreement.CoverageLimit)
    }
    if (_agreement typeis NonProportionalRIAgreement) {
      requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.AttachmentIndexed"), _agreement.AttachmentIndexed)
      requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.LimitIndexed"), _agreement.LimitIndexed)
    }
    if (_agreement typeis SurplusRITreaty) {
      requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.MaxRetention"), _agreement.MaxRetention)
    }

    //premium and commission fields
    if (_agreement typeis NonProportionalRIAgreement) {
      if (_agreement typeis Treaty) {
        requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.CedingRate"), _agreement.CedingRate)
      }
      requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.CalculateCededPremium"), _agreement.CalculateCededPremium)
    }
    requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.Commission"), _agreement.Commission)
    if (_agreement typeis Facultative and!(_agreement typeis FacProportionalRIAgreement)) {
      requiredFieldError(DisplayKey.get("Web.Reinsurance.FacAgreement.Markup"), _agreement.MarkUp)
      requiredFieldError(DisplayKey.get("Web.Reinsurance.FacAgreement.Premium"), _agreement.CededPremium)
    }

    //other term fields
    if (_agreement typeis PerRisk) {
      requiredFieldError(DisplayKey.get("Web.Reinsurance.Treaty.CountTowardTotalLimit"), _agreement.CountTowardTotalLimit)
    }

  }

  private function validateCoverageLimitLargerThanOrEqualToAttachmentPoint() {
    // Validate Limit >= Attachment Point  (Could be =AP for special cases discussed later.)
    if (_agreement.CoverageLimit < _agreement.AttachmentPoint) {
      Result.addError(_agreementUnchanged, TC_DEFAULT, DisplayKey.get("Web.Reinsurance.Agreement.Verify.LimitToAttachPointError"))
    }
  }

  private function validateMaxRetentionLessThanOrEqualToAttachmentPoint() {
    // validate that Max Retention <= Attachment Point.
    if (_agreement typeis SurplusRITreaty) {
      if (_agreement.MaxRetention > _agreement.AttachmentPoint) {
        Result.addError(_agreementUnchanged, TC_DEFAULT, DisplayKey.get("Web.Reinsurance.Agreement.Verify.MaxRetentionToAttachPointError"))
      }
    }
  }

  private function validateParticipants() {
    if(_agreement.Participants.IsEmpty){
      Result.addError(_agreementUnchanged, TC_DEFAULT, DisplayKey.get("Web.Reinsurance.Agreement.Verify.NeedParticipants"))
    }else{
      var totalRisk = _agreement.Participants.sum(\ a -> a.RiskShare)
      if(totalRisk != 100){
        Result.addError(_agreementUnchanged, TC_DEFAULT, DisplayKey.get("Web.Reinsurance.Agreement.Verify.TotalRiskShare"))
      }
      var countUnique = _agreement.Participants*.Participant*.ID.toSet().Count
      if(countUnique < _agreement.Participants.Count){
        Result.addError(_agreementUnchanged, TC_DEFAULT, DisplayKey.get("Web.Reinsurance.Agreement.Verify.DuplicateParticipants"))
      }
    }
  }

  private function requiredFieldError(fieldName : String, value : Object) {
    if (value == null) {
      Result.addError(_agreement, TC_DEFAULT, DisplayKey.get("Java.Validation.MissingRequired", fieldName))
    }
  }

  function validateForRisk(ririsk : RIRisk) {
    for(error in ririsk.canAttach(_agreement)){
      Result.addError(_agreement, TC_DEFAULT, error)
    }
  }

  static function validateUI(agreement : RIAgreement) {
    PCValidationContext.doPageLevelValidation( \ context -> new RIAgreementValidation(context, agreement).validate())
  }

  static function validateAgainstRisk(agreement : RIAgreement, ririsk : RIRisk) {
    var context = ValidationUtil.createContext(TC_DEFAULT)
    var validation = new RIAgreementValidation(context, agreement)
    validation.validateForRisk(ririsk)
    context.raiseExceptionIfProblemsFound()
  }
}