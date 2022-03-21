package gw.bizrules.provisioning

/**
 * Methods related to rule applicability criteria
 */
@Export
interface RuleContextApplicabilityInfo {
  /**
   * Returns whether this context is applicable to all lines in the list
   */
  function appliesToPolicyLines(lines: typekey.PolicyLine[]): boolean
}