package gw.webservice.pc.pc1000.gxmodel.contactmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement ContactEnhancement : gw.webservice.pc.pc1000.gxmodel.contactmodel.Contact {
  public static function create(object : entity.Contact) : gw.webservice.pc.pc1000.gxmodel.contactmodel.Contact {
    return new gw.webservice.pc.pc1000.gxmodel.contactmodel.Contact(object)
  }

  public static function create(object : entity.Contact, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.contactmodel.Contact {
    return new gw.webservice.pc.pc1000.gxmodel.contactmodel.Contact(object, options)
  }

}