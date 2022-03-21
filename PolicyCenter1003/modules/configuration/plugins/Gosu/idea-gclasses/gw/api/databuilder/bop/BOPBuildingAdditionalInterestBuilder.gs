package gw.api.databuilder.bop
uses gw.api.databuilder.contact.AdditionalInterestDetailBuilder

@Export
class BOPBuildingAdditionalInterestBuilder extends AdditionalInterestDetailBuilder<BOPBldgAddlInterest, BOPBuildingAdditionalInterestBuilder>
{
  construct()
  {
    super(BOPBldgAddlInterest)
  }
}
