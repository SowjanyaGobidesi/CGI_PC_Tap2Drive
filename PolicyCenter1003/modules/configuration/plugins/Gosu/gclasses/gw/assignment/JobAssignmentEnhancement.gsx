package gw.assignment

uses gw.api.assignment.UserRoleOwner
uses java.util.HashSet
uses gw.api.system.PCLoggerCategory

enhancement JobAssignmentEnhancement : Job
{
  /**
   * Assign roles from the Policy to the Job
   */
  function assignRolesFromPolicy() {
    assignRolesFromPolicy(this.Policy)
  }

  /**
   * Assign roles from the rewrite new acount source Policy to the Job. 
   * This function will do nothing if there is no Rewrite new account source policy associated to this job
   */
  function assignRolesFromRewriteNewAccountPolicy() {
    if (this.Policy.RewrittenToNewAccountSource != null) {
      assignRolesFromPolicy(this.Policy.RewrittenToNewAccountSource)
    }
  }
  
  private function assignRolesFromPolicy(thePolicy : Policy) {
    var roleAssignmentsFromPolicy = thePolicy.RoleAssignments
    for ( roleAssignment in roleAssignmentsFromPolicy) {
      if (thePolicy.getUserRoleAssignmentByRole(roleAssignment.Role) != null) {
        AssignmentUtil.assignAndLogUserRole( this, roleAssignment.AssignedUser, roleAssignment.AssignedGroup, roleAssignment.Role,  
                            "Job.assignRolesFromPolicy()" )
      }
    }
  }
  
  /**
   * Assign the producer role on the Submission if the Producer has not already been
   * assigned.  Assigns in the following order:
   * <ul>
   * <li>Preferrentially set the current user if they are a member of the default group</li>
   * <li>Look for the producer on the ProducerCode used to create this job</li>
   * <li>If the producer was not found on the Producer Code, try the Account</li>
   * <li>Default to DefaultOwner</li>
   * </ul>
   */
  function assignProducer() {
    
    // No-op if the producer was already assigned
    if (AssignmentUtil.isUserRoleInUse( this, TC_PRODUCER )) {
      return
    }
    
    // Preferrentially set the current user if they are a member of the default group
    var currentUser = User.util.CurrentUser
    var group = this.Policy.ProducerCodeOfService.DefaultAssignmentGroup
    if (group.containsUser( currentUser ) and
        AssignmentUtil.assignAndLogUserRole( this, currentUser, currentUser.DefaultAssignmentGroup, TC_PRODUCER, "Submission.assignProducer()" )) {
      return
    }
    
    // Look for the producer on the default group of the ProducerCode used to create this job
    if (this.assignAndLogUserRoleByRoundRobin( this, group, TC_PRODUCER, TC_PRODUCER, "Submission.assignProducer()" )) {
      return
    } else {
      // Now look for any user with the proper criteria on the ProducerCode
        var producerCodeUser = this.Policy.ProducerCodeOfService.AllUsers.firstWhere( \ u -> u.UserType == TC_PRODUCER )
        if (AssignmentUtil.assignAndLogUserRole( this, producerCodeUser, producerCodeUser.DefaultAssignmentGroup,
                                                 TC_PRODUCER, "Submission.assignProducer()")) {
          return
        }
    }
    
    // If the producer was not found on the Producer Code, try the Account
    var acctAssignment = this.Policy.Account.RoleAssignments.firstWhere( \ u -> u.AssignedUser.UserType == TC_PRODUCER )
    if (acctAssignment != null and
        AssignmentUtil.assignAndLogUserRole( this, acctAssignment.AssignedUser, acctAssignment.AssignedGroup, TC_PRODUCER, 
                                             "Submission.assignProducer()" )) {
      return
    }
    
    // Default to SystemUser
    AssignmentUtil.assignToDefaultUser( this, TC_PRODUCER, "Submission.assignProducer()" )
  }
  
  /**
   * Create a new activity that is assigned to the user with the given role on this job.  
   * If the producer cannot be assigned the activity, assign to DefaultUser.
   *
   * @return The created activity
   */
  function createRoleActivity( role : typekey.UserRole, pattern : ActivityPattern, subject : String, 
                               description : String) : Activity {
    // Most of these arguments are null since the ActivityPattern config will set their default values
    var activity = pattern.createJobActivity( this.Bundle, this, subject, description, null, null, null, null, null )
    
    var roleAssignment = this.getUserRoleAssignmentByRole(role )
    if (roleAssignment != null) {
      if (not activity.assign( roleAssignment.AssignedGroup, roleAssignment.AssignedUser )) {
        PCLoggerCategory.ASSIGNMENT.warn(role + " was unable to be assigned to activity: " + roleAssignment.AssignedUser +
                          ".  Assigning to Default User.")
        activity.assign( AssignmentUtil.DefaultUser.DefaultAssignmentGroup, AssignmentUtil.DefaultUser )
      }
    }
    return activity                  
  }
  
  /**
   * Create a new activity that is assigned to the user with the given role on this job.  
   * If the producer cannot be assigned the activity, assign to DefaultUser.
   *
   * @return The created activity
   */
  function createRoleActivity( role : typekey.UserRole, pattern : ActivityPattern, subject : String, 
                               description : String, user : User) : Activity {
    // Most of these arguments are null since the ActivityPattern config will set their default values
    var activity = pattern.createJobActivity( this.Bundle, this, subject, description, null, null, null, null, null )
    
    var roleAssignment = this.getUserRoleAssignment(user, role )
    if (roleAssignment != null) {
      if (not activity.assign( roleAssignment.AssignedGroup, roleAssignment.AssignedUser )) {
        PCLoggerCategory.ASSIGNMENT.warn(role + " was unable to be assigned to activity: " + roleAssignment.AssignedUser +
                          ".  Assigning to Default User.")
        activity.assign( AssignmentUtil.DefaultUser.DefaultAssignmentGroup, AssignmentUtil.DefaultUser )
      }
    }
    return activity                  
  }
  
  /**
   * Create a new activity that is assigned to the Producer of this job.  If the producer
   * cannot be assigned the activity, assign to DefaultUser.
   *
   * @returns The created activity
   */
  function createProducerActivity( pattern : ActivityPattern, subject : String,
                                   description : String) : Activity {
    return createRoleActivity( TC_PRODUCER, pattern, subject, description )               
  }
  
  /**
   * Assign the undewriter role on the Job.  This is a no-op if the UW was already assigned.
   * <ol>
   *  <li>Set the PreferredUnderwriter from the ProducerCode as the default underwriter for the Submission</li>
   *  <li>If not found, try to set an Underwriter from ProducerCode.Branch. Check if the CurrentUser is an Underwriter for that Branch, if so, preferentially choose them.</li>
   *  <li>If not found, set the Underwriter to DefaultUser</li>
   * </ol>
   */
  function assignUnderwriter() {
        
    // No-op if the UW was already assigned
    if (AssignmentUtil.isUserRoleInUse(this, TC_UNDERWRITER)) {
      return
    }
    
    // Look for the preferred underwriter on the ProducerCode used to create this job
    var user = this.Policy.ProducerCodeOfService.PreferredUnderwriter
    var group = this.Policy.ProducerCodeOfService.Branch
    if (user == null or group == null or !group.containsUser(user))
      group = user.DefaultAssignmentGroup
    if (AssignmentUtil.assignAndLogUserRole(this, user, group, TC_UNDERWRITER, "JobAssignmentEnhancement.assignUnderwriter()")) {
      return
    }
    
    // Preferrentially set the Current User if they are an Underwriter
    var branch = this.Policy.ProducerCodeOfService.Branch
    if (branch != null) {
      var currentUser: User = entity.User.util.CurrentUser
      if (currentUser.UserType == TC_UNDERWRITER and branch.containsUser(currentUser) and
          AssignmentUtil.assignAndLogUserRole(this, currentUser, branch,
                                              TC_UNDERWRITER, "JobAssignmentEnhancement.assignUnderwriter()") ) {
        return
      }
    
      // If not found, try to set an Underwriter from ProducerCode.Branch
      if (this.assignAndLogUserRoleByRoundRobin(this, branch, TC_UNDERWRITER, TC_UNDERWRITER, "JobAssignmentEnhancement.assignUnderwriter()")) {
        return
      } else {
        // If round-robin unsuccessful, try to find any underwriter in the group
        var underwriterForBranch = branch.MembersNoSystemUsers.firstWhere(\ groupUser -> groupUser.User.UserType ==  TC_UNDERWRITER).User
        if (AssignmentUtil.assignAndLogUserRole(this, underwriterForBranch, branch,
                                               TC_UNDERWRITER, "JobAssignmentEnhancement.assignUnderwriter()")) {
          return
        }
      }
    }

    // Default to DefaultUser
    AssignmentUtil.assignToDefaultUser(this,  TC_UNDERWRITER, "JobAssignmentEnhancement.assignUnderwriter()")
  }

 /**
   * Assign the UW issue initial referrer to the current user
   */
  function assignInitialReferrer() {    
    var currentUser = User.util.CurrentUser
    var group = this.Policy.ProducerCodeOfService.DefaultAssignmentGroup
    this.assignUserRole( currentUser, group, TC_INITIALREFERRER)
  }
  
  /**
   * Assign by round-robin a user with the given group to the UserRoleOwner with the given role.
   * Also, include a method name to indicate where the assignment originated.  It also does a check
   * to make sure the user is of the expected UserType.
   * @return True if the operation passes, false if the user is null
   * @throws if the group is null
   */
  protected function 
    assignAndLogUserRoleByRoundRobin( assignTo : UserRoleOwner, group : Group, type : UserType,
                                      role : typekey.UserRole, method : String) : boolean {
    if (group == null) {
      throw "Group should not be null"
    }

    var assignment = assignTo.getOrCreateUserRoleAssignmentByRole( role )
    var succeeded = assignment.assignUserByRoundRobin( true, group )
    
    // Make sure that the returned user has the expected UserType
    var assignedUser: User = assignment.AssignedUser
    if (succeeded and (assignedUser as User).UserType != type) {
      PCLoggerCategory.ASSIGNMENT.warn( "The user " + assignedUser + " was not of type " + type +
                         " which was expected by " + method )
      succeeded = false
    }
    
    if (succeeded) {
      assignTo.assignUserRole(assignedUser, group, role )
      AssignmentUtil.logUserRoleAssignment( (assignment as UserRoleAssignment), method + " by RoundRobin" )
    }
    return succeeded
  }
  
  /**
   * Returns the users with roles Creator, Requester, Processor or InitialReferrer
   * These users' perspectives to UW Issues and approvals will be displayed on the Risk Analysis Page. 
   */
  function getUsersWithUWPerspectives() : entity.User[] {
    var roles = new typekey.UserRole[] {TC_CREATOR, TC_REQUESTOR, TC_PROCESSOR, TC_INITIALREFERRER}
    var users = new HashSet<entity.User>()
    
    roles.each(\ u -> {
      var ura = this.getUserRoleAssignmentByRole(u)
      if (ura != null) 
        users.add(ura.AssignedUser)
    })
    
    return users?.toTypedArray()
  }
}
