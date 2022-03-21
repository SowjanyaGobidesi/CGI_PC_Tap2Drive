package gw.api.databuilder.hop

uses entity.HOPLineMod
uses gw.api.builder.ModifierBuilder

@Export
class HOPLineModBuilder extends ModifierBuilder<HOPLineMod, HOPLineModBuilder> {

  construct() {
    super(HOPLineMod)
  }
}