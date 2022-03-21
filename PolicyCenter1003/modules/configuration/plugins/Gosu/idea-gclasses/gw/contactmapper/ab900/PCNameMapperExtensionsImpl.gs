package gw.contactmapper.ab900

uses gw.webservice.contactapi.NameMapper

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class PCNameMapperExtensionsImpl implements IPCNameMapperExtensions {
  override property get Instance(): NameMapper {
    return PCNameMapper.Instance
  }
}