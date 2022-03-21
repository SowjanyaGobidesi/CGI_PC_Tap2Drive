package gw.riskassessment

uses gw.api.database.Query
uses gw.api.spotlight.inbound.error.InboundRiskAssessmentErrorData

enhancement InboundRiskAssessmentErrorDataEnhancement: InboundRiskAssessmentErrorData {

  property get OutboundLocationRiskAssessmentTempStoreFromDB() : List<OutboundLocationRiskAssessmentTempStore> {
    var listOfPublicIds = this.errors*.data*.location*.policySystemId.toSet().toTypedArray()
    var listOutboundTempStore = Query.make(OutboundLocationRiskAssessmentTempStore)
        .compareIn(OutboundLocationRiskAssessmentTempStore#PublicID, listOfPublicIds).select().toList()

    return listOutboundTempStore
  }

}
