package gw.plugin.multicluster.multiclustersession

uses com.google.common.base.Preconditions
uses gw.plugin.web.multicluster.IMultiClusterSession

@Export
class UserMultiClusterSession implements IMultiClusterSession {
  final var _userPublicId : String as readonly UserPublicId

  construct(userPublicId : String) {
    Preconditions.checkNotNull(userPublicId, "Parameter userPublicId for UserMultiClusterSession cannot be null")
    _userPublicId = userPublicId
  }

  override function hashCode() : int {
    return _userPublicId.hashCode()
  }

  override function equals(that : Object) : boolean {
    if (that typeis UserMultiClusterSession){
      return this._userPublicId == that._userPublicId
    }
    return false
  }
}