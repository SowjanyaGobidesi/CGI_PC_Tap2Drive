package gw.billing

uses gw.pl.currency.MonetaryAmount

uses java.util.Date

@Export
class BillingPaymentsPreviewTreeNode {

  var _statementDate : Date as StatementDate
  var _dueDate : Date as DueDate
  var _type : String as Type
  var _chargeCategory : String as ChargeCategory
  var _amount : MonetaryAmount as Amount
  var _invoiceAmount : MonetaryAmount as InvoiceAmount
  var _changeAmount : MonetaryAmount as ChangeAmount

  construct(statementDate : Date, dueDate : Date, type : String, chargeCategory : String) {
    StatementDate = statementDate
    DueDate = dueDate
    Type = type
    ChargeCategory = chargeCategory
  }

  construct(dueDate : Date, type : String, chargeCategory : String) {
    this(null as Date, dueDate, type, chargeCategory)
  }
}