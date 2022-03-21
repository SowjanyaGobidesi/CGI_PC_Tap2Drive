package gw.losshistory

uses gw.api.system.PCConfigParameters

enhancement ClaimEnhancement: Claim {
  property get RestrictedClaim(): boolean {
    return ClaimSecurity.isRestricted(this.ClaimSecurityType)
  }

  property get ClaimLinkAvailable(): boolean {
    return PCConfigParameters.ClaimSystemURL.Value.HasContent
        and not ArchivedClaim
        and perm.System.viewclaimsystem
        and ((not RestrictedClaim) or perm.System.viewrestrictedclaim)
  }

  property get ArchivedClaim(): boolean {
    // archive claim will not have claimPublicID associated to it, instead it will have claimInfoPublicID
    return (this.ClaimPublicID == null)
  }
}
