package gw.webservice.pc.pc1000.gxmodel.vehicledrivermodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement VehicleDriverEnhancement : gw.webservice.pc.pc1000.gxmodel.vehicledrivermodel.VehicleDriver {
  public static function create(object : entity.VehicleDriver) : gw.webservice.pc.pc1000.gxmodel.vehicledrivermodel.VehicleDriver {
    return new gw.webservice.pc.pc1000.gxmodel.vehicledrivermodel.VehicleDriver(object)
  }

  public static function create(object : entity.VehicleDriver, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.vehicledrivermodel.VehicleDriver {
    return new gw.webservice.pc.pc1000.gxmodel.vehicledrivermodel.VehicleDriver(object, options)
  }

}