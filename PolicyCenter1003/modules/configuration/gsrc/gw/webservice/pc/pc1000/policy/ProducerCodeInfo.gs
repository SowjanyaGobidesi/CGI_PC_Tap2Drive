package gw.webservice.pc.pc1000.policy

@Export
@gw.xml.ws.annotation.WsiExportable("http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/policy/ProducerCodeInfo")
final class ProducerCodeInfo {

  var _publicId : String as PublicID

  var _commissionPlanInfos : gw.webservice.pc.pc1000.policy.CommissionPlanInfo[] as CommissionPlanInfos
}