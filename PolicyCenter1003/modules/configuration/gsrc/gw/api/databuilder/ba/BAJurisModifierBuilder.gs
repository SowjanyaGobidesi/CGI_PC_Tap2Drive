package gw.api.databuilder.ba
uses gw.api.locale.DisplayKey
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses gw.api.productmodel.ModifierPattern
uses java.lang.IllegalStateException
uses java.math.BigDecimal
uses java.math.RoundingMode
uses gw.api.upgrade.PCCoercions

@Export
class BAJurisModifierBuilder extends DataBuilder<BAJurisModifier, BAJurisModifierBuilder> {

  var _modifierPatternCode : String

  construct(modifierPatternCode : String) {
      super(BAJurisModifier)
      _modifierPatternCode = modifierPatternCode
  }

  protected override function createBean(context : BuilderContext) : BAJurisModifier {
    var juris = context.ParentBean as BAJurisdiction
    var pattern = PCCoercions.makeProductModel<ModifierPattern>(_modifierPatternCode)
    if (pattern == null) {
      throw new IllegalStateException(DisplayKey.get("Builder.BAModifier.Error.InvalidPatternCode", _modifierPatternCode))
    }
    juris.syncModifiers()
    var modifier = juris.getModifier(pattern)
    if (modifier == null) {
      throw new IllegalStateException(DisplayKey.get("Builder.BAModifier.Error.InvalidPattern", pattern))
    }
    return modifier as BAJurisModifier
  }

  function withRateValue(value : double) : BAJurisModifierBuilder {
    var doubleVal = BigDecimal.valueOf(value).setScale(4, RoundingMode.FLOOR)
    set(BAJurisModifier.Type.TypeInfo.getProperty("RateModifier"), doubleVal)
    return this
  }

  function withBooleanValue(value : boolean) : BAJurisModifierBuilder {
    set(BAJurisModifier.Type.TypeInfo.getProperty("BooleanModifier"), value)
    return this
  }
}
