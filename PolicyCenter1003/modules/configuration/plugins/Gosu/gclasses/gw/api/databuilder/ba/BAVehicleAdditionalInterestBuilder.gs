package gw.api.databuilder.ba
uses gw.api.databuilder.contact.AdditionalInterestDetailBuilder

@Export
class BAVehicleAdditionalInterestBuilder extends AdditionalInterestDetailBuilder<BAVhcleAddlInterest, BAVehicleAdditionalInterestBuilder>
{
  construct()
  {
    super(BAVhcleAddlInterest)
  }
}
