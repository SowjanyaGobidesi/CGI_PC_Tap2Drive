package gw.systables
uses gw.api.database.Query
uses gw.api.database.QuerySelectColumns
uses gw.api.database.Relop
uses gw.api.path.Paths

enhancement ReasonCodeEnhancement : ReasonCode {
  
  /**
   * Looks up the NotificationActionType for the given ReasonCode and NotificationCategory 
   * from the reasoncode_actiontype system table
   */
  function getNotificationActionType(category : NotificationCategory) : NotificationActionType {
    var query = Query<ReasonCodeActionType>.make(ReasonCodeActionType)
    query.compare("ReasonCode", Relop.Equals, this)
    query.compare("NotificationCategory", Relop.Equals, category)
    return query.select({QuerySelectColumns.path(Paths.make(ReasonCodeActionType#NotificationActionType))}).transformQueryRow(\row -> row.getColumn(0) as NotificationActionType).AtMostOneRow
  }
}
