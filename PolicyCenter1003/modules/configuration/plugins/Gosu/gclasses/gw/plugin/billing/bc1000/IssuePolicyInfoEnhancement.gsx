package gw.plugin.billing.bc1000

uses gw.api.util.DateUtil
uses wsi.remote.gw.webservice.bc.bc1000.entity.anonymous.elements.IssuePolicyInfo_DefaultPolicyInvoiceStreamOverrides
uses wsi.remote.gw.webservice.bc.bc1000.entity.anonymous.elements.IssuePolicyInfo_NewInvoiceStream
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.IssuePolicyInfo

@Export
enhancement IssuePolicyInfoEnhancement : IssuePolicyInfo {
  function sync(period : PolicyPeriod) : IssuePolicyInfo {
    this.syncPolicyChange(period)
    commonSync(period, period.SelectedPaymentPlan.BillingId)
    return this
  }

  function syncForPreview(period : PolicyPeriod, paymentPlanBillingId : String) : IssuePolicyInfo {
    this.syncPolicyChangeForPreview(period)
    commonSync(period, paymentPlanBillingId)
    // If BillingMethod == null in the PolicyPeriod, default to Direct Bill.
    // This prevents an exception being thrown from BC.
    this.BillingMethodCode = period.BillingMethod.Code ?: BillingMethod.TC_DIRECTBILL.Code
    this.PolicyNumber = period.PolicyNumber ?: period.ID.toString()
    this.AccountNumber = period.Policy.Account.AccountNumber
    this.AltBillingAccountNumber = period.AltBillingAccountNumber
    return this
  }

  private function commonSync(period : PolicyPeriod, paymentPlanBillingId : String) {
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
      if (period.InvoiceStreamCode == null and period.BillingMethod == BillingMethod.TC_DIRECTBILL) {
        syncNewInvoiceStream(period)
      } else {
        this.InvoiceStreamId = period.InvoiceStreamCode
      }
    } else if (period.InvoicingMethod == InvoicingMethod.TC_OVERRIDDENINVOICESTREAM) {
      syncDefaultPolicyInvoiceStreamOverrides(period)
    }
    this.Currency = period.PreferredSettlementCurrency.Code
    this.HasScheduledFinalAudit = period.hasScheduledFinalAudit() or period.hasOpenFinalAudit()
  }

  private function syncNewInvoiceStream(period : PolicyPeriod) {
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
  }

  private function syncDefaultPolicyInvoiceStreamOverrides(period : PolicyPeriod) {
    this.DefaultPolicyInvoiceStreamOverrides = new IssuePolicyInfo_DefaultPolicyInvoiceStreamOverrides()
    this.DefaultPolicyInvoiceStreamOverrides.AnchorDate = period.InvoiceStreamOverrides.AnchorDate.XmlDateTime
    this.DefaultPolicyInvoiceStreamOverrides.DayOfWeek = period.InvoiceStreamOverrides.DayOfWeek.Code
    this.DefaultPolicyInvoiceStreamOverrides.FirstDayOfMonth = period.InvoiceStreamOverrides.FirstDayOfMonth
    this.DefaultPolicyInvoiceStreamOverrides.SecondDayOfMonth = period.InvoiceStreamOverrides.SecondDayOfMonth
    this.DefaultPolicyInvoiceStreamOverrides.Description = period.InvoiceStreamOverrides.Description
    this.DefaultPolicyInvoiceStreamOverrides.DueDateBilling = period.InvoiceStreamOverrides.DueDateBilling
    this.DefaultPolicyInvoiceStreamOverrides.LeadTimeDayCount = period.InvoiceStreamOverrides.LeadTimeDayCount
    this.DefaultPolicyInvoiceStreamOverrides.PaymentInstrumentID = period.InvoiceStreamOverrides.PaymentInstrumentID
  }
}
