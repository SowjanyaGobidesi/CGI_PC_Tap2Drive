package gw.command.critical

uses gw.command.BaseCommand
uses gw.community.ExternalUserAccessTestUtil
uses pcf.UserDetailPage

/**
 * This command is supported by DEV and is required to work. Any change to this, must
 * assert AdminCommandTest passes.
 */
@Export
class Admin extends BaseCommand {

  /**
   * Returns an external user with only access to producer codes in their organization and below.
   * Note: To run this command, set the config parameter, ExternalUserAccess to FullyRestricted (default)
   */
  function createExternalUserFullyRestricted() : User {
    var user = ExternalUserAccessTestUtil.createExternalUserWithFullyRestrictedAccess()
    UserDetailPage.go(user)
    return user
  }

  /**
   * Returns an external user with access to producer codes belonging to multiple external organizations
   * but not the internal organization.
   * Note: To run this command, set the config parameter, ExternalUserAccess to ProtectInternal
   */
  function createExternalUserProtectInternal() : User {
    var user = ExternalUserAccessTestUtil.createExternalUserWithProtectInternalAccess()
    UserDetailPage.go(user)
    return user
  }

  /**
   * Returns an external user with access to producer codes belonging to both internal and external organization.
   * Note: To run this command, set the config parameter, ExternalUserAccess to AllowInternal
   */
  function createExternalUserAllowInternal() : User {
    var user = ExternalUserAccessTestUtil.createExternalUserWithAllowInternalAccess()
    UserDetailPage.go(user)
    return user
  }


}