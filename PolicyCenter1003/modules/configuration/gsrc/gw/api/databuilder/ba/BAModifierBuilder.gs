package gw.api.databuilder.ba
uses entity.*
uses gw.api.locale.DisplayKey
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses gw.api.productmodel.ModifierPattern
uses java.lang.IllegalStateException
uses java.math.RoundingMode
uses java.math.BigDecimal
uses gw.api.upgrade.PCCoercions

@Export
class BAModifierBuilder extends DataBuilder<BAModifier, BAModifierBuilder> {

  var _modifierPatternCode : String

  construct(modifierPatternCode : String) {
      super(BAModifier)
      _modifierPatternCode = modifierPatternCode
  }

  protected override function createBean(context : BuilderContext) : BAModifier {
    var line = context.ParentBean as entity.BusinessAutoLine
    var pattern = PCCoercions.makeProductModel<ModifierPattern>(_modifierPatternCode)
    if (pattern == null) {
      throw new IllegalStateException(DisplayKey.get("Builder.BAModifier.Error.InvalidPatternCode", _modifierPatternCode))
    }
    line.syncModifiers()
    var modifier = line.getModifier(pattern)
    if (modifier == null) {
      throw new IllegalStateException(DisplayKey.get("Builder.BAModifier.Error.InvalidPattern", pattern))
    }
    return modifier as BAModifier
  }

  function withRateValue(value : double) : BAModifierBuilder {
    var doubleVal = BigDecimal.valueOf(value).setScale(4, RoundingMode.FLOOR)
    set(BAModifier.Type.TypeInfo.getProperty("RateModifier"), doubleVal)
    return this
  }

  function withBooleanValue(value : boolean) : BAModifierBuilder {
    set(BAModifier.Type.TypeInfo.getProperty("BooleanModifier"), value)
    return this
  }
}
