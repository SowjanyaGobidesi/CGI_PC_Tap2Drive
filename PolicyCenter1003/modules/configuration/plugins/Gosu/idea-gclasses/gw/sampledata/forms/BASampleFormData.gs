package gw.sampledata.forms
uses gw.api.builder.FormPatternBuilder
uses gw.api.util.DateUtil
uses gw.transaction.Transaction

/**
 * A set of sample form patterns for PolicyCenter's out-of-the-box BusinessAutoLine.
 */
@Export
class BASampleFormData extends AbstractSampleFormData {

  construct() {
  }

  override property get CollectionName() : String {
    return "BusinessAutoLine Forms"
  }

  override property get AlreadyLoaded() : boolean {
    return formPatternLoaded("BA01010306_47")
  }

  override function load() {
    Transaction.runWithNewBundle(\bundle -> {
      new FormPatternBuilder()
        // Basics
        .withCode("BA01010306_47")
        .withFormNumber("BA0101")
        .withEdition("0306")
        .withDescription("BUSINESS AUTO COVERAGE FORM")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2006), null, TC_AK, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01101004_GA")
        .withFormNumber("BA0110")
        .withEdition("1004")
        .withDescription("CHANGES - GEORGIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2004), null, TC_GA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01111106_MI")
        .withFormNumber("BA0111")
        .withEdition("1106")
        .withDescription("CHANGES - MICHIGAN")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(11, 1, 2006), null, TC_MI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01120105_NH")
        .withFormNumber("BA0112")
        .withEdition("0105")
        .withDescription("CHANGES IN POLICY - NEW HAMPSHIRE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2005), null, TC_NH, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01130409_NY")
        .withFormNumber("BA0113")
        .withEdition("0409")
        .withDescription("CHANGES IN BUSINESS AUTO, BUSINESS AUTO PHYSICAL DAMAGE, MOTOR CARRIER AND TRUCKERS COVERAGE FORMS - NEW YORK")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
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
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01140808_VA")
        .withFormNumber("BA0114")
        .withEdition("0808")
        .withDescription("BUSINESS AUTO COVERAGE FORM - VIRGINIA CHANGES")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(8, 1, 2008), null, TC_VA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01151100_ID")
        .withFormNumber("BA0115")
        .withEdition("1100")
        .withDescription("CHANGES - IDAHO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(11, 1, 2000), null, TC_ID, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01160208_IN")
        .withFormNumber("BA0116")
        .withEdition("0208")
        .withDescription("CHANGES - INDIANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
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
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01170603_IL")
        .withFormNumber("BA0117")
        .withEdition("0603")
        .withDescription("CHANGES - ILLINOIS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(6, 1, 2003), null, TC_IL, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01190506_KS")
        .withFormNumber("BA0119")
        .withEdition("0506")
        .withDescription("CHANGES - KANSAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(5, 1, 2006), null, TC_KS, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01200704_SD")
        .withFormNumber("BA0120")
        .withEdition("0704")
        .withDescription("CHANGES - SOUTH DAKOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2004), null, TC_SD, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01211202_KY")
        .withFormNumber("BA0121")
        .withEdition("1202")
        .withDescription("CHANGES - KENTUCKY")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2002), null, TC_KY, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01220301_NC")
        .withFormNumber("BA0122")
        .withEdition("0301")
        .withDescription("CHANGES - NORTH CAROLINA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2001), null, TC_NC, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01230902_HI")
        .withFormNumber("BA0123")
        .withEdition("0902")
        .withDescription("CHANGES - HAWAII")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(9, 1, 2002), null, TC_HI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01250203_ME")
        .withFormNumber("BA0125")
        .withEdition("0203")
        .withDescription("CHANGES - MAINE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(2, 1, 2003), null, TC_ME, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01260108_WA")
        .withFormNumber("BA0126")
        .withEdition("0108")
        .withDescription("CHANGES - WASHINGTON")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2008), null, TC_WA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01271001_NV")
        .withFormNumber("BA0127")
        .withEdition("1001")
        .withDescription("CHANGES - NEVADA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2001), null, TC_NV, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01280207_MN")
        .withFormNumber("BA0128")
        .withEdition("0207")
        .withDescription("CHANGES - MINNESOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
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
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01291201_NM")
        .withFormNumber("BA0129")
        .withEdition("1201")
        .withDescription("CHANGES - NEW MEXICO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2001), null, TC_NM, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01300507_CA")
        .withFormNumber("BA0130")
        .withEdition("0507")
        .withDescription("CHANGES - CALIFORNIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(5, 1, 2007), null, TC_CA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01310701_TN")
        .withFormNumber("BA0131")
        .withEdition("0701")
        .withDescription("CHANGES - TENNESSEE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2001), null, TC_TN, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01320110_OR")
        .withFormNumber("BA0132")
        .withEdition("0110")
        .withDescription("CHANGES - OREGON")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_OR, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01330306_SC")
        .withFormNumber("BA0133")
        .withEdition("0306")
        .withDescription("CHANGES - SOUTH CAROLINA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2006), null, TC_SC, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01340605_UT")
        .withFormNumber("BA0134")
        .withEdition("0605")
        .withDescription("CHANGES - UTAH")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(6, 1, 2005), null, TC_UT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01350203_IA")
        .withFormNumber("BA0135")
        .withEdition("0203")
        .withDescription("CHANGES - IOWA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
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
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01361007_AR")
        .withFormNumber("BA0136")
        .withEdition("1007")
        .withDescription("CHANGES - ARKANSAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2007), null, TC_AR, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01390306_MD")
        .withFormNumber("BA0139")
        .withEdition("0306")
        .withDescription("CHANGES - MARYLAND")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2006), null, TC_MD, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01410704_AZ")
        .withFormNumber("BA0141")
        .withEdition("0704")
        .withDescription("CHANGES - ARIZONA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2004), null, TC_AZ, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01430902_WV")
        .withFormNumber("BA0143")
        .withEdition("0902")
        .withDescription("CHANGES - WEST VIRGINIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
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
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01440399_NJ")
        .withFormNumber("BA0144")
        .withEdition("0399")
        .withDescription("CHANGES - NEW JERSEY")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 1999), null, TC_NJ, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01450306_TX")
        .withFormNumber("BA0145")
        .withEdition("0306")
        .withDescription("CHANGES - TEXAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2006), null, TC_TX, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01491008_MD")
        .withFormNumber("BA0149")
        .withEdition("1008")
        .withDescription("CHANGES - CANCELLATION -  MARYLAND")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
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
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01500600_MN")
        .withFormNumber("BA0150")
        .withEdition("0600")
        .withDescription("CHANGES - CANCELLATION AND NONRENEWAL - MINNESOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(6, 1, 2000), null, TC_MN, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01510303_MO")
        .withFormNumber("BA0151")
        .withEdition("0303")
        .withDescription("CHANGES - CANCELLATION AND NONRENEWAL - MISSISSIPPI")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2003), null, TC_MO, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01521003_MT")
        .withFormNumber("BA0152")
        .withEdition("1003")
        .withDescription("CHANGES-CANCELLATION AND NONRENEWAL - MONTANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2003), null, TC_MT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01530306_NY")
        .withFormNumber("BA0153")
        .withEdition("0306")
        .withDescription("CHANGES - CANCELLATION - NEW YORK")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2006), null, TC_NY, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01541008_SC")
        .withFormNumber("BA0154")
        .withEdition("1008")
        .withDescription("CHANGES CANCELLATION AND NONRENEWAL - SOUTH CAROLINA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2008), null, TC_SC, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01570301_TX")
        .withFormNumber("BA0157")
        .withEdition("0301")
        .withDescription("CHANGES - CANCELLATION AND NONRENEWAL - TEXAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2001), null, TC_TX, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01591202_NH")
        .withFormNumber("BA0159")
        .withEdition("1202")
        .withDescription("CHANGES - CANCELLATION AND NONRENEWAL - NEW HAMPSHIRE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
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
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA01601205_VA")
        .withFormNumber("BA0160")
        .withEdition("1205")
        .withDescription("CHANGES - CANCELLATION AND NONRENEWAL - VIRGINIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2005), null, TC_VA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA04281200_TX")
        .withFormNumber("BA0428")
        .withEdition("1200")
        .withDescription("CHANGES - FEDERAL EMPLOYEES USING AUTOS IN GOVERNMENT BUSINESS - TEXAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2000), null, TC_TX, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BA_0693_US")
        .withFormNumber("BA 0693")
        .withEdition("01 00")
        .withDescription("Business Auto Declaration (Monoline)")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withPriority(0)
        // Products
        .withProduct("BusinessAuto")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2000), null, null, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BusinessAutoLine")
        .create(bundle)

    })
  }

}
