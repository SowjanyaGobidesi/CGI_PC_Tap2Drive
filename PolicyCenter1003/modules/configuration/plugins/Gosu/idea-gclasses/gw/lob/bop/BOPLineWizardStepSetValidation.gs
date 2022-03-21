package gw.lob.bop
uses gw.validation.PCValidationContext
uses gw.validation.ValidationUtil

/**
 * Utility class for validation needed for the BusinessOwners wizard step.
 *
 * @see gw.lob.bop.BOPLineWizardStepSetValidation#validateContextAndAdditionalInsuredAndTypeUnique(entity.BusinessOwnersLine) validateContextAndAdditionalInsuredAndTypeUnique(BusinessOwnersLine)
 */
@Export
class BOPLineWizardStepSetValidation {

  /**
   * LineWizardStepSet.BusinessOwners.pcf needs special validation logic on change, that being 
   * that the coverages need to be verified and that for each unique additionalInsured on the 
   * BOPLine, there cannot be duplicate type details. Though this functionality resides in 
   * BOPLineValidation, having a method on the line validation to validate a subset of the 
   * possible validations (with no connection other than the page requiring the validation)
   * does not make sense.
   */
  static function validateContextAndAdditionalInsuredAndTypeUnique(bopLine : entity.BusinessOwnersLine) {
    var context = ValidationUtil.createContext(ValidationLevel.TC_DEFAULT)
    var validator = new BOPLineValidation(context, bopLine)
    validator.additionalInsuredAndTypeUnique()
    validator.checkCoverages()
    context.raiseExceptionIfProblemsFound()    
  }
  
}
