package gw.api.web

uses gw.api.system.PCConfigParameters

@Export
class ExternalSystemPages {
  static property get BillingPageAvailable(): boolean {
    return PCConfigParameters.BillingSystemURL.Value.HasContent
  }

  static property get BillingPageURL(): String {
    return PCConfigParameters.BillingSystemURL.Value
  }

  static property get ClaimPageAvailable(): boolean {
    return PCConfigParameters.ClaimSystemURL.Value.HasContent
  }

  static property get ClaimPageURL(): String {
    return PCConfigParameters.ClaimSystemURL.Value
  }
}