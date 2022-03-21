package gw.api.web.desktop.data.common

uses com.fasterxml.jackson.annotation.JsonFormat
uses gw.api.web.desktop.data.HashGenerator
uses gw.plugin.multicluster.federateddata.FederatedDataConstants

@Export
abstract class HashedAuditableDTO<T extends KeyableBean> extends AuditableDTO {

  var _currentHash : String as CurrentHash
  var _previousHash : String as PreviousHash
  var _creationDate : Date as CreationDate
  var _modificationDate : Date as ModificationDate

  construct(creationDate : Date, modificationDate: Date) {
    _creationDate = creationDate
    _modificationDate = modificationDate
  }

  construct() {}

  protected abstract function createHashGenerator() : HashGenerator<T>

  protected function generateHashes(bean : T) {
    var hashGenerator = createHashGenerator()
    _currentHash = hashGenerator.hash(bean)
    _previousHash = hashGenerator.hash(bean.OriginalVersion as T)
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  property get CreationDate() : Date {
    return _creationDate
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  property set CreationDate(date : Date) {
    _creationDate = date
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  property get ModificationDate() : Date {
    return _modificationDate
  }

  @JsonFormat(:shape = JsonFormat.Shape.STRING, :pattern = FederatedDataConstants.API_DATE_TIME_PATERN)
  property set ModificationDate(date : Date) {
    _modificationDate = date
  }

}