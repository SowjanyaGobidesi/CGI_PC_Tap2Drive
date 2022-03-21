package gw.plugin.billing.bc1000

uses wsi.remote.gw.webservice.bc.bc1000.entity.anonymous.elements.ProducerCodeInfo_CurrencyPlanPairs
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.NewProducerCodeInfo

@Export
enhancement NewProducerCodeInfoEnhancement : NewProducerCodeInfo {
  function sync(producerCode : ProducerCode){
    this.PublicID = producerCode.PublicID
    this.Code = producerCode.Code
    var status = producerCode.ProducerStatus
    this.Active = status == TC_ACTIVE or status == TC_LIMITED
    this.ProducerPublicID = producerCode.Organization.PublicID
    this.CurrencyPlanPairs = producerCode.CommissionPlans
        .map(\plan -> new ProducerCodeInfo_CurrencyPlanPairs() {
          :Currency = plan.Currency.Code,
          :PlanID = plan.CommissionPlanID
        }).toList()
  }
}
