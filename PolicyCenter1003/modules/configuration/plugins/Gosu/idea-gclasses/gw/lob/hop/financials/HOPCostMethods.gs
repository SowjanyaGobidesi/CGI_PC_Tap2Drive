package gw.lob.hop.financials

/**
 * Additional methods and properties provided by the costs that supply this interface.
 */
@Export
structure HOPCostMethods {
  property get Coverage(): Coverage

  property get OwningCoverable(): Coverable

  property get Jurisdiction(): Jurisdiction
}