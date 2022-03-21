package gw.plugin.billing

uses gw.api.util.DisplayableException

@Export
class BillingPolicyNotFoundException extends DisplayableException {
  construct(message : String) {
    super(message)
  }
}