package gw.api.databuilder.hop

uses gw.api.databuilder.DataBuilder

@Export
class HOPDwellingAnimalBuilder extends DataBuilder<DwellingAnimal, HOPDwellingAnimalBuilder> {
  construct() {
    super(DwellingAnimal.TYPE.get())
    withAnimalType(AnimalType.TC_DOG)
    withAnimalBreed(AnimalBreed.TC_PITBULLS)
    withBiteHistory(false)
  }

  final function withAnimalType(type: AnimalType) : HOPDwellingAnimalBuilder {
    set(DwellingAnimal#AnimalType, type)
    return this
  }

  final function withAnimalBreed(breed: AnimalBreed) : HOPDwellingAnimalBuilder {
    set(DwellingAnimal#AnimalBreed, breed)
    return this
  }

  final function withBiteHistory(biteHistory: boolean) : HOPDwellingAnimalBuilder {
    set(DwellingAnimal#AnimalBiteHistory, biteHistory)
    return this
  }

  final function withAdditionalInformation(additionalInformation: String) : HOPDwellingAnimalBuilder {
    set(DwellingAnimal#AdditionalInformation, additionalInformation)
    return this
  }
}