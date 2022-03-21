package gw.lob.hop

uses gw.api.locale.DisplayKey
uses gw.api.util.StateJurisdictionMappingUtil
uses gw.contact.PolicyAddlInsuredValidation
uses gw.util.GosuStringUtil
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext

@Export
class HOPDwellingValidation extends PCValidationBase {

  private static var POLICY_INFO_WIZARD_STEP = "PolicyInfo"
  private static var HOP_DWELLING_WIZARD_STEP = "HOPDwelling"
  private static var HOP_DWELLING_CONSTRUCTION_WIZARD_STEP = "HOPDwellingConstruction"

  var _hopDwelling : HOPDwelling

  construct(valContext : PCValidationContext, dwelling : HOPDwelling) {
    super(valContext)
    _hopDwelling = dwelling
  }

  /**
   * Validates a <code>HOPDwelling</code> entity. This includes validating the dwelling information that appears in
   * the Homeowners wizard:
   * <ul>
   *   <li>Data on the Details tab of the Dwelling step</li>
   *   <li>The fire protection class on the Dwelling step</li>
   *   <li>Data on the Additional Interests tab of the Dwelling step</li>
   *   <li>The animals on the Dwelling step</li>
   *   <li>Data on the Dwelling Construction step</li>
   *   <li>Qualification questions</li>
   *   <li>The base state</li>
   * </ul>
   */
  override function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    validateDetails()
    validateFireProtectionClass()
    validateAdditionalInterests()
    validateAnimals()
    validateDwellingConstruction()
    validateQualificationQuestions()
    validateBaseState()
  }

  /**
   * Validates data which appears on the Details tab of the Dwelling step in a Homeowners wizard. This checks:
   * <ul>
   *   <li>The dwelling location is only changed at permitted times</li>
   * </ul>
   */
  function validateDetails() {
    Context.addToVisited(this, "validateDetails")
    checkLocationChangesArePermitted()
  }

  private function checkLocationChangesArePermitted() {
    if (!_hopDwelling.CanEditLocation and LocationEdited) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.DwellingLocationChanged")
      Result.addFieldError(_hopDwelling, "Location", ValidationLevel.TC_QUOTABLE, reason, HOP_DWELLING_WIZARD_STEP)
    }
  }

  private property get LocationEdited() : boolean {
    // The dwelling location is considered edited in this job if a new dwelling was created, or if the dwelling
    // points to a different PolicyLocation than before, or if the account synced fields on the PolicyLocation
    // are different from before.
    return (_hopDwelling.BasedOn == null)
        || (_hopDwelling.Location.FixedId != _hopDwelling.BasedOn.Location.FixedId)
        || areLocationFieldsDifferent(_hopDwelling.Location, _hopDwelling.BasedOn.Location)
  }

  private function areLocationFieldsDifferent(loc1 : PolicyLocation, loc2 : PolicyLocation) : boolean {
    // Returns true if any of the account synced fields differ between loc1 and loc2
    return loc1.AccountSyncedFields.hasMatch(\ field -> field.getValue(loc1) != field.getValue(loc2))
  }

  /**
   * Validates the fire protection class. This checks:
   * <ul>
   *   <li>The fire protection class code is not null</li>
   * </ul>
   */
  function validateFireProtectionClass() {
    Context.addToVisited(this, "validateFireProtectionClass")
    // The protection class code must not be null
    if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE) and
        _hopDwelling.Location.FireProtectClass == null) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.FireProtectionClass.ValueRequired")
      Result.addError(_hopDwelling, Level, reason, HOP_DWELLING_WIZARD_STEP)
    }
  }

  /**
   * Validates qualification questions. This checks:
   * <ul>
   *   <li>If has a dog, insure that a dog exists on the animals list</li>
   *   <li>If owner occupied, insure that dwelling usage is "rental" and occupancy is not set or "owner occupied"</li>
   *   <li>If swimming pool, insure that swimming pool details are specified</li>
   * </ul>
   */
  function validateQualificationQuestions() {
    validateDog()
    validateDwellingOccupancy()
    validateSwimmingPool()
  }

  /**
   * Validates qualification questions. This checks:
   * <ul>
   *   <li>If has a dog, insure that a dog exists on the animals list</li>
   * </ul>
   */
  function validateDog() {
    Context.addToVisited(this, "validateDog")
    // If question "has a dog" is yes, insure that a dog exists on the animals list
    if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE) and
        isQuestionAnswered(_hopDwelling.Branch, "HOPPreQualDog", true) and
        _hopDwelling.DwellingAnimals.hasMatch(\elt -> elt.AnimalType == AnimalType.TC_DOG) == false) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.Animal.DogNotSpecified")
      Result.addWarning(_hopDwelling, Level, reason, HOP_DWELLING_WIZARD_STEP)
    }
  }

  /**
   * Validates qualification questions. This checks:
   * <ul>
   *   <li>If owner occupied, insure that dwelling usage is "rental" and occupancy is not set or "owner occupied"</li>
   * </ul>
   */
  function validateDwellingOccupancy() {
    Context.addToVisited(this, "validateDwellingOccupancy")
    // If question "who occupies this dwelling" is "myself", insure that dwelling usage is
    // "rental" and the occupancy is either not set or set to "owner occupied"
    if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE) and
        isQuestionChoiceSelected(_hopDwelling.Branch, "HOPPreQualOccupant", "HOPPreQualOccupantMyself")) {
      if (_hopDwelling.DwellingUsage == DwellingUsage.TC_RENTAL) {
        var reason = DisplayKey.get("Web.Policy.HOP.Validation.OwnerOccupant.InvalidUsage")
        Result.addFieldWarning(_hopDwelling, "DwellingUsage", Level, reason, HOP_DWELLING_WIZARD_STEP)
      }
      if (_hopDwelling.Occupancy != null and _hopDwelling.Occupancy != DwellingOccupancyType.TC_OWNER) {
        var reason = DisplayKey.get("Web.Policy.HOP.Validation.OwnerOccupant.InvalidOccupancy")
        Result.addFieldWarning(_hopDwelling, "Occupancy", Level, reason, HOP_DWELLING_WIZARD_STEP)
      }
    }
  }

  /**
   * Validates qualification questions. This checks:
   * <ul>
   *   <li>If swimming pool, insure that swimming pool details are specified</li>
   * </ul>
   */
  function validateSwimmingPool() {
    Context.addToVisited(this, "validateSwimmingPool")
    // If question "do you have a swimming pool" is yes, insure that swimming pool details are specified
    if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE) and
        isQuestionAnswered(_hopDwelling.Branch, "HOPPreQualSwimmingPool", true)) {
      var pool = _hopDwelling.SwimmingPool
      if (pool == null) {
        var reason = DisplayKey.get("Web.Policy.HOP.Validation.SwimmingPool.DetailsRequired")
        Result.addWarning(_hopDwelling, Level, reason, HOP_DWELLING_WIZARD_STEP)
      } else {
        if (pool.PoolType == null) {
          var reason = DisplayKey.get("Web.Policy.HOP.Validation.SwimmingPool.PoolTypeRequired")
          Result.addFieldWarning(pool, "PoolType", Level, reason, HOP_DWELLING_WIZARD_STEP)
        }
        if (pool.ApprovedFence == null) {
          var reason = DisplayKey.get("Web.Policy.HOP.Validation.SwimmingPool.IsApprovedFenceRequired")
          Result.addFieldWarning(pool, "ApprovedFence", Level, reason, HOP_DWELLING_WIZARD_STEP)
        }
        if (pool.DivingBoard == null) {
          var reason = DisplayKey.get("Web.Policy.HOP.Validation.SwimmingPool.HasDivingBoardRequired")
          Result.addFieldWarning(pool, "DivingBoard", Level, reason, HOP_DWELLING_WIZARD_STEP)
        }
        if (pool.Slide == null) {
          var reason = DisplayKey.get("Web.Policy.HOP.Validation.SwimmingPool.HasSlideRequired")
          Result.addFieldWarning(pool, "Slide", Level, reason, HOP_DWELLING_WIZARD_STEP)
        }
      }
    }
  }

  /**
   * Validates the base state. This checks:
   * <ul>
   *   <li>The policy base state matches that specified on the dwelling location</li>
   * </ul>
   */
  function validateBaseState() {
    Context.addToVisited(this, "validateBaseState")
    var policyPeriod = _hopDwelling.PolicyPeriod
    if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE) and
        policyPeriod.BaseState != StateJurisdictionMappingUtil.getJurisdictionMappingForState(_hopDwelling.Location.State)) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.BaseState.MustMatchDwellingLocation",
          policyPeriod.BaseState.DisplayName, _hopDwelling.Location.State.DisplayName)
      Result.addFieldError(policyPeriod, "BaseState", Level, reason, POLICY_INFO_WIZARD_STEP)
    }
  }

  /**
   * Validates all of the additional interests on a dwelling. This checks:
   * <ul>
   *   <li>The expiration date (if provided) is after the effective date (if provided)</li>
   * </ul>
   */
  function validateAdditionalInterests() {
    Context.addToVisited(this, "validateAdditionalInterests")
    for (additionalInterest in _hopDwelling.AdditionalInterests) {
      checkExpirationDateAfterEffectiveDate(additionalInterest)
    }
  }

  /**
   * Validates all of the animals on a dwelling. This checks:
   * <ul>
   *   <li>Animals with "Other" breed require additional information field to be completed</li>
   * </ul>
   */
  function validateAnimals() {
    Context.addToVisited(this, "validateAnimals")
    for (animal in _hopDwelling.DwellingAnimals) {
      if (animal.AnimalBreed == AnimalBreed.TC_OTHER && GosuStringUtil.isBlank(animal.AdditionalInformation)) {
        var reason = DisplayKey.get("Web.Policy.HOP.Validation.AnimalAddlInfoRequired")
        Result.addFieldError(animal, "AdditionalInformation", ValidationLevel.TC_DEFAULT, reason, HOP_DWELLING_WIZARD_STEP)
      }
    }
  }

  private function checkExpirationDateAfterEffectiveDate(addlInterest : HOPDwellAddlInterest) {
    var addlIntEffDate = addlInterest.AddlIntEffDate
    var addlIntExpDate = addlInterest.AddlIntExpDate
    if (addlIntExpDate != null and addlIntEffDate != null and !addlIntEffDate.before(addlIntExpDate)) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.AddlIntExpDateBeforeEffDate", addlIntExpDate.ShortFormat, addlIntEffDate.ShortFormat)
      Result.addFieldError(addlInterest, "AddlIntEffDate", ValidationLevel.TC_QUOTABLE, reason, HOP_DWELLING_WIZARD_STEP)
    }
  }

  /**
   * Validates data which appears on the Dwelling Construction step in a Homeowners wizard. This checks:
   * <ul>
   *   <li>The heating upgrade year (if provided) is on or after the year built (if provided)</li>
   * </ul>
   */
  function validateDwellingConstruction() {
    Context.addToVisited(this, "validateDwellingConstruction")
    checkHeatingUpgradeYearValid()
  }

  private function checkHeatingUpgradeYearValid() {
    var heatingUpgradeYear = _hopDwelling.HeatingUpgradeDate
    var yearBuilt = _hopDwelling.YearBuilt
    if (heatingUpgradeYear != null and yearBuilt != null and heatingUpgradeYear < yearBuilt) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.HeatingUpgradeYearTooEarly", heatingUpgradeYear, yearBuilt)
      Result.addFieldError(_hopDwelling, "HeatingUpgradeDate", ValidationLevel.TC_DEFAULT, reason, HOP_DWELLING_CONSTRUCTION_WIZARD_STEP)
    }
  }

  /**
   * Validates data presented on the Dwelling step of a Homeowners wizard. This includes:
   * <ul>
   *   <li>Fields on the Details tab</li>
   *   <li>Fields on the Additional Interests and Insureds tab</li>
   *   <li>The fire protection class</li>
   *   <li>The list view of animals</li>
   * </ul>
   * @param dwelling The dwelling to be validated
   */
  static function validateDwellingStep(dwelling: HOPDwelling) {
    PCValidationContext.doPageLevelValidation(\context -> {
      var validation = new HOPDwellingValidation(context, dwelling)
      validation.validateDetails()
      validation.validateAdditionalInterests()
      validation.validateFireProtectionClass()
      validation.validateAnimals()
      new PolicyAddlInsuredValidation(context, dwelling.PolicyLine.AdditionalInsureds, HOP_DWELLING_WIZARD_STEP).validate()
    })
  }

  /**
   * Validates data presented on the Dwelling Construction step of a Homeowners wizard.
   * @param dwelling The dwelling to be validated
   */
  static function validateDwellingConstructionStep(dwelling : HOPDwelling) {
    PCValidationContext.doPageLevelValidation(\ context -> {
      var validation = new HOPDwellingValidation(context, dwelling)
      validation.validateDwellingConstruction()
    })
  }

  static function isQuestionAnswered(policyPeriod: PolicyPeriod, questionCodeIdentifier: String, answerValue: Object): boolean {
    return policyPeriod.getAnswer(gw.api.productmodel.QuestionLookup.getByCodeIdentifier(questionCodeIdentifier)).AnswerValue == answerValue
  }

  static function isQuestionChoiceSelected(policyPeriod: PolicyPeriod, questionCodeIdentifier: String, choiceCode: String): boolean {
    return policyPeriod.getAnswer(gw.api.productmodel.QuestionLookup.getByCodeIdentifier(questionCodeIdentifier)).ChoiceAnswer.ChoiceCode == choiceCode
  }
}