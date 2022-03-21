package gw.webservice.pc.pc1000.gxmodel.policycontactrolemodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PolicyContactRoleEnhancement : gw.webservice.pc.pc1000.gxmodel.policycontactrolemodel.PolicyContactRole {
  public static function create(object : entity.PolicyContactRole) : gw.webservice.pc.pc1000.gxmodel.policycontactrolemodel.PolicyContactRole {
    return new gw.webservice.pc.pc1000.gxmodel.policycontactrolemodel.PolicyContactRole(object)
  }

  public static function create(object : entity.PolicyContactRole, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.policycontactrolemodel.PolicyContactRole {
    return new gw.webservice.pc.pc1000.gxmodel.policycontactrolemodel.PolicyContactRole(object, options)
  }

}