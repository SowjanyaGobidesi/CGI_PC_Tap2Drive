package gw.webservice.pc.pc900.gxmodel.policylocationmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PolicyLocationEnhancement : gw.webservice.pc.pc900.gxmodel.policylocationmodel.PolicyLocation {
  public static function create(object : entity.PolicyLocation) : gw.webservice.pc.pc900.gxmodel.policylocationmodel.PolicyLocation {
    return new gw.webservice.pc.pc900.gxmodel.policylocationmodel.PolicyLocation(object)
  }

  public static function create(object : entity.PolicyLocation, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.policylocationmodel.PolicyLocation {
    return new gw.webservice.pc.pc900.gxmodel.policylocationmodel.PolicyLocation(object, options)
  }

}