package gw.api.databuilder.im
uses entity.*
uses entity.IMSignCov
uses gw.api.builder.SubmissionBuilderBase
uses gw.api.builder.AccountBuilder
uses gw.api.builder.CoverageBuilder
uses java.math.BigDecimal
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.upgrade.PCCoercions
uses gw.api.productmodel.CoveragePattern

@Export
class IMSubmissionBuilder extends SubmissionBuilderBase<IMSubmissionBuilder> {

  var lineBuilder = new InlandMarineLineBuilder()
  var imLocationBuilder : IMLocationBuilder
  var imBuildingBuilder : IMBuildingBuilder
  var accountBuilder = new AccountBuilder()

  construct()
  {
    this(true)
  }
  
  construct(validating: boolean) {
    if (validating) {
      withValidation()
    }
    withAccount(accountBuilder)
    withProduct("InlandMarine")
    var policyLocationBuilder = new PolicyLocationBuilder()
    imBuildingBuilder = new IMBuildingBuilder()
    imLocationBuilder = new IMLocationBuilder().withLocation(policyLocationBuilder).withBuilding(imBuildingBuilder)
    withPolicyLocation(policyLocationBuilder)
    withPolicyLine(lineBuilder)
    lineBuilder.withIMLocation(imLocationBuilder)
  }

  function withCoverage(coverageBuilder : CoverageBuilder) : IMSubmissionBuilder {
    addArrayElement(entity.WorkersCompLine.Type.TypeInfo.getProperty("IMLINECOVERAGES"), coverageBuilder)
    return this
  }

  function withSignPart(limit : BigDecimal) : IMSubmissionBuilder {
    var partBuilder = new IMSignPartBuilder()
        .withSign(new IMSignBuilder()
          .withIMLocation(imLocationBuilder)
          .withCoverage(new CoverageBuilder(IMSignCov)
            .withPattern(PCCoercions.makeProductModel<CoveragePattern>("IMSignCov"))
            .withDirectTerm("IMSignLimit", limit)))
    lineBuilder.withPart(partBuilder)
    return this
  }

  function withIMAccountsReceivable() : IMSubmissionBuilder {
    var imAccRecBuilder = new IMAccountsReceivableBuilder()
      .withPercentDuplicated(typekey.PercentDuplicated.TC_51PLUS)
      .withReceptacleType(typekey.ReceptacleType.TC_ULCLASSA)
      .withIMBuilding(imBuildingBuilder)
      .withCoverage( new CoverageBuilder(entity.IMAccountsRecCov)
        .withPattern( PCCoercions.makeProductModel<CoveragePattern>("IMAccountReceivableCov"))
        .withDirectTerm("IMAccountsReceivableLimit", 150000))
    var imAccRecPartBuilder = new IMAccountsReceivablePartBuilder()
      .withCoinsurance(Coinsurance.TC_90)
      .withBusinessClass(BusinessClass.TC_MANUFACTURER)
      .withCoverage(new CoverageBuilder(entity.IMAccountsRecPartCov)
        .withPattern(PCCoercions.makeProductModel<CoveragePattern>("AccountsRecOffPremisesProperty"))
        .withDirectTerm("AccountsRecOffPremisesPropertyLimit", 100000))
      .withIMAccountsReceivable(imAccRecBuilder)        
    lineBuilder.withPart(imAccRecPartBuilder)
    return this
  }

  function withContractorsEquipment() : IMSubmissionBuilder {
    var contractorsEquipmentPartBuilder = new ContractorsEquipmentPartBuilder()
        .withContractorsEquipment(new ContractorsEquipmentBuilder()
            .withCoverage(new CoverageBuilder(entity.ContractorsEquipCov)
                .withPattern(PCCoercions.makeProductModel<CoveragePattern>("ContractorsEquipSchedCov"))
                .withDirectTerm("ContractorsEquipSchedCovLimit", 100000)
                .withOptionCovTerm("ContractorsEquipSchedCovDeductible", "500")
                .withTypekeyCovTerm("ContractorsEquipSchedCovValuation", typekey.ValuationMethod.TC_REPLCOST))
            .withNumber(6969))
    lineBuilder.withPart(contractorsEquipmentPartBuilder)
    return this
  }
}
