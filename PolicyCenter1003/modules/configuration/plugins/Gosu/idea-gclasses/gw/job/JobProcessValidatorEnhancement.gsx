package gw.job

enhancement JobProcessValidatorEnhancement: JobProcessValidator {
  static function isSupportedValidationLevel(level : ValidationLevel) : boolean {
    return level == ValidationLevel.TC_BINDABLE or level == ValidationLevel.TC_READYFORISSUE
  }
}
