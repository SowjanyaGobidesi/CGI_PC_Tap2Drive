package gw.riskassessment

uses typekey.*
uses typekey.UserRole

uses java.util.Set

@Export
class SpotlightNotificationActivityCreator {

  static function createActivityForRequestingUser(user : User, job : Job, subject : String, description : String) {
    var activity = NotificationActivity.createJobActivity(job.Bundle, job, subject, description, null, null, null, null, null )
    activity.assign(user.DefaultAssignmentGroup, user)
  }

  static public function createActivity(job : Job, subject : String, description : String) {
    UserRolesToSendActivity.each(\ userRole -> job.createRoleActivity(userRole, NotificationActivity, subject, description))
  }

  static private property get NotificationActivity(): ActivityPattern {
    return ActivityPattern.finder.getActivityPatternByCode("notification")
  }

  static private property get UserRolesToSendActivity() : Set<typekey.UserRole> {
    return {typekey.UserRole.TC_PRODUCER, UserRole.TC_UNDERWRITER}
  }
}
