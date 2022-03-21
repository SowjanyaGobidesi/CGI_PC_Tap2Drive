package gw.api.web.desktop.data

uses com.google.common.collect.ImmutableList
uses org.apache.commons.codec.digest.DigestUtils

@Export
class HashGenerator<T extends KeyableBean> {

  private final var _extractors : List<block(T) : Object>

  private construct(extractors : List<block(T) : Object>) {
    _extractors = extractors
  }

  public function hash(bean : T) : String {
    if (bean != null && bean.PublicID != null) {
      var properties = new LinkedHashMap<String, Object>()
      for (var extractor in _extractors index i) {
        properties.put("prop${i}", extractor(bean))
      }
      return generateHash(properties)
    }
    return null
  }

  private function generateHash(properties : Map<String, Object>) : String {
    var json = DesktopDTOSerializationHelper.Mapper.writeValueAsString(properties)
    return DigestUtils.sha512Hex(json)
  }

  public static class Builder<U extends KeyableBean> {

    private final var _extractors : List<block(U) : Object> = {}

    public function with(extractor : block(U) : Object) : Builder<U> {
      _extractors.add(extractor)
      return this
    }

    public function build() : HashGenerator<U> {
      return new HashGenerator<U>(ImmutableList.copyOf(_extractors))
    }

  }

}