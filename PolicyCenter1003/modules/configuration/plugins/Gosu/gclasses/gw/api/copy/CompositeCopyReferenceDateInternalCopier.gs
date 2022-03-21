package gw.api.copy

@Export
abstract class CompositeCopyReferenceDateInternalCopier<T extends KeyableBean, S extends Coverable> extends CompositeCopier<T, S> {

  protected var _coverable : Coverable

  construct(coverable : S) {
    _coverable = coverable
  }


  protected override function copyRoot(root : S) {
    root.ReferenceDateInternal = _coverable.ReferenceDateInternal
  }
}