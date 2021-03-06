package gw.plugin.billing.bc900

uses wsi.remote.gw.webservice.bc.bc900.billingsummaryapi.types.complex.PCInvoiceInfo
uses gw.plugin.billing.BillingInvoiceInfo
uses java.util.Date
uses gw.pl.currency.MonetaryAmount

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class BCInvoiceInfoWrapper implements BillingInvoiceInfo {
  var _soapObject : PCInvoiceInfo

  construct(soapObject : PCInvoiceInfo) {
    _soapObject = soapObject
  }

  override property get Amount() : MonetaryAmount {
    return _soapObject.Amount
  }

  override property get Billed() : MonetaryAmount {
    return _soapObject.Billed
  }

  override property get InvoiceDate() : Date {
    return _soapObject.InvoiceDate
  }

  override property get InvoiceDueDate() : Date {
    return _soapObject.InvoiceDueDate
  }

  override property get InvoiceNumber() : String {
    return _soapObject.InvoiceNumber
  }

  override property get Paid() : MonetaryAmount {
    return _soapObject.Paid
  }

  override property get PaidStatus() : String {
    return _soapObject.PaidStatus
  }

  override property get PastDue() : MonetaryAmount {
    return _soapObject.PastDue
  }

  override property get Status() : String {
    return _soapObject.Status
  }

  override property get Unpaid() : MonetaryAmount {
    return _soapObject.Unpaid
  }

  override property get InvoiceStream() : String {
    return _soapObject.InvoiceStream
  }

}
