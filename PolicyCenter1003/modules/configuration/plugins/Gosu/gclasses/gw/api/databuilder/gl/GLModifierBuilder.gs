package gw.api.databuilder.gl
uses gw.api.locale.DisplayKey
uses gw.api.builder.ModifierBuilder
uses gw.api.productmodel.ModifierPattern
uses java.lang.IllegalStateException
uses gw.api.upgrade.PCCoercions

@Export
class GLModifierBuilder extends ModifierBuilder<GLModifier, GLModifierBuilder>{

  construct(modifierPatternCode : String) {
    super(GLModifier)
    var pattern = PCCoercions.makeProductModel<ModifierPattern>(modifierPatternCode)
    if (pattern == null) {
      throw new IllegalStateException(DisplayKey.get("Builder.CPModifier.Error.InvalidPatternCode", modifierPatternCode))
    }
    withPattern(pattern)
  }
}
