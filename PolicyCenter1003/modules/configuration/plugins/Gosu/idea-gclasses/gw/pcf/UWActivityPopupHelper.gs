package gw.pcf
uses gw.api.locale.DisplayKey
uses gw.assignment.PCAssigneePicker

/**
 * Routines to support UWActivityPopup
 */

@Export
class UWActivityPopupHelper {
  
  /**
   * Called beforeCommit by the UWActivityPopup.
   */
  public static function updatePolicyPeriodAndActivity(note : Note, 
                                                       assigneePicker : PCAssigneePicker, 
                                                       approvalOption : String, 
                                                       policyPeriod : PolicyPeriod, 
                                                       activity : Activity) {
    maybeRemoveNote(note)
    assigneePicker.SelectedAssignee.assignToThis(activity)
    if (approvalOption == "UWRequest") {    
      policyPeriod.JobProcess.setPostUWRequestChanges()
    } else if (approvalOption == "UWApproval") {
      policyPeriod.JobProcess.setPostUWApprovalChanges()
    }
    policyPeriod.Bundle.commit(); 
  }

  /**
   * Determines whether the update button on the toolbar should read "Send Request" in the casea of a
   * UWRequest, or "Release" in the case of an approval being committed.
   * 
   * @return The new text for the update button.
   */
  public static function getUpdateLabel(approvalOption : String) : String {
    if (approvalOption == "UWRequest") {    
      return DisplayKey.get("Web.ActivityDetail.Button.UWAuthRequestSend")
    } else if (approvalOption == "UWApproval") {
      return DisplayKey.get("Web.ActivityDetail.Button.UWAuthApprovalSend")
    }
    return null
  }

  public static function getDefaultAssignee(approvalOption : String, policyPeriod : PolicyPeriod) : gw.assignment.PCAssigneePicker {
    var assignee : gw.api.assignment.Assignee

    if(approvalOption == "UWRequest") {
      assignee = new gw.api.assignment.RoleAssignee(TC_UNDERWRITER, policyPeriod.Job.Underwriter )
    } else if (approvalOption == "UWApproval") {
      var userRoleAssignment = policyPeriod.Job.RoleAssignments.firstWhere(\ u -> u.Role == TC_INITIALREFERRER)
      if (userRoleAssignment != null)
        assignee = new gw.api.assignment.RoleAssignee(TC_INITIALREFERRER, userRoleAssignment.AssignedUser)
      else {
        userRoleAssignment = policyPeriod.Job.RoleAssignments.firstWhere(\ u -> u.Role == TC_PRODUCER)
        if (userRoleAssignment != null)
          assignee = new gw.api.assignment.RoleAssignee(TC_PRODUCER, userRoleAssignment.AssignedUser)
      }
    }
    var picker = new gw.assignment.PCAssigneePicker()
    picker.SelectedAssignee = assignee
    return picker
  }
  
  private static function maybeRemoveNote(note : Note) {
    if (note != null and 
        note.Body == null and 
        note.Subject == null and 
        note.Topic == null) {
      note.Bundle.delete(note)
    }
  }
}
