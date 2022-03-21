package gw.webservice.pc.pc900.gxmodel.quotingpersonalvehiclemodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PersonalVehicleEnhancement : gw.webservice.pc.pc900.gxmodel.quotingpersonalvehiclemodel.PersonalVehicle {
  public static function create(object : entity.PersonalVehicle) : gw.webservice.pc.pc900.gxmodel.quotingpersonalvehiclemodel.PersonalVehicle {
    return new gw.webservice.pc.pc900.gxmodel.quotingpersonalvehiclemodel.PersonalVehicle(object)
  }

  public static function create(object : entity.PersonalVehicle, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.quotingpersonalvehiclemodel.PersonalVehicle {
    return new gw.webservice.pc.pc900.gxmodel.quotingpersonalvehiclemodel.PersonalVehicle(object, options)
  }

}