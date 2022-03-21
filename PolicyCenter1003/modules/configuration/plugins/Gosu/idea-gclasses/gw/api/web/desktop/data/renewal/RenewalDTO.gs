package gw.api.web.desktop.data.renewal

uses com.fasterxml.jackson.core.type.TypeReference
uses gw.api.web.desktop.data.DesktopDTOSerializationHelper
uses gw.api.web.desktop.data.JobDTO

@Export
class RenewalDTO extends JobDTO {

  private construct() {
  }

  private construct (renewal : Renewal) {
    super(renewal)
    generateHashes(renewal)
  }

  static function from(renewal : Renewal) : RenewalDTO {
    return new RenewalDTO(renewal)
  }

  static function from(json : String) : RenewalDTO {
    return DesktopDTOSerializationHelper.Mapper.readValue(json, RenewalDTO)
  }

  static function fromCollection(jsonCollection : String) : List<RenewalDTO> {
    return DesktopDTOSerializationHelper.Mapper.readValue(jsonCollection, new TypeReference<List<RenewalDTO>>() {
    })
  }
}