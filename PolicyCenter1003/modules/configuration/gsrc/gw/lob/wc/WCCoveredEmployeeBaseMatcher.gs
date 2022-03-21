package gw.lob.wc

uses gw.api.logicalmatch.AbstractEffDatedPropertiesMatcher
uses gw.entity.IEntityPropertyInfo
uses gw.entity.ILinkPropertyInfo

uses java.lang.Iterable

/**
 * WCCoveredEmployeeBase do not have enough sufficiently unique columns to define matches in
 * the out of the box config, thus this matcher will return false when asked for matches.
 */
@Export
class WCCoveredEmployeeBaseMatcher extends AbstractEffDatedPropertiesMatcher<WCCoveredEmployeeBase> {
  construct(delegateInstance: WCCoveredEmployeeBase) {
    super(delegateInstance)
  }

  override property get IdentityColumns(): Iterable<IEntityPropertyInfo> {
    return { WCCoveredEmployeeBase.Type.TypeInfo.getProperty("ID") as IEntityPropertyInfo }
  }

  override property get ParentColumns(): Iterable<ILinkPropertyInfo> {
    return {WCCoveredEmployeeBase.Type.TypeInfo.getProperty("Location") as ILinkPropertyInfo}
  }

  // OOTB, WCCoveredEmployeeBase entities are not matchable.  Customers should delete the overridden
  // isLogicalMatch() method and implement the IdentityColumns property if they would like to match
  // these entities.
  override function isLogicalMatch(other: WCCoveredEmployeeBase): boolean {
    return false
  }

  override function isLogicalMatchUntyped(bean: KeyableBean): boolean {
    if (bean typeis WCCoveredEmployeeBase) {
      return isLogicalMatch(bean)
    } else {
      return false
    }
  }
}
