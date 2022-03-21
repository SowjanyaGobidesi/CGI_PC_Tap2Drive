package gw.rating.worksheet.worksheetcontainer

uses gw.rating.worksheet.domain.Worksheet
uses gw.rating.worksheet.worksheetcontainer.AbstractWorksheetContainerContentHandler

/**
 * A pass through worksheet container content handler.  Because it doesn't store the updates, the policy period
 * is updated immediately so there is no need for the updatePolicyPeriod method to do anything.
 */
@Export
class PassThroughWorksheetContainerHandler extends AbstractWorksheetContainerContentHandler<EffDated> {

  construct(policyPeriod : PolicyPeriod) {
    super(policyPeriod)
  }

  override function addWorksheetFor(effDatedBean: EffDated, ws: Worksheet, tag: String) {
    log("Passing through as worksheet update to the policy period")
    _policyPeriod.addWorksheetFor(effDatedBean, ws, tag)
  }

  /**
   * This version of updatePolicyPeriod in PassThroughWorksheetContainerHandler should do nothing, since the update
   * has already been performed at the time addWorksheetFor was called.
   */
  override function updatePolicyPeriod() {
    //NOOP
  }
}