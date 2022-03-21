package gw.webservice.pc.pc900.policy

@Export
@gw.xml.ws.annotation.WsiExportable("http://guidewire.com/pc/ws/gw/webservice/pc/pc900/policy/ProducerCodeInfo")
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
final class ProducerCodeInfo {

  var _publicId : String as PublicID

  var _commissionPlanInfos : CommissionPlanInfo[] as CommissionPlanInfos
}