package gw.webservice.pc.pc900.ccintegration.lob

uses gw.webservice.pc.pc900.ccintegration.CCBasePolicyLineMapper
uses gw.webservice.pc.pc900.ccintegration.CCPolicyGenerator
uses gw.webservice.pc.pc900.ccintegration.entities.anonymous.elements.CCPolicy_Coverages
uses gw.webservice.pc.pc900.ccintegration.entities.anonymous.elements.CCPolicy_RiskUnits
uses gw.webservice.pc.pc900.ccintegration.entities.anonymous.elements.CCRiskUnit_Coverages
uses gw.webservice.pc.pc900.ccintegration.entities.types.complex.CCPropertyCoverage
uses gw.webservice.pc.pc900.ccintegration.entities.types.complex.CCPolicyCoverage
uses gw.webservice.pc.pc900.ccintegration.entities.types.complex.CCLocationMiscRU
uses gw.pl.currency.MonetaryAmount
uses java.lang.Integer
uses java.math.BigDecimal
uses gw.api.system.PCLoggerCategory

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class CCIMPolicyLineMapper extends CCBasePolicyLineMapper {

  var _imLine : IMLine;
  var _RUCount : Integer;
  var _skipCount : Integer;

  construct(line : PolicyLine, policyGen : CCPolicyGenerator) {
    super(line, policyGen);
    _imLine = line as IMLine;
  }

// There are no line-level coverages for Inland Marine
//  override function getLineCoverages() : List<entity.Coverage> {
//  }
  
//  override function setLineSpecificFields() {
//  }

  override function createRiskUnits() {
    // Keep a count as we add risk units.  This may start > 0 if other lines have been processed first.
    _RUCount = _ccPolicy.RiskUnits  == null ? 0 : _ccPolicy.RiskUnits.Count;
    var startingCount = _RUCount;
    _skipCount = 0;
        
    // Handle each type of coverage part separately
    for (part in _imLine.IMCoverageParts.sortBy(\ p -> p.Subtype.Priority)) {
      switch (part.Subtype.Code) {
        case "ContractorsEquipPart":
          handleContractorsEquip(part as ContractorsEquipPart);
          break;
        case "IMAccountsRecPart":
          handleAcctsRec(part as IMAccountsRecPart);
          break;
        case "IMSignPart":
          handleSigns(part as IMSignPart)
          break;
        // Add more IM Coverage Parts here
        default:
          PCLoggerCategory.INTEGRATION.warn("CCIMPolicyLineMapper: Encountered an unmapped IM Coverage Part: " + part.Subtype.Code);
      }
    }

    addToPropertiesCount(_RUCount - startingCount + _skipCount);
  }
  
  protected function handleContractorsEquip(part : ContractorsEquipPart) {
    var coinsurance = mapCoinsurance(part.Coinsurance.Code);
    var occurLimit =  part.PerOccurrenceLimit;

/*  Other interesting part-level fields
    part.ContractorType
    part.Reporting    
*/    

    // Create policy-level coverages in CC for any Coverage Part-level coverages in PC 
    for (cov in part.ContrEquipPartCovs.sortBy(\ c -> c.Pattern.Priority)) {
      var ccCov = new CCPolicyCoverage();
      populateCoverage(ccCov, cov);
      // Add cov terms for the part-level coinsurance requirement and occurrence limit
      addCustomFinancialCovTerm(ccCov, cov, "pc_custom_occurLimit", 1000, new MonetaryAmount(new BigDecimal(occurLimit), cov.Currency))
      addCustomNumericCovTerm(ccCov, cov.TypeIDString, "pc_custom_coinsurance", 1001, coinsurance, CovTermModelVal.TC_PERCENT.Code)
      _ccPolicy.Coverages.add(new CCPolicy_Coverages( ccCov ));
    }

    // Create a risk unit for each scheduled piece of contractors equipment
    for (equip in part.ContractorsEquipments.sortBy(\ e -> e.ContractorsEquipmentNumber)) {
      var ru = new CCLocationMiscRU();
      _ccPolicy.RiskUnits.add(new CCPolicy_RiskUnits(ru));
      
      _RUCount = _RUCount + 1;
      ru.RUNumber = _RUCount;
      ru.OtherRiskType = "schequipment"   // CC code for "Scheduled Equipment"
      ru.Description = trimRUDescription(equip.DisplayName)
      ru.PolicySystemID = equip.TypeIDString;
            
      // This risk unit is not tied to a specific policy location or building, so default to the primary location
      ru.PolicyLocation = _policyGen.getOrCreateCCLocation(_policyGen.getPrimaryLocation())
      
/* Other potentially useful fields
      equip.ContractorsEquipmentID
      equip.ContractorsEquipmentNumber
      equip.Description
      equip.Manufacturer
      equip.Model
      equip.ModelYear
      equip.YearBought
*/      
      
      // Create RU-level coverages
      for (cov in equip.Coverages.sortBy(\ c -> c.Pattern.Priority)) {
        var ccCov = new CCPropertyCoverage();
        populateCoverage(ccCov, cov);
        ru.Coverages.add(new CCRiskUnit_Coverages( ccCov ));

        // Set the coinsurance column on each coverage using the value shared for all of A/R and add a cov term for it
        ccCov.Coinsurance = coinsurance;
        addCustomNumericCovTerm(ccCov, cov.TypeIDString, "pc_custom_coinsurance", 1001, coinsurance, CovTermModelVal.TC_PERCENT.Code)
        // Add a cov term for the part-level occurrence limit
        addCustomFinancialCovTerm(ccCov, cov, "pc_custom_occurLimit", 1000, new MonetaryAmount(new BigDecimal(occurLimit), cov.Currency))
      }
      
      // Create lienholders for RU-level additional interests
      for (addInt in equip.AdditionalInterests) {
        addRULevelAdditionalInterest(addInt.ID, ru, addInt.PolicyAddlInterest.ContactDenorm);
      }
    }
  }
  
  protected function handleAcctsRec(part : IMAccountsRecPart) {
    var coinsurance = mapCoinsurance(part.Coinsurance.Code);

/* Other potentially useful fields
    part.Description
    part.Reporting
    part.IMExcludedAccounts
*/
    
    // Create policy-level coverages in CC for any Coverage Part-level coverages in PC
    for (cov in part.IMAccountsRecPartCovs.sortBy(\ c -> c.Pattern.Priority)) {
      var ccCov = new CCPolicyCoverage();
      populateCoverage(ccCov, cov);
      addCustomNumericCovTerm(ccCov, cov.TypeIDString, "pc_custom_coinsurance", 1000, coinsurance, CovTermModelVal.TC_PERCENT.Code)
      _ccPolicy.Coverages.add(new CCPolicy_Coverages( ccCov ));
    }
    
    // Create a risk unit for each location with A/R risk
    for (arloc in part.IMAccountsReceivables.sortBy(\ ar -> ar.AccountsRecNumber)) {
      if (meetsLocationFilteringCriteria(arloc.IMBuilding.LocationBuilding.PolicyLocation)) {
        var ru = new CCLocationMiscRU();
        _ccPolicy.RiskUnits.add(new CCPolicy_RiskUnits(ru));
      
        _RUCount = _RUCount + 1;
        ru.RUNumber = _RUCount;
      
        var bld = arloc.IMBuilding.LocationBuilding;
        if (bld != null) {
          ru.Building = _policyGen.getOrCreateCCBuilding(bld);
          if (bld.PolicyLocation != null) {
            ru.PolicyLocation = _policyGen.getOrCreateCCLocation(bld.PolicyLocation);
          }
        }
        ru.OtherRiskType = "acctrecvblonpremise"   // CC code for "Accounts Receivable On Premise"
        ru.Description = trimRUDescription(arloc.AccountsRecNumber + ": " + arloc.ReceptacleType.DisplayName)
        ru.PolicySystemID = arloc.TypeIDString;

/* Other potentially useful fields
    arloc.AccountsRecNumber
    arloc.Description
    arloc.ForwardToHomeOffice
    arloc.PercentDuplicated
    arloc.ReceptacleType
*/
        // Create coverages 
        for (cov in arloc.Coverages.sortBy(\ c -> c.Pattern.Priority)) {
          var ccCov = new CCPropertyCoverage();
          populateCoverage(ccCov, cov);
          ru.Coverages.add(new CCRiskUnit_Coverages( ccCov ));

          // Set the coinsurance column on each coverage using the value shared for all of A/R and add a cov term for it
          ccCov.Coinsurance = coinsurance;
          addCustomNumericCovTerm(ccCov, cov.TypeIDString, "pc_custom_coinsurance", 1000, coinsurance, CovTermModelVal.TC_PERCENT.Code)
        }
      } else {  // Location is filtered out
        _skipCount = _skipCount + 1;
      }
    }
  }

  protected function handleSigns(part : IMSignPart) {
    var coinsurance = mapCoinsurance(part.Coinsurance.Code);
        
    for (sign in part.IMSigns.sortBy(\ s -> s.SignNumber)) {
      if (meetsLocationFilteringCriteria(sign.IMLocation.Location)) {
        // Create a new risk unit
        var ru = new CCLocationMiscRU();
        _ccPolicy.RiskUnits.add(new CCPolicy_RiskUnits(ru));
       
        _RUCount = _RUCount + 1;
        ru.RUNumber = _RUCount;
        if (sign.IMLocation.Location != null) {
          ru.PolicyLocation = _policyGen.getOrCreateCCLocation(sign.IMLocation.Location);
        }
        ru.OtherRiskType = "signs" 
        ru.Description = trimRUDescription(sign.SignNumber + ": " + sign.Description)
        ru.PolicySystemID = sign.TypeIDString;
      
/* Other potentially useful fields
    sign.Interior
    sign.SignType
*/

        // Create coverages 
        for (cov in sign.Coverages.sortBy(\ c -> c.Pattern.Priority)) {
          var ccCov = new CCPropertyCoverage();
          populateCoverage(ccCov, cov);
          ru.Coverages.add(new CCRiskUnit_Coverages( ccCov ));

          // Set the coinsurance column on each coverage using the value shared for all signs and add a cov term for it
          ccCov.Coinsurance = coinsurance;
          addCustomNumericCovTerm(ccCov, cov.TypeIDString, "pc_custom_coinsurance", 1000, coinsurance, CovTermModelVal.TC_PERCENT.Code)
        }
      } else {  // Location is filtered out
        _skipCount = _skipCount + 1;
      }
    }
  }

}
