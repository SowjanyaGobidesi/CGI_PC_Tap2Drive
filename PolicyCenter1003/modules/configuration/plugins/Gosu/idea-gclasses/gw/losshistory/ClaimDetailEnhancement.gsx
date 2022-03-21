package gw.losshistory

uses gw.api.system.PCConfigParameters

enhancement ClaimDetailEnhancement : entity.ClaimDetail
{
  property get ClaimLinkAvailable(): boolean {
    return PCConfigParameters.ClaimSystemURL.Value.HasContent
        and IsNotArchivedClaim
        and perm.System.viewclaimsystem
        and ((not this.Claim.RestrictedClaim) or perm.System.viewrestrictedclaim)
  }

  private property get IsNotArchivedClaim(): boolean {
    return (this.ClaimPublicID != null)
  }
}
