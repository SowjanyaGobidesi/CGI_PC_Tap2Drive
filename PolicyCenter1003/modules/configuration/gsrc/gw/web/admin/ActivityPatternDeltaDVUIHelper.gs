package gw.web.admin

uses gw.document.GosuCaseInsensitiveBackwardsCompatibleSymbolProvider
uses gw.document.SimpleSymbol
uses gw.document.SymbolProvider

@Export
class ActivityPatternDeltaDVUIHelper {
  public static function getEmailDisplayName(templateFilename : String) : String {
    if (templateFilename == null) {
      return null
    }
    var ets = gw.plugin.Plugins.get(gw.plugin.email.IEmailTemplateSource)
    return ets.getEmailTemplate(templateFilename).getName()
  }

  public static function createEmailTemplateSearchCriteria(activityPattern : entity.ActivityPattern) : gw.api.email.EmailTemplateSearchCriteria {
    var rtn = new gw.api.email.EmailTemplateSearchCriteria()
    switch (activityPattern.PatternLevel) {
      case TC_JOB : rtn.AvailableSymbols = { "Job", "Policy", "PolicyPeriod", "Account", "Activity" }
          break
      case TC_ACCOUNT : rtn.AvailableSymbols = { "Account", "Activity" }
          break
        default : rtn.AvailableSymbols = { "Activity" }
    }
    return rtn
  }

  public static function createAvailSymbols(activityPattern : entity.ActivityPattern) : SymbolProvider {
    var simpleSymbolProvider =
        new GosuCaseInsensitiveBackwardsCompatibleSymbolProvider()
    switch (activityPattern.PatternLevel) {
      case TC_JOB :
      case TC_ALL :
          simpleSymbolProvider.addSymbols({
              "Job" -> new SimpleSymbol(entity.Job, new Object()),
              "Policy" -> new SimpleSymbol(entity.Policy, new Object()),
              "PolicyPeriod" -> new SimpleSymbol(entity.PolicyPeriod, new Object()),
              "Account" -> new SimpleSymbol(entity.Account, new Object()),
              "Activity" -> new SimpleSymbol(entity.Activity, new Object())
          })
        break
      case TC_ACCOUNT :
        simpleSymbolProvider.addSymbols({
            "Account" -> new SimpleSymbol(entity.Account, new Object()),
            "Activity" -> new SimpleSymbol(entity.Activity, new Object())
        })
        break
      case TC_POLICY :
        simpleSymbolProvider.addSymbols({
            "Policy" -> new SimpleSymbol(entity.Policy, new Object()),
            "PolicyPeriod" -> new SimpleSymbol(entity.PolicyPeriod, new Object()),
            "Activity" -> new SimpleSymbol(entity.Activity, new Object())
        })
        break
      default :
        simpleSymbolProvider.addSymbols({
            "Activity" -> new SimpleSymbol(entity.Activity, new Object())
        })
        break
    }
    return simpleSymbolProvider
  }
}