package gw.webservice.pc.pc1000.gxmodel.addressmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement AddressEnhancement : gw.webservice.pc.pc1000.gxmodel.addressmodel.Address {
  public static function create(object : entity.Address) : gw.webservice.pc.pc1000.gxmodel.addressmodel.Address {
    return new gw.webservice.pc.pc1000.gxmodel.addressmodel.Address(object)
  }

  public static function create(object : entity.Address, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.addressmodel.Address {
    return new gw.webservice.pc.pc1000.gxmodel.addressmodel.Address(object, options)
  }

}