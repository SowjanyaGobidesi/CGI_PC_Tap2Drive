package gw.community

uses gw.api.builder.AccountBuilder
uses gw.api.builder.AccountProducerCodeBuilder
uses gw.api.builder.GroupBuilder
uses gw.api.builder.OrganizationBuilder
uses gw.api.builder.ProducerCodeBuilder
uses gw.api.builder.SubmissionBuilder
uses gw.api.builder.UserBuilder
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.system.ExternalUserAccessParameterKey
uses gw.api.web.admin.ProducerCodeRoleUtil
uses gw.pl.persistence.core.Bundle
uses gw.transaction.Transaction
/**
 * Utilities class to create test user data with different producer code access config modes {@link gw.api.system.ExternalUserAccessMode}
 */
@Export
class ExternalUserAccessTestUtil {

  static function getUniqueKey() : String {
    return UniqueKeyGenerator.get().nextKey()
  }

  static function getProducerRole() : Role {
    return ProducerCodeRoleUtil.getProducerRole()
  }

  static function getUWRole() : Role {
    return ProducerCodeRoleUtil.getUWRole()
  }

  /**
   * Creates an external user for Agency organization, with producer codes from same organization.
   * @return User with ExternalUserAccess#FullyRestricted access
   */
  static function createExternalUserWithFullyRestrictedAccess() : User {
      var user : User
      Transaction.runWithNewBundle(\bundle -> {
        var organization = createOrganization(bundle)

        var prodCode1 = createProducerCode(bundle, organization)
        var prodCode2 = createProducerCode(bundle, organization)

        var group = createGroup(bundle, organization)

        user = new UserBuilder().asExternalUser().withCredential("user_" + getUniqueKey())
            .asProducer(organization).usesProducerCodeSecurity(true)
            .addingGroup(group)
            .create(bundle)

        addGroupAndUserToProducerCode(prodCode1, group, user)
        addGroupAndUserToProducerCode(prodCode2, group, user)
      })
    return user
  }

  /**
   * Creates an external user with access to producer codes belonging to multiple external organizations
   * but not the internal organization.
   * @return User with ExternalUserAccess#ProtectInternal access
   */
  static function createExternalUserWithProtectInternalAccess() : User {
    var user : User
    Transaction.runWithNewBundle(\bundle -> {
      var extOrg1 = createOrganization(bundle)
      var extOrg2 = createOrganization(bundle)

      var groupOrg1 = createGroup(bundle, extOrg1)
      var groupOrg2 = createGroup(bundle, extOrg2)

      var prodCode1ForOrg1 = createProducerCode(bundle, extOrg1)
      var prodCode2ForOrg1 = createProducerCode(bundle, extOrg1)

      var prodCode1ForOrg2 = createProducerCode(bundle, extOrg2)
      var prodCode2ForOrg2 = createProducerCode(bundle, extOrg2)

      user = new UserBuilder().asExternalUser().withCredential("user_" + getUniqueKey())
          .asProducer(extOrg1).usesProducerCodeSecurity(true).addingGroup(groupOrg1)
          .asProducer(extOrg2).usesProducerCodeSecurity(true).addingGroup(groupOrg2)
          .create(bundle)

      addGroupAndUserToProducerCode(prodCode1ForOrg1, groupOrg1, user)
      addGroupAndUserToProducerCode(prodCode2ForOrg1, groupOrg1, user)

      addGroupAndUserToProducerCode(prodCode1ForOrg2, groupOrg2, user)
      addGroupAndUserToProducerCode(prodCode2ForOrg2, groupOrg2, user)
    })
    return user
  }

  /**
   * Creates an external user for Agency organization, with producer codes from same organization.
   * @return User with ExternalUserAccess#AllowInternal access
   */
  static function createExternalUserWithAllowInternalAccess() : User {
    var user : User
    Transaction.runWithNewBundle(\bundle -> {
      var extOrg1 = createOrganization(bundle)
      var extOrg2 = createOrganization(bundle)
      var intOrg = Organization.finder.findCarrierOrganization()

      var groupOrg1 = createGroup(bundle, extOrg1)
      var groupOrg2 = createGroup(bundle, extOrg2)
      var groupIntOrg = createGroup(bundle, intOrg)

      var prodCode1ForOrg1 = createProducerCode(bundle, extOrg1)
      var prodCode2ForOrg1 = createProducerCode(bundle, extOrg1)
      var prodCode1ForOrg2 = createProducerCode(bundle, extOrg2)
      var prodCode2ForOrg2 = createProducerCode(bundle, extOrg2)
      var prodCodeForIntOrg = createProducerCode(bundle, intOrg)

      user = new UserBuilder().asExternalUser().withCredential("user_" + getUniqueKey())
          .usesProducerCodeSecurity(true)
          .asProducer(extOrg1).addingGroup(groupOrg1)
          .asProducer(extOrg2).addingGroup(groupOrg2)
          .create(bundle)

      addGroupAndUserToProducerCode(prodCode1ForOrg1, groupOrg1, user)
      addGroupAndUserToProducerCode(prodCode2ForOrg1, groupOrg1, user)

      addGroupAndUserToProducerCode(prodCode1ForOrg2, groupOrg2, user)
      addGroupAndUserToProducerCode(prodCode2ForOrg2, groupOrg2, user)

      addGroupAndUserToProducerCode(prodCodeForIntOrg, groupIntOrg, user)
    })
    return user
  }

  // --------------------- helpers

  static function createUserWithOrgAndProducerCodes(bundle : Bundle, org : Organization, producerCode : ProducerCode, UWRoles : boolean = false) : User {
    var group = createGroup(bundle, org)
    var userBuilder = new UserBuilder().withCredential("user_" + ExternalUserAccessTestUtil.getUniqueKey())
        .addingGroup(group)
        .asProducer(org)
        .usesProducerCodeSecurity(true)

    if(UWRoles) {
      userBuilder.addingRoles({getUWRole()})
    }

    var user = (org.isCarrier() ? userBuilder.asInternal() : userBuilder.asExternalUser())
        .create(bundle)
    addGroupAndUserToProducerCode(producerCode, group, user)
    return user
  }

  static function createOrganization(bundle : Bundle) : Organization {
    var organization =  new OrganizationBuilder().withName("Org_" + getUniqueKey())
        .withProducerStatus(ProducerStatus.TC_ACTIVE)
        .asAgency()
    return organization.create(bundle)
  }

  static function createProducerCode(bundle : Bundle, organization : Organization, producerRole : Role = null) : ProducerCode {
    return new ProducerCodeBuilder().withCode("Producer_" + getUniqueKey()).withRole(producerRole?:getProducerRole())
        .withStatus(ProducerStatus.TC_ACTIVE).withOrganization(organization).create(bundle)
  }

  static function createProducerCodeWithProducerAndUWRole(bundle : Bundle, organization : Organization) : ProducerCode {
    var prodCode =  new ProducerCodeBuilder().withCode("Producer_" + getUniqueKey())
        .withRole(getProducerRole())
        .withRole(getUWRole())
        .withStatus(ProducerStatus.TC_ACTIVE).withOrganization(organization)
        .create(bundle)

    return prodCode
  }

  static function addGroupAndUserToProducerCode(prodCode : ProducerCode, group : Group, user : User) {
    prodCode.addGroup(group)
    prodCode.addUser(user)
  }

  static function createGroup(bundle : Bundle, organization : Organization) : Group {
    return new GroupBuilder().withType(GroupType.TC_PRODUCER)
        .withOrganization(organization)
        .withParentGroup(organization.getRootGroup())
        .create(bundle)
  }

  static function createAccountAsUser(bundle : Bundle, user : User, producerCode : ProducerCode) : Account {
    var account = new AccountBuilder().usingProducerCodeOrg(user.Organization)
        .withUserAssignment(user)
        .withProducerCode(new AccountProducerCodeBuilder().withCode(producerCode))
    return account.create(bundle)
  }

  static function createUserAndPrepareOriginalSubmission(isExternalUser : boolean, UWRole : boolean = false) : PolicyPeriodSetupData {
    var organization : Organization
    var producerCode : ProducerCode
    var user : User
    var account : Account
    var otherOrg : Organization

    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      organization = isExternalUser ? ExternalUserAccessTestUtil.createOrganization(bundle)
          : Organization.finder.findCarrierOrganization()
      if (UWRole) {
        producerCode = ExternalUserAccessTestUtil.createProducerCodeWithProducerAndUWRole(bundle, organization)
      } else {
        producerCode = ExternalUserAccessTestUtil.createProducerCode(bundle, organization)
      }
      user = ExternalUserAccessTestUtil.createUserWithOrgAndProducerCodes(bundle, organization, producerCode, UWRole)
      account = ExternalUserAccessTestUtil.createAccountAsUser(bundle, user, producerCode)
    })

    if(!(ExternalUserAccessParameterKey.ExternalUserAccessIsFullyRestricted() and user.isExternalUser())) {
      otherOrg = addOtherProducerCodeToUser(user)
    }

    var submission = new SubmissionBuilder()
        .withAccount(account)
        .withProduct("PersonalAuto")
        .withProducer(producerCode)
        .createAndCommit()

    return new PolicyPeriodSetupData(){:User = user, :Period = submission, :OtherOrg = otherOrg}
  }

  static protected function addOtherProducerCodeToUser(user : User): Organization {
    var organization : Organization
    var producerCode : ProducerCode

    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      organization = ExternalUserAccessTestUtil.createOrganization(bundle)
      producerCode = ExternalUserAccessTestUtil.createProducerCode(bundle, organization)
    })

    producerCode.addUser(user)
    producerCode.Bundle.commit()

    return organization
  }

  static function createInternalUser(org: Organization, userType: UserType, role: Role): User {
    return new UserBuilder().asInternal()
        .withGroupAndOrg(org.getRootGroup())
        .withUserType(userType)
        .withOrganization(org)
        .usesProducerCodeSecurity(true)
        .addingRoles({role})
        .createAndCommit()
  }

  static function createExternalUser(org : Organization, userType : UserType, roles : Role[]) : User{
    return new UserBuilder().asExternalUser()
        .withGroupAndOrg(org.getRootGroup())
        .withUserType(userType)
        .withOrganization(org)
        .usesProducerCodeSecurity(true)
        .addingRoles(roles)
        .createAndCommit()
  }

  static function createExternalOrganizationWithGroup(): Organization {
    var organization = new OrganizationBuilder().withName("ExtOrg_" + getUniqueKey())
        .withProducerStatus(ProducerStatus.TC_ACTIVE)
        .asAgency().createAndCommit()
    var groupForOtherOrg = new GroupBuilder().withType(GroupType.TC_PRODUCER)
        .withOrganization(organization).withParentGroup(organization.getRootGroup()).createAndCommit()
    var producerCodeForGrp = new ProducerCodeBuilder().withCode("Producer_" + getUniqueKey()).withRole(getProducerRole())
        .withStatus(ProducerStatus.TC_ACTIVE).withOrganization(organization).createAndCommit()
    producerCodeForGrp.addGroup(groupForOtherOrg)
    return organization
  }

  static function createGroupForOrganization(org: Organization): Group {
    var groupForOtherOrg: Group
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      groupForOtherOrg = new GroupBuilder().withType(GroupType.TC_PRODUCER)
          .withOrganization(org).withParentGroup(org.getRootGroup()).create(bundle)
      var producerCodeForGrp = new ProducerCodeBuilder().withCode("Producer_" + getUniqueKey()).withRole(getProducerRole())
          .withStatus(ProducerStatus.TC_ACTIVE).withOrganization(org).create(bundle)
      producerCodeForGrp.addGroup(groupForOtherOrg)
    })
    return groupForOtherOrg
  }

  static class PolicyPeriodSetupData {
    var user : User as User
    var period : PolicyPeriod as Period
    var otherOrg : Organization as OtherOrg
  }
}
