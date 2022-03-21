package gw.api.web.desktop.data.account

uses com.fasterxml.jackson.annotation.JsonIgnore
uses com.fasterxml.jackson.core.type.TypeReference
uses gw.api.web.desktop.data.DesktopDTOSerializationHelper
uses gw.api.web.desktop.data.DesktopDataDTO
uses gw.api.web.desktop.data.HashGenerator
uses gw.api.web.desktop.data.common.ContactDTO
uses gw.api.web.desktop.data.common.ContactDTOImpl
uses gw.api.web.desktop.data.common.HashedAuditableDTO
uses gw.riskassessment.JacksonEnabledSerializable

@Export
class AccountDTO extends HashedAuditableDTO<Account> implements DesktopDataDTO, JacksonEnabledSerializable, ContactDTO {

  @JsonIgnore
  delegate _contactDTO : ContactDTO represents ContactDTO

  var _publicId : String as PublicId
  var _accountNumber : String as AccountNumber
  var _accountStatusPriority : int as AccountStatusPriority
  var _accountStatusCode : String as AccountStatusCode
  var _producerCodes : List<String> as ProducerCodes

  private construct() {
    _contactDTO = new ContactDTOImpl()
  }

  private construct(account : Account) {
    super(account.CreateTime, account.UpdateTime)
    _publicId = account.PublicID
    _accountNumber = account.AccountNumber
    _accountStatusPriority = account.AccountStatus?.Priority
    _accountStatusCode = account.AccountStatus.Code
    _contactDTO = ContactDTOImpl.from(account.AccountHolderContact)
    _producerCodes = account.ProducerCodes?.map(\elt -> elt.ProducerCode.Code)?.fastList()
    generateHashes(account)
  }

  static function from(account : Account) : AccountDTO {
    return new AccountDTO(account)
  }

  protected override function createHashGenerator() : HashGenerator<Account> {
    return new HashGenerator.Builder<Account>()
        .with(\acc -> acc.PublicID)
        .with(\acc -> acc.AccountNumber)
        .with(\acc -> acc.AccountStatus?.Priority)
        .with(\acc -> acc.AccountStatus.Code)
        .with(\acc -> acc.AccountHolderContact.PublicID)
        .with(\acc -> acc.CreateTime)
        .with(\acc -> acc.ProducerCodes?.map(\elt -> elt.ProducerCode.Code)?.fastList()?.sort())
        .build()
  }

  static function from(json : String) : AccountDTO {
    return DesktopDTOSerializationHelper.Mapper.readValue(json, AccountDTO)
  }

  static function fromCollection(jsonCollection : String) : List<AccountDTO> {
    return DesktopDTOSerializationHelper.Mapper.readValue(jsonCollection, new TypeReference<List<AccountDTO>>() {
    })
  }

  function writeAsJSONString() : String {
    return DesktopDTOSerializationHelper.Mapper.writeValueAsString(this)
  }

}