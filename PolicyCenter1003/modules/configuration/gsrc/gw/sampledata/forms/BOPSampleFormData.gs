package gw.sampledata.forms
uses gw.api.builder.FormPatternBuilder
uses gw.api.util.DateUtil
uses gw.transaction.Transaction

/**
 * A set of sample form patterns for PolicyCenter's out-of-the-box BOPLine.
 */
@Export
class BOPSampleFormData extends AbstractSampleFormData {

  construct() {
  }

  override property get CollectionName() : String {
    return "BOPLine Forms"
  }

  override property get AlreadyLoaded() : boolean {
    return formPatternLoaded("BP00010106_45")
  }

  override function load() {
    Transaction.runWithNewBundle(\bundle -> {
      new FormPatternBuilder()
        // Basics
        .withCode("BP00010106_45")
        .withFormNumber("BP0001")
        .withEdition("0106")
        .withDescription("BUSINESSOWNERS COVERAGE FORM")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, null, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_HI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00020702_HI")
        .withFormNumber("BP0002")
        .withEdition("0702")
        .withDescription("BUSINESSOWNERS COVERAGE FORM")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(false)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_HI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00040197_50")
        .withFormNumber("BP0004")
        .withEdition("0197")
        .withDescription("BUSINESSOWNERS COMMON POLICY CONDITIONS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 1997), null, null, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 1997), null, TC_PR, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00050689_PR")
        .withFormNumber("BP0005")
        .withEdition("0689")
        .withDescription("BUSINESSOWNERS COMMON POLICY CONDITIONS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(6, 1, 1989), null, TC_PR, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00060110_AL")
        .withFormNumber("BP0006")
        .withEdition("0110")
        .withDescription("CHANGES - ALABAMA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_AL, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00070110_UT")
        .withFormNumber("BP0007")
        .withEdition("0110")
        .withDescription("CHANGES - UTAH")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_UT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00110110_KS")
        .withFormNumber("BP0011")
        .withEdition("0110")
        .withDescription("CHANGES - KANSAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_KS, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00120808_WA")
        .withFormNumber("BP0012")
        .withEdition("0808")
        .withDescription("CHANGES - WASHINGTON")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00130993_PR")
        .withFormNumber("BP0013")
        .withEdition("0993")
        .withDescription("CHANGES - PUERTO RICO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(9, 1, 1993), null, TC_PR, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00140106_MA")
        .withFormNumber("BP0014")
        .withEdition("0106")
        .withDescription("CHANGES - MASSACHUSETTS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_MA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00150106_NM")
        .withFormNumber("BP0015")
        .withEdition("0106")
        .withDescription("CHANGES - NEW MEXICO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_NM, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00170110_MO")
        .withFormNumber("BP0017")
        .withEdition("0110")
        .withDescription("CHANGES - MISSOURI")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_MO, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00180506_NE")
        .withFormNumber("BP0018")
        .withEdition("0506")
        .withDescription("CHANGES - NEBRASKA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(5, 1, 2006), null, TC_NE, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00191008_NH")
        .withFormNumber("BP0019")
        .withEdition("1008")
        .withDescription("CHANGES - NEW HAMPSHIRE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2008), null, TC_NH, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00200106_VT")
        .withFormNumber("BP0020")
        .withEdition("0106")
        .withDescription("CHANGES - CONTAMINATION OR POLLUTION EXCEPTION - VERMONT")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_VT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00210409_NY")
        .withFormNumber("BP0021")
        .withEdition("0409")
        .withDescription("CHANGES - NEW YORK")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00221006_NC")
        .withFormNumber("BP0022")
        .withEdition("1006")
        .withDescription("CHANGES - NORTH CAROLINA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00230106_ND")
        .withFormNumber("BP0023")
        .withEdition("0106")
        .withDescription("CHANGES - NORTH DAKOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_ND, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00241207_TX")
        .withFormNumber("BP0024")
        .withEdition("1207")
        .withDescription("CHANGES - TEXAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2007), null, TC_TX, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00261007_SC")
        .withFormNumber("BP0026")
        .withEdition("1007")
        .withDescription("CHANGES - SOUTH CAROLINA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(10, 1, 2007), null, TC_SC, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00270207_MN")
        .withFormNumber("BP0027")
        .withEdition("0207")
        .withDescription("CHANGES - MINNESOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00281009_SD")
        .withFormNumber("BP0028")
        .withEdition("1009")
        .withDescription("CHANGES - SOUTH DAKOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00290110_WI")
        .withFormNumber("BP0029")
        .withEdition("0110")
        .withDescription("CHANGES - WISCONSIN")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_WI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00300110_WY")
        .withFormNumber("BP0030")
        .withEdition("0110")
        .withDescription("CHANGES - WYOMING")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_WY, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00310702_NM")
        .withFormNumber("BP0031")
        .withEdition("0702")
        .withDescription("CHANGES - PROPERTY CLAIMS SETTLEMENT IN THE EVENT OF CATASTROPHE - NEW MEXICO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_NM, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00320908_LA")
        .withFormNumber("BP0032")
        .withEdition("0908")
        .withDescription("CHANGES - LOUISIANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(9, 1, 2008), null, TC_LA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00330306_RI")
        .withFormNumber("BP0033")
        .withEdition("0306")
        .withDescription("CHANGES - RHODE ISLAND")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(3, 1, 2006), null, TC_RI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00340408_VA")
        .withFormNumber("BP0034")
        .withEdition("0408")
        .withDescription("CHANGES - VIRGINIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(4, 1, 2008), null, TC_VA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00370106_VT")
        .withFormNumber("BP0037")
        .withEdition("0106")
        .withDescription("CHANGES - VERMONT")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_VT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00380208_IN")
        .withFormNumber("BP0038")
        .withEdition("0208")
        .withDescription("CHANGES - INDIANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00390108_MI")
        .withFormNumber("BP0039")
        .withEdition("0108")
        .withDescription("CHANGES - MICHIGAN")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00400106_WV")
        .withFormNumber("BP0040")
        .withEdition("0106")
        .withDescription("CHANGES - WEST VIRGINIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_WV, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00410702_AZ")
        .withFormNumber("BP0041")
        .withEdition("0702")
        .withDescription("CHANGES - ARIZONA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_AZ, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00431206_OK")
        .withFormNumber("BP0043")
        .withEdition("1206")
        .withDescription("CHANGES - OKLAHOMA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2006), null, TC_OK, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00440707_AK")
        .withFormNumber("BP0044")
        .withEdition("0707")
        .withDescription("CHANGES - ALASKA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00450110_PA")
        .withFormNumber("BP0045")
        .withEdition("0110")
        .withDescription("CHANGES - PENNSYLVANIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_PA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00460106_MA")
        .withFormNumber("BP0046")
        .withEdition("0106")
        .withDescription("LEAD POISONING ENDORSEMENT - MASSACHUSETTS CHANGES")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_MA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00470110_ME")
        .withFormNumber("BP0047")
        .withEdition("0110")
        .withDescription("CHANGES - MAINE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_ME, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00480497_MN")
        .withFormNumber("BP0048")
        .withEdition("0497")
        .withDescription("CHANGES-CONTRACTUAL LIABILITY EXCLUSION AND SUPPLEMENTARY PAYMENTS - MAINE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(4, 1, 1997), null, TC_MN, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00501205_IL")
        .withFormNumber("BP0050")
        .withEdition("1205")
        .withDescription("CHANGES - ILLINOIS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(12, 1, 2005), null, TC_IL, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00510406_CA")
        .withFormNumber("BP0051")
        .withEdition("0406")
        .withDescription("CHANGES - CALIFORNIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(4, 1, 2006), null, TC_CA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00521008_MO")
        .withFormNumber("BP0052")
        .withEdition("1008")
        .withDescription("CHANGES - POLLUTION EXCLUSION - MISSOURI")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00530408_OH")
        .withFormNumber("BP0053")
        .withEdition("0408")
        .withDescription("CHANGES - OHIO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00540808_49")
        .withFormNumber("BP0054")
        .withEdition("0808")
        .withDescription("EXCLUSION - WATER")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(8, 1, 2008), null, null, null)
        .withLookup(true, DateUtil.createDateInstance(8, 1, 2008), null, TC_LA, null)
        .withLookup(true, DateUtil.createDateInstance(8, 1, 2008), null, TC_TX, null)
        .withLookup(true, DateUtil.createDateInstance(8, 1, 2008), null, TC_WA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00571008_MD")
        .withFormNumber("BP0057")
        .withEdition("1008")
        .withDescription("CHANGES - MARYLAND")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00580702_KY")
        .withFormNumber("BP0058")
        .withEdition("0702")
        .withDescription("CHANGES - KENTUCKY")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_KY, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00590702_MT")
        .withFormNumber("BP0059")
        .withEdition("0702")
        .withDescription("CHANGES - MEDICAL EXPENSES - MONTANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_MT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00600110_GA")
        .withFormNumber("BP0060")
        .withEdition("0110")
        .withDescription("CHANGES - GEORGIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_GA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00610702_VT")
        .withFormNumber("BP0061")
        .withEdition("0702")
        .withDescription("CHANGES - CIVIL UNION - VERMONT")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_VT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00620110_OR")
        .withFormNumber("BP0062")
        .withEdition("0110")
        .withDescription("CHANGES - OREGON")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00630106_AK")
        .withFormNumber("BP0063")
        .withEdition("0106")
        .withDescription("CHANGES - ATTORNEYS FEES - ALASKA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_AK, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00640702_CO")
        .withFormNumber("BP0064")
        .withEdition("0702")
        .withDescription("CHANGES - COLORADO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_CO, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00650702_DC")
        .withFormNumber("BP0065")
        .withEdition("0702")
        .withDescription("CHANGES - DISTRICT OF COLUMBIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_DC, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00661106_ID")
        .withFormNumber("BP0066")
        .withEdition("1106")
        .withDescription("CHANGES - IDAHO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(11, 1, 2006), null, TC_ID, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00670702_IA")
        .withFormNumber("BP0067")
        .withEdition("0702")
        .withDescription("CHANGES - IOWA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_IA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00700107_MS")
        .withFormNumber("BP0070")
        .withEdition("0107")
        .withDescription("CHANGES - MISSISSIPPI")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2007), null, TC_MS, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00710106_NV")
        .withFormNumber("BP0071")
        .withEdition("0106")
        .withDescription("CHANGES - NEVADA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_NV, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00720807_NJ")
        .withFormNumber("BP0072")
        .withEdition("0807")
        .withDescription("CHANGES - NEW JERSEY")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(8, 1, 2007), null, TC_NJ, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00730702_OK")
        .withFormNumber("BP0073")
        .withEdition("0702")
        .withDescription("NOTICE - OKLAHOMA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_OK, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00740702_PA")
        .withFormNumber("BP0074")
        .withEdition("0702")
        .withDescription("NOTICE - PENNSYLVANIA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_PA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00780504_PR")
        .withFormNumber("BP0078")
        .withEdition("0504")
        .withDescription("MANDATORY PREMIUM AND COVERAGE CONDITIONS ENDORSEMENT")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(5, 1, 2004), null, TC_PR, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00800110_MT")
        .withFormNumber("BP0080")
        .withEdition("0110")
        .withDescription("CHANGES - MONTANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_MT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00820106_TX")
        .withFormNumber("BP0082")
        .withEdition("0106")
        .withDescription("CHANGES-AMENDMENT OF CANCELLATION PROVISIONS OR COVERAGE CHANGE - TEXAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_TX, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00830993_PR")
        .withFormNumber("BP0083")
        .withEdition("0993")
        .withDescription("CHANGES - CANCELLATION - PUERTO RICO")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(9, 1, 1993), null, TC_PR, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00840196_MI")
        .withFormNumber("BP0084")
        .withEdition("0196")
        .withDescription("CHANGES - CANCELLATION - MICHIGAN")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 1996), null, TC_MI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00850109_CT")
        .withFormNumber("BP0085")
        .withEdition("0109")
        .withDescription("CHANGES - CONNECTICUT")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2009), null, TC_CT, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00860102_OK")
        .withFormNumber("BP0086")
        .withEdition("0102")
        .withDescription("CHANGES - CANCELLATION AND NONRENEWAL - OKLAHOMA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2002), null, TC_OK, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP00870110_DE")
        .withFormNumber("BP0087")
        .withEdition("0110")
        .withDescription("CHANGES - DELAWARE")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2010), null, TC_DE, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP01680106_MD")
        .withFormNumber("BP0168")
        .withEdition("0106")
        .withDescription("CHANGES - LIABILITY FOR HAZARDS OF LEAD - MARYLAND")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_MD, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP02100702_HI")
        .withFormNumber("BP0210")
        .withEdition("0702")
        .withDescription("CHANGES HAWAII")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_HI, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP02110702_NJ")
        .withFormNumber("BP0211")
        .withEdition("0702")
        .withDescription("EXCLUSIOIN - LIABILITY FOR HAZARDS OF LEAD - NEW JERSEY CHANGES")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_NJ, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP05280208_IN")
        .withFormNumber("BP0528")
        .withEdition("0208")
        .withDescription("AMENDMENT OF DEFINITION OF POLLUTANTS - INDIANA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP05301008_MO")
        .withFormNumber("BP0530")
        .withEdition("1008")
        .withDescription("CHANGES-AMENDMENT")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
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
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP05310689_PR")
        .withFormNumber("BP0531")
        .withEdition("0689")
        .withDescription("CHANGES - BUSINESSOWNERS POLICY")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(6, 1, 1989), null, TC_PR, null)
        .withInternalGroupCode("1201")
        .withUseInsteadOfCode("BP05330702_49")
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP05320702_HI")
        .withFormNumber("BP0532")
        .withEdition("0702")
        .withDescription("CHANGES - BUSINESSOWNERS POLICY")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_HI, null)
        .withInternalGroupCode("1201")
        .withUseInsteadOfCode("BP05330702_49")
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP05330702_49")
        .withFormNumber("BP01201533")
        .withEdition("0702")
        .withDescription("CHANGES - BUSINESSOWNERS POLICY")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, null, null)
        .withInternalGroupCode("1201")
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP05430106_SD")
        .withFormNumber("BP0543")
        .withEdition("0106")
        .withDescription("CHANGES - SOUTH DAKOTA")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_SD, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP05500702_VA")
        .withFormNumber("BP0550")
        .withEdition("0702")
        .withDescription("POLICY PERIOD - VIRGINIA CHANGES")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2002), null, TC_VA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP05510106_TX")
        .withFormNumber("BP0551")
        .withEdition("0106")
        .withDescription("CHANGES - TEXAS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_TX, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP05520106_IL")
        .withFormNumber("BP0552")
        .withEdition("0106")
        .withDescription("CHANGES - ILLINOIS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, TC_IL, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("BP06110106_35")
        .withFormNumber("BP0611")
        .withEdition("0106")
        .withDescription("ADVISORY NOTICE TO POLICYHOLDERS")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(1)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(1, 1, 2006), null, null, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_AK, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_CA, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_CT, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_FL, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_HI, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_LA, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_MA, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_MI, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_NH, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_NM, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_NY, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_OR, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_RI, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_TX, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_VA, null)
        .withLookup(false, DateUtil.createDateInstance(1, 1, 2006), null, TC_WA, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

      new FormPatternBuilder()
        // Basics
        .withCode("SB_0505_US")
        .withFormNumber("SB 0505")
        .withEdition("00 01")
        .withDescription("Small Business Policy Declarations")
        .withInferenceTime(TC_QUOTE)
        .withEndorsementNumbered(true)
        .withPriority(0)
        // Products
        .withProduct("BusinessOwners")
        // Jobs
        .withJob("Submission")
        .withJob("Renewal")
        .withJob("Rewrite")
        .withJob("PolicyChange")
        // Jurisdictions
        .withLookup(true, DateUtil.createDateInstance(7, 1, 2003), null, null, null)
        // Policy Change
        .withInternalRemovalEndorsement(false)
        .withInternalReissueOnChange(false)
        // Inference
        .withGenericInferenceClass("gw.forms.generic.GenericAlwaysAddedForm")
        .withPolicyLinePatternCode("BOPLine")
        .create(bundle)

    })
  }

}
