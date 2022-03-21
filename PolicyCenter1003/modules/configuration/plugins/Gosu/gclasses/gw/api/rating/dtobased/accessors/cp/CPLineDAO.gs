package gw.api.rating.dtobased.accessors.cp

uses gw.api.rating.dtobased.accessors.PolicyLineDAO
uses gw.api.rating.dtobased.data.cp.CPLineDTO
uses gw.api.rating.dtobased.mappers.cp.CPLineFieldMapper

@Export
class CPLineDAO extends PolicyLineDAO<CommercialPropertyLine, CPLineDTO, CPLineFieldMapper> {
  construct(cpLine: CommercialPropertyLine) {
    super(cpLine)
  }
}