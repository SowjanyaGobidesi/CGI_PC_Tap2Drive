package gw.api.databuilder.hop

uses gw.api.databuilder.contact.AdditionalInterestDetailBuilder

@Export
class HOPDwellingAdditionalInterestBuilder extends AdditionalInterestDetailBuilder<HOPDwellAddlInterest, HOPDwellingAdditionalInterestBuilder> {
  construct() {
    super(HOPDwellAddlInterest)
  }

  function withDescription(description : String) : HOPDwellingAdditionalInterestBuilder {
    set(HOPDwellAddlInterest#Description, description)
    return this
  }

  function withAddlIntEffDate(effDate : Date) : HOPDwellingAdditionalInterestBuilder {
    set(HOPDwellAddlInterest#AddlIntEffDate, effDate)
    return this
  }

  function withAddlIntExpDate(expDate : Date) : HOPDwellingAdditionalInterestBuilder {
    set(HOPDwellAddlInterest#AddlIntExpDate, expDate)
    return this
  }
}