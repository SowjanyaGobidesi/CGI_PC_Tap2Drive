package gw.assignment

uses gw.api.locale.DisplayKey
uses gw.api.assignment.UserRoleOwner
uses gw.rules.Action
uses java.util.ArrayList
uses gw.api.system.PLDependenciesGateway
uses gw.api.database.Query
uses gw.api.system.PCLoggerCategory
uses gw.pl.persistence.core.Key

@Export
class AssignmentUtil {
  static var sysUserId : Key

  /**
   * Returns the system user that will be used as a last-ditch effort for assignments
   */
  static property get DefaultUser() : User {
    var sysadmin : User
    if (sysUserId == null) {
      sysadmin = findFirstSysadminUser()
      sysUserId = sysadmin.ID
    } else {
      sysadmin = PLDependenciesGateway.getGlobalCache().getBean(sysUserId) as User
      if (sysadmin == null or sysadmin.SystemUserType != SystemUserType.TC_SYSADMIN) {
         PCLoggerCategory.ASSIGNMENT.warn( "Sysadmin for assignment has changed or could not be found.")
         sysadmin = findFirstSysadminUser()
         sysUserId = sysadmin.ID
      }
    }

    return sysadmin
  }

  private static function findFirstSysadminUser() : User {
    var query = Query.make(User)
    query.compare(User#SystemUserType.PropertyInfo.Name, Equals, SystemUserType.TC_SYSADMIN)
    return query.select().FirstResult
  }

  /**
   * Assigns to the DefaultUser and logs a warning that this assignment was to the Default User
   */
  static function assignToDefaultUser(assignTo : UserRoleOwner, role : typekey.UserRole, method : String) {
    assignAndLogUserRole(assignTo, DefaultUser, DefaultUser.DefaultAssignmentGroup, role, method)
    PCLoggerCategory.ASSIGNMENT.warn( "Unable to assign " + role + " in " + method +
                       ", assigning to Default User: " + AssignmentUtil.DefaultUser)
  }

  /**
   * Assign the user with the given group to the UserRoleOwner with the given role.  Also, include a
   * method name to indicate where the assignment originated.
   * @return True if the operation passes, false if the user is null
   * @throws if the group is null
   */
  static function assignAndLogUserRole(assignTo : UserRoleOwner, user : User, group : Group,
                                       role : typekey.UserRole, method : String) : boolean {
    if (user == null) {
      return false
    } else if (group == null) {
      throw "Group should not be null"
    }

    var assignment = assignTo.assignUserRole(user, group, role)
    AssignmentUtil.logUserRoleAssignment((assignment as UserRoleAssignment), method)
    return true
  }

  /**
   * This will return a pretty print of the assignment
   */
  static function formatAssignment(assignable : Assignable) : String {
    var group = assignable.AssignedGroup
    var user = assignable.AssignedUser
    var queue = assignable.AssignedQueue
    return DisplayKey.get("Assignment.Formatted.Group", group, (group != null ? group.ID.toString() : DisplayKey.get("Assignment.Formatted.NullGroup")))
           + (user != null ? DisplayKey.get("Assignment.Formatted.User", user, user.ID) : "")
           + (queue != null ? DisplayKey.get("Assignment.Formatted.Queue", queue.Name, queue.ID) : "")
   }

  /**
   * This will return a pretty print of the assigned object
   */
  static function formatAssignmentOwner(assignment : UserRoleAssignment) : String {
    if (assignment typeis JobUserRoleAssignment) {
      var job = assignment.Job
      return job.DisplayType + " job " + job.JobNumber
    }
    if (assignment typeis PolicyUserRoleAssignment) {
        var policy = assignment.Policy
        return policy.Product + " policy " + policy
    }
    if (assignment typeis AccountUserRoleAssignment) {
      var account = assignment.Account
      return "account " + account.AccountNumber
    }
    return ""
  }

  /**
   * This will return a pretty print of the current action
   */
  static function formatLocation(action : Action) : String {
    return action.RuleSet.DisplayName + "." + action.Rule.DisplayName
  }

  /**
   * Returns true if the UserRole is already assigned on the owner
   */
  static function isUserRoleInUse( owner : UserRoleOwner, role : typekey.UserRole ) : boolean {
    return owner.getUserRoleAssignmentByRole( role ) != null
  }

  static function filterAssignableRoles(owner : Account, role : typekey.UserRole) : boolean {
    return filterAssignableRoles(owner, TC_ACCOUNTEXCLUSIVE, role)
  }

  static function filterAssignableRoles(owner : Job, role : typekey.UserRole) : boolean  {
    return filterAssignableRoles(owner, TC_JOBEXCLUSIVE, role)
  }

  static function filterAssignableRoles(owner : Policy, role : typekey.UserRole) : boolean  {
    return filterAssignableRoles(owner, TC_POLICYEXCLUSIVE, role)
  }

  static function filterAssignableRoles(owner : UserRoleOwner, constraint : UserRoleConstraint, role : typekey.UserRole) : boolean {
    if (role == TC_DEFAULTASSIGNMENTROLE) {
      return false
    }
    else if (not role.hasCategory( constraint )) {
      return true
    }
    else if (owner.getUserRoleAssignmentByRole( role ).AssignmentStatus == TC_ASSIGNED) {
      return false
    }
    return true
  }

  static function getMultipleAssignmentRoles(category : UserRoleConstraint) : typekey.UserRole[] {
    var allKeys = new ArrayList<typekey.UserRole>()
    allKeys.addAll(typekey.UserRole.getTypeKeys(false).where(\ role -> role.hasCategory(category)))
    allKeys.remove(typekey.UserRole.TC_CREATOR)
    allKeys.remove(typekey.UserRole.TC_DEFAULTASSIGNMENTROLE)
    return allKeys.toTypedArray()
  }

  static function getWorkOrderOrPolicyNumber(uro : UserRoleOwner) : String {
    if (uro typeis Policy) {
      return uro.LatestBoundPeriod.PolicyNumber
    } else if (uro typeis Job) {
      return uro.JobNumber
    } else {
      return DisplayKey.get("Assignment.UnknownType")
    }
  }

  /**
   * This will log a user role assignment
   */
  static function logUserRoleAssignment(assignment : UserRoleAssignment, functionName : String) {

    PCLoggerCategory.ASSIGNMENT.isInfoEnabled()
    if (PCLoggerCategory.ASSIGNMENT.isInfoEnabled()) {
      PCLoggerCategory.ASSIGNMENT.info( "'" + functionName + "': Set " + assignment.Role + " on "
          + formatAssignmentOwner( assignment ) + formatAssignment( assignment ) )
    }
  }
}
