package gw.api.productmodel

enhancement ConditionPatternArrayEnhancement: ConditionPattern[] {
  /**
   * Return an array of ConditionPattern's for the specified Coverable
   *   that are selected for the Coverable, or if editable in a UI,
   *   are available.
   *
   * Determining availability is somewhat expensive and not necessary
   * if conditions are simply going to be displayed.
   */
  function whereSelectedOrAvailable(covered : Coverable, editable : boolean) : ConditionPattern[] {
    return editable
        ? this.where(\ c -> covered.isConditionSelectedOrAvailable(c))
        : this.where(\ c -> covered.hasCondition(c))
  }
}
