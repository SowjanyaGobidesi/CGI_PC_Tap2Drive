package gw.scriptparameter

enhancement ScriptParametersEnhancement: ScriptParameters {

  public static property get EnableDisplayBasicSearchTab(): Boolean {
    return ScriptParameters.getParameterValue("EnableDisplayBasicSearchTab") as Boolean
  }

  public static property get HOPQuoteLevel1Indent(): Integer {
    return ScriptParameters.getParameterValue("HOPQuoteLevel1Indent") as Integer
  }

  public static property get HOPQuoteLevel2Indent(): Integer {
    return ScriptParameters.getParameterValue("HOPQuoteLevel2Indent") as Integer
  }

  public static property get HOPQuoteLevel3Indent(): Integer {
    return ScriptParameters.getParameterValue("HOPQuoteLevel3Indent") as Integer
  }
}
