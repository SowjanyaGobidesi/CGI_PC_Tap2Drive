package gw.integration.document.production.gxmodel.contact.addressmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement AddressEnhancement : gw.integration.document.production.gxmodel.contact.addressmodel.Address {
  public static function create(object : entity.Address, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.contact.addressmodel.Address {
    return new gw.integration.document.production.gxmodel.contact.addressmodel.Address(object, labels)
  }

  public static function create(object : entity.Address, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.contact.addressmodel.Address {
    return new gw.integration.document.production.gxmodel.contact.addressmodel.Address(object, options, labels)
  }

  public static function create(object : entity.Address) : gw.integration.document.production.gxmodel.contact.addressmodel.Address {
    return new gw.integration.document.production.gxmodel.contact.addressmodel.Address(object)
  }

  public static function create(object : entity.Address, options : gw.api.gx.GXOptions) : gw.integration.document.production.gxmodel.contact.addressmodel.Address {
    return new gw.integration.document.production.gxmodel.contact.addressmodel.Address(object, options)
  }

  public static function create(object : entity.Address, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.contact.addressmodel.Address {
    return new gw.integration.document.production.gxmodel.contact.addressmodel.Address(object, labels, throughLabels)
  }

  public static function create(object : entity.Address, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.contact.addressmodel.Address {
    return new gw.integration.document.production.gxmodel.contact.addressmodel.Address(object, options, labels, throughLabels)
  }

}