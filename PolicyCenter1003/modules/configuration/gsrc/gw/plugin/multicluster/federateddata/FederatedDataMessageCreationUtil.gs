package gw.plugin.multicluster.federateddata

uses entity.Activity
uses entity.Contact
uses entity.Job
uses gw.api.web.desktop.data.JobTypeConversionHelper
uses gw.api.web.desktop.data.account.AccountDTO
uses gw.api.web.desktop.data.activity.ActivityDTO
uses gw.api.web.desktop.data.common.ContactDTOImpl
uses gw.api.web.desktop.data.groupuser.GroupUserDTO
uses gw.api.web.desktop.data.userroleassignment.UserRoleAssignmentDTO
uses gw.plugin.multicluster.FederatedDataPurgeSource

@Export
class FederatedDataMessageCreationUtil {
  private construct() {
  }

  static function createActivityMessage(messageContext : MessageContext) {
    var activity = messageContext.Root as Activity
    messageContext.createMessage(ActivityDTO.from(activity).writeAsJSONString())
  }

  static function createAccountMessage(messageContext : MessageContext) {
    var account = (messageContext.Root as Account)
    messageContext.createMessage(AccountDTO.from(account).writeAsJSONString())
  }

  static function createAccountProducerCodeMessage(messageContext : MessageContext) {
    var account = (messageContext.Root as AccountProducerCode).Account
    messageContext.createMessage(AccountDTO.from(account).writeAsJSONString())
  }

  static function createAccountUserRoleAssignmentMessage(messageContext : MessageContext) {
    var userRoleAssignment = (messageContext.Root as AccountUserRoleAssignment)
    messageContext.createMessage(UserRoleAssignmentDTO.from(userRoleAssignment).writeAsJSONString())
  }

  static function createContactMessage(messageContext : MessageContext) {
    var contact = (messageContext.Root as Contact)
    messageContext.createMessage(ContactDTOImpl.from(contact).writeAsJSONString())
  }

  static function createGroupUserAssignmentMessage(messageContext : MessageContext) {
    var groupUser = (messageContext.Root as GroupUser)
    var groupUserChangedAndIsMember = messageContext.EventName == GroupUser.GROUPUSERCHANGED_EVENT && groupUser.Member
    var groupUserAdded = messageContext.EventName == GroupUser.GROUPUSERADDED_EVENT
    var assignedUserInGroup = groupUserChangedAndIsMember || groupUserAdded
    messageContext.createMessage(GroupUserDTO.from(groupUser, assignedUserInGroup).writeAsJSONString())
  }

  static function createJobMessage(messageContext : MessageContext) {
    var job : Job
    if (messageContext.Root typeis Job) {
      job = messageContext.Root
    } else if (messageContext.Root typeis PolicyPeriod) {
      job = messageContext.Root.Job
    } else {
      throw new RuntimeException("Unsupported Message Root" + typeof messageContext.Root)
    }
    messageContext.createMessage(JobTypeConversionHelper.from(job))
  }

  static function createJobUserRoleAssignmentMessage(messageContext : MessageContext) {
    var userRoleAssignment = (messageContext.Root as JobUserRoleAssignment)
    messageContext.createMessage(UserRoleAssignmentDTO.from(userRoleAssignment).writeAsJSONString())
  }

  static function createPurgeMessage(messageContext : MessageContext) {
    // Message having Foreign Key to policy prevents policy purge, due to FK Constraint violation
    if (messageContext.Root typeis Account) {
      createPurgeMessageForPurgeSource(messageContext, FederatedDataPurgeSource.ACCOUNT)
    } else if (messageContext.Root typeis Policy) {
      createPurgeMessageForPurgeSource(messageContext, FederatedDataPurgeSource.POLICY)
    } else if (messageContext.Root typeis Contact) {
      createPurgeMessageForPurgeSource(messageContext, FederatedDataPurgeSource.CONTACT)
    }
    // Ignoring other roots intentionally.
  }

  private static function createPurgeMessageForPurgeSource(messageContext : MessageContext, purgeSource : FederatedDataPurgeSource) {
    var root = messageContext.Root as KeyableBean
    var newMessage = messageContext.createMessage(root.PublicID)
    newMessage.Account = null
    newMessage.Policy = null
    newMessage.Contact = null
    newMessage.SenderRefID = purgeSource.Name
  }
}