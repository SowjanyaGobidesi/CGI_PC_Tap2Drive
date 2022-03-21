package gw.api.databuilder.im
uses gw.api.databuilder.contact.AdditionalInterestDetailBuilder

@Export
class SchedEquipAdditionalInterestBuilder extends AdditionalInterestDetailBuilder<IMSchEquipAddlInterest, SchedEquipAdditionalInterestBuilder>
{
  construct()
  {
    super(IMSchEquipAddlInterest)
  }
}
