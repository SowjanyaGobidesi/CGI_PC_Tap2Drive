package gw.api.domain.policy.period

uses com.google.common.collect.ImmutableSet

/**
 * Use this class to store sets of statuses that are expensive to compute on the fly.
 * The sets of statuses are exposed as static variable. They should be immutable to prevent modification.
 */
@Export
final class PolicyPeriodStatusSets {
  public static final var CLOSING_OR_CLOSED_STATUSES : Set<PolicyPeriodStatus> = ImmutableSet.copyOf(PolicyPeriodStatus.TF_CLOSED.TypeKeys.union(PolicyPeriodStatus.TF_CLOSING.TypeKeys))
  public static final var NOT_EDITABLE_POLICY_PERIOD_STATUSES : Set<PolicyPeriodStatus> = ImmutableSet.copyOf(CLOSING_OR_CLOSED_STATUSES.union({TC_QUOTING, TC_RATED, TC_QUOTED}))
  public static final var SIDE_BY_SIDE_EDITABLE_STATUSES: Set<PolicyPeriodStatus> = ImmutableSet.of(TC_DRAFT, TC_QUOTING, TC_RATED, TC_QUOTED)
}