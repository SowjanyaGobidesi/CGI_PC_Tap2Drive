package gw.lob.common

uses gw.api.copier.ReferenceDateInternalEffDatedCopyable

@Export
abstract class AbstractPolicyLineReferenceDateInternalCopier<T extends Coverable & PolicyLine> extends ReferenceDateInternalEffDatedCopyable<T> {

  construct(line : T) {
    super(line)
  }

  override function copyBasicFieldsFromBean(line : T) {
    super.copyBasicFieldsFromBean(line)
    copyLineSpecificFields(line)
  }

  protected function copyLineSpecificFields(line : T) {
    // nothing to do by default
  }

}