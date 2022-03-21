package gw.integration.document.production.gxmodel.email.emailcontactmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement EmailContactEnhancement : gw.integration.document.production.gxmodel.email.emailcontactmodel.EmailContact {
  public static function create(object : gw.api.email.EmailContact) : gw.integration.document.production.gxmodel.email.emailcontactmodel.EmailContact {
    return new gw.integration.document.production.gxmodel.email.emailcontactmodel.EmailContact(object)
  }

  public static function create(object : gw.api.email.EmailContact, options : gw.api.gx.GXOptions) : gw.integration.document.production.gxmodel.email.emailcontactmodel.EmailContact {
    return new gw.integration.document.production.gxmodel.email.emailcontactmodel.EmailContact(object, options)
  }

}