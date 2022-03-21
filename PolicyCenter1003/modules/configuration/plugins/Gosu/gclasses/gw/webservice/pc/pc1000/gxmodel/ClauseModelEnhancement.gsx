package gw.webservice.pc.pc1000.gxmodel

uses gw.api.productmodel.CovTermPatternLookup

enhancement ClauseModelEnhancement : gw.webservice.pc.pc1000.gxmodel.clausemodel.types.complex.Clause {
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
