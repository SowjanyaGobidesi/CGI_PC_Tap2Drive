package gw.pcf.contacts

/**
 * Helper class for AdditionalInsuredsDV.pcf
 */
@Export
class AdditionalInsuredsDVUIHelper {
  static function onAdditionalInsuredTypeChange(additionalInsuredDetail: PolicyAddlInsuredDetail) {
    // Clear the additional information text cell if not required
    if (not additionalInformationRequired(additionalInsuredDetail)) {
      additionalInsuredDetail.AdditionalInformation = null
    }
  }

  static function additionalInformationRequired(additionalInsuredDetail: PolicyAddlInsuredDetail): boolean {
    return additionalInsuredDetail.AdditionalInformationType != null
  }
}