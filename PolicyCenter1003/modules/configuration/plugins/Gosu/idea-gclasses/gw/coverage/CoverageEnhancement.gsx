package gw.coverage

uses gw.api.productmodel.CoverageCategory
uses gw.api.productmodel.CoveragePattern

enhancement CoverageEnhancement : Coverage {
  
  /**
   * @return the Coverage Category associated with this Coverage
   */
  property get CoverageCategory() : CoverageCategory {
    return this.Pattern.CoverageCategory
  }

  /**
   * @return the Reinsurance Coverage Group associated with this Coverage
   */
  property get RICoverageGroupType() : RICoverageGroupType {
    var covPattern = this.Pattern as CoveragePattern
    if (covPattern.RICoverageGroupScript.NotBlank) {
      var scriptResult = covPattern.evaluateRICoverageGroupScript(this)
      return scriptResult != null ? scriptResult : covPattern.RICoverageGroupType
    } else {
      return covPattern.RICoverageGroupType
    }
  }
}
