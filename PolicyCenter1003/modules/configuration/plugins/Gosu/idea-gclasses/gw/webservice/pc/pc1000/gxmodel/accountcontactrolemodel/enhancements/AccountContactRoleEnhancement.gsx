package gw.webservice.pc.pc1000.gxmodel.accountcontactrolemodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement AccountContactRoleEnhancement : gw.webservice.pc.pc1000.gxmodel.accountcontactrolemodel.AccountContactRole {
  public static function create(object : entity.AccountContactRole) : gw.webservice.pc.pc1000.gxmodel.accountcontactrolemodel.AccountContactRole {
    return new gw.webservice.pc.pc1000.gxmodel.accountcontactrolemodel.AccountContactRole(object)
  }

  public static function create(object : entity.AccountContactRole, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.accountcontactrolemodel.AccountContactRole {
    return new gw.webservice.pc.pc1000.gxmodel.accountcontactrolemodel.AccountContactRole(object, options)
  }

}