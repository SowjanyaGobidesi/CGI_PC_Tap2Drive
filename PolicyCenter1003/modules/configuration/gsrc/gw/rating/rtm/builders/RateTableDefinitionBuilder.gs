package gw.rating.rtm.builders

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.util.LocaleUtil
uses gw.i18n.ILocale
uses gw.pcf.rating.ParameterSetHelper
uses gw.rating.flow.builders.CalcRoutineParameterSetBuilder
uses gw.rating.rtm.validation.RateTableDefinitionValidation
uses gw.validation.PCValidationContext

uses java.lang.Integer

@Export
class RateTableDefinitionBuilder extends DataBuilder<RateTableDefinition , RateTableDefinitionBuilder > {

  static final var _builderTag : String as PUBLICID_BUILDER_TAG = "pc:FromBuilder:"
  var doValidation = true
  var tableCode : String as RateTableCode
    
  construct() {
    super(RateTableDefinition)
    
    // forcing default values is safe here because the only things we default are primitive field values,
    // which will simply be overwritten if they are explicitly specified.
    withDefaults()

//    this.withTaggedPublicId()

    // add a populator which runs last (can't get a sequence number higher than Integer.MAX_VALUE).   Its only function
    // is to run the GUI-level validations.   Running these validations can be supressed by calling
    // .withValidation(false)
    this.addPopulator("Validation", Integer.MAX_VALUE, \ bean -> {
      if (doValidation) {
        var definition = bean as RateTableDefinition
        var valContext = new PCValidationContext(TC_DEFAULT)

        new RateTableDefinitionValidation(valContext, definition).validate()
        valContext.raiseExceptionIfProblemsFound()
      }
    })

    addPopulator(Integer.MAX_VALUE - 1, \ rateTableDef -> {
      populateDefaultArgumentSourceSet(rateTableDef as RateTableDefinition)
    })

  }

  private function populateDefaultArgumentSourceSet(rateTableDef : RateTableDefinition) {
    if (rateTableDef.MatchOps.HasElements) {
      if (rateTableDef.ArgumentSourceSets.IsEmpty) {

        var defaultSourceSet = new RateTableArgumentSourceSet(rateTableDef.Bundle)
        defaultSourceSet.Code = "DEFAULT"
        defaultSourceSet.Name = "Default"
        defaultSourceSet.RateTableDefinition = rateTableDef

        var iLocales : List<ILocale> = {}
        LocaleUtil.getAllLanguages().each( \ languageType -> iLocales.add(LocaleUtil.toLanguage(languageType)))

        iLocales.each( \ iLocale -> {
          LocaleUtil.runAsCurrentLocaleAndLanguage(iLocale, iLocale,
              \ -> { defaultSourceSet.Name = "Default" })
        })

        var helper = new ParameterSetHelper()
        var parameterSet = helper.getParamSets(rateTableDef.PolicyLine).first()
        if (parameterSet == null) {
          parameterSet = new CalcRoutineParameterSetBuilder().withDefaults().create()
        }
        defaultSourceSet.CalcRoutineParameterSet = parameterSet
        rateTableDef.addToArgumentSourceSets(defaultSourceSet)
      }

      //for tests that do not correctly populate the arugment source set with parameters
      if (rateTableDef.ArgumentSourceSets.Count == 1) {
        var sourceSet = rateTableDef.ArgumentSourceSets.single()
        if (sourceSet.RateTableArgumentSources.IsEmpty) {
          rateTableDef.MatchOps.each( \ op -> {
            var argSource = new RateTableArgumentSource(rateTableDef.Bundle)
            op.addToArgumentSources(argSource)
            argSource.Parameter = op
            sourceSet.addToRateTableArgumentSources(argSource)
          })
        }
      }
    }
  }

  final function withValidation(validate : boolean) : RateTableDefinitionBuilder {
    doValidation = validate
    return this
  }
  
  
  final function withTaggedPublicId() : RateTableDefinitionBuilder {
    this.withPublicId(PUBLICID_BUILDER_TAG + UniqueKeyGenerator.get().nextKey())
    return this
  }

  final function withDefaults() : RateTableDefinitionBuilder {
    named("TestTable")
    withCode("TestTable")
    withEntityName("DefaultRateFactorRow")
    withPolicyLine(gw.rating.rtm.util.ProductModelUtils.getAllPolicyLines().firstWhere(\ pLine -> pLine.contains("PersonalAuto")))
    return this
  }

  final function withCode(code : String) : RateTableDefinitionBuilder {
    set(RateTableDefinition.Type.TypeInfo.getProperty("TableCode"), code)
    this.tableCode = code
    return this
  }

  final function named(name : String) : RateTableDefinitionBuilder {
    set(RateTableDefinition.Type.TypeInfo.getProperty("TableName"), name)
    setForAllLanguages(RateTableDefinition#TableName.PropertyInfo, name)
    return this
  }

  final function withLocalizedNameFromDisplayKey(displayKey : String) : RateTableDefinitionBuilder {
    setLocalizedFieldFromDisplayKey(RateTableDefinition#TableName.PropertyInfo, displayKey)
    return this
  }

  function withDescription(desc : String) : RateTableDefinitionBuilder {
    set(RateTableDefinition.Type.TypeInfo.getProperty("TableDesc"), desc)
    return this
  }

  final function withPolicyLine(line : String) : RateTableDefinitionBuilder {
    set(RateTableDefinition.Type.TypeInfo.getProperty("PolicyLine"), line)
    return this
  }

  final function withEntityName(entityName : String) : RateTableDefinitionBuilder {
    set(RateTableDefinition.Type.TypeInfo.getProperty("EntityName"), entityName)
    return this
  }

  function addMatchOperation(op : RateTableMatchOpBuilder) : RateTableDefinitionBuilder {
    addArrayElement(RateTableDefinition.Type.TypeInfo.getProperty("MatchOps"), op)
    op.belongsTo(this)
    return this
  }
  
  function addFactor(factor : RateTableColumnBuilder) : RateTableDefinitionBuilder {
    addArrayElement(RateTableDefinition.Type.TypeInfo.getProperty("Factors"), factor)
    return this
  }
  
  function addArgumentSourceSet(argumentSourceSet : RateTableArgumentSourceSetBuilder) : RateTableDefinitionBuilder {
    addArrayElement(RateTableDefinition.Type.TypeInfo.getProperty("ArgumentSourceSets"), argumentSourceSet)
    return this
  }

  override function hashCode() : int {
    return this.RateTableCode.hashCode()
  }
  override function equals(other : Object) : boolean {
    if (this === other) {
      return true
    }
    if (other == null) return false
    if (other typeis RateTableDefinitionBuilder) {
      return this.RateTableCode == other.RateTableCode  
    } else {
      return false
    }
  }
}
