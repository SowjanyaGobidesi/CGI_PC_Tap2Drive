package gw.plugin.billing.bc900

uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.NewProducerCodeInfo

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement NewProducerCodeInfoEnhancement : NewProducerCodeInfo {
  function sync(producerCode : ProducerCode){
    this.PublicID = producerCode.PublicID
    this.Code = producerCode.Code
    var status = producerCode.ProducerStatus
    this.Active = status == TC_ACTIVE or status == TC_LIMITED
    this.ProducerPublicID = producerCode.Organization.PublicID
    this.CommissionPlanIDs = producerCode.CommissionPlanIDs.toList()
    this.Currencies = producerCode.Currencies*.Code.toList()
  }
}
