package gw.contactmapper.ab1000

uses gw.webservice.contactapi.NameMapper

@Export
class PCNameMapperExtensionsImpl implements IPCNameMapperExtensions {
  override property get Instance(): NameMapper {
    return PCNameMapper.Instance
  }
}