package gw.sampledata.large

uses gw.api.builder.*
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.databuilder.bop.BOPBuildingBuilder
uses gw.api.databuilder.bop.BOPLineBuilder
uses gw.api.databuilder.bop.BOPLocationBuilder
uses gw.api.databuilder.contact.PolicyAddlInsuredBuilder
uses gw.api.databuilder.cp.CPBuildingBuilder
uses gw.api.databuilder.cp.CPLocationBuilder
uses gw.api.databuilder.cp.CommercialPropertyLineBuilder
uses gw.api.databuilder.gl.GLExposureBuilder
uses gw.api.databuilder.gl.GeneralLiabilityLineBuilder
uses gw.api.productmodel.Product
uses gw.api.upgrade.PCCoercions
uses gw.api.util.Range
uses gw.command.jobs.MultiSliceJob
uses gw.lang.reflect.IType
uses gw.sampledata.AbstractSampleDataCollection
uses gw.sampledata.SampleDataConstants

/**
 * A much fuller set of sample Jobs and Policies.
 */
@Export
class LargeSamplePolicyData extends AbstractSampleDataCollection
{
  construct() { }

  /**
   * The name of this sample data collection, for logging and debugging
   */
  public override property get CollectionName() : String {
    return "Large Policies"
  }
  
  /**
   * Checks the database, returning true if this set is already loaded (and thus doesn't need reloading)
   */
  public override property get AlreadyLoaded() : boolean {
    return jobLoaded("85746564938")
  }
  
  /**
   * Loads the contents of this sample data set into the DB
   */
  public override function load() {
    loadConversionOnRenewalData()
    loadMultiSliceSubmissionData()

    // SIMPLE SUBMISSIONS
    runBlockAsUser("ccraft", "LargeSamplePolicyData -- ccraft", \-> {
      loadSubmission("85746564938", "S000212121", PCCoercions.makeProductModel<Product>("BusinessOwners"), SampleDataConstants.getBaseDateMinus(265), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)
      loadSubmission("456783759", "C000148456", PCCoercions.makeProductModel<Product>("PersonalAuto"), SampleDataConstants.getBaseDateMinus(2, 0, 90), new String[0], true)

      // JOB CHAINS
      loadSubmission("85746534578", "C000212105", PCCoercions.makeProductModel<Product>("BusinessAuto"), SampleDataConstants.getBaseDateMinus(2, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)
      runTransactionAsUser(null, "PolicyChange 556345345", \bundle -> {
        new PolicyChangeBuilder().withJobNumber("556345345").withBasedOnPeriod(findPeriodByJobNumber("85746534578", bundle)).create(bundle)
      })
      runTransactionAsUser(null, "Cancellation 2345456334", \bundle -> {
        var basedOnPeriod = findPeriodByJobNumber("556345345", bundle)
        new CancellationBuilder().withJobNumber("2345456334").withBasedOnPeriod(basedOnPeriod).withEffectiveDate(basedOnPeriod.PeriodStart.addMonths(1)).canceledByCarrier().canceledForNonpayment().withProrataRefund().create(bundle)
      })
      runTransactionAsUser(null, "Reinstatement 344525456", \bundle -> {
        new ReinstatementBuilder().withJobNumber("344525456").withBasedOnPeriod(findPeriodByJobNumber("2345456334", bundle)).create(bundle)
      })
      runTransactionAsUser(null, "Renewal 346634523", \bundle -> {
        new RenewalBuilder().withJobNumber("346634523").withBasedOnPeriod(findPeriodByJobNumber("344525456", bundle)).create(bundle)
      })

      runTransactionAsUser(null, "Renewal 643467744", \bundle -> {
        new RenewalBuilder().withJobNumber("643467744").withBasedOnPeriod(findPeriodByJobNumber("456783759", bundle)).create(bundle)
      })

      //a couple of open submissions
      loadSubmission("377653123", "A000377655", PCCoercions.makeProductModel<Product>("BusinessOwners"), SampleDataConstants.getBaseDateMinus(24), SampleDataConstants.ACCOUNT_COMPANY_NAMES, false)
      loadSubmission("377653224", "A000377766", PCCoercions.makeProductModel<Product>("PersonalAuto"), SampleDataConstants.getBaseDateMinus(18), new String[0], false)
      loadSubmission("377653125", "A000377655", PCCoercions.makeProductModel<Product>("BusinessOwners"), SampleDataConstants.getBaseDateMinus(24), SampleDataConstants.ACCOUNT_COMPANY_NAMES, false)
      loadSubmission("377653227", "A000377766", PCCoercions.makeProductModel<Product>("PersonalAuto"), SampleDataConstants.getBaseDateMinus(18), new String[0], false)

      //these submissions allow us to have an open renewal/policy change
      loadSubmission("467653123", "B000467655", PCCoercions.makeProductModel<Product>("BusinessOwners"), SampleDataConstants.getBaseDateMinus(24), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)
      loadSubmission("457653224", "B000457766", PCCoercions.makeProductModel<Product>("PersonalAuto"), SampleDataConstants.getBaseDateMinus(18), new String[0], true)
      runTransactionAsUser(null, "PolicyChange 378653123", \bundle -> {
        new PolicyChangeBuilder().withJobNumber("378653123").withBasedOnPeriod(findPeriodByJobNumber("467653123", bundle)).isDraft().create(bundle)
      })
      runTransactionAsUser(null, "Renewal 568653224", \bundle -> {
        new RenewalBuilder().withJobNumber("568653224").withBasedOnPeriod(findPeriodByJobNumber("457653224", bundle)).isDraft().create(bundle)
      })

    })
      
    runBlockAsUser("aapplegate", "LargeSamplePolicyData -- aapplegate", \->{
      loadSubmission("643467745", "C000456353", PCCoercions.makeProductModel<Product>("PersonalAuto"), SampleDataConstants.getBaseDateMinus(2, 0, 90), new String[0], true)
      runTransactionAsUser(null, "Cancellation 643467746", \bundle -> {
        var basedOnPeriod = findPeriodByJobNumber("643467745", bundle)
        new CancellationBuilder().withJobNumber("643467746").withBasedOnPeriod(basedOnPeriod).withEffectiveDate(basedOnPeriod.PeriodStart.addMonths(1)).canceledByCarrier().canceledForNonpayment().withProrataRefund().create(bundle)
      })
      runTransactionAsUser(null, "Reinstatement 643467748", \bundle -> {
        new ReinstatementBuilder().withJobNumber("643467748").withBasedOnPeriod(findPeriodByJobNumber("643467746", bundle)).create(bundle)
      })
      runTransactionAsUser(null, "Cancellation 643467747", \bundle -> {
        var basedOnPeriod = findPeriodByJobNumber("643467748", bundle)
        new CancellationBuilder().withJobNumber("643467747").withBasedOnPeriod(basedOnPeriod).withEffectiveDate(basedOnPeriod.PeriodStart.addMonths(1)).canceledByCarrier().canceledForNonpayment().withProrataRefund().create(bundle)
      })

      loadSubmission("456783911", "C000478567", PCCoercions.makeProductModel<Product>("WorkersComp"), SampleDataConstants.getBaseDateMinus(2, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)
      runTransactionAsUser(null, "Renewal 643467861", \bundle -> {
        new RenewalBuilder().withJobNumber("643467861").withBasedOnPeriod(findPeriodByJobNumber("456783911", bundle)).create(bundle)
      })

      loadSubmission("456783912", "C000478567", PCCoercions.makeProductModel<Product>("BusinessAuto"), SampleDataConstants.getBaseDateMinus(2, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)  
      runTransactionAsUser(null, "Renewal 643467862", \bundle -> {
        new RenewalBuilder().withJobNumber("643467862").withBasedOnPeriod(findPeriodByJobNumber("456783912", bundle)).create(bundle)
      })

      loadSubmission("456783913", "C000478567", PCCoercions.makeProductModel<Product>("BusinessOwners"), SampleDataConstants.getBaseDateMinus(2, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)
      runTransactionAsUser(null, "Renewal 643467863", \bundle -> {
        new RenewalBuilder().withJobNumber("643467863").withBasedOnPeriod(findPeriodByJobNumber("456783913", bundle)).create(bundle)
      })

      loadSubmission("643467914", "C000478975", PCCoercions.makeProductModel<Product>("WorkersComp"), SampleDataConstants.getBaseDateMinus(2, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)
      runTransactionAsUser(null, "Renewal 643467864", \bundle -> {
        new RenewalBuilder().withJobNumber("643467864").withBasedOnPeriod(findPeriodByJobNumber("643467914", bundle)).create(bundle)
      })

      loadSubmission("643467915", "C000478975", PCCoercions.makeProductModel<Product>("BusinessAuto"), SampleDataConstants.getBaseDateMinus(2, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)     
      runTransactionAsUser(null, "Renewal 643467865", \bundle -> {
        new RenewalBuilder().withJobNumber("643467865").withBasedOnPeriod(findPeriodByJobNumber("643467915", bundle)).create(bundle)
      })
    })
      
    runBlockAsUser("bbaker", "LargeSamplePolicyData -- bbaker", \->{
      loadSubmission("643467916", "C000478975", PCCoercions.makeProductModel<Product>("BusinessOwners"), SampleDataConstants.getBaseDateMinus(2, 0, 90), SampleDataConstants.ACCOUNT_COMPANY_NAMES, true)
      runTransactionAsUser(null, "Renewal 643467866", \bundle -> {
        new RenewalBuilder().withJobNumber("643467866").withBasedOnPeriod(findPeriodByJobNumber("643467916", bundle)).create(bundle)
      })
      runTransactionAsUser(null, "Cancellation 643467917", \bundle -> {
        var basedOnPeriod = findPeriodByJobNumber("643467866", bundle)
        new CancellationBuilder().withJobNumber("643467917").withBasedOnPeriod(basedOnPeriod).withEffectiveDate(basedOnPeriod.PeriodStart.addMonths(1)).canceledByCarrier().canceledForNonpayment().withProrataRefund().create(bundle)
      })
    })
    
    // ACTIVITIES as SU
    loadJobActivity("SUB00000002", "Review Submission", "aapplegate")
    loadJobActivity("643467864", "Review renewal policy UW issues", "aapplegate")

    var account = findAccount("D000556765")
    var accountContact = findAccountContact(account, TC_NAMEDINSURED, "Mike Sherman")

    runBlockAsUser("aapplegate", "DashboardSamplePolices -- aapplegate", \-> {
      runTransactionAsUser(null, "CP for D000556765", \bundle ->
          new SubmissionBuilder()
              .withProduct("CommercialPackage")
              .withOffering("CPPStandard")
              .withPeriodStart(Date.Today.addMonths(-6))
              .withPeriodEnd(Date.Today.addMonths(6))
              .withAccount(account)
              .withPolicyContactRole(new PolicyAddlInsuredBuilder()
                  .withAccountContactRole(accountContact.getRole(TC_NAMEDINSURED)))
              .withPolicyLine(new CommercialPropertyLineBuilder()
                  .withCPLocation(new CPLocationBuilder()
                      .withBuilding(new CPBuildingBuilder()
                          .withCoverage(new CoverageBuilder(CPBuildingCov)
                              .withPatternCode("CPBldgCov")
                              .withTypekeyCovTerm("CPBldgCovCauseOfLoss", CPCauseOfLoss.TC_BASIC)
                              .withDirectTerm("CPBldgCovLimit", 100000)))))
              .issuePolicy()
              .create(bundle)
      )

      loadSubmission("643467920", "D000556765", PCCoercions.makeProductModel<Product>("WorkersComp"), Date.Today.addMonths(-14), {"Sherman Developments", "Mike Sherman"}, true)

      loadSubmission("641467927", "C000212105", PCCoercions.makeProductModel<Product>("BusinessAuto"), Date.Today.addMonths(-3), {"Wright Construction"}, false)
      loadJobActivity("641467927", "Review Submission", "aapplegate")

      runTransactionAsUser(null, "Draft GL for D000556765", \bundle -> {
        new SubmissionBuilder()
            .withJobNumber("641433327")
            .withProduct("GeneralLiability")
            .withOffering("GLStandard")
            .withPeriodStart(Date.Today.addMonths(-3))
            .withPeriodEnd(Date.Today.addMonths(9))
            .withAccount(account)
            .withPolicyContactRole(new PolicyAddlInsuredBuilder()
                .withAccountContactRole(accountContact.getRole(TC_NAMEDINSURED)))
            .withPolicyLine(new GeneralLiabilityLineBuilder()
                .withCoverage(new CoverageBuilder(GeneralLiabilityCov)
                    .withPatternCode("GLCGLCov"))
                .withPolicyCondition(new PolicyConditionBuilder(GeneralLiabilityCond)
                    .withPatternCode("GLAmendLiquorLiability"))
                .withGLCoverageForm(TC_OCCURRENCE)
                .withExposure(new GLExposureBuilder()
                    .withClassCodeAndBasis("0012", 100000)))
            .withDateQuoteNeeded(Date.Today.addDays(3))
            .isDraft()
            .create(bundle)
      })
      loadJobActivity("641433327", "Review Submission", "aapplegate")

      loadSubmission("646667979", "D000556765", PCCoercions.makeProductModel<Product>("WorkersComp"), Date.Today.addMonths(-6), {"Sherman Developments", "Mike Sherman"}, true)
      runTransactionAsUser(null, "Renewal 646667979", \bundle -> {
        new RenewalBuilder().withJobNumber("646667997").withBasedOnPeriod(findPeriodByJobNumber("646667979", bundle)).withEffectiveDate(Date.Tomorrow).isQuoted().create(bundle)
      })

      loadJobActivity("646667997", "Review renewal policy UW issues", "aapplegate")

      loadSubmission("646669797", "D000556765", PCCoercions.makeProductModel<Product>("WorkersComp"), Date.Today.addMonths(-6), {"Sherman Developments", "Mike Sherman"}, true)
      runTransactionAsUser(null, "Renewal 646669797", \bundle -> {
        new RenewalBuilder().withJobNumber("646667998").withBasedOnPeriod(findPeriodByJobNumber("646669797", bundle)).withEffectiveDate(Date.Tomorrow).isDraft().create(bundle)
      })
      loadJobActivity("646667998", "Review renewal policy UW issues", "aapplegate")

      loadSubmission("641467179", "D000556764", PCCoercions.makeProductModel<Product>("PersonalAuto"), Date.Today, {}, true)
      runTransactionAsUser(null, "Change of 641467179", \bundle -> {
        new PolicyChangeBuilder().withJobNumber("641467912").withEffectiveDate(Date.Today.addMonths(4)).withBasedOnPeriod(findPeriodByJobNumber("641467179", bundle)).isQuoted().create(bundle)
      })
      loadJobActivity("641467912", "Review new mail", "aapplegate")

      loadSubmission("611467179", "D000556764", PCCoercions.makeProductModel<Product>("PersonalAuto"), Date.Today, {}, true)
      runTransactionAsUser(null, "Cancel of 611467179", \bundle -> {
        new CancellationBuilder().withJobNumber("641467911").withEffectiveDate(Date.Today.addMonths(2)).withBasedOnPeriod(findPeriodByJobNumber("611467179", bundle)).isDraft().create(bundle)
      })
      loadJobActivity("641467911", "Review new mail", "aapplegate")

      loadSubmission("641467777", "C000212105", PCCoercions.makeProductModel<Product>("WorkersComp"), Date.Today.addMonths(-2), {"Wright Construction"}, true)
      runTransactionAsUser(null, "Renewal for 641467777", \bundle -> {
        new RenewalBuilder().withJobNumber("641460777").withBasedOnPeriod(findPeriodByJobNumber("641467777", bundle)).withEffectiveDate(Date.Tomorrow).isQuoted().create(bundle)
      })
      loadJobActivity("641460777", "Review renewal policy UW issues", "aapplegate")

      var policyPeriodWC = loadSubmission("641537938", "D000556765", PCCoercions.makeProductModel<Product>("WorkersComp"), Date.Today.addMonths(6), {"Sherman Developments", "Mike Sherman"}, true);
      loadPolicyPeriodContingency(policyPeriodWC, "Credit card photo", "Please provide a photo of your credict card")
      var policyPeriodPC = loadSubmission("646667679", "D000556764", PCCoercions.makeProductModel<Product>("PersonalAuto"), Date.Today.addMonths(-6), {}, true)
      loadPolicyPeriodContingency(policyPeriodPC, "Incorrect license plate", "It is not possible to find car with provided license plate in our data base")

      runTransactionAsUser(null, "GL for D000556765", \bundle -> {
        var forCancelGL = new SubmissionBuilder()
            .withProduct("GeneralLiability")
            .withOffering("GLStandard")
            .withPeriodStart(Date.Today.addMonths(-13))
            .withPeriodEnd(Date.Today.addMonths(-1))
            .withAccount(account)
            .withPolicyContactRole(new PolicyAddlInsuredBuilder()
                .withAccountContactRole(accountContact.getRole(TC_NAMEDINSURED)))
            .withPolicyLine(new GeneralLiabilityLineBuilder()
                .withCoverage(new CoverageBuilder(GeneralLiabilityCov)
                    .withPatternCode("GLCGLCov"))
                .withPolicyCondition(new PolicyConditionBuilder(GeneralLiabilityCond)
                    .withPatternCode("GLAmendLiquorLiability"))
                .withGLCoverageForm(TC_OCCURRENCE)
                .withExposure(new GLExposureBuilder()
                    .withClassCodeAndBasis("0012", 100000)))
            .issuePolicy()
            .create(bundle)
        new CancellationBuilder().withBasedOnPeriod(forCancelGL).create(bundle)
      })

      runTransactionAsUser(null, "BO for D000556765", \bundle ->
          new SubmissionBuilder()
              .withProduct("BusinessOwners")
              .withOffering("BOPSilver")
              .withPeriodStart(Date.Today.addMonths(6))
              .withEffectiveDate(Date.Today.addMonths(6))
              .withPeriodEnd(Date.Today.addMonths(18))
              .withAccount(account)
              .withPolicyContactRole(new PolicyAddlInsuredBuilder()
                  .withAccountContactRole(accountContact.getRole(TC_NAMEDINSURED)))
              .withPolicyLine(new BOPLineBuilder()
                  .withOnlyBOPLocation(new BOPLocationBuilder()
                      .withBuilding(new BOPBuildingBuilder())))
              .issuePolicy()
              .create(bundle)
      )

      loadSubmission("643467921", "C000212107", PCCoercions.makeProductModel<Product>("BusinessAuto"), Date.Today.addMonths(-3), {}, true)

      loadSubmission("643467922", "D000556764", PCCoercions.makeProductModel<Product>("HOPHomeowners"), Date.Today.addMonths(-6), {"Mike Sherman"}, true)

      loadSubmission("643467924", "D000556764", PCCoercions.makeProductModel<Product>("PersonalAuto"), Date.Today.addMonths(-5), {}, true)
      runTransactionAsUser(null, "PA for D000556764", \bundle -> {
        var forCancelPA = findPeriodByJobNumber("643467924", bundle)
        new CancellationBuilder()
            .withBasedOnPeriod(forCancelPA)
            .withEffectiveDate(forCancelPA.PeriodStart.addMonths(1))
            .canceledByCarrier()
            .canceledForNonpayment()
            .withProrataRefund()
            .create(bundle)
      })

      loadSubmission("643467925", "D000556764", PCCoercions.makeProductModel<Product>("PersonalAuto"), Date.Today.addMonths(-11), {}, true)
      runTransactionAsUser(null, "Renewal PA for D000556764", \bundle ->
          new RenewalBuilder().withBasedOnPeriod(findPeriodByJobNumber("643467925", bundle)).create(bundle)
      )
    })
  }

  private function loadConversionOnRenewalData() {
    var account = loadCompanyAccount("ConversionAccount", null, "Optimus Prime", "2051", null, SampleDataConstants.ACCOUNT_COMPANY_NAMES)
    var producerCode = new ProducerCodeBuilder().createAndCommit()
    var basedOnPeriodStart = Date.Today.addMonths(-1)
    var basedOnPeriodEnd = Date.Today

    var product = gw.api.productmodel.ProductLookup.getByPublicID("BusinessAuto")
    var renewal = account.createConversionRenewalWithBasedOn(basedOnPeriodStart, basedOnPeriodEnd, product, producerCode, null, \period -> {
      populateBasedOnPeriod(period, account, basedOnPeriodStart, basedOnPeriodEnd)
    })

    var policyPeriod = renewal.LatestPeriod
    policyPeriod.RenewalProcess.beginEditing()
    for (territoryCode in policyPeriod.PrimaryLocation.TerritoryCodes) {
      if (territoryCode.Code == null) {
        territoryCode.Code = "AAA"
        territoryCode.PolicyLinePattern = policyPeriod.BusinessAutoLine.Pattern
      }
    }
    policyPeriod.Bundle.commit()

    var legacyPeriod = renewal.LatestPeriod.BasedOn
    if (legacyPeriod.Status != PolicyPeriodStatus.TC_LEGACYCONVERSION) {
      throw new IllegalStateException("Could not create conversion on renewal policy in LargeSamplePolicyData")
    }
  }

  private function loadMultiSliceSubmissionData() {
    var multiSliceBuilder = new MultiSliceJob()
    var period = multiSliceBuilder.makePeriod("submission", {Range.closedOpen(2 * 30, 3 * 30), Range.from(2 * 30 + 10)})
    if (period.OOSSlices.IsEmpty) {
      throw new IllegalStateException("Could not create multi-slice submission in LargeSamplePolicyData")
    }

  }


  private function populateBasedOnPeriod(period : PolicyPeriod, account : Account, startDate : Date, endDate : Date) {
    period.Offering = gw.api.productmodel.OfferingLookup.getByPublicID("BAStandardOffering")
    period.BusinessAutoLine.PolicyType = BAPolicyType.get(BAPolicyType.TC_BA.Code)
    period.BusinessAutoLine.Fleet = FleetType.get(FleetType.TC_NONFLEET.Code)
    period.BaseState = Jurisdiction.get(State.TC_CA.Code)
    period.UWCompany = UWCompany.finder.findUWCompanies().FirstResult
    period.BusinessAutoLine.syncCoverages()
    if (period.PolicyLocations.IsEmpty) {
      period.newLocation(account.AccountLocations.first())
    }
    period.BusinessAutoLine.addJurisdiction(Jurisdiction.TC_CA)
    period.PreferredCoverageCurrency = Currency.TC_USD
    period.PreferredSettlementCurrency = Currency.TC_USD

    if (period.BusinessAutoLine.Vehicles.IsEmpty) {
      period.BusinessAutoLine.createAndAddBusinessVehicle()
    }
    period.BusinessAutoLine.Vehicles.each(\vehicle -> {
      vehicle.Location = period.PrimaryLocation
      vehicle.CostNew = 2000bd.ofDefaultCurrency()
      vehicle.Vin = UniqueKeyGenerator.get().nextID()
    })
    period.PolicyLocations.each(\elt -> {
      elt.TerritoryCodes.each(\code -> {
        code.Code = "AAA"
        code.PolicyLinePattern = period.BusinessAutoLine.Pattern
      })
    })
    period.BusinessAutoLine.syncCoverages()

    if (period.Policy.OriginalEffectiveDate == null) {
      period.Policy.OriginalEffectiveDate = startDate
    }
    period.Bundle.commit()
  }

}
