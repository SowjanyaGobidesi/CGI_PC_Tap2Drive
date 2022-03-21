package gw.lob.cp.contact
uses gw.api.locale.DisplayKey
uses gw.lob.common.contact.AbstractAdditionalInterestContainer

@Export
class CPBuildingAdditionalInterestContainer extends AbstractAdditionalInterestContainer<CPBuilding>
{  
  construct(building : CPBuilding)
  {
    super(building)
  }

  override property get PolicyPeriod() : PolicyPeriod
  {
    return _owner.Branch
  }

  override property get OwnerDisplayName() : String {
    return _owner.DisplayName + " (" + _owner.CPLocation.DisplayName + ")"
  }
  
  override property get PolicyLine() : PolicyLine
  {
    return _owner.CPLocation.CPLine
  }

  override property get AdditionalInterestDetails() : AddlInterestDetail[]
  {
    return _owner.AdditionalInterests
  }

  override property get TypeLabel() : String
  {
    return DisplayKey.get("CommercialProperty.Building.AdditionalInterest.LVLabel")
  }
  
  override function addToAdditionalInterestDetails( interestDetail: AddlInterestDetail ) : void
  {
    if (not (interestDetail typeis CPBldgAddlInterest)) {
      throw DisplayKey.get("CommercialProperty.Building.AdditionalInterest.Error.AdditionalInterestIsWrongType", interestDetail.Subtype)
    }
    _owner.addToAdditionalInterests( interestDetail as CPBldgAddlInterest )
  }

  override function removeFromAdditionalInterestDetails( interestDetail: AddlInterestDetail ) : void
  {
    if (not (interestDetail typeis CPBldgAddlInterest)) {
      throw DisplayKey.get("CommercialProperty.Building.AdditionalInterest.Error.AdditionalInterestIsWrongType", interestDetail.Subtype)
    }
    interestDetail.PolicyAddlInterest.removeFromAdditionalInterestDetails(interestDetail)
  }

  override function createNewAdditionalInterestDetail() : AddlInterestDetail
  {
    return new CPBldgAddlInterest(this.PolicyPeriod)
  }

  override property get ContainerIsValid() : boolean
  {
    return not (_owner == null)
  }

}