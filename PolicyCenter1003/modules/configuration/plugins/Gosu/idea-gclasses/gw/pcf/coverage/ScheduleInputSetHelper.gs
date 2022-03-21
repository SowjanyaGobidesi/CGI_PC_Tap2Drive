package gw.pcf.coverage

uses gw.api.productmodel.ClausePattern
uses gw.api.productmodel.CovTermPattern

/**
 * Helper class used in the ScheduleInputSet PCF.
 */
@Export
class ScheduleInputSetHelper {
  /**
   * Produces a list of all the <code>CovTermPattern</code>s associated with the
   * specified <code>ClausePattern</code>s. The list will be sorted by the priority
   * assigned to each <code>CovTermPattern</code>.
   *
   * @param clausePatterns the list of clause patterns to check
   * @return a list of covTerm patterns sorted in priority order or an empty list
   *         if none exist; <code>null</code> is never returned
   */
  public static function getCovTermPatterns(clausePatterns: List<ClausePattern>): List<CovTermPattern> {
    var covTermPatterns = new ArrayList<CovTermPattern>()
    if (clausePatterns != null) {
      for (clauseCovTermPatterns in clausePatterns*.CovTerms) {  // getCovTerms() returns an empty list if no covTerms exist
        covTermPatterns.addAll(clauseCovTermPatterns)
      }
      covTermPatterns.sortBy(\ctp -> ctp.Priority)
    }
    return covTermPatterns
  }
}