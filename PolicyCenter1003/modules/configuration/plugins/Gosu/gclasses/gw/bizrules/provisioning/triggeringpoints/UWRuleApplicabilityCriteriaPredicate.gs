package gw.bizrules.provisioning.triggeringpoints

uses entity.RuleVersion
uses gw.policy.PolicyEvalContext
uses typekey.Job

uses java.util.function.Predicate

/**
 * Defines a predicate to test whether a {@link Rule} of a {@link RuleVersion}
 * matches the applicability criteria defined by the specified base context,
 * which is a {@link PolicyEvalContext}.
 */
@Export
public class UWRuleApplicabilityCriteriaPredicate implements Predicate<RuleVersion> {
  final var _lines: typekey.PolicyLine[]
  final var _job: Job
  final var _state: Jurisdiction
  final var _today: Date

  /**
   * @param evalContext the base context from which to extract the
   *                    applicability criteria values for this predicate
   */
  construct(evalContext: PolicyEvalContext) {
    var policyPeriod = evalContext.Period
    _lines = policyPeriod.Lines*.Subtype
    _job = policyPeriod.Job.Subtype
    _state = policyPeriod.BaseState
    _today = Date.Today
  }

  /**
   * Tests whether a {@link Rule} of a {@link RuleVersion} matches the
   * applicability criteria defined by the base context specified for this
   * predicate.
   *
   * @param ruleVersion the {@link RuleVersion} whose {@link Rule} will be
   *                    evaluated as to whether it is applicable with respect to
   *                    the base context.
   * @return {@code true} on a {@code RuleVersion} that matches the
   * applicability criteria on the latter's {@code Rule}.
   */
  override function test(ruleVersion: RuleVersion): boolean {
    var rule = ruleVersion.Rule
    if (rule typeis UWRule) {
      return dateBetween(_today, rule.StartDate, rule.EndDate)
          and valuesMatch(rule.LinesOfBusiness*.PolicyLine, _lines)
          and valuesMatch(rule.Jurisdictions*.Jurisdiction, _state)
          and valuesMatch(rule.PolicyTransactions*.Job, _job)
    } else {
      throw new IllegalArgumentException(String.format("Attempt to apply %s filtering on a different type (%s)",
          {UWRule.TYPE.Name, rule.IntrinsicType.Name}))
    }
  }

  private function valuesMatch<T>(appCritValues: T[], contextValue: T): boolean {
    return appCritValues.IsEmpty or appCritValues.contains(contextValue)
  }

  private reified function valuesMatch<T>(appCritValues: T[], contextValues: T[]): boolean {
    return appCritValues.IsEmpty or appCritValues.intersect(contextValues).HasElements
  }

  private function dateBetween(date: Date, startDate: Date, endDate: Date): boolean {
    return (startDate == null or date != null and date.afterOrEqual(startDate))
        and (endDate == null or date != null and date.before(endDate))
  }
}
