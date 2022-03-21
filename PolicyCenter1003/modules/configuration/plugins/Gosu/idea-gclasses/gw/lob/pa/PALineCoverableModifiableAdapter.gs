package gw.lob.pa

uses java.util.Date

/**
 * This class exists to aggregate the implementations of gw.api.domain.CoverableAdapter and
 * gw.api.domain.ModifiableAdapter for PersonalAutoLine. These interfaces have overlapping methods, so they must be
 * implemented via a single class.
 */
@Export
class PALineCoverableModifiableAdapter
    implements gw.api.domain.CoverableAdapter, gw.api.domain.ModifiableAdapter {
  delegate _coverableAdapter represents gw.api.domain.CoverableAdapter
  delegate _modifiableAdapter represents gw.api.domain.ModifiableAdapter

  private var _owner : entity.PersonalAutoLine

  construct(owner: entity.PersonalAutoLine) {
    _coverableAdapter = new gw.lob.pa.PALineCoverableAdapter (owner)
    _modifiableAdapter = new gw.lob.pa.PALineModifiableAdapter (owner)
    _owner = owner
  }

  override property get PolicyLine(): PolicyLine {
    return _coverableAdapter.PolicyLine
  }

  override property get State(): Jurisdiction {
    return _coverableAdapter.State
  }

  override property get ReferenceDateInternal(): Date {
    return _owner.ReferenceDateInternal
  }

  override property set ReferenceDateInternal(d: Date) {
    _owner.ReferenceDateInternal = d
  }
}