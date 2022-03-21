package gw.lob.hop

uses gw.api.locale.DisplayKey
uses gw.contact.PolicyAddlInsuredValidation
uses gw.policy.PolicyLineValidation
uses gw.validation.PCValidationContext

@Export
class HOPLineValidation extends PolicyLineValidation<entity.HOPLine> {
  property get HopLine(): entity.HOPLine {
    return Line
  }

  construct(valContext: PCValidationContext, polLine: entity.HOPLine) {
    super(valContext, polLine)
  }

  /**
   * Validates a <code>HOPLine</code> entity. This includes validating:
   * <ul>
   * <li>The coverage parts on the line</li>
   * <li>The coverages on the line</li>
   * <li>The additional insureds on the line</li>
   * </ul>
   */
  override function doValidate() {
    validateHOPCoverageParts()
    new HOPCoveragesValidation(Context, HopLine).validate()
    new PolicyAddlInsuredValidation(Context, HopLine.AdditionalInsureds, /*stepId=*/"HOPDwelling").validate()
  }

  /**
   * Validates the coverage parts of a HOP line. This checks that there is exactly one coverage part, and validates
   * that part using {@link HOPCoveragePartValidation}.
   */
  function validateHOPCoverageParts() {
    Context.addToVisited(this, "validateHOPCoverageParts")
    if (HopLine.HOPCoverageParts.Count != 1) {
      Result.addError(HopLine, ValidationLevel.TC_QUOTABLE, DisplayKey.get("Web.Policy.HOP.Validation.SingleCoveragePart"))
    } else {
      new HOPCoveragePartValidation(Context, HopLine.HOPCoverageParts.single()).validate()
    }
  }

  override function validateLineForAudit() {
    throw new UnsupportedOperationException(DisplayKey.get("Validator.UnsupportedAuditLineError"))
  }
}