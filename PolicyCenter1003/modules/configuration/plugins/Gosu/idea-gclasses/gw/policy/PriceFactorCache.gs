package gw.policy

uses gw.api.web.SessionVar

@Export
final class PriceFactorCache {
  static var _priceFactorCache = new SessionVar<Map<String, Double>>()

  static property get Instance() : SessionVar<Map<String, Double>> {
    return _priceFactorCache
  }
}