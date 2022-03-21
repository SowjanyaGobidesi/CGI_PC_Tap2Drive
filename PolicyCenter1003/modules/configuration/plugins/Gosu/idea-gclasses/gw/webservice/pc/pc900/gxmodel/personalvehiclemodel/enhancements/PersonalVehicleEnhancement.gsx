package gw.webservice.pc.pc900.gxmodel.personalvehiclemodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PersonalVehicleEnhancement : gw.webservice.pc.pc900.gxmodel.personalvehiclemodel.PersonalVehicle {
  public static function create(object : entity.PersonalVehicle) : gw.webservice.pc.pc900.gxmodel.personalvehiclemodel.PersonalVehicle {
    return new gw.webservice.pc.pc900.gxmodel.personalvehiclemodel.PersonalVehicle(object)
  }

  public static function create(object : entity.PersonalVehicle, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.personalvehiclemodel.PersonalVehicle {
    return new gw.webservice.pc.pc900.gxmodel.personalvehiclemodel.PersonalVehicle(object, options)
  }

}