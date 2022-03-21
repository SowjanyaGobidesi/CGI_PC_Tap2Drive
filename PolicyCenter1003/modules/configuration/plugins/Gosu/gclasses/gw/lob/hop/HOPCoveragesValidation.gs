package gw.lob.hop

uses gw.api.locale.DisplayKey
uses gw.util.GosuStringUtil
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext

@Export
class HOPCoveragesValidation extends PCValidationBase {

  private static var HOP_COVERAGES_WIZARD_STEP = "HOPCoverages"

  var _hopLine: entity.HOPLine
  var _hopDwelling: HOPDwelling

  construct(valContext: PCValidationContext, line: entity.HOPLine) {
    super(valContext)
    _hopLine = line
    _hopDwelling = _hopLine.HOPDwellings.first()
  }

  /**
   * Validates the coverages on a <code>HOPLine</code> entity.
   */
  override function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    // Line level validations
    validateTrust()
    validateAssistedLivingCare()
    validateValuablePersonalProperty()
    validateScheduledPersonalProperty()
    // Dwelling level validations
    validateCoverageALimit()
    validateLandlordsFurnishings()
    validateGolfCarts()
  }

  /**
   * Validates data presented on the Coverages step of a Homeowners wizard. This executes validations for all of the
   * coverages on the HOP line.
   *
   * @param hopLine The HOP line whose coverages should be validated
   */
  static function validateCoveragesStep(hopLine: entity.HOPLine) {
    PCValidationContext.doPageLevelValidation(\context -> {
      var validation = new HOPCoveragesValidation(context, hopLine)
      validation.validate()
    })
  }

  // ------------------------------ Dwelling level validations

  /**
   * Validates that the Coverage A limit is not greater than the estimated replacement cost
   */
  function validateCoverageALimit() {
    Context.addToVisited(this, "validateCoverageALimit")
    // The Coverage A limit must not be greater than Estimated Replacement Cost
    if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE) and
        _hopDwelling.HOPCovAExists and
        _hopDwelling.HOPCovA.HOPCovALimitTerm.Value.ofCurrency(_hopDwelling.HOPCovA.Currency) > _hopDwelling.ReplacementCost) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.CoverageA.LimitExceedsEstimatedReplacementCost")
      Result.addError(_hopDwelling, Level, reason, HOP_COVERAGES_WIZARD_STEP)
    }
  }

  /**
   * Validates that the rental unit description is specified for for all landlord furnishings schedule items.
   */
  function validateLandlordsFurnishings() {
    Context.addToVisited(this, "validateLandlordsFurnishings")
    // Each scheduled item must contain a description of the rental unit. If not, raise an error.
    if (Context.isAtLeast(ValidationLevel.TC_BINDABLE) and
        _hopDwelling.HOPScheduledLandlordsFurnishingExists and
        _hopDwelling.HOPScheduledLandlordsFurnishing
            .ScheduledItemHOPScheduledLandlordsFurnishingSchedList
            .hasMatch(\item -> GosuStringUtil.isBlank(item.RentalUnitDescription))) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.LandlordsFurnishings.RentalUnitDescriptionRequired")
      Result.addError(_hopDwelling, Level, reason, HOP_COVERAGES_WIZARD_STEP)
    }
  }

  /**
   * Validates that make/model and serial number are specified for all golf cart scheduled items.
   */
  function validateGolfCarts() {
    Context.addToVisited(this, "validateGolfCarts")
    // Each scheduled item must contain a make/mode and a serial number. If not, raise an error.
    if (Context.isAtLeast(ValidationLevel.TC_BINDABLE) and
        _hopDwelling.HOPGolfCartExists and
        _hopDwelling.HOPGolfCart
            .ScheduledItemHOPGolfCartSchedList
            .hasMatch(\item -> GosuStringUtil.isBlank(item.MakeModel) or GosuStringUtil.isBlank(item.SerialNo))) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.GolfCarts.FieldsRequired")
      Result.addError(_hopDwelling, Level, reason, HOP_COVERAGES_WIZARD_STEP)
    }
  }

  // ------------------------------ Line level validations

  function validateTrust() {
    Context.addToVisited(this, "validateTrust")
    if (Context.isAtLeast(ValidationLevel.TC_BINDABLE) and
        _hopLine.HOPTrustExists and
        _hopLine.HOPTrust.ScheduledItemHOPTrustSchedList
            .hasMatch(\item -> GosuStringUtil.isBlank(item.TrusteeAddress))) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.Trust.TrusteeAddressRequired")
      Result.addError(_hopLine, Level, reason, HOP_COVERAGES_WIZARD_STEP)
    }
  }

  function validateAssistedLivingCare() {
    Context.addToVisited(this, "validateAssistedLivingCare")
    if (Context.isAtLeast(ValidationLevel.TC_BINDABLE) and
        _hopLine.HOPAssistedLivingCareExists and
        _hopLine.HOPAssistedLivingCare.ScheduledItemHOPAssistedLivingCareSchedList
            .hasMatch(\item -> GosuStringUtil.isBlank(item.FacilityName) or GosuStringUtil.isBlank(item.FacilityLocation))) {
      var reason = DisplayKey.get("Web.Policy.HOP.Validation.AssistedLivingCare.FieldsRequired")
      Result.addError(_hopLine, Level, reason, HOP_COVERAGES_WIZARD_STEP)
    }
  }

  function validateValuablePersonalProperty() {
    Context.addToVisited(this, "validateValuablePersonalProperty")
    if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE) and
        _hopLine.HOPValuablePersonalPropertyExists) {
      // Item limit exceeds aggregate limit on any scheduled items?
      if (_hopLine.HOPValuablePersonalProperty.ScheduledItems*.Clauses.cast(HOPValuablePersonalPropertyItem)
          .hasMatch(\item -> item.HOPValuablePersonalPropertyItemPerItemLimitTerm.Value > item.HOPValuablePersonalPropertyItemAggregateLimitTerm.Value)) {
        var reason = DisplayKey.get("Web.Policy.HOP.Validation.ValuablePersonalProperty.ItemLimitExceedsAggregateLimit")
        Result.addError(_hopDwelling, Level, reason, HOP_COVERAGES_WIZARD_STEP)
      }
      // Aggregate limit exceed Coverage C limit value on any scheduled item?
      var covCLimitTermValue = _hopDwelling.HOPCovC.HOPCovCDirectLimitTerm.Value
      if (_hopLine.HOPValuablePersonalProperty.ScheduledItems*.Clauses.cast(HOPValuablePersonalPropertyItem)
          .hasMatch(\item -> item.HOPValuablePersonalPropertyItemAggregateLimitTerm.Value > covCLimitTermValue)) {
        var reason = DisplayKey.get("Web.Policy.HOP.Validation.ValuablePersonalProperty.AggregateLimitExceedsCovCTermValue")
        Result.addError(_hopDwelling, Level, reason, HOP_COVERAGES_WIZARD_STEP)
      }
    }
  }

  function validateScheduledPersonalProperty() {
    Context.addToVisited(this, "validateScheduledPersonalProperty")
    if (Context.isAtLeast(ValidationLevel.TC_QUOTABLE) and
        _hopLine.HOPScheduledPersonalPropertyExists) {
      // Aggregate limit exceed Coverage C limit value on any scheduled item?
      var covCLimitTermValue = _hopDwelling.HOPCovC.HOPCovCDirectLimitTerm.Value
      if (_hopLine.HOPScheduledPersonalProperty.ScheduledItems*.Clauses.cast(HOPScheduledPersonalPropertyItem)
          .hasMatch(\item -> item.HOPScheduledPersonalPropertyItemLimitTerm.Value > covCLimitTermValue)) {
        var reason = DisplayKey.get("Web.Policy.HOP.Validation.ScheduledPersonalProperty.AggregateLimitExceedsCovCTermValue")
        Result.addError(_hopDwelling, Level, reason, HOP_COVERAGES_WIZARD_STEP)
      }
    }
  }
}