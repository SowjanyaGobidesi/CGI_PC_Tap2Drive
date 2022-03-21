package gw.webservice.pc.pc900.gxmodel

uses gw.api.domain.Clause

uses java.lang.IllegalArgumentException
uses gw.api.productmodel.CovTermPatternLookup

@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement QuotingPersonalVehicleCovModelEnhancement: gw.webservice.pc.pc900.gxmodel.quotingpersonalvehiclecovmodel.types.complex.PersonalVehicleCov {
  function populateCoverage(cov : Clause){
    for(ct in this.CovTerms.Entry){
      var pattern = CovTermPatternLookup.getByPublicID(ct.PatternCode)
      if(pattern == null){
        throw new IllegalArgumentException("Invalid coverage term pattern :" + ct.PatternCode)
      }
      var covTerm = cov.getCovTerm(pattern)
      if(covTerm == null){
        throw new IllegalArgumentException("Coverage ${cov.Pattern.PublicID} does not have cov term: ${ct.PatternCode}")
      }
      covTerm.setValueFromString(ct.DisplayValue)
    }
  }
}
