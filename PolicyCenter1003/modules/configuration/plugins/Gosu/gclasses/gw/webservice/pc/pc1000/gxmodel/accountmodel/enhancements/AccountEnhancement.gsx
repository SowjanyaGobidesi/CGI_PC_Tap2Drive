package gw.webservice.pc.pc1000.gxmodel.accountmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement AccountEnhancement : gw.webservice.pc.pc1000.gxmodel.accountmodel.Account {
  public static function create(object : entity.Account) : gw.webservice.pc.pc1000.gxmodel.accountmodel.Account {
    return new gw.webservice.pc.pc1000.gxmodel.accountmodel.Account(object)
  }

  public static function create(object : entity.Account, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.accountmodel.Account {
    return new gw.webservice.pc.pc1000.gxmodel.accountmodel.Account(object, options)
  }

}