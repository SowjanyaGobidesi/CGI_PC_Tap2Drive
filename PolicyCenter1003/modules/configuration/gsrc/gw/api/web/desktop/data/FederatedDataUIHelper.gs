package gw.api.web.desktop.data

@Export
class FederatedDataUIHelper {

  final static var FEDERATED_MODE = "federated"
  final static var DEFAULT_MODE = "default"

  /**
   * Determines the mode to use for the federated data pages.
   *
   * @return "federated" if federated data is enabled or "default" otherwise
   */
  static function mode() : String {
    return gw.api.system.PCConfigParameters.EnableFederatedData.Value ? FEDERATED_MODE : DEFAULT_MODE
  }

  static property get IsFederated() : boolean {
    return gw.api.system.PCConfigParameters.EnableFederatedData.Value
  }

  static property get IsDefault() : boolean {
    return !IsFederated
  }
}