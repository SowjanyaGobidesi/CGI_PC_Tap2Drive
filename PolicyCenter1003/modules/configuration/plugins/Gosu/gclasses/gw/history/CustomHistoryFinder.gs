package gw.history
uses gw.api.database.Query

/**
 * This class provides queries for {@link History} events.
 */
@Export
class CustomHistoryFinder {

  construct() {

  }
  
  /**
   * This function returns all archive history events for a policy.
   */  
  function getAllPolicyArchiveHistory(policy : Policy) : gw.api.database.IQueryBeanResult<entity.History> {
    var q = Query.make(History)
    q.compare(History#Policy, Equals, policy)
    q.compareIn(History#CustomType, { CustomHistoryType.TC_ARCHIVEDISABLED, CustomHistoryType.TC_ARCHIVEENABLED })
    return q.select()
  }
}
