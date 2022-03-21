package gw.plugin.billing

@Export
structure PaymentPlanInfoSpec {
  property get PublicID() : String

  property get BillDateOrDueDateBilling() : String

  property get AllowedPaymentMethods() :  List<String>
}