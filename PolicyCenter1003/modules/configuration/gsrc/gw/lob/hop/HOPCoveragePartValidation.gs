package gw.lob.hop

uses gw.api.locale.DisplayKey
uses gw.validation.PCValidationBase
uses gw.validation.PCValidationContext

@Export
class HOPCoveragePartValidation extends PCValidationBase {
  var _hopCoveragePart : HOPCoveragePart

  construct(valContext : PCValidationContext, coveragePart : HOPCoveragePart) {
    super(valContext)
    _hopCoveragePart = coveragePart
  }

  /**
   * Validates a <code>HOPCoveragePart</code> entity. This includes validating:
   * <ul>
   *   <li>The dwellings on the coverage part</li>
   * </ul>
   */
  override function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    validateHOPDwellings()
  }

  /**
   * Validates the dwellings of a coverage part. This checks that there is exactly one dwelling, and validates that
   * dwelling using {@link HOPDwellingValidation}.
   */
  function validateHOPDwellings() {
    Context.addToVisited(this, "validateHOPDwellings")
    if (_hopCoveragePart.HOPDwellings.Count != 1) {
      Result.addError(_hopCoveragePart, ValidationLevel.TC_QUOTABLE, DisplayKey.get("Web.Policy.HOP.Validation.SingleDwelling"))
    } else {
      new HOPDwellingValidation(Context, _hopCoveragePart.HOPDwellings.single()).validate()
    }
  }
}