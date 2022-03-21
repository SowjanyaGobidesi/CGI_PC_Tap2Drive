package gw.webservice.pc.pc1000.gxmodel.accountlocationmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement AccountLocationEnhancement : gw.webservice.pc.pc1000.gxmodel.accountlocationmodel.AccountLocation {
  public static function create(object : entity.AccountLocation) : gw.webservice.pc.pc1000.gxmodel.accountlocationmodel.AccountLocation {
    return new gw.webservice.pc.pc1000.gxmodel.accountlocationmodel.AccountLocation(object)
  }

  public static function create(object : entity.AccountLocation, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.accountlocationmodel.AccountLocation {
    return new gw.webservice.pc.pc1000.gxmodel.accountlocationmodel.AccountLocation(object, options)
  }

}