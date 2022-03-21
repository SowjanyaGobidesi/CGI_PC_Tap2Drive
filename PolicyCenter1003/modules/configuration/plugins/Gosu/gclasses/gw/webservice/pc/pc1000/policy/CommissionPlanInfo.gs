package gw.webservice.pc.pc1000.policy

@Export
@gw.xml.ws.annotation.WsiExportable("http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/policy/CommissionPlanInfo")
final class CommissionPlanInfo {

  var _currency : String as Currency

  var _publicId : String as PublicID

}