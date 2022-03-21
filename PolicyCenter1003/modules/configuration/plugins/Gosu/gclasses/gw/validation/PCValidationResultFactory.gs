package gw.validation

/**
 * Factory that will allow using custom implementation of PCValidationResult during class validation.
 */
@Export
class PCValidationResultFactory implements IPCValidationResultFactory {
  public function createValidationResult() : PCValidationResult {
    return new PCValidationResult()
  }
}