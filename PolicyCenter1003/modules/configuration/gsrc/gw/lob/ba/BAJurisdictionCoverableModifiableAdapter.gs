package gw.lob.ba

uses java.util.Date

/**
 * This class exists to aggregate the implementations of gw.api.domain.CoverableAdapter and
 * gw.api.domain.ModifiableAdapter for BAJurisdiction. These two interfaces have overlapping methods, so they must be
 * implemented via a single class.
 */
@Export
class BAJurisdictionCoverableModifiableAdapter
    implements gw.api.domain.CoverableAdapter, gw.api.domain.ModifiableAdapter {
  delegate _coverableAdapter represents gw.api.domain.CoverableAdapter
  delegate _modifiableAdapter represents gw.api.domain.ModifiableAdapter

  construct(owner: BAJurisdiction) {
    _coverableAdapter = new gw.lob.ba.BAJurisdictionCoverableAdapter(owner)
    _modifiableAdapter = new gw.lob.ba.BAJurisdictionModifiableAdapter(owner)
  }

  override property get PolicyLine() : PolicyLine {
    return _coverableAdapter.PolicyLine
  }

  override property  get State() : Jurisdiction {
    return _coverableAdapter.State
  }
}