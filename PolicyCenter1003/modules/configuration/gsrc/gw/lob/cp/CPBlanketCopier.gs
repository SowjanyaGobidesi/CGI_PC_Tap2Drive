package gw.lob.cp
uses gw.api.copier.ReferenceDateInternalEffDatedCopyable

@Export
class CPBlanketCopier extends ReferenceDateInternalEffDatedCopyable<CPBlanket> {

  construct(blanket : CPBlanket) {
    super(blanket)
  }

  override function copyBasicFieldsFromBean(blanket : CPBlanket) {
    super.copyBasicFieldsFromBean(blanket)
    this._bean.CPBlanketDescription = blanket.CPBlanketDescription
  }

}
