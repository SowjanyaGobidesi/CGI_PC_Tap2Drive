package gw.rating.rtm.util

uses gw.api.locale.DisplayKey
uses gw.entity.ITypeList
uses gw.entity.TypeKey
uses gw.lang.reflect.TypeSystem
uses gw.util.concurrent.LockingLazyVar
uses gw.pc.rating.flow.util.TypekeyReflectUtil
uses java.util.List

@Export
class RatingUIUtil {

  final static var _typekeyPrefix : String as TypekeyPrefix = "typekey."

  static var _typekeyNames = new LockingLazyVar<String[]>() {
    override function init() : String[] {
      return TypekeyReflectUtil.getAllTypelistNames().toTypedArray()
    }
  }

  /**
   * List of all the typekeys in the application
   */
  static function getAllTypekeyNames() : String[] {
    return _typekeyNames.get()
  }

  /**
   * List of all TypeKeys for a given type TypeList
   */
  static function getTypekeysForTypelist(selectedTypelist : String) : List<TypeKey> {
    return (selectedTypelist != null)
      ? (TypeSystem.getByRelativeName(selectedTypelist) as ITypeList).getTypeKeys(false)
      : {}
  }

  static function getOwnershipLabel(rt : RateTable) : String {
    if (rt.RefTable != null) {
      return DisplayKey.get("Web.Rating.RateTable.Reference")
    } else if (rt.ReferencingRateTables.Empty) {
      return DisplayKey.get("Web.Rating.RateTable.OwnedAndNotShared")
    } else {
      return DisplayKey.get("Web.Rating.RateTable.OwnedAndShared")
    }
  }

  // Used to facilitate maintaining tabs when moving from viewing to editing
  // in the RateBook UI
  static public enum RateBookCardTabType {
    TableCard,
    RoutineCard
  }

}