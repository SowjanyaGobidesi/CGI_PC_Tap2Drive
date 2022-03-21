package gw.api.databuilder.pa
uses gw.api.builder.ModifierBuilder

@Export
class PAVehicleModifierBuilder extends ModifierBuilder<PAVehicleModifier, PAVehicleModifierBuilder> {

  construct() {
    super(PAVehicleModifier)
  }
  
}
