package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "LocationRiskAssessment.eti;LocationRiskAssessment.eix;LocationRiskAssessment.etx")
enhancement GWLocationRiskAssessmentEntityEnhancement : entity.LocationRiskAssessment {
  function hasAssessmentCriteriaChanged (outboundRiskAssessmentData :  entity.OutboundLocationRiskAssessmentTempStore) : boolean {
    return (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.riskassessment.LocationRiskAssessmentPublicMethods") as gw.riskassessment.LocationRiskAssessmentPublicMethods).hasAssessmentCriteriaChanged(outboundRiskAssessmentData)
  }
  
  
}