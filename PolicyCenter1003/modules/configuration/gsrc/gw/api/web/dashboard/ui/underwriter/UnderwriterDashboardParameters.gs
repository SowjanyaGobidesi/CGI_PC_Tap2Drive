package gw.api.web.dashboard.ui.underwriter

@Export
class UnderwriterDashboardParameters {
  static class Permissions {
    property get Submissions(): boolean {
      return perm.System.viewmysubmissions
    }

    property get Renewals(): boolean {
      return perm.System.viewmyrenewals
    }

    property get Other(): boolean {
      return perm.System.viewmypolicychanges
    }

    property get Activities(): boolean {
      return perm.System.viewmyactivities
    }

    property get AnyJobsOrActivities(): boolean {
      return Submissions or
          Renewals or
          Other or
          Activities
    }

    property get Contingencies(): boolean {
      return perm.System.viewriskrefreasons or
          perm.System.viewriskclaims or
          perm.System.viewriskpriorpolicies or
          perm.System.viewriskpriorlosses
    }

    property get Any(): boolean {
      return AnyJobsOrActivities or Contingencies
    }

    private construct() {}
    static final var _instance: Permissions as readonly Instance = new Permissions()
  }
}