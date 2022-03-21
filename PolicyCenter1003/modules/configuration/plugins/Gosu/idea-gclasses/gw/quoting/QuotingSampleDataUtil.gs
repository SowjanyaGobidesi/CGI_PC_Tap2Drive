package gw.quoting

uses gw.api.builder.AccountBuilder
uses gw.api.builder.AccountContactBuilder
uses gw.api.builder.AccountLocationBuilder
uses gw.api.builder.CompanyBuilder
uses gw.api.builder.CoverageBuilder
uses gw.api.builder.DriverBuilder
uses gw.api.builder.FormPatternBuilder
uses gw.api.builder.FormPatternCovTermBuilder
uses gw.api.builder.FormPatternCovTermValueBuilder
uses gw.api.builder.PersonBuilder
uses gw.api.builder.ProducerCodeBuilder
uses gw.api.builder.SubmissionBuilder
uses gw.api.builder.SubmissionStatus
uses gw.api.database.Queries
uses gw.api.database.Query
uses gw.api.database.QuerySelectColumns
uses gw.api.database.Relop
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.databuilder.pa.PAVehicleBuilder
uses gw.api.databuilder.pa.PersonalAutoLineBuilder
uses gw.api.databuilder.pa.PolicyDriverBuilder
uses gw.api.databuilder.pa.VehicleDriverBuilder
uses gw.api.path.Paths
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.upgrade.PCCoercions
uses gw.api.util.DateUtil
uses gw.api.util.PCUniqueUSPhoneGenerator

/**
 */
@Export
class QuotingSampleDataUtil {
  static property get UniqueCode() : String {
    return UniqueKeyGenerator.get().nextID()
  }

  static function createPAPolicyPeriod(status : SubmissionStatus, hasUWIssue : boolean) : PolicyPeriod {
    return gw.quoting.QuotingUtil.runWithQuoteExportBundle(\bundle -> createPAPolicyPeriod(status, hasUWIssue, null))
  }

  static function createPAPolicyPeriod(status : SubmissionStatus, hasUWIssue : boolean,
                                       accountHolderContact : Contact) : PolicyPeriod {
    var bundle = accountHolderContact?.Bundle ?: QuotingUtil.createQuoteExportBundle()
    var accountLocationBuilder = new AccountLocationBuilder()
    var driverBuilder = new DriverBuilder()
    var driverAccountContact = new AccountContactBuilder()
        .withDefaultContact()
        .withRole(driverBuilder)
    var accountBuilder = new AccountBuilder(accountHolderContact == null)
    if (accountHolderContact != null) {
      accountBuilder.withAccountHolderContact(accountHolderContact)
    }
    var account = accountBuilder.withAccountLocation(accountLocationBuilder)
        .withAccountContact(driverAccountContact)
        .create(bundle)

    var vehicleDriverBuilder = new VehicleDriverBuilder().withPercentageDriven(100)
    var vehicleBuilder = new PAVehicleBuilder().withVehicleDriver(vehicleDriverBuilder).withCost(25000)
    if (hasUWIssue) {
      vehicleBuilder.withCost(2500000) // High value vehicle
    }
    var policyDriverBuilder = new PolicyDriverBuilder()
        .withAccountContactRole(driverBuilder)
        .withVehicleDriver(vehicleDriverBuilder)
    var lineBuilder = new PersonalAutoLineBuilder()
        .withVehicle(vehicleBuilder)
        .withPolicyDriver(policyDriverBuilder)
        .withCoverage(new CoverageBuilder(PersonalAutoCov) // Liability - Bodily Injury...
            .withPatternCode("PALiabilityCov")
            .withPackageCovTerm("PALiability", "250/500/100"))
    var period = new SubmissionBuilder()
        .withAccount(account)
        .withProduct("PersonalAuto")
        .withBillingMethod(BillingMethod.TC_DIRECTBILL)
        .withProducerCodeOfRecord(getProducerCode())
        .withPolicyContactRole(policyDriverBuilder)
        .withPolicyLine(lineBuilder)
        .withPaymentPlanID("pctest:2")
        .withStatus(status)
        .create(bundle)
    return period
  }

  static function getProducerCode() : ProducerCode {
    var query = Query.make(ProducerCode).join(CommissionPlan, "ProducerCode").compare("Currency", Equals, Currency.TC_USD)
    var results = query.select().orderByDescending(QuerySelectColumns.path(Paths.make(ProducerCode#CreateTime)))
    var producerCode = results.first()
    if (producerCode == null) {
      gw.transaction.Transaction.runWithNewBundle(\bundle -> {
        producerCode = new ProducerCodeBuilder()
            .withPublicId("pctest:1")
            .withCode("Test Code")
            .create(bundle)
      })
    }
    return producerCode
  }

  static function loadSampleForms() {
    createSamplePAGenericCovTermSelectionForm() // Quote time form inference
    createSamplePADecSheet() // Bind time form inference
    createSampleHOPCovEForm()
    createSampleHOPDecSheet()
  }

  static function createSamplePAGenericCovTermSelectionForm() {
    var code = "HVQ_" + UniqueCode
    new FormPatternBuilder()
        .withCode(code)
        .withEdition("0100")
        .withDescription("Clause PALiabilityCov based Form")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withProduct("PersonalAuto")
        .withJob("Submission")
        .withPolicyLinePattern(PCCoercions.makeProductModel<PolicyLinePattern>("PersonalAutoLine"))
        .withFormNumber("Test_Form" + code)
            // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
            // inference
        .withGenericInferenceClass("gw.forms.generic.GenericCovTermSelectionForm")
        .withClausePatternPublicId("PALiabilityCov")
        .withFormPatternCovTerm(new FormPatternCovTermBuilder()
            .withCovTermPatternCode("PALiability").withSelectedCovTermValue(new FormPatternCovTermValueBuilder().withCode("250/500/100")))
        .createAndCommit()
  }

  static function createSamplePADecSheet() {
    var code = "HVQ_" + UniqueCode
    new FormPatternBuilder()
        // Basics
        .withCode(code)
        .withFormNumber("TestForm_" + code)
        .withEdition("0100")
        .withDescription("Dec Sheet")
        .withInferenceTime(TC_BIND)
        .withEndorsementNumbered(false)
        .withPriority(0)
        .withRefCode(null)
            // Products
        .withProduct("PersonalAuto")
            // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
            // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
        .withInternalGroupCode(null)
        .withUseInsteadOfCode(null)
            // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(true)
        .withRemovalEndorsementFormNumber(null)
            // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("PersonalAutoLine")
        .withClausePatternPublicId(null)
        .withPatternExistsOnAll(false)
        .withCoverableType(null as String)
        .withCoverableTypeList(null as String)
        .withCoverableTypeKey(null as String)
        .withCoverableTypeKeyExistsOnAll(null)
        .createAndCommit()
  }

  static function createSampleHOPCovEForm() {
    var code = "HVQ_" + UniqueCode
    new FormPatternBuilder()
        .withCode(code)
        .withEdition("0100")
        .withDescription("Clause HOPCovE based Form")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withProduct("HOPHomeowners")
        .withJob("Submission")
        .withPolicyLinePattern(PCCoercions.makeProductModel<PolicyLinePattern>("HOPLine"))
        .withFormNumber("TestForm_" + code)
            // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
            // inference
        .withGenericInferenceClass("gw.forms.generic.GenericCovTermSelectionForm")
        .withCoveragePartType(CoveragePartType.TC_HOPDWELLING)
        .withClausePatternPublicId("zd7gujr17mccs3puv5jreeu1e59") // public-id of HOPCovE coverage
        .withFormPatternCovTerm(new FormPatternCovTermBuilder()
            .withCovTermPatternCode("zjihof5u6p0ob195orrdcmauhpa") // public-id of HOPCovELimit
            .withSelectedCovTermValue(new FormPatternCovTermValueBuilder().withCode("HopCovELimit100000")))
        .createAndCommit()
  }

  static function createSampleHOPDecSheet() {
    var code = "HVQ_" + UniqueCode
    new FormPatternBuilder()
        // Basics
        .withCode(code)
        .withFormNumber("TestForm_" + code)
        .withEdition("0100")
        .withDescription("Dec Sheet")
        .withInferenceTime(TC_BIND)
        .withEndorsementNumbered(false)
        .withPriority(0)
        .withRefCode(null)
            // Products
        .withProduct("HOPHomeowners")
            // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
            // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
        .withInternalGroupCode(null)
        .withUseInsteadOfCode(null)
            // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(true)
        .withRemovalEndorsementFormNumber(null)
            // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("HOPLine")
        .withClausePatternPublicId(null)
        .withPatternExistsOnAll(false)
        .withCoverableType(null as String)
        .withCoverableTypeList(null as String)
        .withCoverableTypeKey(null as String)
        .withCoverableTypeKeyExistsOnAll(null)
        .createAndCommit()
  }

  static function getFormPatterns(line : String) : List<FormPattern> {
    var query = Queries.createQuery(FormPattern.TYPE.get())
        .compare(FormPattern#PolicyLinePatternCode, Relop.Equals, line)
        .contains(FormPattern#Code, "HVQ", true)
    return query.select().toList() as List<FormPattern>
  }

  static function createAccountForPerson() : Account {
    var id = UniqueKeyGenerator.get().nextInteger()
    var firstName = "Juddy "+ id
    var lastName = "Hobbs "+ id
    var phone = PCUniqueUSPhoneGenerator.get().NextPhone
    var email = "Juddy_"+id+"@gmail.com"
    return createAccountForPerson(firstName, lastName, phone, email)
  }

  static function createAccountForPerson(firstName : String, lastName : String, phone : String, email : String) : Account {
    var account : Account
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var accountHolderContact = new PersonBuilder()
          .withFirstName(firstName)
          .withLastName(lastName)
          .withWorkPhone(phone)
          .withEmailAddress1(email)
      account = new AccountBuilder(false)
          .withAccountHolderContact(accountHolderContact)
          .withAccountLocation(new AccountLocationBuilder()).create(bundle)
    })
    return account
  }

  static function createAccountForCompany() : Account {
    var id = UniqueKeyGenerator.get().nextInteger()
    var companyName = "Guidewire "+ id
    var phone = PCUniqueUSPhoneGenerator.get().NextPhone
    var email = "gw_"+id+"@gray.com"
    return createAccountForCompany(companyName, phone, email)
  }

  static function createAccountForCompany(companyName : String, phone : String, email : String) : Account {
    var account : Account
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      var accountHolderContact = new CompanyBuilder()
          .withCompanyName(companyName)
          .withWorkPhone(phone)
          .withEmailAddress1(email)
      account = new AccountBuilder(false)
          .withAccountHolderContact(accountHolderContact)
          .withAccountLocation(new AccountLocationBuilder()).create(bundle)
    })
    return account
  }

  static function createQuoteContactForPerson() : Contact {
    var bundle = QuotingUtil.createQuoteExportBundle()
    return new PersonBuilder()
        .withWorkPhone(PCUniqueUSPhoneGenerator.get().NextPhone)
        .create(bundle)
  }

  static function createQuoteContactForPerson(firstName : String, lastName : String, workPhone : String,
                                              email : String) : Contact {
    var bundle = QuotingUtil.createQuoteExportBundle()
    var contact = new PersonBuilder()
        .withFirstName(firstName)
        .withLastName(lastName)
        .withWorkPhone(workPhone)
        .withEmailAddress1(email)
        .create(bundle)
    return contact
  }

  static function createQuoteContactForCompany() : Contact {
    var companyName = "CompanyName" + UniqueKeyGenerator.get().nextKey()
    var workPhone = PCUniqueUSPhoneGenerator.get().NextPhone
    var email = UniqueKeyGenerator.get().nextID() + "@guidewire.com"
    return createQuoteContactForCompany(companyName, workPhone, email)
  }

  static function createQuoteContactForCompany(companyName : String, workPhone : String, email : String) : Contact {
    var bundle = QuotingUtil.createQuoteExportBundle()
    var contact = new CompanyBuilder()
        .withCompanyName(companyName)
        .withWorkPhone(workPhone)
        .withEmailAddress1(email)
        .create(bundle)
    return contact
  }
}