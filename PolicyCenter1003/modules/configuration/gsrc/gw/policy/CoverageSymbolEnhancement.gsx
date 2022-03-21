package gw.policy
uses gw.api.locale.DisplayKey
uses gw.api.productmodel.CoverageSymbolPattern
uses gw.api.productmodel.CoverageSymbolPatternLookup

enhancement CoverageSymbolEnhancement : entity.CoverageSymbol {
  
  property get CoverageSymbol() : CoverageSymbolPattern {
    return CoverageSymbolPatternLookup.getByPublicID(this.PatternCode)
  }
  
  function getCoverageSymbolDiffDisplay() : String {
    var symbol =  CoverageSymbolPatternLookup.getByPublicID(this.PatternCode)
    var groupName = symbol.CoverageSymbolGroupPattern.Name
    var symbolTypeDesc = symbol.CoverageSymbolType.Description
    return DisplayKey.get("Web.Differences.LOB.Common.CoverageSymbol", symbolTypeDesc, groupName)
  }
}
