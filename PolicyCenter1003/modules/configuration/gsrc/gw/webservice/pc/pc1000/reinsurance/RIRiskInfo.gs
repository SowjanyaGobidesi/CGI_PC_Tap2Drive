package gw.webservice.pc.pc1000.reinsurance

uses gw.plugin.reinsurance.IRIRiskInfo

/**
 * External representation of reinsurance risk information for API methods.
 */
@Export
@gw.xml.ws.annotation.WsiExportable("http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/reinsurance/RIRiskInfo")
final class RIRiskInfo implements IRIRiskInfo {

  /**
   * risk identifier
   */
  var _riRiskID : String as RIRiskID

  /**
   * External representation of reinsurance risk information for API methods.
   * Format: "[RICovGroup Name] coverage for [Display name of ReinsurableRisk]"
   */
  var _description : String as Description

  /**
   * list of external representations of agreements applied to risk
   * does not include attachments that are specifically excluded and proportional agreements with 0% share
   * all non-proportional agreements are included
   */
  var _agreements : gw.webservice.pc.pc1000.reinsurance.RIAgreementInfo[] as Agreements

  construct() {
  }

  override function equals(a : Object) : boolean {
    if (this === a) {
      return true
    }
    if (a typeis gw.webservice.pc.pc1000.reinsurance.RIRiskInfo) {
      if (this.Description.equals(a.Description) and
          this.RIRiskID.equals(a.RIRiskID) and
          Arrays.equals(this.Agreements, a.Agreements))
        return true
    }
    return false
  }

  override function hashCode() : int {
    var hc = (Description.hashCode() >> 1) ^ RIRiskID.hashCode()
    return Agreements.reduce(hc, \ v, r ->  (v >> 1) ^ r.hashCode())
  }

  /**
   * Convert an information structure for a <code>RIRisk</code>
   *    to a version-specific copy.
   */
  static function of(iRiskInfo : IRIRiskInfo) : gw.webservice.pc.pc1000.reinsurance.RIRiskInfo {
    if (iRiskInfo == null) {
      return null
    }
    var riskInfo = iRiskInfo as gw.reinsurance.risk.RIRiskInfo
    var riskData = new gw.webservice.pc.pc1000.reinsurance.RIRiskInfo()

    riskData._riRiskID = riskInfo.RIRiskID
    riskData._description = riskInfo.Description

    riskData._agreements = gw.webservice.pc.pc1000.reinsurance.RIAgreementInfo.of(riskInfo.Agreements)

    return riskData
  }
}