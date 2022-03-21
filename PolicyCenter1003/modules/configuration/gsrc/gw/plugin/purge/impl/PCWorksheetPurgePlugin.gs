package gw.plugin.purge.impl

uses gw.plugin.purge.WorksheetPurgePlugin
uses java.util.Date
uses gw.api.database.IQueryBuilder
uses gw.api.database.Relop
uses gw.api.system.PCConfigParameters

@Export
class PCWorksheetPurgePlugin implements WorksheetPurgePlugin {

  var AGE_THRESHOLD : int as readonly AgeThreshold = PCConfigParameters.RatingWorksheetContainerAgeForPurging.Value

  /**
   * Add restrictions to the query so that only worksheet containers that are ready to be purged get returned.
  */
  override function buildWorksheetCandidatesQuery(query: IQueryBuilder <entity.WorksheetContainer>, purgeDate: Date) {
    //want worksheet containers that have the 'canPurge' flag set and whose jobs were completed more than AGE_THRESHOLD days ago
    query.compare("CanPurge", Equals, true)

    query.join("Branch").join("Job").compare(Job#CloseDate, Relop.LessThanOrEquals, purgeDate.addDays(-AGE_THRESHOLD))
  }

  /**
   * Last minute check, if necessary.
   */
  override function canPurgeWorksheetContainer(purgeDate: Date, worksheetContainer: entity.WorksheetContainer): boolean {
    return worksheetContainer.CanPurge
  }
}