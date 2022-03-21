package gw.api.databuilder.pa
uses gw.api.databuilder.contact.AdditionalInterestDetailBuilder

@Export
class PAVehicleAdditionalInterestBuilder extends AdditionalInterestDetailBuilder<PAVhcleAddlInterest, PAVehicleAdditionalInterestBuilder>
{
  construct()
  {
    super(PAVhcleAddlInterest)
  }
}
