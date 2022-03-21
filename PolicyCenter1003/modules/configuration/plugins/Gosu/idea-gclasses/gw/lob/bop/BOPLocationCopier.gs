package gw.lob.bop
uses gw.api.copier.ReferenceDateInternalEffDatedCopyable

/**
 * A Copier for {@link entity.BOPLocation}.  Copies BOPLocation specific fields.
 * <ul><li>entity.BOPLocation#PrincipalOpsDesc</li></ul>
 */
@Export
class BOPLocationCopier extends ReferenceDateInternalEffDatedCopyable<BOPLocation> {

  construct(loc : BOPLocation) {
    super(loc)
  }

  override function copyBasicFieldsFromBean(location : BOPLocation) {
    super.copyBasicFieldsFromBean(location)
    this._bean.PrincipalOpsDesc = location.PrincipalOpsDesc
  }

}
