package gw.plugin.multicluster.federateddata

uses entity.Job
uses gw.api.personaldata.purge.PersonalDataPurgeEvent
uses gw.plugin.Plugins
uses gw.plugin.multicluster.FederatedDataPurgeSource

uses PersonalDataPurgeEvent#PERSONAL_DATA_PURGE_EVENT

@Export
public enum FederatedEventHandler {

  ActivityAddedEvent(Activity.ACTIVITYADDED_EVENT, \message, payload -> FederatedDataPlugin.createActivity(payload)),
  ActivityChangedEvent(Activity.ACTIVITYCHANGED_EVENT, \message, payload -> FederatedDataPlugin.updateActivity(message.MessageRoot.PublicID, payload)),
  ActivityRemovedEvent(Activity.ACTIVITYREMOVED_EVENT, \message, payload -> FederatedDataPlugin.deleteActivity(message.MessageRoot.PublicID)),

  AccountAddedEvent(Account.ACCOUNTADDED_EVENT, \message, payload -> FederatedDataPlugin.createAccount(payload)),
  AccountChangedEvent(Account.ACCOUNTCHANGED_EVENT, \message, payload -> FederatedDataPlugin.updateAccount(message.MessageRoot.PublicID, payload)),
  AccountRemovedEvent(Account.ACCOUNTREMOVED_EVENT, \message, payload -> FederatedDataPlugin.deleteAccount(message.MessageRoot.PublicID)),

  AccountProducerCodeAddedEvent(AccountProducerCode.ACCOUNTPRODUCERCODEADDED_EVENT, \message, payload -> {
    var accountProducerEntity = message.MessageRoot as AccountProducerCode
    FederatedDataPlugin.updateAccount(accountProducerEntity.Account.PublicID, payload)
  }),
  AccountProducerCodeChangedEvent(AccountProducerCode.ACCOUNTPRODUCERCODECHANGED_EVENT, \message, payload -> {
    var accountProducerEntity = message.MessageRoot as AccountProducerCode
    FederatedDataPlugin.updateAccount(accountProducerEntity.Account.PublicID, payload)
  }),
  AccountProducerCodeRemovedEvent(AccountProducerCode.ACCOUNTPRODUCERCODEREMOVED_EVENT, \message, payload -> {
    var accountProducerEntity = message.MessageRoot as AccountProducerCode
    FederatedDataPlugin.updateAccount(accountProducerEntity.Account.PublicID, payload)
  }),

  AccountUserRoleAssignmentAddedEvent(AccountUserRoleAssignment.ACCOUNTUSERROLEASSIGNMENTADDED_EVENT, \message, payload -> {
    var userRoleAssignmentEntity = message.MessageRoot as UserRoleAssignment
    FederatedDataPlugin.createUserRoleAssignment(payload, UserRoleAssignmentType.from(userRoleAssignmentEntity))
  }),
  AccountUserRoleAssignmentChangedEvent(AccountUserRoleAssignment.ACCOUNTUSERROLEASSIGNMENTCHANGED_EVENT, \message, payload -> {
    var userRoleAssignmentEntity = message.MessageRoot as UserRoleAssignment
    FederatedDataPlugin.updateUserRoleAssignment(message.MessageRoot.PublicID, payload, UserRoleAssignmentType.from(userRoleAssignmentEntity))
  }),
  AccountUserRoleAssignmentRemovedEvent(AccountUserRoleAssignment.ACCOUNTUSERROLEASSIGNMENTREMOVED_EVENT, \message, payload -> {
    var userRoleAssignmentEntity = message.MessageRoot as UserRoleAssignment
    FederatedDataPlugin.deleteUserRoleAssignment(message.MessageRoot.PublicID, UserRoleAssignmentType.from(userRoleAssignmentEntity))
  }),

  CancellationAddedEvent(Cancellation.CANCELLATIONADDED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.createJob(payload, jobEntity.Subtype)
  }),
  CancellationChangedEvent(Cancellation.CANCELLATIONCHANGED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.updateJob(jobEntity.PublicID, payload, jobEntity.Subtype)
  }),
  CancellationRemovedEvent(Cancellation.CANCELLATIONREMOVED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.deleteJob(jobEntity.PublicID, jobEntity.Subtype)
  }),

  ContactChangedEvent(Contact.CONTACTCHANGED_EVENT, \message, payload -> FederatedDataPlugin.updateContact(message.MessageRoot.PublicID, payload)),

  GroupUserAddedEvent(GroupUser.GROUPUSERADDED_EVENT, \message, payload -> FederatedDataPlugin.updateGroupUser(payload)),
  GroupUserChangedEvent(GroupUser.GROUPUSERCHANGED_EVENT, \message, payload -> FederatedDataPlugin.updateGroupUser(payload)),
  GroupUserRemovedEvent(GroupUser.GROUPUSERREMOVED_EVENT, \message, payload -> FederatedDataPlugin.updateGroupUser(payload)),

  JobAddedEvent(Job.JOBADDED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.createJob(payload, jobEntity.Subtype)
  }),
  JobChangedEvent(Job.JOBCHANGED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.updateJob(jobEntity.PublicID, payload, jobEntity.Subtype)
  }),
  JobRemovedEvent(Job.JOBREMOVED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.deleteJob(jobEntity.PublicID, jobEntity.Subtype)
  }),
  JobPurgedEvent(Job.JOBPURGED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.deleteJob(jobEntity.PublicID, jobEntity.Subtype)
  }),

  JobUserRoleAssignmentAddedEvent(JobUserRoleAssignment.JOBUSERROLEASSIGNMENTADDED_EVENT, \message, payload -> {
    var userRoleAssignment = message.MessageRoot as JobUserRoleAssignment
    FederatedDataPlugin.createUserRoleAssignment(payload, UserRoleAssignmentType.from(userRoleAssignment))
  }),
  JobUserRoleAssignmentChangedEvent(JobUserRoleAssignment.JOBUSERROLEASSIGNMENTCHANGED_EVENT, \message, payload -> {
    var userRoleAssignment = message.MessageRoot as JobUserRoleAssignment
    FederatedDataPlugin.updateUserRoleAssignment(userRoleAssignment.PublicID, payload, UserRoleAssignmentType.from(userRoleAssignment))
  }),
  JobUserRoleAssignmentRemovedEvent(JobUserRoleAssignment.JOBUSERROLEASSIGNMENTREMOVED_EVENT, \message, payload -> {
    var userRoleAssignment = message.MessageRoot as JobUserRoleAssignment
    FederatedDataPlugin.deleteUserRoleAssignment(userRoleAssignment.PublicID, UserRoleAssignmentType.from(userRoleAssignment))
  }),

  PolicyPurgedEvent(Policy.POLICYPURGED_EVENT, \message, payload -> FederatedDataPlugin.purgePolicy(payload)),
  PolicyChangeAddedEvent(PolicyChange.POLICYCHANGEADDED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.createJob(payload, jobEntity.Subtype)
  }),
  PolicyChangeChangedEvent(PolicyChange.POLICYCHANGECHANGED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.updateJob(jobEntity.PublicID, payload, jobEntity.Subtype)
  }),
  PolicyChangeRemovedEvent(PolicyChange.POLICYCHANGEREMOVED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.deleteJob(jobEntity.PublicID, jobEntity.Subtype)
  }),

  PolicyUserRoleAssignmentAddedEvent(PolicyUserRoleAssignment.POLICYUSERROLEASSIGNMENTADDED_EVENT, \message, payload -> {
    var userRoleAssignment = message.MessageRoot as PolicyUserRoleAssignment
    FederatedDataPlugin.createUserRoleAssignment(payload, UserRoleAssignmentType.from(userRoleAssignment))
  }),
  PolicyUserRoleAssignmentChangedEvent(PolicyUserRoleAssignment.POLICYUSERROLEASSIGNMENTCHANGED_EVENT, \message, payload -> {
    var userRoleAssignment = message.MessageRoot as PolicyUserRoleAssignment
    FederatedDataPlugin.updateUserRoleAssignment(userRoleAssignment.PublicID, payload, UserRoleAssignmentType.from(userRoleAssignment))
  }),
  PolicyUserRoleAssignmentRemovedEvent(PolicyUserRoleAssignment.POLICYUSERROLEASSIGNMENTREMOVED_EVENT, \message, payload -> {
    var userRoleAssignment = message.MessageRoot as PolicyUserRoleAssignment
    FederatedDataPlugin.deleteUserRoleAssignment(userRoleAssignment.PublicID, UserRoleAssignmentType.from(userRoleAssignment))
  }),

  RenewalAddedEvent(Renewal.RENEWALADDED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.createJob(payload, jobEntity.Subtype)
  }),
  RenewalChangedEvent(Renewal.RENEWALCHANGED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.updateJob(jobEntity.PublicID, payload, jobEntity.Subtype)
  }),
  RenewalRemovedEvent(Renewal.RENEWALREMOVED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.deleteJob(jobEntity.PublicID, jobEntity.Subtype)
  }),

  RewriteNewAccountAddedEvent(RewriteNewAccount.REWRITENEWACCOUNTADDED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.createJob(payload, jobEntity.Subtype)
  }),
  RewriteNewAccountChangedEvent(RewriteNewAccount.REWRITENEWACCOUNTCHANGED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.updateJob(jobEntity.PublicID, payload, jobEntity.Subtype)
  }),
  RewriteNewAccountRemovedEvent(RewriteNewAccount.REWRITENEWACCOUNTREMOVED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.deleteJob(jobEntity.PublicID, jobEntity.Subtype)
  }),

  ReinstatementAddedEvent(Reinstatement.REINSTATEMENTADDED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.createJob(payload, jobEntity.Subtype)
  }),
  ReinstatementChangedEvent(Reinstatement.REINSTATEMENTCHANGED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.updateJob(jobEntity.PublicID, payload, jobEntity.Subtype)
  }),
  ReinstatementRemovedEvent(Reinstatement.REINSTATEMENTREMOVED_EVENT, \message, payload -> {
    var jobEntity = message.MessageRoot as Job
    FederatedDataPlugin.deleteJob(jobEntity.PublicID, jobEntity.Subtype)
  }),

  PersonalDataPurgedEvent(PERSONAL_DATA_PURGE_EVENT, \message, payload -> {
    var senderRefID = message.SenderRefID
    if (senderRefID == FederatedDataPurgeSource.ACCOUNT.Name) {
      FederatedDataPlugin.deleteAccount(payload)
    } else if (senderRefID == FederatedDataPurgeSource.POLICY.Name) {
      FederatedDataPlugin.purgePolicy(payload)
    } else if (senderRefID == FederatedDataPurgeSource.CONTACT.Name) {
      FederatedDataPlugin.deleteContact(payload)
    }
  }),

  PolicyPeriodChangeEvent(PolicyPeriod.POLICYPERIODCHANGED_EVENT, \message, payload -> {
    var jobEntity = (message.MessageRoot as PolicyPeriod).Job
    FederatedDataPlugin.updateJob(jobEntity.PublicID, payload, jobEntity.Subtype)
  }),

  static var FEDERATED_DATA_PLUGIN : IFederatedDataPlugin

  final var _eventName : String
  final var _eventHandler : block(message : Message, payload : String)

  private construct(eventName : String, eventHandler : block(message : Message, payload : String)) {
    _eventName = eventName
    _eventHandler = eventHandler
  }

  public function handleEvent(message : Message, payload : String) {
    _eventHandler(message, payload)
  }

  function eventName() : String {
    return _eventName
  }

  override function toString() : String {
    return eventName()
  }

  private static property get FederatedDataPlugin() : IFederatedDataPlugin {
    if (FEDERATED_DATA_PLUGIN == null) {
      FEDERATED_DATA_PLUGIN = Plugins.get(IFederatedDataPlugin)
    }
    return FEDERATED_DATA_PLUGIN
  }
}

