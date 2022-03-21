package gw.webservice.pc.pc1000.ccintegration.lob

uses entity.PolicyLine
uses gw.api.domain.covterm.CovTerm
uses gw.api.domain.covterm.OptionCovTerm
uses gw.api.productmodel.CovTermPattern
uses gw.api.system.PCLoggerCategory
uses gw.api.upgrade.PCCoercions
uses gw.util.GosuStringUtil
uses gw.webservice.pc.pc1000.ccintegration.CCBasePolicyLineMapper
uses gw.webservice.pc.pc1000.ccintegration.CCPolicyGenerator
uses gw.webservice.pc.pc1000.ccintegration.entities.anonymous.elements.CCPolicy_RiskUnits
uses gw.webservice.pc.pc1000.ccintegration.entities.anonymous.elements.CCRiskUnit_CoverageParts
uses gw.webservice.pc.pc1000.ccintegration.entities.anonymous.elements.CCRiskUnit_Coverages
uses gw.webservice.pc.pc1000.ccintegration.entities.types.complex.CCClassificationCovTerm
uses gw.webservice.pc.pc1000.ccintegration.entities.types.complex.CCCovTerm
uses gw.webservice.pc.pc1000.ccintegration.entities.types.complex.CCCoverage
uses gw.webservice.pc.pc1000.ccintegration.entities.types.complex.CCFinancialCovTerm
uses gw.webservice.pc.pc1000.ccintegration.entities.types.complex.CCPropertyCoverage
uses gw.webservice.pc.pc1000.ccintegration.entities.types.complex.CCPropertyRU
uses productmodel.HOPLine

@Export
class CCHOPPolicyLineMapper extends CCBasePolicyLineMapper {

  /**
   * PublicID for Section I deductible covterm 'All Perils'. See HOPSectionIDeductibles.xml under optional
   * covterm 'HOPSectionIDeductiblesPerils'
   */
  private static final var ALL_PERILS_COVTERM_PUBLICID =  PCCoercions.makeProductModel<CovTermPattern>("HOPSectionIDeductiblesPerils").PublicID

  /**
   * PublicID for Section I deductible covterm 'Other Perils'. See HOPSectionIDeductibles.xml under optional
   * covterm 'HOPSectionIDeductiblesOtherPerils'
   */
  private static final var OTHER_PERILS_COVTERM_PUBLICID = PCCoercions.makeProductModel<CovTermPattern>("HOPSectionIDeductiblesOtherPerils").PublicID

  protected var _RUCount : Integer
  protected var _skipCount : Integer
  protected var _hopEarthquakeMigrateFlag : boolean = false

  construct(line : PolicyLine, policyGen : CCPolicyGenerator) {
    super(line, policyGen)
  }
  
  override function getLineCoverages() : List<Coverage> {
    return HopLine.HOPLineCoverages.fastList()
  }

  protected property get HopLine() : HOPLine { return _line as HOPLine }

  protected function mapAdditionalRiskUnitFields(dwelling : HOPDwelling, dwellingRU : CCPropertyRU) {
    //
    // customer extended handling should be implemented here
    //
  }

  override function createRiskUnits() {
    // Keep a count as we add risk units.  This may start > 0 if other lines have been processed first.
    _RUCount = _ccPolicy.RiskUnits.Count
    var startingCount = _RUCount
    _skipCount = 0

    for(coverable in HopLine.HOPDwellings) {
      var pcLoc = coverable.Location
      if(meetsLocationFilteringCriteria(pcLoc)) {
        // Get the Location
        var ccLoc = _policyGen.getOrCreateCCLocation( pcLoc )

        // Create a new CC Risk Unit
        var dwellingRU = new CCPropertyRU()
        _ccPolicy.RiskUnits.add(new CCPolicy_RiskUnits( dwellingRU ))
        _RUCount = _RUCount + 1
        dwellingRU.RUNumber = _RUCount
        dwellingRU.PolicyLocation = ccLoc
        dwellingRU.PolicySystemID = coverable.TypeIDString
        dwellingRU.Description = coverable.DisplayName
        dwellingRU.CoverageParts.addAll(getRiskUnitCoveragePartTypes(coverable))
        dwellingRU.CoverageForm = coverable.CoverageForm.Code

        // Map additional fields here
        mapAdditionalRiskUnitFields(coverable, dwellingRU)

        // process
        processCoverages(coverable, dwellingRU)
      } else {  // Location is filtered out
        _skipCount = _skipCount + 1
      }
    }

    addToPropertiesCount(_RUCount - startingCount + _skipCount)
  }

  private function processCoverages(dwelling : HOPDwelling, riskUnit : CCPropertyRU) {
    // acquire handle to HOPEQ covterm if present
    final var eqCovTerm = dwelling.HOPEarthquake.HOPEarthquakeDeductibleTerm

    // is the special condtion that a HOP Earthquake deductible present?
    if (eqCovTerm != null) {
      // the HOP Earthquake deductible covterm should always be excluded
      _excludedCovTerms.add(eqCovTerm.PatternCode)
      // is there a Section I deductible coverage available to move the HOPEQ deductible to?
      if (dwelling.HOPSectionIDeductibles != null) {
        // flag HOPEQ deductible detected. Section I deductible covterms are handled during the risk unit analysis
        // so HOPEQ needs to be processed during that sequence
        _hopEarthquakeMigrateFlag = true
      }
    }

    for (pcCov in dwelling.Coverages.sortBy(\c -> c.Pattern.Priority)) {
      PCLoggerCategory.INTEGRATION.debug("processing coverage [" + pcCov.PatternCode + "]")
      var ccCov = new CCPropertyCoverage()
      populateCoverage(ccCov, pcCov)

      // Handle special case where Earthquake deductible covterm is present as well as Section I deductible covterm
      if (pcCov typeis HOPSectionIDeductibles and _hopEarthquakeMigrateFlag) {
        // HOPEQs produce 'Percent'-type values, so two covterms -- classification and financial are created
        var ccHopEqCovTerms = getCCCovTerms(eqCovTerm)
        // convert the HOPEQ covterm pattern ID code to link with the CC-only HOPSectionIDeductibleEQ code
        for (ct in ccHopEqCovTerms) {
          // CC-specific Section I Deductible - HOP Earthquake covterm pattern
          ct.CovTermPattern = "HOPSectionIDeductiblesEarthquake"
          // move the covterm onto Section I
          processCovTerm(ccCov, eqCovTerm, ct)
        }
      }

      riskUnit.Coverages.add(new CCRiskUnit_Coverages(ccCov))
    }
  }

  private static function getRiskUnitCoveragePartTypes(coverable : Coverable) : List<CCRiskUnit_CoverageParts> {
    var result = new ArrayList<CCRiskUnit_CoverageParts>()
    for(type in coverable.getAssociatedCoveragePartTypes()) {
      result.add(new CCRiskUnit_CoverageParts() {
        :CoveragePartType = type.Code
      })
    }

    return result
  }

  override function getCCCovTerms(covTerm: CovTerm): CCCovTerm[] {

    //this override handles the special situation for the HOP line where OptionCovTerms with valueType 'other'
    //are being used as classification CovTerms. The usual pattern is that typekey CovTerms are used
    //for this, but since typekey covterms do not offer availability option covterms are used as a
    //temporary solution
    if (covTerm typeis OptionCovTerm) {

      // HOPEarthquake covterm does not follow the standard pattern of other deductibles
      // so it handled with it's own specific use case
      if (isEarthquakeDeductible(covTerm)) {
        PCLoggerCategory.INTEGRATION.debug("CCHOPPolicyLineMapper: HOPEarthquake deductible converted to CCFinancialCovTerm")
        var coverable = (covTerm.Clause as Coverage).OwningCoverable as HOPDwelling
        var covPartType = coverable.AssociatedCoveragePartTypes.single()
        var ccFinancialCovTerm = createFinancialCovTerm(covTerm)

        // process the HOPEarthquake PC covterm data into a CC Financial covterm
        convertCoveragePartTypeToFinancialAmount(covTerm, ccFinancialCovTerm, coverable, covPartType)
        // return a descriptor classification covterm as well as the financial covterm itself
        return {createClassificationCovTerm(covTerm), ccFinancialCovTerm}
      }

      else if (covTerm.Pattern.ValueType == CovTermModelVal.TC_OTHER) {
        // special handling for covterms of Section I Deductibles
        if (isSectionIDeductiblesCovTerm(covTerm)) {
          var ccFinancialCovTerm = createFinancialCovTerm(covTerm)
          if (covTerm.Value != null && covTerm.Value != 0) {

            if (covTerm.OptionValue.OptionCode.contains("Money")) {
              // if the covterm option is money-based, return its value directly
              ccFinancialCovTerm.FinancialAmount = covTerm.Value?.ofCurrency(covTerm.Clause.Currency)
            }

            else if (covTerm.OptionValue.OptionCode.contains("Percent")) {
              // if the covterm option is percentage-based, transform its percentage value into monetary amount
              var coverable = (covTerm.Clause as Coverage).OwningCoverable
              var covPartType = coverable.AssociatedCoveragePartTypes.single()

              if (coverable typeis HOPDwelling) {
                convertCoveragePartTypeToFinancialAmount(covTerm, ccFinancialCovTerm, coverable, covPartType)
              } else {
                PCLoggerCategory.INTEGRATION.warn("CCHOPPolicyLineMapper: Unknown type of Coverable encountered: " + coverable)
              }
              // send both percentile covterm and montery covterm over for informational purpose
              return {createClassificationCovTerm(covTerm), ccFinancialCovTerm}
            } else {
              PCLoggerCategory.INTEGRATION.warn("CCHOPPolicyLineMapper: Unknown CovTerm OptionCode encountered: " + covTerm.OptionValue.OptionCode)
            }
          }
          return {ccFinancialCovTerm}
        }
        return {createClassificationCovTerm(covTerm)}
      }
    }

    return super.getCCCovTerms(covTerm)
  }

  private function createFinancialCovTerm(final covTerm : OptionCovTerm) : CCFinancialCovTerm {
    var ccFinancialCovTerm = new CCFinancialCovTerm() {
        :ModelAggregation = covTerm.AggregationModel.Code,
        :ModelRestriction = covTerm.RestrictionModel.Code
    }

    setBasicCovTermFields(ccFinancialCovTerm, covTerm)
    return ccFinancialCovTerm
  }

  private function createClassificationCovTerm(final covTerm : OptionCovTerm) : CCClassificationCovTerm {
    var ccClassificationCovTerm = new CCClassificationCovTerm() {
        :Code = covTerm.OptionValue.CodeIdentifier,
        :Description = covTerm.OptionValue.Description,
        :ModelAggregation = covTerm.AggregationModel.Code,
        :ModelRestriction = covTerm.RestrictionModel.Code
    }

    setBasicCovTermFields(ccClassificationCovTerm, covTerm)
    return ccClassificationCovTerm
  }

  private function convertCoveragePartTypeToFinancialAmount(covTerm : OptionCovTerm, ccFinancialCovTerm : CCFinancialCovTerm, cbl : HOPDwelling, covPartType : CoveragePartType) {
    switch (covPartType) {
      case CoveragePartType.TC_HOPDWELLING:
        // for Dwelling policies, percentage covterm is a percentage of Coverage A Limit
        // the covterm value is 5 for a "5%" option, 10 for a "10%" option and so on
        ccFinancialCovTerm.FinancialAmount = covTerm.Value?.ofCurrency(covTerm.Clause.Currency) *
            cbl.HOPCovA.HOPCovALimitTerm.Value * 0.01
        break
      case CoveragePartType.TC_HOPCONDO:
        // for Condominium policies, percentage covterm is a percentage of Coverage C Limit
        ccFinancialCovTerm.FinancialAmount = covTerm.Value?.ofCurrency(covTerm.Clause.Currency) *
            cbl.HOPCovC.HOPCovCDirectLimitTerm.Value * 0.01
        break
      case CoveragePartType.TC_HOPRENTAL:
        // for Rental policies, percentage covterm is a percentage of Coverage C Limit
        ccFinancialCovTerm.FinancialAmount = covTerm.Value?.ofCurrency(covTerm.Clause.Currency) *
            cbl.HOPCovC.HOPCovCDirectLimitTerm.Value * 0.01
        break
      default:
        PCLoggerCategory.INTEGRATION.warn("CCHOPPolicyLineMapper: Unknown CoveragePartType encountered: " + covPartType)
    }
  }

  override function handleCovTermSpecialCases(pcCov : Coverage, pcCovTerm : CovTerm, ccCov : CCCoverage, ccCovTerms : CCCovTerm[]) {
    if (isValuationMethodOptionCovTerm(pcCovTerm)){
      // Map the values in PC that have corresponding values in CC
      (ccCov as CCPropertyCoverage).CoverageBasis = mapValuationMethod((pcCovTerm as OptionCovTerm).OptionValue.OptionCode)
    }

    // Check to see if special conditions for HOP Earthquake are met and currently iteration is the one to act on
    if (_hopEarthquakeMigrateFlag and pcCovTerm.PatternCodeIdentifier == "HOPSectionIDeductiblesPerils") {
      // Convert SectionIDeductible covterm from 'All Perils' to 'Other Perils'
      var termToReplace = ccCovTerms.firstWhere(\ccCovTerm -> ccCovTerm.CovTermPattern == ALL_PERILS_COVTERM_PUBLICID)
      if (termToReplace != null) {
        termToReplace.CovTermPattern = OTHER_PERILS_COVTERM_PUBLICID
        termToReplace.PolicySystemID = GosuStringUtil.replace(termToReplace.PolicySystemID, ALL_PERILS_COVTERM_PUBLICID, OTHER_PERILS_COVTERM_PUBLICID)
      }
    }
  }

  private function isSectionIDeductiblesCovTerm(pcCovTerm: OptionCovTerm): boolean {
    return pcCovTerm.Clause.Pattern.CodeIdentifier == "HOPSectionIDeductibles"
  }

  private function isValuationMethodOptionCovTerm(pcCovTerm : CovTerm): boolean{
    return (pcCovTerm.PatternCodeIdentifier == "HOPCovAValuation" or
            pcCovTerm.PatternCodeIdentifier == "HOPCovCValuation")
  }

  private function isEarthquakeDeductible(final pcCovTerm : CovTerm) : boolean {
    return pcCovTerm.PatternCodeIdentifier == "HOPEarthquakeDeductible"
  }

}
