package gw.api.web.dashboard.data.impl.customersummary;

uses entity.Contact
uses gw.api.util.DisplayableException
uses gw.api.web.dashboard.data.accountoverview.AccountOverviewDTO
uses gw.api.web.dashboard.data.accountoverview.AccountOverviewService
uses gw.pcf.contacts.ContactFileAccountHolderUIHelper
uses gw.web.contact.CommonMetrics
uses gw.web.contact.MetricsFactory

@Export
class AccountOverviewServiceImpl implements AccountOverviewService {

  override function getAccountOverviewForContact(contact: Contact): AccountOverviewDTO {
    try {
      var metrics = MetricsFactory.Factory.getContactMetrics(contact, ContactFileAccountHolderUIHelper.RolesAllowedToViewTheAccountHoldersPage)
      return toDto(metrics)
    } catch (err: Exception) {
      throw new DisplayableException(err.Message)
    }
  }

  override function getAccountOverviewForAccount(account: Account): AccountOverviewDTO {
    try {
      var metrics = MetricsFactory.Factory.getAccountMetrics(account)
      return toDto(metrics)
    } catch (err: Exception) {
      throw new DisplayableException(err.Message)
    }
  }

  private function toDto(metrics: CommonMetrics): AccountOverviewDTO {
    return new AccountOverviewDTO() {
      :InForcePremium = metrics.TotalInForcePremium,
      :LifetimePremium = metrics.TotalLifetimePremium,
      :TotalLosses = metrics.NetTotalIncurred,
      :FirstEffectivePolicyDate = metrics.FirstEffectivePolicyDate,
      :OpenClaims = metrics.OpenClaimsCount,
      :InForcePolicies = metrics.InForcePoliciesCount,
      :NonPaymentCancellations = metrics.CancellationsForNonPaymentCount,
      :DelinquenciesValue = metrics.RecentDelinquencies.orElse(AccountOverviewDTO.DELINQUENCIES_UNAVAILABLE),
      :ServiceTier = metrics.AccountServiceTier
    }
  }
}
