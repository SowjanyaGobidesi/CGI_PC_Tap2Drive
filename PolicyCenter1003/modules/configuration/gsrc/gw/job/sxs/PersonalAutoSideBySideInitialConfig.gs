package gw.job.sxs

uses gw.api.productmodel.Offering
uses gw.lob.common.SideBySideUtil
uses gw.api.util.DateUtil
uses gw.api.upgrade.PCCoercions

/**
 * Called when SideBySide periods are first created.  Current implementation applies offerings
 * at time of SideBySide period creation.  See @link{SideBySideUtil}
 */
@Export
class PersonalAutoSideBySideInitialConfig implements SideBySideInitialConfig {

  /**
   * Used to set the offerings on the array of policy periods passed in.
   * @param policyPeriods array of policy periods to apply offerings to.
   *        This is guaranteed to include at least one PolicyPeriod
   */
  override function configureInitialPolicies(policyPeriods : PolicyPeriod[]) {
     /**
     * If the first period has an offering set, don't differentiate
     */
    if (null==policyPeriods[0].Offering) {
      policyPeriods.eachWithIndex(\pp,i -> {
        switch(i) {
          case 0:
            editIfRatedOrQuotedSetOfferingAndSync(pp, PCCoercions.makeProductModel<Offering>("PABasic"))
            break
          case 1:
            editIfRatedOrQuotedSetOfferingAndSync(pp, PCCoercions.makeProductModel<Offering>("StandardProgram"))
            break
          case 2:
            editIfRatedOrQuotedSetOfferingAndSync(pp, PCCoercions.makeProductModel<Offering>("PAPremium"))
            break
        }
      })
    }
    
    /**
     * Based on offering, alter cov terms based on characteristics
     * of the associated vehicle
     */
    policyPeriods.each(\pp -> {
      if ("StandardProgram" == pp.Offering.PublicID) {
        var vehicles = pp.PersonalAutoLine.Vehicles
        // In case PersonalAutoLine is NULL
        if (null != vehicles) {
          vehicles.each(\v->{
            var currentYear = DateUtil.getYear(DateUtil.currentDate())
            if (currentYear - v.Year > 10) {
              v.Coverages.where(\cov -> {
                return cov.PatternCode == "PACollisionCov" or cov.PatternCode == "PAComprehensiveCov"
              }).each(\cov -> v.removeCoverageFromCoverable(cov))
            }
          })
        }
      }
    })
  }

  private function editIfRatedOrQuotedSetOfferingAndSync(policyPeriod: PolicyPeriod, offering: Offering) {
    if (null==policyPeriod) {
      return
    }
    policyPeriod.Offering = offering
    policyPeriod.editIfRatedOrQuotedAndForceSync()
  }

}
