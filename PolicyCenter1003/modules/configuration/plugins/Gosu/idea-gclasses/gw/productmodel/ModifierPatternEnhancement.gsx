package gw.productmodel
uses gw.api.productmodel.ModifierPattern
uses gw.api.upgrade.PCCoercions

enhancement ModifierPatternEnhancement : ModifierPattern {
  static property get ExpMod () : ModifierPattern { return PCCoercions.makeProductModel<ModifierPattern>("ExpMod")}
}
