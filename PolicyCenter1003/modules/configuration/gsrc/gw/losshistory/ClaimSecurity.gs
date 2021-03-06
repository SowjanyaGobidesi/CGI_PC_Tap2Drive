package gw.losshistory

@Export
class ClaimSecurity
{
  static var restrictedClaim = {"employeeclaim", "fraudriskclaim", "sensitiveclaim" ,"underlitclaim"}
  static var unrestrictedClaim = {"unsecuredclaim"}
  
  private construct(){}
  
  static function isRestricted(claimSecurityType : String) : boolean {
    return restrictedClaim.contains(claimSecurityType)
  }
}
