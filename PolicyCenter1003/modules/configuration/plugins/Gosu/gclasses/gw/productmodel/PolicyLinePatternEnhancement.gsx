package gw.productmodel

uses gw.api.database.Query
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.productmodel.PolicyLinePatternLookup
uses java.util.List

enhancement PolicyLinePatternEnhancement : gw.api.productmodel.PolicyLinePattern {

  /**
   *  Returns all the FormPatterns associated with this policy line
   */
  property get FormPatterns() : List<FormPattern> {
    var q = Query.make(FormPattern)
    q.compare("PolicyLinePatternCode", Equals, this.PublicID)
    return q.select().toList()
  }

  /**
   * Ordering used by coverable adapters when determining currency to use when default is not in available currencies
   */
  property get AvailableCurrenciesByPriority(): List<Currency> {
    return this.AvailableCoverageCurrencies*.Currency.orderBy(\elt -> elt.Priority)
  }

  static function DisplayNameForCode(code : String) : String {
    return PolicyLinePatternLookup.getByPublicID(code).DisplayName
  }

  /**
   * Returns the coverage parts associated with this policy line. If the line has no coverage parts an empty array is
   * returned; <code>null</code> is never returned
   */
  property get CoveragePartTypes(): List<typekey.CoveragePartType> {
    return getPolicyLineCoveragePartTypes(this)
  }

  /**
   * Returns the coverage parts associated with a policy line pattern.
   *
   * @param line the <code>PolicyLinePattern</code>
   * @return a list containing the coverage parts. If the policy line has no coverage parts an empty list is returned;
   * <code>null</code> is never returned
   */
  static function getPolicyLineCoveragePartTypes(line: PolicyLinePattern): List<typekey.CoveragePartType> {
    if (line == null) {
      return Collections.emptyList()
    }
    var policyLineType = line.getPolicyLineSubtype()
    return typekey.CoveragePartType.getTypeKeys(false).where(\t -> t.hasCategory(policyLineType))
  }

  /**
   * Returns the name of the icon that corresponds to this policy line pattern.
   *
   * @return the predefined icon for policy line patterns included in the base configuration.
   * For other policy line patterns, return the policy line pattern's code identifier by convention.
   */
  property get Icon() : String {
    var icon = ProductModelIconMapper.getPredefinedIcon(this.CodeIdentifier)

    if (icon == null) {
      // No icon was defined for this policy line pattern in the base configuration, so return its code identifier by convention
      icon = this.CodeIdentifier
    }

    return icon
  }

}