package gw.bizrules.domain.impl

uses gw.pc.bizrules.management.PCRuleVersionDependentImpl
uses gw.bizrules.domain.RuleVersionDependent

@Export
public class AppCritJurisdictionImpl extends PCRuleVersionDependentImpl<AppCritJurisdiction> implements RuleVersionDependent {

  public construct(owner: AppCritJurisdiction) {
    super(owner)
  }

  override property get Owners(): Iterable<RuleVersionAware> {
    return Collections.singleton(getOwner().getUWRule())
  }
}
