package gw.account

uses gw.api.locale.DisplayKey
uses java.lang.IllegalArgumentException

@Export
abstract class AbstractEffDatedMergeableImpl<T extends EffDated> extends AbstractMergeableImpl<T> {
  construct(mergeable : T) {
    super(mergeable)
  }

  override function checkSanity(merged : T) {
    if (!Survivor.BranchUntyped.equals(merged.BranchUntyped)) {
      throw new IllegalArgumentException(DisplayKey.get("EffDated.Merge.Error.DifferentBranch", (typeof merged).DisplayName,
              merged, merged.BranchUntyped, Survivor, Survivor.BranchUntyped))
    }
  }
}