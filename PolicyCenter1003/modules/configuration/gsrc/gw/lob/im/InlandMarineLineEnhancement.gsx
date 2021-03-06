package gw.lob.im

uses com.google.common.collect.Iterables
uses entity.IMCoveragePart
uses gw.lang.reflect.TypeSystem

@Export
enhancement InlandMarineLineEnhancement : InlandMarineLine {

  /**
   * Returns a list of {@link entity.IMTransaction} using the period start date
   * @return IMTransaction[]
   */
  property get IMTransactions() : IMTransaction[] {
    return this.Branch.getSlice(this.Branch.PeriodStart).IMTransactions
  }

  /**
   * Returns a list of {@link entity.IMBuilding} that is on an {@link entity.IMLocation}
   * @return List<entity.IMBuilding>
   */
  property get IMBuildings() : List<IMBuilding> {
    var buildings : List<IMBuilding> = {}
    this.IMLocations.each(\ loc -> buildings.addAll(loc.Buildings.toList()))
    return buildings
  }

  /**
   * Gets a list of Inland Marine coverage parts
   * @return typekey.IMCoveragePart[] - A list of the coverage part typekeys
   */
  static function definedParts() : typekey.IMCoveragePart[] {
    var subtypes = typekey.IMCoveragePart.getTypeKeys(false).where(\ type -> not TypeSystem.getByRelativeName(type.Code).Abstract)
    return subtypes?.toTypedArray()
  }

  /**
   * Creates an Inland Marine coverage part if it does not already exist.
   * It initializes the autonumber sequence for the exposures in the coverage part as well as sets some default values.
   * @param covPart - an {@link typekey.IMCoveragePart} which describes which coverage part should be added
   * @return {@link entity.IMCoveragePart}
   */
  function maybeCreateCoveragePart(covPart : typekey.IMCoveragePart) : IMCoveragePart {
    switch (covPart) {
      case TC_IMSIGNPART : 
        if (this.IMSignPart == null) {
          var initializeSignAutoNumber  = false
          var existingAutoNumberSequence : AutoNumberSequence
          var existingIMSignParts = getAllExistingCoverageParts(IMSignPart)

          // initialize sign auto number sequence if signpart doesnot exist in any version
          if (!existingIMSignParts.HasElements) {
            initializeSignAutoNumber = true 
          } else {
            existingAutoNumberSequence = existingIMSignParts.first().SignAutoNumberSeq
          } 
          
          var part = new IMSignPart(this.Branch)
          this.addToIMCoverageParts(part)
          if (initializeSignAutoNumber ) {
            part.initializeSignAutoNumberSequence(this.Bundle) 
          } else {
            part.SignAutoNumberSeq = existingAutoNumberSequence
          } 
          part.Coinsurance = typekey.Coinsurance.TC_100
        }
        return this.IMSignPart
      case TC_CONTRACTORSEQUIPPART : 
        if (this.ContractorsEquipPart == null) {
          var initializeAutoNumberSequence = false
          var existingAutoNumberSequence : AutoNumberSequence
          var existingContractorsEquipParts = getAllExistingCoverageParts(ContractorsEquipPart)

          if (!existingContractorsEquipParts.HasElements) {
            initializeAutoNumberSequence = true 
          } else {
            existingAutoNumberSequence = existingContractorsEquipParts.first().ContrEqPartAutoNumberSeq
          }

          var part = new ContractorsEquipPart(this.Branch)
          this.addToIMCoverageParts(part)
          if (initializeAutoNumberSequence) {
            part.initializeAutoNumberSequence(this.Bundle)
          } else {
            part.ContrEqPartAutoNumberSeq = existingAutoNumberSequence   
          }
          part.Coinsurance = typekey.Coinsurance.TC_80
          part.Reporting = false
          part.createCoveragesConditionsAndExclusions()
        }
        return this.ContractorsEquipPart
      case TC_IMACCOUNTSRECPART :
        if(this.IMAccountsRecPart == null) {
          var initializeAutoNumberSequence = false
          var existingAutoNumberSequence : AutoNumberSequence
          var existingIMAccountsRecParts = getAllExistingCoverageParts(IMAccountsRecPart)

          if (!existingIMAccountsRecParts.HasElements) {
            initializeAutoNumberSequence = true 
          } else {
            existingAutoNumberSequence = existingIMAccountsRecParts.first().ARAutoNumberSeq
          }

          var part = new IMAccountsRecPart(this.Branch)
          this.addToIMCoverageParts(part)
          if (initializeAutoNumberSequence) {
            part.initializeAutoNumberSequence(this.Bundle)
          } else {
            part.ARAutoNumberSeq = existingAutoNumberSequence
          } 
        }
        return this.IMAccountsRecPart
      default : 
        throw new IllegalArgumentException("Unhandled Create IMCoveragePart subtype " + covPart.Code)
    }
  }

  /**
   * Get all existing IMCoverageParts of a specific subtype
   *
   * @param subtype the desired type of IMCoveragePart we are looking for
   * @return an iterable of all the IMCoverageParts
   */
  public reified function getAllExistingCoverageParts<T extends IMCoveragePart>(subtype : Type<T>) : Iterable<T> {
    return Iterables.filter(this.VersionList.IMCoverageParts.flatMap(\ i -> i.AllVersions), subtype)
  }

  /**
   * Removes the specified coverage part
   * @param covPart - the {@link typekey.IMCoveragePart} that will be used to search for the {@link entity.IMCoveragePart} to remove
   */
  function removeCoveragePart(covPart : typekey.IMCoveragePart) {
    if (coveragePartExists(covPart)) {
      this.removeFromIMCoverageParts(this.IMCoverageParts.firstWhere(\ i -> i.Subtype == covPart))
    }
  }

  /**
   * Gets a list of coverage parts that has not been added
   * @return typekey.IMCoveragePart[] - A list of the coverage part typekeys that are available
   */
  function availableParts() : typekey.IMCoveragePart[] {
    var subtypes = new ArrayList<typekey.IMCoveragePart>()
    var oldlist = typekey.IMCoveragePart.getTypeKeys(false)
    for (subtype in oldlist) {
      if (not coveragePartExists(subtype) 
      and not TypeSystem.getByRelativeName(subtype.Code).Abstract) {
        subtypes.add(typekey.IMCoveragePart.get(subtype as java.lang.String))
      }
    }
    return subtypes?.toTypedArray() 
  }

  /**
   * Check to see if the coverage part exists on the Inland Marine Line. If it exists, return true, otherwise return false
   * @param subtype - the {@link typekey.IMCoveragePart} which determines is the coverage part that is used to check existence
   * @return boolean - true if the part is found
   */
  function coveragePartExists(subtype : typekey.IMCoveragePart) : boolean {
    return findSinglePartByType(subtype) != null
  }

  /**
   * Gets a list of cost maps for the specified coverage part
   * It returns a map of the coverage part name to the displayname of the coverage part cost
   * (i.e., Inland Marine Accounts Receivable Part -> {@link entity.IMAccountsRecPartCost}
   * @return List<Map<String, Cost>> - a list of cost maps
   */
  function costMapsFor(covPart : entity.IMCoveragePart) : List<Map<String, Cost>> {
    switch (covPart.Subtype) {
      case TC_CONTRACTORSEQUIPPART :
        return ceCostMaps(covPart as ContractorsEquipPart)
      case TC_IMACCOUNTSRECPART :
        return arCostMaps(covPart as entity.IMAccountsRecPart)
      case TC_IMSIGNPART :
        return signCostMaps(covPart as entity.IMSignPart)
      default :
        throw "Unknown IM coverage part specified: ${covPart.Subtype.DisplayName}"
    }
  }
 
  //
  // PRIVATE SUPPORT FUNCTIONS
  //
  private function findSinglePartByType(type : typekey.IMCoveragePart) : IMCoveragePart {
    var parts = this.IMCoverageParts.where(\p -> p.Subtype == type)
    switch (parts.Count) {
      case 0:  return null
      case 1:  return parts.first()
      default: throw "too many ${type} parts"
    }
  }

  private function ceCostMaps(cePart : ContractorsEquipPart) : List<Map<String, Cost>> {
    var list = new ArrayList<Map<String, Cost>>()
    cePart.ContractorsEquipments.each(\ equip -> {
      var cov = equip.ContractorsEquipSchedCov
      cov.Costs.each(\ cost -> {list.add(new HashMap<String, Cost>() {cov.ContractorsEquipment.DisplayName -> cost})})
    })
    cePart.ContrEquipPartCovs.each(\ partCov -> {
      partCov.Costs.each(\ cost -> {list.add(new HashMap<String, Cost>() {partCov.Pattern.DisplayName -> cost})})
    })
    return list
  }
  
  private function arCostMaps(arPart : IMAccountsRecPart) : List<Map<String, Cost>> {
    var list = new ArrayList<java.util.Map<String, Cost>>()
    arPart.IMAccountsReceivables.each(\ ar -> {
      var cov = ar.IMAccountReceivableCov
      cov.Costs.each(\ cost -> {list.add(new HashMap<String, Cost>() {cov.IMAccountsReceivable.DisplayName -> cost})})
    })
    arPart.IMAccountsRecPartCovs.each(\ partCov -> {
      partCov.Costs.each(\ cost -> {list.add(new HashMap<String, Cost>() {partCov.Pattern.DisplayName -> cost})})
    })
    return list
  }

  private function signCostMaps(signPart : IMSignPart) : List<Map<String, Cost>> {
    var list = new ArrayList<java.util.Map<String, Cost>>()
    signPart.IMSigns.each(\ sign -> {
      var cov = sign.IMSignCov
      cov.Costs.each(\ cost -> {list.add(new HashMap<String, Cost>() {cov.IMSign.DisplayName -> cost})})
    })
    return list
  }
}
