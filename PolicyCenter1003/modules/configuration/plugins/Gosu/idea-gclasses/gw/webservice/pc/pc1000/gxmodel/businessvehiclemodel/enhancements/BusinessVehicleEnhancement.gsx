package gw.webservice.pc.pc1000.gxmodel.businessvehiclemodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement BusinessVehicleEnhancement : gw.webservice.pc.pc1000.gxmodel.businessvehiclemodel.BusinessVehicle {
  public static function create(object : entity.BusinessVehicle) : gw.webservice.pc.pc1000.gxmodel.businessvehiclemodel.BusinessVehicle {
    return new gw.webservice.pc.pc1000.gxmodel.businessvehiclemodel.BusinessVehicle(object)
  }

  public static function create(object : entity.BusinessVehicle, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.businessvehiclemodel.BusinessVehicle {
    return new gw.webservice.pc.pc1000.gxmodel.businessvehiclemodel.BusinessVehicle(object, options)
  }

}