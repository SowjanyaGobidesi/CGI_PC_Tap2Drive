package gw.bizrules.provisioning

uses com.guidewire.pl.system.dependency.PLDependencies
uses gw.api.locale.DisplayKey
uses gw.api.util.LocaleUtil
uses gw.bizrules.CommandParameterDefinition

uses java.lang.IllegalArgumentException
uses java.util.Map

@Export
class LocalizedRuleActionParameter {
  private final var _name: String
  private final var _required: boolean
  private final var _labelKey: String
  private final var _langParams: Map<LanguageType, LangParam>

  construct(name: String, required: boolean, labelKey: String) {
    if (not PLDependencies.getLanguages().hasProperty(labelKey)) {
      throw new IllegalArgumentException("Could not find a value for displayKey '${labelKey}'")
    }
    _name = name
    _required = required
    _labelKey = labelKey
    _langParams = LocaleUtil.AllLanguages.mapToKeyAndValue(\l -> l, \l -> new LangParam(l))
  }

  property get Label(): String {
    return DisplayKey.get(_labelKey)
  }

  /**
   * @returns the parameters sorted by language name with the current language parameter moved to the top
   */
  property get AllLangParams(): LangParam[] {
    var orderedLanguages = _langParams.Keys.toList().sort(\l1, l2 -> l1.DisplayName < l2.DisplayName)
    orderedLanguages.remove(LocaleUtil.CurrentLanguageType)
    orderedLanguages.add(0, LocaleUtil.CurrentLanguageType)
    return orderedLanguages.map(\lang -> _langParams[lang]).toTypedArray()
  }

  property get CurrentLangParam(): LangParam {
    return langParamFor(LocaleUtil.CurrentLanguageType)
  }

  function langParamFor(lang: LanguageType): LangParam {
    return _langParams[lang]
  }

  function eachLangParam(action: block(p: LangParam)) {
    AllLangParams.each(\p -> action(p))
  }

  class LangParam {
    private var _paramDefinition: CommandParameterDefinition as ParameterDefinition
    private var _paramName: String as ParameterName
    private var _paramLabel: block():String as ParameterLabel
    private var _lang: LanguageType as Language

    construct(lang: LanguageType) {
      _lang = lang
      _paramLabel = \ -> lang.DisplayName
      _paramName = langKey(lang)
      _paramDefinition = new CommandParameterDefinition(String, outer._required, _paramLabel)
    }
  }

  private function langKey(lang: LanguageType): String {
    return _name + ":" + lang.Code
  }
}