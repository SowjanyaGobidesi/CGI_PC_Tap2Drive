package gw.api.databuilder.hop

uses entity.HOPDwellingMod
uses gw.api.builder.ModifierBuilder

@Export
class HOPDwellingModBuilder extends ModifierBuilder<HOPDwellingMod, HOPDwellingModBuilder> {

  construct() {
    super(HOPDwellingMod)
  }
}