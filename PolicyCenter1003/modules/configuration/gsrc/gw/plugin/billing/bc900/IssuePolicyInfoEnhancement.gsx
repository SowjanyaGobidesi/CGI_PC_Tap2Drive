package gw.plugin.billing.bc900

uses gw.api.util.DateUtil
uses gw.plugin.job.IPolicyRenewalPlugin
uses gw.plugin.Plugins
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.IssuePolicyInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.anonymous.elements.IssuePolicyInfo_NewInvoiceStream

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement IssuePolicyInfoEnhancement : IssuePolicyInfo
{
  function sync(period : PolicyPeriod) : IssuePolicyInfo{
    this.syncPolicyChange(period)
    commonSync(period, period.SelectedPaymentPlan.BillingId)
    return this
  }

  function syncForPreview(period : PolicyPeriod, paymentPlanBillingId : String) : IssuePolicyInfo{
    this.syncPolicyChangeForPreview(period)
    commonSync(period, paymentPlanBillingId)
    // If BillingMethod == null in the PolicyPeriod, default to Direct Bill.
    // This prevents an exception being thrown from BC.
    this.BillingMethodCode = period.BillingMethod.Code ?: BillingMethod.TC_DIRECTBILL.Code
    this.PolicyNumber = period.PolicyNumber ?: period.ID.toString()
    return this
  }

  private function commonSync(period : PolicyPeriod, paymentPlanBillingId : String){
    this.AccountNumber = period.Policy.Account.AccountNumber
    this.AssignedRisk = period.AssignedRisk
    this.PaymentPlanPublicId = paymentPlanBillingId
    this.ProducerCodeOfRecordId = period.ProducerCodeOfRecord.PublicID
    this.ProductCode = period.Policy.ProductCode
    this.UWCompanyCode = period.UWCompany.Code.Code
    if (period.ModelDate != null)
      this.ModelDate = period.ModelDate.XmlDateTime
    else
      this.ModelDate = DateUtil.currentDate().XmlDateTime
    this.JurisdictionCode = period.BaseState.Code
    this.BillingMethodCode = period.BillingMethod.Code
    this.PeriodStart = period.PeriodStart.XmlDateTime
    this.PeriodEnd = period.PeriodEnd.XmlDateTime
    this.TermNumber = period.TermNumber
    this.AltBillingAccountNumber = period.AltBillingAccountNumber
    if (period.CustomBilling) {
      if(period.InvoiceStreamCode == null and period.BillingMethod == BillingMethod.TC_DIRECTBILL) {
        this.NewInvoiceStream = new IssuePolicyInfo_NewInvoiceStream()
        this.NewInvoiceStream.AnchorDate = period.NewInvoiceStream.FirstAnchorDate.XmlDateTime
        this.NewInvoiceStream.DayOfWeek = period.NewInvoiceStream.DayOfWeek.Code
        this.NewInvoiceStream.Description = period.NewInvoiceStream.Description
        this.NewInvoiceStream.FirstDayOfMonth = period.NewInvoiceStream.FirstDayOfMonth
        this.NewInvoiceStream.SecondDayOfMonth = period.NewInvoiceStream.SecondDayOfMonth
        this.NewInvoiceStream.DueDateBilling = period.NewInvoiceStream.DueDateBilling
        this.NewInvoiceStream.Interval = period.NewInvoiceStream.Interval.Code
        this.NewInvoiceStream.PaymentInstrumentID = period.NewInvoiceStream.PaymentInstrumentID
        this.NewInvoiceStream.PaymentMethod = period.NewInvoiceStream.PaymentMethod != null ? period.NewInvoiceStream.PaymentMethod.Code : AccountPaymentMethod.TC_RESPONSIVE.Code
        this.NewInvoiceStream.UnappliedDescription = period.NewInvoiceStream.UnappliedFundDescription
        this.NewInvoiceStream.UnappliedFundID = period.NewInvoiceStream.UnappliedFundID
      } else {
        this.InvoiceStreamId = period.InvoiceStreamCode
      }
    }
    this.Currency = period.PreferredSettlementCurrency.Code
  }
}
