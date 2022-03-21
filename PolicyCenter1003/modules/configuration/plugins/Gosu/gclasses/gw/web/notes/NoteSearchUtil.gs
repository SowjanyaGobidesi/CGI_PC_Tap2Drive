package gw.web.notes

uses gw.api.database.IQueryBeanResult

@Export
class NoteSearchUtil {
  private construct() {
  }

  private static function initRelatedTo(sc: NoteSearchCriteria, period: PolicyPeriod) {
    if (sc.RelatedTo == null) {
      sc.RelatedTo = Optional
          .ofNullable(sc.getRelatedToSearchCriteria(period))
          .filter(\rlt -> !rlt.IsEmpty)
          .map(\rlt -> rlt.first())
          .orElse(null)
    }
  }

  static function createSearchCriteria(account: Account): NoteSearchCriteria {
    return createSearchCriteria(account, null, null)
  }

  static function createSearchCriteria(period: PolicyPeriod): NoteSearchCriteria {
    return createSearchCriteria(null, period, null)
  }

  static function createSearchCriteria(account: Account, period: PolicyPeriod): NoteSearchCriteria {
    return createSearchCriteria(account, period, null)
  }

  static function createSearchCriteria(account: Account, period: PolicyPeriod, activity: Activity): NoteSearchCriteria {
    var criteria = new NoteSearchCriteria(){:Account = account, :Policy = period?.Policy, :Activity = activity}

    if (activity != null) {
      criteria.RelatedTo = activity
    } else {
      initRelatedTo(criteria, period)
    }

    return criteria
  }

  static function performSearch(criteria: NoteSearchCriteria, period: PolicyPeriod, activity: Activity): IQueryBeanResult<Note> {
    criteria.setSearchCriteria(activity)
    initRelatedTo(criteria, period)

    return criteria.performSearch()
  }
}