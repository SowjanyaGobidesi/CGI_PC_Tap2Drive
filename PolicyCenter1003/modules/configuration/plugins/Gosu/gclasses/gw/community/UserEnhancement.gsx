package gw.community

uses gw.api.filters.DynamicFilter

enhancement UserEnhancement : entity.User {

  property get UWAuthorityProfiles() : UWAuthorityProfile[] {
    return this.UserAuthorityProfiles*.UWAuthorityProfile
  }

  /**
   * Returns an array of available roles for this user.
   * <p/>
   * This returns a result of a query of the available roles.  It is used by the
   * UI to provide the value range for a role range input (i.e., drop down).  (See
   * UserSearchDV.)
   */
  function listAvailableRoles() : Role[] {
    var result = Role.finder.allOrderedByName()
    result.addFilter(
      new DynamicFilter<Role>(\ roleQry -> {
        roleQry.compareIn(Role#RoleType, new RoleType[] {TC_USER, TC_USERPRODUCERCODE})
        if ( this.ExternalUser ) {
          roleQry.compare(Role#CarrierInternalRole, NotEquals, true)
        }
        return roleQry
      }
    ))

    return result.toTypedArray()
  }

  /**
   * External users are assumed to work for a producer and so this will return their organization. Internal users
   * are assumed to work for the carrier and this method will return null in that case.
   */
  property get Producer() : Organization {
    return (this.ExternalUser ? this.Organization : null)
  }

  /**
   * Returns true if this user is an internal user or else belongs to the specified organization.
   * This utility method is used often during security checks.
   */
  function isInternalUserOrBelongsToOrganization(organization : Organization) : boolean {
    return !this.ExternalUser or this.Organization == organization
  }

}
