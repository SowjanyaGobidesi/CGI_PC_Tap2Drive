package gw.sampledata.forms
uses gw.api.builder.FormPatternBuilder
uses gw.api.util.DateUtil
uses gw.transaction.Transaction

/**
 * A set of sample form patterns for PolicyCenter's out-of-the-box GLLine.
 */
@Export
class GLSampleFormData extends AbstractSampleFormData {

  construct() {
  }

  override property get CollectionName() : String {
    return "GLLine Forms"
  }

  override property get AlreadyLoaded() : boolean {
    return formPatternLoaded("CL00771093_AR")
  }

  override function load() {
    Transaction.runWithNewBundle(\bundle -> {
      new FormPatternBuilder()
        // Basics
        .withCode("CL00771093_AR")
        .withFormNumber("CL0077")
        .withEdition("1093")
        .withDescription("CHANGES - ARKANSAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 1993), null, TC_AR, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00780105_CA")
        .withFormNumber("CL0078")
        .withEdition("0105")
        .withDescription("CHANGES - CALIFORNIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2005), null, TC_CA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00791207_FL")
        .withFormNumber("CL0079")
        .withEdition("1207")
        .withDescription("CHANGES - CANCELLATION AND NON-RENEWAL - FLORIDA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2007), null, TC_FL, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00801207_IL")
        .withFormNumber("CL0080")
        .withEdition("1207")
        .withDescription("CHANGES - CANCELLATION AND NON-RENEWAL - ILLINOIS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2007), null, TC_IL, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00811204_TX")
        .withFormNumber("CL0081")
        .withEdition("1204")
        .withDescription("CHANGES - CANCELLATION PROVISIONS OR COVERAGE CHANGE - TEXAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_TX, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00820999_CT")
        .withFormNumber("CL0082")
        .withEdition("0999")
        .withDescription("CHANGES - CLAIMS MADE PROVISIONS - CONNECTICUT")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(9, 1, 1999), null, TC_CT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00830798_CO")
        .withFormNumber("CL0083")
        .withEdition("0798")
        .withDescription("CHANGES - COLORADO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 1998), null, TC_CO, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00841207_MN")
        .withFormNumber("CL0084")
        .withEdition("1207")
        .withDescription("CHANGES - CONTRACTUAL LIABILITY EXCLUSION AND SUPPLEMENTARY PAYMENTS - MINNESOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2007), null, TC_MN, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00870208_IN")
        .withFormNumber("CL0087")
        .withEdition("0208")
        .withDescription("CHANGES - DEFINITION OF POLLUTANTS - INDIANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(2, 1, 2008), null, TC_IN, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00881008_MO")
        .withFormNumber("CL0088")
        .withEdition("1008")
        .withDescription("CHANGES - DEFINITION OF POLLUTANTS - MISSOURI")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2008), null, TC_MO, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00891204_MN")
        .withFormNumber("CL0089")
        .withEdition("1204")
        .withDescription("CHANGES - DUTIES CONDITION - MINNESOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_MN, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00900405_MO")
        .withFormNumber("CL0090")
        .withEdition("0405")
        .withDescription("CHANGES - GUARANTY ASSOCIATION - MISSOURI")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(4, 1, 2005), null, TC_MO, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00910303_LA")
        .withFormNumber("CL0091")
        .withEdition("0303")
        .withDescription("CHANGES - INSURING AGREEMENT - LOUISIANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2003), null, TC_LA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00921204_LA")
        .withFormNumber("CL0092")
        .withEdition("1204")
        .withDescription("CHANGES - LEGAL ACTION AGAINST US - LOUISIANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_LA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00931093_UT")
        .withFormNumber("CL0093")
        .withEdition("1093")
        .withDescription("CHANGES - LOSS INFORMATION - UTAH")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 1993), null, TC_UT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00941008_MD")
        .withFormNumber("CL0094")
        .withEdition("1008")
        .withDescription("CHANGES - MARYLAND")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2008), null, TC_MD, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00951009_MI")
        .withFormNumber("CL0095")
        .withEdition("1009")
        .withDescription("CHANGES - MICHIGAN")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2009), null, TC_MI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00960207_MN")
        .withFormNumber("CL0096")
        .withEdition("0207")
        .withDescription("CHANGES - MINNESOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(2, 1, 2007), null, TC_MN, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00971108_NH")
        .withFormNumber("CL0097")
        .withEdition("1108")
        .withDescription("CHANGES - NEW HAMPSHIRE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(11, 1, 2008), null, TC_NH, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00980409_NY")
        .withFormNumber("CL0098")
        .withEdition("0409")
        .withDescription("CHANGES - NEW YORK")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(4, 1, 2009), null, TC_NY, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL00990193_WI")
        .withFormNumber("CL0099")
        .withEdition("0193")
        .withDescription("CHANGES - POLICY CONDITIONS - WISCONSIN")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 1993), null, TC_WI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01010803_MO")
        .withFormNumber("CL0101")
        .withEdition("0803")
        .withDescription("CHANGES - POLLUTION EXCLUSION - MISSOURI")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(8, 1, 2003), null, TC_MO, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01021108_NH")
        .withFormNumber("CL0102")
        .withEdition("1108")
        .withDescription("CHANGES - REPRESENTATIONS - NEW HAMPSHIRE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(11, 1, 2008), null, TC_NH, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01030606_TX")
        .withFormNumber("CL0103")
        .withEdition("0606")
        .withDescription("CHANGES - TEXAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(6, 1, 2006), null, TC_TX, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01041204_UT")
        .withFormNumber("CL0104")
        .withEdition("1204")
        .withDescription("CHANGES - UTAH")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_UT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01051107_VA")
        .withFormNumber("CL0105")
        .withEdition("1107")
        .withDescription("CHANGES - VIRGINIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(11, 1, 2007), null, TC_VA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01060508_WA")
        .withFormNumber("CL0106")
        .withEdition("0508")
        .withDescription("CHANGES - WASHINGTON")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(5, 1, 2008), null, TC_WA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01070508_WA")
        .withFormNumber("CL0107")
        .withEdition("0508")
        .withDescription("CHANGES - WHO IS AN INSURED - WA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(5, 1, 2008), null, TC_WA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01080798_WY")
        .withFormNumber("CL0108")
        .withEdition("0798")
        .withDescription("CHANGES - WYOMING")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 1998), null, TC_WY, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("GLLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01141204__4")
        .withFormNumber("CL0114")
        .withEdition("1204")
        .withDescription("COMMERCIAL GENERAL LIABILITY COVERAGE FORM (CLAIMS-MADE VERSION)")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_AK, null)
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_HI, null)
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_LA, null)
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_ME, null)
        .withInternalGroupCode("0002")
        .withUseInsteadOfCode("CL01151207_47")
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericCoverableTypeKeyForm")  
        .withPolicyLinePatternCode("GLLine")
        .withCoverableTypeKeyExistsOnAll(false)
        .withCoverableType(entity.GeneralLiabilityLine)
        .withCoverableTypeList(entity.GeneralLiabilityLine.Type.TypeInfo.Properties.singleWhere(\ i -> i.Name == "GLCoverageForm"))
        .withCoverableTypeKey(GLCoverageFormType.TC_CLAIMSMADE)

        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01151207_47")
        .withFormNumber("CL0115")
        .withEdition("1207")
        .withDescription("COMMERCIAL GENERAL LIABILITY COVERAGE FORM (CLAIMS-MADE VERSION)")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2007), null, TC_AL, null)
        .withLookup(false, DateUtil.createDateInstance(12, 1, 2007), null, TC_AK, null)
        .withLookup(false, DateUtil.createDateInstance(12, 1, 2007), null, TC_HI, null)
        .withLookup(false, DateUtil.createDateInstance(12, 1, 2007), null, TC_LA, null)
        .withLookup(false, DateUtil.createDateInstance(12, 1, 2007), null, TC_ME, null)
        .withInternalGroupCode("0002")
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        
        .withGenericInferenceClass("gw.forms.generic.GenericCoverableTypeKeyForm")  
        .withPolicyLinePatternCode("GLLine")
        .withCoverableTypeKeyExistsOnAll(false)
        .withCoverableType(entity.GeneralLiabilityLine)
        .withCoverableTypeList(entity.GeneralLiabilityLine.Type.TypeInfo.Properties.singleWhere(\ i -> i.Name == "GLCoverageForm"))
        .withCoverableTypeKey(GLCoverageFormType.TC_CLAIMSMADE)

        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01161204__4")
        .withFormNumber("CL0116")
        .withEdition("1204")
        .withDescription("COMMERCIAL GENERAL LIABILITY COVERAGE FORM (OCCURRENCE VERSION)")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_AK, null)
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_HI, null)
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_LA, null)
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2004), null, TC_ME, null)
        .withInternalGroupCode("0001")
        .withUseInsteadOfCode("CL01171207_47")
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericCoverableTypeKeyForm")  
        .withPolicyLinePatternCode("GLLine")
        .withCoverableTypeKeyExistsOnAll(false)
        .withCoverableType(entity.GeneralLiabilityLine)
        .withCoverableTypeList(entity.GeneralLiabilityLine.Type.TypeInfo.Properties.singleWhere(\ i -> i.Name == "GLCoverageForm"))
        .withCoverableTypeKey(GLCoverageFormType.TC_OCCURRENCE)
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL01171207_47")
        .withFormNumber("CL0117")
        .withEdition("1207")
        .withDescription("COMMERCIAL GENERAL LIABILITY COVERAGE FORM (OCCURRENCE VERSION)")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2007), null, null, null)
        .withLookup(false, DateUtil.createDateInstance(12, 1, 2007), null, TC_AK, null)
        .withLookup(false, DateUtil.createDateInstance(12, 1, 2007), null, TC_HI, null)
        .withLookup(false, DateUtil.createDateInstance(12, 1, 2007), null, TC_ME, null)
        .withLookup(false, DateUtil.createDateInstance(12, 1, 2007), null, TC_LA, null)
        .withInternalGroupCode("0001")
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericCoverableTypeKeyForm")
        .withPolicyLinePatternCode("GLLine")
        .withCoverableTypeKeyExistsOnAll(false)
        .withCoverableType(entity.GeneralLiabilityLine)
        .withCoverableTypeList(entity.GeneralLiabilityLine.Type.TypeInfo.Properties.singleWhere(\ i -> i.Name == "GLCoverageForm"))
        .withCoverableTypeKey(GLCoverageFormType.TC_OCCURRENCE)
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CL_0958_US")
        .withFormNumber("CL 0958")
        .withEdition("01 00")
        .withDescription("Commercial General Liability Declarations")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withPriority(0)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("GeneralLiability")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)  // Form not added mid-term if data changes
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericClauseSelectionForm")  
        .withPolicyLinePatternCode("GLLine")
        .withPatternExistsOnAll(false) // does not need to be on all coverables
        .withClausePatternPublicId("GLCGLCov") //based-on "General Liability" coverage
        .create(bundle)

    })
  }

}
