package gw.api.web.desktop.data

uses com.fasterxml.jackson.annotation.JsonAutoDetect
uses com.fasterxml.jackson.annotation.PropertyAccessor
uses com.fasterxml.jackson.core.type.TypeReference
uses com.fasterxml.jackson.databind.ObjectMapper

@Export
class DesktopDTOSerializationHelper {
  static final var _mapper = gw.util.concurrent.LocklessLazyVar.make(\-> {
    var objectMapper = new ObjectMapper()
    objectMapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.PUBLIC_ONLY)
    return objectMapper
  })

  static property get Mapper() : ObjectMapper {
    return _mapper.get()
  }

  static reified function from<T extends DesktopDataDTO>(json : String) : T {
    return _mapper.get().readValue(json, T)
  }

  static reified function fromCollection<T extends DesktopDataDTO>(jsonCollection : String) : List<T> {
    return _mapper.get().readValue(jsonCollection, new TypeReference<List<T>>() {
    })
  }

  static function writeAsJSONString<T extends DesktopDataDTO>(object : T) : String {
    return _mapper.get().writeValueAsString(object)
  }
}