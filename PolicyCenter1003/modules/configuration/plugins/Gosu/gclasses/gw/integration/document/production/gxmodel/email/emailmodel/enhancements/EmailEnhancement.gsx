package gw.integration.document.production.gxmodel.email.emailmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement EmailEnhancement : gw.integration.document.production.gxmodel.email.emailmodel.Email {
  public static function create(object : gw.api.email.Email) : gw.integration.document.production.gxmodel.email.emailmodel.Email {
    return new gw.integration.document.production.gxmodel.email.emailmodel.Email(object)
  }

  public static function create(object : gw.api.email.Email, options : gw.api.gx.GXOptions) : gw.integration.document.production.gxmodel.email.emailmodel.Email {
    return new gw.integration.document.production.gxmodel.email.emailmodel.Email(object, options)
  }

}