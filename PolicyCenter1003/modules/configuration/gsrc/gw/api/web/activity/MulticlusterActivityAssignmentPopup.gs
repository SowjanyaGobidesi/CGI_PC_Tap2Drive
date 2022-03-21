package gw.api.web.activity

uses gw.api.assignment.multicluster.MulticlusterAssignee
uses gw.api.util.MulticlusterSuggestedAssigneeBuilder
uses gw.api.web.desktop.data.FederatedActivityAssignmentHelper
uses gw.api.web.desktop.data.activity.ActivityDTO

@Export
class MulticlusterActivityAssignmentPopup extends ActivityAssignmentPopup {

  static var _activityAssignmentHelper = new FederatedActivityAssignmentHelper()
  var _remoteActivities : Map<String, List<ActivityDTO>>
  public var onPopupCancel: block()

  private construct(allActivities : ActivityDTO[],
                    remoteActivities : Map<String, List<ActivityDTO>>,
                    defaultUser : User,
                    onPopupCancelBlock: block()) {
    super({}, new MulticlusterSuggestedAssigneeBuilder(allActivities, defaultUser))
    _remoteActivities = remoteActivities
    onPopupCancel = onPopupCancelBlock
  }

  static function newInstance(activities : ActivityDTO[], defaultUser : User, onPopupCancel: block()) : MulticlusterActivityAssignmentPopup {
    var result = _activityAssignmentHelper.activitiesByCluster(activities);
    return new MulticlusterActivityAssignmentPopup(activities, result, defaultUser, onPopupCancel)
  }

  override function performAssignment() : boolean {
    _activityAssignmentHelper.performAssignment(_remoteActivities, \activityDTO -> Assignee)
    return true
  }

  private property get Assignee() : MulticlusterAssignee {
    return (SelectionType == typekey.AssignmentSelectionType.TC_FROMLIST)
        ? getSelectedFromList() as MulticlusterAssignee : AssigneeFromPicker;
  }

  private property get AssigneeFromPicker() : MulticlusterAssignee {
    return Picker.Selection as MulticlusterAssignee
  }
}