package gw.api.web.dashboard.ui.overview

uses entity.Contact
uses gw.api.locale.DisplayKey
uses gw.api.web.color.GWColor
uses gw.api.web.dashboard.data.accountoverview.AccountOverviewDTO
uses gw.api.web.dashboard.data.accountoverview.AccountOverviewService
uses gw.api.web.dashboard.data.impl.DashboardServices
uses gw.api.web.dashboard.ui.DataFetchResult

@Export
class AccountOverviewHelper {
  final var _fetchResult: DataFetchResult<AccountOverviewDTO>
  final var _badge: AccountOverviewBadge

  static function forAccount(account: Account): AccountOverviewHelper {
    return new AccountOverviewHelper(\service -> service.getAccountOverviewForAccount(account))
  }

  static function forContact(contact: Contact): AccountOverviewHelper {
    return new AccountOverviewHelper(\service -> service.getAccountOverviewForContact(contact))
  }

  static function forPolicyPeriod(policyPeriod: PolicyPeriod): AccountOverviewHelper {
    return new AccountOverviewHelper(\service -> service.getAccountOverviewForAccount(policyPeriod.Policy.Account))
  }

  private construct(summary(AccountOverviewService): AccountOverviewDTO) {
    var service = DashboardServices.Instance.AccountOverviewService
    _fetchResult = DataFetchResult.of(\-> summary(service), \err -> AccountOverviewDTO.EMPTY)
    _badge = new AccountOverviewBadge(AccountOverview)
  }

  function formattedCustomerSince(): String {
    if (AccountOverview != null) {
      var firstEffectivePolicyDate = AccountOverview.FirstEffectivePolicyDate
      if (firstEffectivePolicyDate > Date.Now) {
        return DisplayKey.get("Web.Dashboard.Tile.AccountHolderOverview.CustomerSinceValue",
            firstEffectivePolicyDate.YearOfDate)
      }
      return DisplayKey.get("Web.Dashboard.Tile.AccountHolderOverview.CustomerSinceValueWithTimePassed",
          firstEffectivePolicyDate.YearOfDate,
          ElapsedTimeFormatUtil.formatTimePassedBetween(firstEffectivePolicyDate, Date.Now))
    }
    return ""
  }

  property get AccountOverview(): AccountOverviewDTO {
    return _fetchResult.Data
  }

  property get HasNoErrors(): boolean {
    return _fetchResult.HasNoErrors
  }

  property get DisplayBadge(): boolean {
    return HasNoErrors and AccountOverview.Tiered
  }

  property get BadgeText(): String {
    return _badge.BadgeText
  }

  property get BadgeColor(): GWColor {
    return _badge.BadgeColor
  }

  property get NonPaymentCancellationsColor(): GWColor {
    if (AccountOverview.NonPaymentCancellations > 0) {
      return GWColor.THEME_ACTION_DANGER
    }
    return GWColor.THEME_ACTION_SAFE
  }

  function formattedDelinquencies(): String {
    return AccountOverview.Delinquencies.map(\v -> String.valueOf(v)).orElse("-")
  }

  function formattedOpenClaims(): String {
    return AccountOverview.OpenClaims >= 0 ? Integer.toString(AccountOverview.OpenClaims) : "-"
  }

  property get DelinquenciesIn12MonthsColor(): GWColor {
    if (!AccountOverview.Delinquencies.isPresent()) {
      return GWColor.THEME_ACTION_NEUTRAL
    }
    if (AccountOverview.Delinquencies.filter(\v -> v > 0).isPresent()) {
      return GWColor.THEME_ACTION_DANGER
    }
    return GWColor.THEME_ACTION_SAFE
  }
}
