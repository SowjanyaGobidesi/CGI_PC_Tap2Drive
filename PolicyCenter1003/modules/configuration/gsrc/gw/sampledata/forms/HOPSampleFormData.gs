package gw.sampledata.forms
uses gw.api.builder.FormPatternBuilder
uses gw.api.productmodel.ClausePattern
uses gw.api.productmodel.CoveragePattern
uses gw.api.system.PCDependenciesGateway
uses gw.api.upgrade.PCCoercions
uses gw.api.util.DateUtil
uses gw.transaction.Transaction

/**
 * A set of sample form patterns for PolicyCenter's out-of-the-box HOPLine.
 */
@Export
class HOPSampleFormData extends AbstractSampleFormData {

  construct() {
  }

  override property get CollectionName() : String {
    return "HOPLine Forms"
  }

  override property get AlreadyLoaded() : boolean {
    return formPatternLoaded("HO_DP_00")
  }

  override function load() {
    Transaction.runWithNewBundle(\bundle -> {
      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_MT")
          .withFormNumber("HOP 08 MT")
          .withEdition("01 16")
          .withDescription("Montana Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_MT, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_03_00")
          .withFormNumber("HOP 03 00")
          .withEdition("01 16")
          .withDescription("Homeowners Special Policy")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(false)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withPolicyLinePatternCode("HOPLine")
          .withGenericInferenceClass("gw.forms.generic.GenericCoverableTypeKeyForm")
          .withCoverableType(HOPDwelling)
          .withCoverableTypeList(HOPDwelling#CoverageForm.getPropertyInfo())
          .withCoverableTypeKey(HOPCoverageForm.TC_HO3)
          .withCoverableTypeKeyExistsOnAll(true)
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_AK")
          .withFormNumber("HOP 08 AK")
          .withEdition("01 16")
          .withDescription("Alaska Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_AK, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_AL")
          .withFormNumber("HOP 08 AL")
          .withEdition("01 16")
          .withDescription("Alabama Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_AL, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_VA")
          .withFormNumber("HOP 08 VA")
          .withEdition("01 16")
          .withDescription("Virginia Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_VA, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_SDS_1")
          .withFormNumber("HOP SDS 1")
          .withEdition("01 16")
          .withDescription("Sewer, Drain and Sump Backup Coverage")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withPolicyLinePatternCode("HOPLine")
          .withGenericInferenceClass("gw.forms.generic.GenericClauseSelectionForm")
          .withClausePatternCodeIdentifier("HOPBackupSewersDrainsPump")
          .withPatternExistsOnAll(false)
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_UT")
          .withFormNumber("HOP 08 UT")
          .withEdition("01 16")
          .withDescription("Utah Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_UT, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_MN")
          .withFormNumber("HOP 08 MN")
          .withEdition("01 16")
          .withDescription("Minnesota Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_MN, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_MO")
          .withFormNumber("HOP 08 MO")
          .withEdition("01 16")
          .withDescription("Missouri Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_MO, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_IL")
          .withFormNumber("HOP 08 IL")
          .withEdition("01 16")
          .withDescription("Illinois Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_IL, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_IN")
          .withFormNumber("HOP 08 IN")
          .withEdition("01 16")
          .withDescription("Indiana Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_IN, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_MS")
          .withFormNumber("HOP 08 MS")
          .withEdition("01 16")
          .withDescription("Mississippi Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_MS, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_NE")
          .withFormNumber("HOP 08 NE")
          .withEdition("01 16")
          .withDescription("Nebraska Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_NE, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_RI")
          .withFormNumber("HOP 08 RI")
          .withEdition("01 16")
          .withDescription("Rhode Island Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_RI, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_AZ")
          .withFormNumber("HOP 08 AZ")
          .withEdition("01 16")
          .withDescription("Arizona Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_AZ, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_NH")
          .withFormNumber("HOP 08 NH")
          .withEdition("01 16")
          .withDescription("New Hampshire Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_NH, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_NJ")
          .withFormNumber("HOP 08 NJ")
          .withEdition("01 16")
          .withDescription("New Jersey Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_NJ, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_VT")
          .withFormNumber("HOP 08 VT")
          .withEdition("01 16")
          .withDescription("Vermont Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_VT, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_AR")
          .withFormNumber("HOP 08 AR")
          .withEdition("01 16")
          .withDescription("Arkansas Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_AR, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_VPP_1")
          .withFormNumber("HOP VPP 1")
          .withEdition("01 16")
          .withDescription("Increased Limits by Personal Property Type")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withPolicyLinePatternCode("HOPLine")
          .withGenericInferenceClass("gw.forms.generic.GenericClauseSelectionForm")
          .withClausePatternCodeIdentifier("HOPValuablePersonalProperty")
          .withPatternExistsOnAll(false)
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_NC")
          .withFormNumber("HOP 08 NC")
          .withEdition("01 16")
          .withDescription("North Carolina Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_NC, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_ND")
          .withFormNumber("HOP 08 ND")
          .withEdition("01 16")
          .withDescription("North Dakota Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_ND, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_NV")
          .withFormNumber("HOP 08 NV")
          .withEdition("01 16")
          .withDescription("Nevada Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_NV, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_02_00")
          .withFormNumber("HOP 02 00")
          .withEdition("01 16")
          .withDescription("Homeowners Broad Form Policy")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(false)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withPolicyLinePatternCode("HOPLine")
          .withGenericInferenceClass("gw.forms.generic.GenericCoverableTypeKeyForm")
          .withCoverableType(HOPDwelling)
          .withCoverableTypeList(HOPDwelling#CoverageForm.getPropertyInfo())
          .withCoverableTypeKey(HOPCoverageForm.TC_HO2)
          .withCoverableTypeKeyExistsOnAll(true)
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_WA")
          .withFormNumber("HOP 08 WA")
          .withEdition("01 16")
          .withDescription("Washington Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_WA, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_06_00")
          .withFormNumber("HOP 06 00")
          .withEdition("01 16")
          .withDescription("Condo Unit Owners Policy")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(false)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withPolicyLinePatternCode("HOPLine")
          .withGenericInferenceClass("gw.forms.generic.GenericCoverableTypeKeyForm")
          .withCoverableType(HOPDwelling)
          .withCoverableTypeList(HOPDwelling#CoverageForm.getPropertyInfo())
          .withCoverableTypeKey(HOPCoverageForm.TC_HO6)
          .withCoverableTypeKeyExistsOnAll(true)
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_NY")
          .withFormNumber("HOP 08 NY")
          .withEdition("01 16")
          .withDescription("New York Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_NY, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_NM")
          .withFormNumber("HOP 08 NM")
          .withEdition("01 16")
          .withDescription("New Mexico Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_NM, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_SPP_1")
          .withFormNumber("HOP SPP 1")
          .withEdition("01 16")
          .withDescription("Schedule of Personal Property")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withPolicyLinePatternCode("HOPLine")
          .withGenericInferenceClass("gw.forms.generic.GenericClauseSelectionForm")
          .withClausePatternCodeIdentifier("HOPScheduledPersonalProperty")
          .withPatternExistsOnAll(false)
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_FL")
          .withFormNumber("HOP 08 FL")
          .withEdition("01 16")
          .withDescription("Florida Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_FL, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_OH")
          .withFormNumber("HOP 08 OH")
          .withEdition("01 16")
          .withDescription("Ohio Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_OH, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_GA")
          .withFormNumber("HOP 08 GA")
          .withEdition("01 16")
          .withDescription("Georgia Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_GA, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_OK")
          .withFormNumber("HOP 08 OK")
          .withEdition("01 16")
          .withDescription("Oklahoma Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_OK, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)

      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_CA")
          .withFormNumber("HOP 08 CA")
          .withEdition("01 16")
          .withDescription("California Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_CA, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_SC")
          .withFormNumber("HOP 08 SC")
          .withEdition("01 16")
          .withDescription("South Carolina Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_SC, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_SD")
          .withFormNumber("HOP 08 SD")
          .withEdition("01 16")
          .withDescription("South Dakota Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_SD, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_WI")
          .withFormNumber("HOP 08 WI")
          .withEdition("01 16")
          .withDescription("Wisconsin Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_WI, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_ASP_1")
          .withFormNumber("HOP ASP 1")
          .withEdition("01 16")
          .withDescription("Sprinkler System Conditions")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericCoverableTypeKeyForm")
          .withCoverableType(HOPDwelling)
          .withCoverableTypeList(HOPDwelling#SprinklerSystemType.getPropertyInfo())
          .withCoverableTypeKey(SprinklerSystemType.TC_FULL)
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_KS")
          .withFormNumber("HOP 08 KS")
          .withEdition("01 16")
          .withDescription("Kansas Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_KS, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_05_00")
          .withFormNumber("HOP 05 00")
          .withEdition("01 16")
          .withDescription("Homeowners Comprehensive Policy")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(false)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withPolicyLinePatternCode("HOPLine")
          .withGenericInferenceClass("gw.forms.generic.GenericCoverableTypeKeyForm")
          .withCoverableType(HOPDwelling)
          .withCoverableTypeList(HOPDwelling#CoverageForm.getPropertyInfo())
          .withCoverableTypeKey(HOPCoverageForm.TC_HO5)
          .withCoverableTypeKeyExistsOnAll(true)
          .create(bundle)

      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_CO")
          .withFormNumber("HOP 08 CO")
          .withEdition("01 16")
          .withDescription("Colorado Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_CO, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_KY")
          .withFormNumber("HOP 08 KY")
          .withEdition("01 16")
          .withDescription("Kentucky Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_KY, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_WV")
          .withFormNumber("HOP 08 WV")
          .withEdition("01 16")
          .withDescription("West Virginia Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_WV, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_WY")
          .withFormNumber("HOP 08 WY")
          .withEdition("01 16")
          .withDescription("Wyoming Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_WY, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_OR")
          .withFormNumber("HOP 08 OR")
          .withEdition("01 16")
          .withDescription("Oregon Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_OR, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_TN")
          .withFormNumber("HOP 08 TN")
          .withEdition("01 16")
          .withDescription("Tennessee Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_TN, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)
      
      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_CT")
          .withFormNumber("HOP 08 CT")
          .withEdition("01 16")
          .withDescription("Connecticut Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_CT, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)

      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_PA")
          .withFormNumber("HOP 08 PA")
          .withEdition("01 16")
          .withDescription("Pennsylvania Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_PA, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_GIR_1")
          .withFormNumber("HOP GIR 1")
          .withEdition("01 16")
          .withDescription("Assisted Living Care Coverage Extension")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
              // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
              // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withPolicyLinePatternCode("HOPLine")
          .withGenericInferenceClass("gw.forms.generic.GenericClauseSelectionForm")
          .withClausePatternCodeIdentifier("HOPAssistedLivingCare")
          .withPatternExistsOnAll(false)
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_LA")
          .withFormNumber("HOP 08 LA")
          .withEdition("01 16")
          .withDescription("Louisiana Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_LA, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_04_00")
          .withFormNumber("HOP 04 00")
          .withEdition("01 16")
          .withDescription("Renters Broad Form Contents Policy")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(false)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withPolicyLinePatternCode("HOPLine")
          .withGenericInferenceClass("gw.forms.generic.GenericCoverableTypeKeyForm")
          .withCoverableType(HOPDwelling)
          .withCoverableTypeList(HOPDwelling#CoverageForm.getPropertyInfo())
          .withCoverableTypeKey(HOPCoverageForm.TC_HO4)
          .withCoverableTypeKeyExistsOnAll(true)
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HO_DP_00")
          .withFormNumber("HO DP 00")
          .withEdition("01 16")
          .withDescription("Homeowners Declarations")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(false)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
              // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_DC")
          .withFormNumber("HOP 08 DC")
          .withEdition("01 16")
          .withDescription("District of Columbia Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_DC, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_DE")
          .withFormNumber("HOP 08 DE")
          .withEdition("01 16")
          .withDescription("Delaware Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_DE, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_HI")
          .withFormNumber("HOP 08 HI")
          .withEdition("01 16")
          .withDescription("Hawaii Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_HI, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_TX")
          .withFormNumber("HOP 08 TX")
          .withEdition("01 16")
          .withDescription("Texas Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_TX, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_MD")
          .withFormNumber("HOP 08 MD")
          .withEdition("01 16")
          .withDescription("Maryland Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_MD, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_IA")
          .withFormNumber("HOP 08 IA")
          .withEdition("01 16")
          .withDescription("Iowa Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_IA, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_ME")
          .withFormNumber("HOP 08 ME")
          .withEdition("01 16")
          .withDescription("Maine Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_ME, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_ID")
          .withFormNumber("HOP 08 ID")
          .withEdition("01 16")
          .withDescription("Idaho Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_ID, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_MI")
          .withFormNumber("HOP 08 MI")
          .withEdition("01 16")
          .withDescription("Michigan Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_MI, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)


      new FormPatternBuilder()
          // Basics
          .withCode("HOP_08_MA")
          .withFormNumber("HOP 08 MA")
          .withEdition("01 16")
          .withDescription("Massachusetts Amendatory Endorsement")
          .withInferenceTime(TC_QUOTE)
          .withEndorsementNumbered(true)
          .withPriority(1)
          // Products
          .withProduct("HOPHomeowners")
          // Jobs
          .withJob("Submission")
          .withJob("Renewal")
          .withJob("Rewrite")
          .withJob("PolicyChange")
          .withJob("RewriteNewAccount")
          .withJob("Reinstatement")
          // Jurisdictions
          .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, TC_MA, null)
          // Policy Change
          .withInternalRemovalEndorsement(false)
          .withInternalReissueOnChange(false)
          // Inference
          .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
          .withPolicyLinePatternCode("HOPLine")
          .create(bundle)
    })
  }

}
