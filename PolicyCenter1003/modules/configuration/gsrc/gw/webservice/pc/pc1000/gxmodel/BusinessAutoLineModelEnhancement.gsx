package gw.webservice.pc.pc1000.gxmodel

uses gw.api.productmodel.ClausePattern
uses gw.api.productmodel.ClausePatternLookup
uses gw.api.productmodel.CovTermPatternLookup
uses gw.api.productmodel.CoveragePattern
uses gw.api.upgrade.PCCoercions

enhancement BusinessAutoLineModelEnhancement : gw.webservice.pc.pc1000.gxmodel.businessautolinemodel.types.complex.BusinessAutoLine {

  function populate(line : entity.BusinessAutoLine){
    SimpleValuePopulator.populate(this, line)
    // populate additioanl insureds
    for(additionalInsured in this.AdditionalInsureds.Entry){
      for(detail in additionalInsured.entity_PolicyAddlInsured.PolicyAdditionalInsuredDetails.Entry){
        var contacModel = additionalInsured.AccountContactRole.AccountContact.Contact
        var contact = contacModel.$TypeInstance.findOrCreateContact(line.Branch.Policy.Account)
        var additionalInsuredDetail = line.addNewAdditionalInsuredDetailForContact(contact)
        additionalInsuredDetail.AdditionalInsuredType = detail.AdditionalInsuredType
      }
    }
    // populate jurisdictions
    for(jurisdiction in this.Jurisdictions.Entry){
      var j = line.addJurisdiction(jurisdiction.State)
      for(cov in jurisdiction.Coverages.Entry){
        populateClause(j, cov.$TypeInstance)
      }
      for(cov in jurisdiction.Conditions.Entry){
        populateClause(j, cov.$TypeInstance)
      }
      for(cov in jurisdiction.Exclusions.Entry){
        populateClause(j, cov.$TypeInstance)
      }
      if(jurisdiction.HiredAutoBasis != null){
        j.HiredAutoCoverageSelected = true
        j.HiredAutoBasis.Basis = jurisdiction.HiredAutoBasis.Basis
        j.HiredAutoBasis.IfAnyExposure = jurisdiction.HiredAutoBasis.IfAnyExposure
      }
      if(jurisdiction.NonOwnedBasis != null){
        j.NonOwnedCoverageSelected = true
        j.NonOwnedBasis.NumEmployees = jurisdiction.NonOwnedBasis.NumEmployees
        j.NonOwnedBasis.NumVolunteers = jurisdiction.NonOwnedBasis.NumVolunteers
        j.NonOwnedBasis.NumPartners = jurisdiction.NonOwnedBasis.NumPartners
      }
    }
    // populate coverage
    this.BALineCoverages.Entry.each(\ b -> {
      var pattern = ClausePatternLookup.getCoveragePatternByPublicID(b.Pattern.PublicID)
      if(pattern == null){
        throw new IllegalArgumentException("Could not find coverage ${b.Pattern.PublicID}")
      }
      if(pattern.OwningEntityType != "BusinessAutoLine"){
        throw new IllegalArgumentException("Coverage pattern ${pattern} does not apply to BusinessAutoLine")
      }
      line.setCoverageExists(pattern, true)
      var coverage = line.getCoverage(pattern)
      for(t in b.CovTerms.Entry){
        var covTermPattern = CovTermPatternLookup.getByPublicID(t.PatternCode)
        var covTerm = coverage.getCovTerm(covTermPattern)
        covTerm.setValueFromString(t.DisplayValue)
      }
    })
    // populate vehicle
    for(v in this.Vehicles.Entry){
      var vehicle = new BusinessVehicle(line.Branch)
      SimpleValuePopulator.populate(v.$TypeInstance, vehicle)
      var policyLocation = line.Branch.PolicyLocations.firstWhere(\ p -> p.LocationNum == v.Location.LocationNum)
      if(policyLocation == null){
        throw new IllegalArgumentException("Could not find policy location with location number ${v.Location.LocationNum}")
      }
      vehicle.Location = policyLocation
      line.addAndNumberVehicle(vehicle)
      for(cov in v.Coverages.Entry){
        vehicle.setCoverageExists(PCCoercions.makeProductModel<CoveragePattern>(cov.Pattern.PublicID), true)
        cov.$TypeInstance.populateCoverage(vehicle.getCoverage(PCCoercions.makeProductModel<CoveragePattern>(cov.Pattern.PublicID)))
      }
    }
    // populate drivers
    for(d in this.Drivers.Entry){
      var driver = new CommercialDriver(line.Branch)
      SimpleValuePopulator.populate(d.$TypeInstance, driver)
      line.addToDrivers(driver)
    }
    // populate modifiers
    for(m in this.BAModifiers.Entry){
      var modifier = line.getModifier(m.PatternCode)
      for(r in m.RateFactors.Entry){
        var rateFactor = modifier.getRateFactor(r.RateFactorType)
        rateFactor.AssessmentWithinLimits = r.Assessment
        rateFactor.Justification = r.Justification
      }
    }
  }
  
  private function populateClause(j : BAJurisdiction, cov : gw.webservice.pc.pc1000.gxmodel.clausemodel.types.complex.Clause){
    j.setCoverageConditionOrExclusionExists(PCCoercions.makeProductModel<ClausePattern>(cov.Pattern.PublicID), true)
    var c = j.getCoverageConditionOrExclusion(PCCoercions.makeProductModel<ClausePattern>(cov.Pattern.PublicID))
    cov.populateCoverage(c)
  }
}