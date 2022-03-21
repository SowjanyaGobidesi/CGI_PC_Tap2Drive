package gw.webservice.pc.pc900.gxmodel.quotingpolicydrivermodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PolicyDriverEnhancement : gw.webservice.pc.pc900.gxmodel.quotingpolicydrivermodel.PolicyDriver {
  public static function create(object : entity.PolicyDriver) : gw.webservice.pc.pc900.gxmodel.quotingpolicydrivermodel.PolicyDriver {
    return new gw.webservice.pc.pc900.gxmodel.quotingpolicydrivermodel.PolicyDriver(object)
  }

  public static function create(object : entity.PolicyDriver, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.quotingpolicydrivermodel.PolicyDriver {
    return new gw.webservice.pc.pc900.gxmodel.quotingpolicydrivermodel.PolicyDriver(object, options)
  }

}