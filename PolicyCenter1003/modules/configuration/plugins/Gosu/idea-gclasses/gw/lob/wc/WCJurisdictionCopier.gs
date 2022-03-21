package gw.lob.wc
uses gw.api.copier.ReferenceDateInternalEffDatedCopyable

@Export
class WCJurisdictionCopier extends ReferenceDateInternalEffDatedCopyable<WCJurisdiction> {

  construct(jurisdiction : WCJurisdiction) {
    super(jurisdiction)
  }

  override function copyBasicFieldsFromBean(p0 : WCJurisdiction) {
    super.copyBasicFieldsFromBean(p0)
    // nothing to do
  }

}
