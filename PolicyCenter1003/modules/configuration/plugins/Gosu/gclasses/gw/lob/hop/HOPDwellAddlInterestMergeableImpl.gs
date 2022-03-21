package gw.lob.hop

uses gw.api.domain.account.Mergeable
uses gw.contact.AddlInterestDetailMergeableImpl

@Export
class HOPDwellAddlInterestMergeableImpl extends AddlInterestDetailMergeableImpl<HOPDwellAddlInterest> {
  construct(addlInterest : HOPDwellAddlInterest) {
    super(addlInterest)
  }

  override function mergeFields(merged : HOPDwellAddlInterest) : boolean {
    var superRetVal = super.mergeFields(merged)

    // Once we are able to merge dwellings, this will have to be changed
    // to merge merged.HOPDwelling into Survivor.HOPDwelling

    if (merged.HOPDwelling typeis Mergeable) {
      throw "HOPDwelling is mergeable, and should no longer be ignored."
    }

    return superRetVal
  }
}