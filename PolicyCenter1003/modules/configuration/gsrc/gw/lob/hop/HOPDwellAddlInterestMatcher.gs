package gw.lob.hop

uses gw.contact.AbstractAddlInterestDetailMatcher
uses gw.entity.ILinkPropertyInfo

/**
 * Matches {@link HOPDwellAddlInterest}s for OOS and Preemption based on the base {@link AbstractAddlInterestDetailMatcher}
 * columns as well as the {@link HOPDwelling}
 */
@Export
class HOPDwellAddlInterestMatcher extends AbstractAddlInterestDetailMatcher<HOPDwellAddlInterest> {
  construct(addlInterest : HOPDwellAddlInterest) {
    super(addlInterest)
  }

  override property get CoveredInterestColumns() : List<ILinkPropertyInfo> {
    return {HOPDwellAddlInterest#HOPDwelling.PropertyInfo as ILinkPropertyInfo}
  }
}