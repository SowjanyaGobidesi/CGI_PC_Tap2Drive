package gw.api.web.desktop.data.common

@Export
interface ContactDTO {

  property get ContactPublicId() : String
  property get ContactName() : String
  property get ContactAddress() : String
  property get ContactState() : String

  property set ContactPublicId(id : String)
  property set ContactName(name : String)
  property set ContactAddress(address : String)
  property set ContactState(state : String)

}