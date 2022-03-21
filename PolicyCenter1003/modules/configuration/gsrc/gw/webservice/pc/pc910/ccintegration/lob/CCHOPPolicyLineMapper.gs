package gw.webservice.pc.pc910.ccintegration.lob

uses gw.api.domain.covterm.CovTerm
uses gw.api.domain.covterm.OptionCovTerm
uses gw.api.system.PCLoggerCategory
uses gw.webservice.pc.pc910.ccintegration.CCBasePolicyLineMapper
uses gw.webservice.pc.pc910.ccintegration.CCPolicyGenerator
uses gw.webservice.pc.pc910.ccintegration.entities.anonymous.elements.CCRiskUnit_CoverageParts
uses gw.webservice.pc.pc910.ccintegration.entities.types.complex.CCClassificationCovTerm
uses gw.webservice.pc.pc910.ccintegration.entities.types.complex.CCCovTerm
uses gw.webservice.pc.pc910.ccintegration.entities.types.complex.CCCoverage
uses gw.webservice.pc.pc910.ccintegration.entities.types.complex.CCFinancialCovTerm
uses gw.webservice.pc.pc910.ccintegration.entities.types.complex.CCPropertyCoverage
uses gw.webservice.pc.pc910.ccintegration.entities.anonymous.elements.CCPolicy_RiskUnits
uses gw.webservice.pc.pc910.ccintegration.entities.anonymous.elements.CCRiskUnit_Coverages
uses java.lang.Integer

uses gw.webservice.pc.pc910.ccintegration.entities.types.complex.CCPropertyRU

@Export
@Deprecated(:value="910 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class CCHOPPolicyLineMapper extends CCBasePolicyLineMapper {

  var _hopLine : HOPLine
  var _RUCount : Integer
  var _skipCount : Integer;
  
  construct(line : PolicyLine, policyGen : CCPolicyGenerator) {
    super(line, policyGen)
    _hopLine = line as HOPLine
  }

  override function getLineCoverages() : List<entity.Coverage> {
    return _hopLine.HOPLineCoverages.toList()
  }
  
  override function createRiskUnits() {
    // Keep a count as we add risk units.  This may start > 0 if other lines have been processed first.
    _RUCount = _ccPolicy.RiskUnits.Count;
    var startingCount = _RUCount
    _skipCount = 0;

    for( cbl in _hopLine.HOPDwellings ) {
      var pcLoc = cbl.Location
      if(meetsLocationFilteringCriteria(pcLoc)) {
        // Get the Location
        var ccLoc = _policyGen.getOrCreateCCLocation( pcLoc )

        // Create a new CC Risk Unit
        var dwellingRU = new CCPropertyRU()
        _ccPolicy.RiskUnits.add(new CCPolicy_RiskUnits( dwellingRU ))
        _RUCount = _RUCount + 1
        dwellingRU.RUNumber = _RUCount
        dwellingRU.PolicyLocation = ccLoc
        dwellingRU.PolicySystemID = cbl.TypeIDString
        dwellingRU.Description = cbl.DisplayName
        dwellingRU.CoverageParts.addAll(getRiskUnitCoveragePartTypes(cbl))
        dwellingRU.CoverageForm = cbl.CoverageForm.Code

        // Map additional fields here
      
        // Map coverages for this coverable
        for( pcCov in cbl.Coverages.sortBy(\ c -> c.Pattern.Priority) ) 
        {
          var ccCov = new CCPropertyCoverage()
          populateCoverage(ccCov, pcCov)
          dwellingRU.Coverages.add(new CCRiskUnit_Coverages( ccCov ))
        }

      } else {  // Location is filtered out
        _skipCount = _skipCount + 1;
      }
    }

    addToPropertiesCount(_RUCount - startingCount + _skipCount)
  }

  private static function getRiskUnitCoveragePartTypes(cvbl: Coverable) : List<CCRiskUnit_CoverageParts> {
    var result = new ArrayList<CCRiskUnit_CoverageParts>()
    for(type in cvbl.getAssociatedCoveragePartTypes()) {
      var ccType = new CCRiskUnit_CoverageParts()
      ccType.setCoveragePartType(type.Code)
      result.add(ccType)
    }

    return result
  }

  override function getCCCovTerms(covTerm: CovTerm): CCCovTerm[] {
    //this override handles the special situation for the HOP line where OptionCovTerms with valueType 'other'
    //are being used as classification CovTerms. The usual pattern is that typekey CovTerms are used
    //for this, but since typekey covterms do not offer availability option covterms are used as a
    //temporary solution
    if (covTerm typeis OptionCovTerm && covTerm.Pattern.ValueType == CovTermModelVal.TC_OTHER) {

      var ccClassificationCovTerm = new CCClassificationCovTerm()
      setBasicCovTermFields(ccClassificationCovTerm, covTerm)
      ccClassificationCovTerm.Code = covTerm.OptionValue.CodeIdentifier
      ccClassificationCovTerm.Description = covTerm.OptionValue.Description
      ccClassificationCovTerm.ModelAggregation = covTerm.AggregationModel.Code
      ccClassificationCovTerm.ModelRestriction = covTerm.RestrictionModel.Code

      // special handling for covterms of Section I Deductibles
      if (isSectionIDeductiblesCovTerm(covTerm)) {
        var ccFinancialCovTerm = new CCFinancialCovTerm()
        setBasicCovTermFields(ccFinancialCovTerm, covTerm)
        ccFinancialCovTerm.ModelAggregation = covTerm.AggregationModel.Code
        ccFinancialCovTerm.ModelRestriction = covTerm.RestrictionModel.Code
        if (covTerm.Value != null && covTerm.Value != 0) {
          if (covTerm.OptionValue.OptionCode.contains("Money")) {
            // if the covterm option is money-based, return its value directly
            ccFinancialCovTerm.FinancialAmount = covTerm.Value?.ofCurrency(covTerm.Clause.Currency)
          } else if (covTerm.OptionValue.OptionCode.contains("Percent")) {
            // if the covterm option is percentage-based, transform its percentage value into monetary amount
            var cbl = (covTerm.Clause as Coverage).OwningCoverable
            var covPartType = cbl.AssociatedCoveragePartTypes.single()

            if (cbl typeis HOPDwelling) {
              switch (covPartType) {
                case CoveragePartType.TC_HOPDWELLING:
                  // for Dwelling policies, percentage covterm is a percentage of Coverage A Limit
                  // the covterm value is 5 for a "5%" option, 10 for a "10%" option and so on
                  ccFinancialCovTerm.FinancialAmount = covTerm.Value?.ofCurrency(covTerm.Clause.Currency) *
                      cbl.HOPCovA.HOPCovALimitTerm.Value * 0.01
                  break;
                case CoveragePartType.TC_HOPCONDO:
                  // for Condominium policies, percentage covterm is a percentage of Coverage C Limit
                  ccFinancialCovTerm.FinancialAmount = covTerm.Value?.ofCurrency(covTerm.Clause.Currency) *
                      cbl.HOPCovC.HOPCovCDirectLimitTerm.Value * 0.01
                  break;
                case CoveragePartType.TC_HOPRENTAL:
                  // for Rental policies, percentage covterm is a percentage of Coverage C Limit
                  ccFinancialCovTerm.FinancialAmount = covTerm.Value?.ofCurrency(covTerm.Clause.Currency) *
                      cbl.HOPCovC.HOPCovCDirectLimitTerm.Value * 0.01
                  break;
                default:
                  PCLoggerCategory.INTEGRATION.warn("CCHOPPolicyLineMapper: Unknown CoveragePartType encountered: " + covPartType)
              }
            } else {
              PCLoggerCategory.INTEGRATION.warn("CCHOPPolicyLineMapper: Unknown type of Coverable encountered: " + cbl)
            }
            // send both percentile covterm and montery covterm over for informational purpose
            return {ccClassificationCovTerm, ccFinancialCovTerm}
          } else {
            PCLoggerCategory.INTEGRATION.warn("CCHOPPolicyLineMapper: Unknown CovTerm OptionCode encountered: " + covTerm.OptionValue.OptionCode)
          }
        }
        return {ccFinancialCovTerm}
      }
      return {ccClassificationCovTerm}
    } else {
      return super.getCCCovTerms(covTerm)
    }
  }

  override function handleCovTermSpecialCases(pcCov : Coverage, pcCovTerm : CovTerm, ccCov : CCCoverage, ccCovTerms : CCCovTerm[]) {
    if (isValuationMethodOptionCovTerm(pcCovTerm)){
      // Map the values in PC that have corresponding values in CC
      (ccCov as CCPropertyCoverage).CoverageBasis = mapValuationMethod((pcCovTerm as OptionCovTerm).OptionValue.OptionCode)
    }
  }

  private function isSectionIDeductiblesCovTerm(pcCovTerm: OptionCovTerm): boolean {
    return pcCovTerm.Clause.Pattern.CodeIdentifier == "HOPSectionIDeductibles"
  }

  private function isValuationMethodOptionCovTerm(pcCovTerm : CovTerm): boolean{
    return (pcCovTerm.PatternCodeIdentifier == "HOPCovAValuation" or
            pcCovTerm.PatternCodeIdentifier == "HOPCovCValuation")
  }

}
