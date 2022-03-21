package gw.api.databuilder.cpp
uses gw.api.builder.AccountBuilder
uses gw.api.databuilder.gl.GeneralLiabilityLineBuilder
uses gw.api.builder.SubmissionBuilderBase
uses gw.api.databuilder.cp.CommercialPropertyLineBuilder
uses gw.api.databuilder.im.InlandMarineLineBuilder
uses gw.api.databuilder.cp.CPLocationBuilder
uses gw.api.databuilder.cp.CPBuildingBuilder
uses gw.api.builder.CoverageBuilder
uses gw.api.databuilder.gl.GLExposureBuilder
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.databuilder.im.IMLocationBuilder
uses gw.api.databuilder.im.IMBuildingBuilder
uses gw.api.databuilder.im.IMSignBuilder
uses gw.api.databuilder.im.IMSignPartBuilder
uses gw.api.databuilder.im.ContractorsEquipmentBuilder
uses gw.api.databuilder.im.ContractorsEquipmentPartBuilder
uses gw.api.databuilder.im.IMAccountsReceivableBuilder
uses gw.api.databuilder.im.IMAccountsReceivablePartBuilder
uses gw.api.builder.BuildingBuilder
uses gw.api.upgrade.PCCoercions
uses gw.api.productmodel.CoveragePattern
uses gw.api.productmodel.PolicyLinePattern

@Export
class CPPSubmissionBuilder extends SubmissionBuilderBase<CPPSubmissionBuilder> {
  
  var glLineBuilder : GeneralLiabilityLineBuilder
  var cpLineBuilder : CommercialPropertyLineBuilder
  var imLineBuilder : InlandMarineLineBuilder
  var accountBuilder = new AccountBuilder()

  construct() {
    this(true, true, true, true)
  }

  construct(validating: boolean, withCP : boolean, withGL : boolean, withIM : boolean) {
    if (validating) {
      withValidation()
    }
    withAccount(accountBuilder)
    withProduct("CommercialPackage")
    withOffering("CPPStandard")
    var policyLocationBldr1 = new PolicyLocationBuilder()
    withPolicyLocation(policyLocationBldr1)
    
    if(withCP){
      policyLocationBldr1.withTerritoryCode(PCCoercions.makeProductModel<PolicyLinePattern>("CPLine"), "30")
      cpLineBuilder = new CommercialPropertyLineBuilder()
        .withCPLocation(new CPLocationBuilder()
          .withBuilding(new CPBuildingBuilder()
            .withCoverage(new CoverageBuilder(CPBuildingCov)
              .withPatternCode("CPBldgCov")
              .withTypekeyCovTerm("CPBldgCovCauseOfLoss", typekey.CPCauseOfLoss.TC_BASIC)
              .withDirectTerm("CPBldgCovLimit", 1000000))))
      withPolicyLine(cpLineBuilder)
    }
    if(withGL){
      policyLocationBldr1.withTerritoryCode(PCCoercions.makeProductModel<PolicyLinePattern>("GLLine"), "34")
      glLineBuilder = new GeneralLiabilityLineBuilder()
        .withExposure(new GLExposureBuilder()
          .withClassCodeAndBasis("0001", 20000))
      withPolicyLine(glLineBuilder)
    }
    if(withIM){
      policyLocationBldr1.withTerritoryCode(PCCoercions.makeProductModel<PolicyLinePattern>("IMLine"), "28")
      var imBuildingBldr = new IMBuildingBuilder().withBuilding(new BuildingBuilder())
      var imLocationBldr1 = new IMLocationBuilder().withLocation(policyLocationBldr1).withBuilding(imBuildingBldr)
      imLineBuilder = new InlandMarineLineBuilder()
       .withIMLocation(imLocationBldr1)
        .withPart(new IMSignPartBuilder()
          .withSign(new IMSignBuilder()
            .withIMLocation(imLocationBldr1)
            .withCoverage(new CoverageBuilder(entity.IMSignCov)
              .withPattern(PCCoercions.makeProductModel<CoveragePattern>("IMSignCov"))
              .withDirectTerm("IMSignLimit", 150000))))
      imLineBuilder.withPart(new ContractorsEquipmentPartBuilder()
        .withContractorsEquipment(new ContractorsEquipmentBuilder()
            .withCoverage(new CoverageBuilder(entity.ContractorsEquipCov)
                .withPattern(PCCoercions.makeProductModel<CoveragePattern>("ContractorsEquipSchedCov"))
                .withDirectTerm("ContractorsEquipSchedCovLimit", 100000)
                .withOptionCovTerm("ContractorsEquipSchedCovDeductible", "500")
                .withTypekeyCovTerm("ContractorsEquipSchedCovValuation", typekey.ValuationMethod.TC_REPLCOST))
          .withNumber(6969)))
      imLineBuilder.withPart(new IMAccountsReceivablePartBuilder()
        .withIMAccountsReceivable(new IMAccountsReceivableBuilder()
          .withPercentDuplicated(typekey.PercentDuplicated.TC_51PLUS)
          .withReceptacleType(typekey.ReceptacleType.TC_ULCLASSA)
          .withIMBuilding(imBuildingBldr)
          .withCoverage(new CoverageBuilder(entity.IMAccountsRecCov)
            .withPattern(PCCoercions.makeProductModel<CoveragePattern>("IMAccountReceivableCov"))
            .withDirectTerm("IMAccountsReceivableLimit", 150000))))
      withPolicyLine(imLineBuilder)
    }
  }
}
