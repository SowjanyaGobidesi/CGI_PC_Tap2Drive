package gw.api.databuilder.cp
uses gw.api.databuilder.contact.AdditionalInterestDetailBuilder

@Export
class CPBuildingAdditionalInterestBuilder extends AdditionalInterestDetailBuilder<CPBldgAddlInterest, CPBuildingAdditionalInterestBuilder>
{
  construct()
  {
    super(CPBldgAddlInterest)
  }
}
