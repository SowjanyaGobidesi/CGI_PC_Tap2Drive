package gw.api.rating.dtobased.accessors.cp

uses gw.api.rating.dtobased.accessors.EffDatedDAO
uses gw.api.rating.dtobased.mappers.cp.CPLocationFieldMapper
uses gw.api.rating.dtobased.data.cp.CPLocationDTO

@Export
class CPLocationDAO extends EffDatedDAO<CPLocation, CPLocationDTO, CPLocationFieldMapper> {
  construct(cpLocation: CPLocation) {
    super(cpLocation)
  }
}