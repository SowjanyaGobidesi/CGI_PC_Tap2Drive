package gw.bizrules.domain.impl

uses gw.bizrules.domain.RuleVersionDependent
uses gw.pc.bizrules.management.PCRuleVersionDependentImpl

@Export
public class AppCritLineOfBusinessImpl extends PCRuleVersionDependentImpl<AppCritLineOfBusiness> implements RuleVersionDependent {

  public construct(owner: AppCritLineOfBusiness) {
    super(owner)
  }

  override property get Owners(): Iterable<RuleVersionAware> {
    return Collections.singleton(getOwner().getUWRule())
  }
}
