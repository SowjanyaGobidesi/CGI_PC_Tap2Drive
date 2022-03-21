package gw.api.databuilder.hop

uses gw.api.databuilder.DataBuilder

@Export
class HOPDwellingHazardBuilder extends DataBuilder<DwellingHazard, HOPDwellingHazardBuilder> {
  construct() {
    super(DwellingHazard.TYPE.get())
    withSpecificHazard(SpecificHazard.TC_TIDALWATER)
    withHazardType(HazardType.TC_PROPERTY)
    withAdditionalInformation("Tides are 10ft high.")
  }

  final function withSpecificHazard(type: SpecificHazard) : HOPDwellingHazardBuilder {
    set(DwellingHazard#SpecificHazard, type)
    return this
  }

  final function withHazardType(type: HazardType) : HOPDwellingHazardBuilder {
    set(DwellingHazard#HazardType, type)
    return this
  }

  final function withAdditionalInformation(additionalInformation : String) : HOPDwellingHazardBuilder {
    set(DwellingHazard#AdditionalInformation, additionalInformation)
    return this
  }
}