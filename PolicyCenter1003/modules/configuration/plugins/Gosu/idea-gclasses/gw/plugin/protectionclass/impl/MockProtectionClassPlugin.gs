package gw.plugin.protectionclass.impl

uses gw.api.system.PCLoggerCategory
uses gw.plugin.protectionclass.IProtectionClassPlugin

/**
 * Mock implementation for demo and development purposes only.
 */
@Export
class MockProtectionClassPlugin implements IProtectionClassPlugin {

  /**
   * For homeowners line sets fire protection class code based on the data of the associated dwelling. It takes into account
   * distance from fire hydrant and distance from fire station. Does nothing for other lines of business.
   *
   * @param loc Policy location to set fire protection class on
   */
  override property set ProtectionClassCode(loc : entity.PolicyLocation) {
    if (loc.AssociatedPolicyPeriod.HOPLineExists) {
      var dwelling = loc.AssociatedPolicyPeriod.HOPLine.HOPDwellings.singleWhere(\elt -> elt.Location == loc)

      if (dwelling.DistanceToFireHydrant == null or dwelling.DistanceToFireStation == null) {
        dwelling.Location.FireProtectClass = null
      }
      else {
        if (dwelling.DistanceToFireHydrant < 1000 and dwelling.DistanceToFireStation < 5) {
          dwelling.Location.FireProtectClass = FireProtectClass.TC_1
        } else {
          if ((dwelling.DistanceToFireHydrant >= 1000 and dwelling.DistanceToFireHydrant < 2000) and
              (dwelling.DistanceToFireStation >= 5 and dwelling.DistanceToFireStation < 10)) {
            dwelling.Location.FireProtectClass = FireProtectClass.TC_2
          } else {
            dwelling.Location.FireProtectClass = FireProtectClass.TC_3
          }
        }
      }
    } else {
      PCLoggerCategory.PLUGIN.error("MockProtectionClassPlugin Unable to set protection class for policy location "+loc)
    }
  }

}