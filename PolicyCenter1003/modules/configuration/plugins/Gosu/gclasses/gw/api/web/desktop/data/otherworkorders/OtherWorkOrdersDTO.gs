package gw.api.web.desktop.data.otherworkorders

uses com.fasterxml.jackson.core.type.TypeReference
uses entity.Job
uses gw.api.web.desktop.data.DesktopDTOSerializationHelper
uses gw.api.web.desktop.data.JobDTO

@Export
class OtherWorkOrdersDTO extends JobDTO {

  private construct() {
  }

  private construct (job : Job) {
    super(job)
    generateHashes(job)
  }

  static function from(job : Job) : OtherWorkOrdersDTO {
    return new OtherWorkOrdersDTO(job)
  }

  static function from(json : String) : OtherWorkOrdersDTO {
    return DesktopDTOSerializationHelper.Mapper.readValue(json, OtherWorkOrdersDTO)
  }

  static function fromCollection(jsonCollection : String) : List<OtherWorkOrdersDTO> {
    return DesktopDTOSerializationHelper.Mapper.readValue(jsonCollection, new TypeReference<List<OtherWorkOrdersDTO>>() {
    })
  }
}