package gw.lob.pa
uses java.math.BigDecimal

enhancement PALiabilityCovEnhancement : productmodel.PALiabilityCov
{
  property get StateMinPackage() : java.util.Map<Jurisdiction, String> {
    return  { 
      TC_AK -> "50/100/50", TC_ME -> "50/100/50",
      TC_AL -> "20/40/10", TC_CT -> "20/40/10", TC_HI -> "20/40/10", TC_MD -> "20/40/10", TC_MI -> "20/40/10",
      TC_WV -> "20/40/10",
      TC_MO -> "25/50/10", TC_MT -> "25/50/10", TC_NM -> "25/50/10", TC_NY -> "25/50/10", TC_OR -> "25/50/10", TC_VT -> "25/50/10",
      TC_WA -> "25/50/10", TC_WI -> "25/50/10", TC_IN -> "25/50/10", TC_KY -> "25/50/10", TC_KS -> "25/50/10", TC_TN -> "25/50/10",
      TC_MS -> "25/50/25", TC_NE -> "25/50/25", TC_NH -> "25/50/25", TC_ND -> "25/50/25", TC_RI -> "25/50/25", TC_SC -> "25/50/25", TC_SD -> "25/50/25",
      TC_AR -> "25/50/15", TC_CO -> "25/50/15", TC_ID -> "25/50/15",
      TC_AZ -> "15/30/10", TC_GA -> "15/30/10", TC_NV -> "15/30/10",  		
      TC_CA -> "15/30/5", TC_DE -> "15/30/5", TC_NJ -> "15/30/5", TC_PA -> "15/30/5", 	
      TC_FL -> "10/20/10", TC_LA -> "10/20/10", TC_OK -> "10/20/10",	
      TC_IL -> "20/40/15", TC_IA -> "20/40/15", TC_TX -> "20/40/15",
      TC_MA -> "20/40/10",
      TC_MN -> "30/60/10", 
      TC_NC -> "30/60/25", 
      TC_OH -> "12.5/25/7.5", 
      TC_UT -> "25/50/15",
      TC_VA -> "25/50/20", TC_WY -> "25/50/20"
    }
  }
  
  function areBILimitsAvailable(umPerPersonBI : BigDecimal, umPerAccidentBI : BigDecimal) : boolean {
    var liabPackValue = this.PALiabilityTerm.PackageValue
    var liabPerPersonBI : BigDecimal
    var liabPerAccidentBI : BigDecimal
    
    if (liabPackValue.PackageTerms.Count == 3) {
      for (term in liabPackValue.PackageTerms) {
        if (term.AggregationModel == TC_PP and term.RestrictionModel == TC_BI ) {
          liabPerPersonBI = term.Value
        } else if (term.AggregationModel == TC_EA and term.RestrictionModel == TC_BI ) {
          liabPerAccidentBI = term.Value
        }
      }
    } else {
      liabPerPersonBI = liabPackValue.PackageTerms[0].Value
      liabPerAccidentBI = liabPackValue.PackageTerms[0].Value
    }  

    return (umPerPersonBI <= liabPerPersonBI && umPerAccidentBI <= liabPerAccidentBI)
  }
  
  function arePDLimitsAvailable(umPerAccidentPD : BigDecimal) : boolean {
    var liabPackValue = this.PALiabilityTerm.PackageValue
    var liabPerAccidentPD : BigDecimal
    
    if (liabPackValue.PackageTerms.Count == 3) {
      for (term in liabPackValue.PackageTerms) {
        if (term.AggregationModel == TC_EA and term.RestrictionModel == TC_PD ) {
          liabPerAccidentPD = term.Value
          break
        }
      }
    } else {
      liabPerAccidentPD = liabPackValue.PackageTerms[0].Value
    }  

    return (umPerAccidentPD <= liabPerAccidentPD)
  }
}
