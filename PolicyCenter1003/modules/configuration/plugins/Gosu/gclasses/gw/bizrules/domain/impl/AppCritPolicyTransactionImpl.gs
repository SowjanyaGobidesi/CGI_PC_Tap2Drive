package gw.bizrules.domain.impl

uses gw.pc.bizrules.management.PCRuleVersionDependentImpl
uses gw.bizrules.domain.RuleVersionDependent

@Export
public class AppCritPolicyTransactionImpl extends PCRuleVersionDependentImpl<AppCritPolicyTransaction> implements RuleVersionDependent {

  public construct(owner: AppCritPolicyTransaction) {
    super(owner)
  }

  override property get Owners(): Iterable<RuleVersionAware> {
    return Collections.singleton(getOwner().getUWRule())
  }
}
