package gw.lob.im

uses gw.api.locale.DisplayKey
uses gw.validation.PCValidationContext
uses gw.policy.PolicyLineValidation
uses java.lang.IllegalArgumentException
uses gw.lob.im.sign.IMSignPartValidation
uses gw.lob.im.contractorsequip.ContractorsEquipmentPartValidation
uses gw.lob.im.ar.IMARPartValidation
uses gw.lob.common.AnswerValidation
uses java.lang.UnsupportedOperationException

@Export
class IMLineValidation extends PolicyLineValidation<entity.InlandMarineLine> {
  
  property get imLine() : entity.InlandMarineLine {
    return Line
  }
  
  construct( valContext : PCValidationContext, polline : entity.InlandMarineLine ) {
    super(valContext, polline)
  }

  /**
   * Validate the IM Line.
   *
   * Checks the following:
   * <ul>
   *   <li>Parts are valid</li>
   *   <li>Answers are valid</li>
   * </ul>
   */
  override function doValidate() {
    checkParts()
    checkAnswers()
  }

  override function validateLineForAudit() {
    throw new UnsupportedOperationException(DisplayKey.get("Validator.UnsupportedAuditLineError"))
  }

  /**
   * Calls {@link gw.lob.common.AnswerValidation} to validate answers on the line
   * @see gw.lob.common.AnswerValidation#checkRequiredAnswers()
   * @see gw.lob.common.AnswerValidation#validateCorrectnessOfAnswers()
   */
  function checkAnswers() {
    Context.addToVisited( this, "checkAnswers" )
    new AnswerValidation( Context, Line, Line.Answers, "impartstep" ).validate()
  }

  /**
   * Static method that can be called from the UI to dynamically route to the correct part page
   * @param part the IMCoveragePart from the page
   * @param covPart the IMCoveragePart that failed validation -
   * @return true if the current page should handle the validation for the given Object
   */
  static function handleValidationForDynamicSteps(part : typekey.IMCoveragePart, covPart : Object) : boolean {
    if (part == null or covPart == null) {
      return false
    }

    // exit early if covPart is not a subtype of IMCoveragePart
    if (!(covPart typeis IMCoveragePart)) {
      return false
    }

    return part.Code == (covPart as IMCoveragePart).Subtype.Code
  }

  /**
   * Do page level validations on the supplemental questions by calling {@link #checkAnswers()}
   * to make sure that the supplemental questions are answered correctly
   * @param line = the {@link entity.IMLine} to validate
   */
  static function validateSupplementalQuestons(line : IMLine) {
    PCValidationContext.doPageLevelValidation( \ context -> {
      var val = new IMLineValidation(context, line)
      val.checkAnswers()
    })
  }
  
  /**
   * Creates a new coverage part validation given the {@link entity.IMCoveragePart} and then validates the part
   * @param valContext - the {@link gw.validation.PCValidation} used to create the validation object
   * @param part - the {@link entity.IMCoveragePart} that is used to determine which coverage part validation to generate
   */
  static function validateSinglePart(valContext: PCValidationContext, part : IMCoveragePart) {
     switch (part.Subtype ) {
        case TC_IMSIGNPART :
          new IMSignPartValidation( valContext, part as IMSignPart ).validate()
          break
        case TC_CONTRACTORSEQUIPPART :
          new ContractorsEquipmentPartValidation( valContext, part as ContractorsEquipPart).validate()
          break
        case TC_IMACCOUNTSRECPART :
          new IMARPartValidation( valContext, part as IMAccountsRecPart).validate()
          break
        default :
          throw new IllegalArgumentException( DisplayKey.get("Web.Policy.IM.Validation.UnknownPart") + part.Subtype.Code )
      }
  } 

  /**
   * Do page level validation on the given part by calling {@link #validateSinglePart(gw.validation.PCValidationContext, entity.IMCoveragePart)}}
   * @param part - the {@link entity.IMCoveragePart}
   */
  static function validateSinglePartAsPage(part : IMCoveragePart) {
    PCValidationContext.doPageLevelValidation( \ context -> {
      IMLineValidation.validateSinglePart(context, part)
     })
  }

  private function checkParts() {
    imLine.IMCoverageParts.each( \ covpart -> validateSinglePart(Context, covpart) )
  }
}
