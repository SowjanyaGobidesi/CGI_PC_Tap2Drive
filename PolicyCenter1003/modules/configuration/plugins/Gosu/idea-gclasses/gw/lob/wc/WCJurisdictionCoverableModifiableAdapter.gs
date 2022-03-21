package gw.lob.wc

uses gw.api.domain.CoverableAdapter

/**
 * This class exists to aggregate the implementations of gw.api.domain.CoverableAdapter and
 * gw.api.domain.ModifiableAdapter for WCJurisdiction. These two interfaces have overlapping methods, so they must be
 * implemented via a single class.
 */
@Export
class WCJurisdictionCoverableModifiableAdapter
    implements gw.api.domain.ModifiableAdapter, CoverableAdapter {
  delegate _coverableAdapter represents gw.api.domain.CoverableAdapter
  delegate _modifiableAdapter represents gw.api.domain.ModifiableAdapter

  construct(owner: WCJurisdiction) {
    _coverableAdapter = new gw.lob.wc.WCJurisdictionCoverableAdapter(owner)
    _modifiableAdapter = new gw.lob.wc.WCJurisdictionModifiableAdapter(owner)
  }

  override property get PolicyLine() : PolicyLine {
    return _coverableAdapter.PolicyLine
  }

  override property  get State() : Jurisdiction {
    return _coverableAdapter.State
  }
}