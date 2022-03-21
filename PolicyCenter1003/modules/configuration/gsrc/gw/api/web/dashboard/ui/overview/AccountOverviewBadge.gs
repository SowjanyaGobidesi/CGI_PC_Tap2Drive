package gw.api.web.dashboard.ui.overview

uses gw.api.web.color.GWColor
uses gw.api.web.dashboard.data.accountoverview.AccountOverviewDTO

@Export
internal class AccountOverviewBadge {
  enum TierColor {
    SILVER(CustomerServiceTier.TC_SILVER, GWColor.THEME_TIER_3),
    GOLD(CustomerServiceTier.TC_GOLD, GWColor.THEME_TIER_2),
    PLATINUM(CustomerServiceTier.TC_PLATINUM, GWColor.THEME_TIER_1)

    final var tier: CustomerServiceTier as readonly Tier
    final var color: GWColor as readonly Color

    private construct(customerServiceTier: CustomerServiceTier, gwColor: GWColor) {
      tier = customerServiceTier
      color = gwColor
    }
  }
  static final internal var NO_COLOR: GWColor = TierColor.SILVER.color

  final var _accountOverview: AccountOverviewDTO

  construct(accountOverview: AccountOverviewDTO) {
    _accountOverview = accountOverview
  }

  property get BadgeText(): String {
    return _accountOverview.ServiceTier
        .map(\tier -> tier.DisplayName)
        .orElse("")
  }

  property get BadgeColor(): GWColor {
    return _accountOverview.ServiceTier.map(\tier -> {
      for (candidate in TierColor.values()) {
        if (candidate.tier == tier) {
          return candidate.color
        }
      }
      return NO_COLOR
    }).orElse(NO_COLOR)
  }
}