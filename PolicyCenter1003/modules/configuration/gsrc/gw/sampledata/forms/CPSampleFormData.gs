package gw.sampledata.forms
uses gw.api.builder.FormPatternBuilder
uses gw.api.util.DateUtil
uses gw.transaction.Transaction

/**
 * A set of sample form patterns for PolicyCenter's out-of-the-box CPLine.
 */
@Export
class CPSampleFormData extends AbstractSampleFormData {

  construct() {
  }

  override property get CollectionName() : String {
    return "CPLine Forms"
  }

  override property get AlreadyLoaded() : boolean {
    return formPatternLoaded("CF00350105_KS")
  }

  override function load() {
    Transaction.runWithNewBundle(\bundle -> {
      new FormPatternBuilder()
        // Basics
        .withCode("CF00350105_KS")
        .withFormNumber("CF0035")
        .withEdition("0105")
        .withDescription("CHANGES - KANSAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2005), null, TC_KS, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00360808_WA")
        .withFormNumber("CF0036")
        .withEdition("0808")
        .withDescription("CHANGES - WASHINGTON")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(8, 1, 2008), null, TC_WA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00370508_AL")
        .withFormNumber("CF0037")
        .withEdition("0508")
        .withDescription("CHANGES - ALABAMA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(5, 1, 2008), null, TC_AL, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00380707_AK")
        .withFormNumber("CF0038")
        .withEdition("0707")
        .withDescription("CHANGES - ALASKA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2007), null, TC_AK, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00390604_AZ")
        .withFormNumber("CF0039")
        .withEdition("0604")
        .withDescription("CHANGES - ARIZONA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(6, 1, 2004), null, TC_AZ, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00400700_MO")
        .withFormNumber("CF0040")
        .withEdition("0700")
        .withDescription("CHANGES - CALCULATION OF ADDITIONAL PREMIUM - MISSOURI")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2000), null, TC_MO, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00421000_CT")
        .withFormNumber("CF0042")
        .withEdition("1000")
        .withDescription("CHANGES - CONNECTICUT")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2000), null, TC_CT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00430708_FL")
        .withFormNumber("CF0043")
        .withEdition("0708")
        .withDescription("CHANGES - FLORIDA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2008), null, TC_FL, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00440402_48")
        .withFormNumber("CF0044")
        .withEdition("0402")
        .withDescription("CHANGES - FUNGUS, WET ROT, DRY ROT AND BACTERIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(4, 1, 2002), null, null, null)
        .withLookup(false, DateUtil.createDateInstance(4, 1, 2002), null, TC_AR, null)
        .withLookup(false, DateUtil.createDateInstance(4, 1, 2002), null, TC_LA, null)
        .withLookup(false, DateUtil.createDateInstance(4, 1, 2002), null, TC_NY, null)
        .withLookup(false, DateUtil.createDateInstance(4, 1, 2002), null, TC_WA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00451103_GA")
        .withFormNumber("CF0045")
        .withEdition("1103")
        .withDescription("CHANGES - GEORGIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(11, 1, 2003), null, TC_GA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00470203_IA")
        .withFormNumber("CF0047")
        .withEdition("0203")
        .withDescription("CHANGES - IOWA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(2, 1, 2003), null, TC_IA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00480900_KY")
        .withFormNumber("CF0048")
        .withEdition("0900")
        .withDescription("CHANGES - KENTUCKY")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(9, 1, 2000), null, TC_KY, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00491206_LA")
        .withFormNumber("CF0049")
        .withEdition("1206")
        .withDescription("CHANGES - LOUISIANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2006), null, TC_LA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00501000_MA")
        .withFormNumber("CF0050")
        .withEdition("1000")
        .withDescription("CHANGES - MASSACHUSETTS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2000), null, TC_MA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00510108_MI")
        .withFormNumber("CF0051")
        .withEdition("0108")
        .withDescription("CHANGES - MICHIGAN")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2008), null, TC_MI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00520208_MN")
        .withFormNumber("CF0052")
        .withEdition("0208")
        .withDescription("CHANGES - MINNESOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(2, 1, 2008), null, TC_MN, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00530700_NE")
        .withFormNumber("CF0053")
        .withEdition("0700")
        .withDescription("CHANGES - NEBRASKA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2000), null, TC_NE, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00541202_NH")
        .withFormNumber("CF0054")
        .withEdition("1202")
        .withDescription("CHANGES - NEW HAMPSHIRE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2002), null, TC_NH, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00550300_NM")
        .withFormNumber("CF0055")
        .withEdition("0300")
        .withDescription("CHANGES - NEW MEXICO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2000), null, TC_NM, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00570409_NY")
        .withFormNumber("CF0057")
        .withEdition("0409")
        .withDescription("CHANGES - NEW YORK")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
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
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00581006_NC")
        .withFormNumber("CF0058")
        .withEdition("1006")
        .withDescription("CHANGES - NORTH CAROLINA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2006), null, TC_NC, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00591099_ND")
        .withFormNumber("CF0059")
        .withEdition("1099")
        .withDescription("CHANGES - NORTH DAKOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 1999), null, TC_ND, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00600408_OH")
        .withFormNumber("CF0060")
        .withEdition("0408")
        .withDescription("CHANGES - OHIO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(4, 1, 2008), null, TC_OH, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00610304_RI")
        .withFormNumber("CF0061")
        .withEdition("0304")
        .withDescription("CHANGES - RHODE ISLAND")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2004), null, TC_RI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00621009_SD")
        .withFormNumber("CF0062")
        .withEdition("1009")
        .withDescription("CHANGES - SOUTH DAKOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2009), null, TC_SD, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00631005_TX")
        .withFormNumber("CF0063")
        .withEdition("1005")
        .withDescription("CHANGES - TEXAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2005), null, TC_TX, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00640504_VA")
        .withFormNumber("CF0064")
        .withEdition("0504")
        .withDescription("CHANGES - VIRGINIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(5, 1, 2004), null, TC_VA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00650808_WA")
        .withFormNumber("CF0065")
        .withEdition("0808")
        .withDescription("CHANGES - WASHINGTON")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(8, 1, 2008), null, TC_WA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00660902_WV")
        .withFormNumber("CF0066")
        .withEdition("0902")
        .withDescription("CHANGES - WEST VIRGINIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(9, 1, 2002), null, TC_WV, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00671002_WI")
        .withFormNumber("CF0067")
        .withEdition("1002")
        .withDescription("CHANGES - WISCONSIN")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2002), null, TC_WI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF00691000_WY")
        .withFormNumber("CF0069")
        .withEdition("1000")
        .withDescription("CHANGES - WYOMING")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2000), null, TC_WY, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("CF0701298_TX")
        .withFormNumber("CF070")
        .withEdition("1298")
        .withDescription("CHANGES - JOINT OR DISPUTED LOSS AGREEMENT")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("CommercialPackage")
        .withProduct("CommercialProperty")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 1998), null, TC_TX, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("CPLine")
        .create(bundle)

    })
  }

}
