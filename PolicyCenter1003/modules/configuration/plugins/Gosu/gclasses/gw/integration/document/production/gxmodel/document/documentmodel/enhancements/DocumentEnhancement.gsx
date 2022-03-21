package gw.integration.document.production.gxmodel.document.documentmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement DocumentEnhancement : gw.integration.document.production.gxmodel.document.documentmodel.Document {
  public static function create(object : entity.Document, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.document.documentmodel.Document {
    return new gw.integration.document.production.gxmodel.document.documentmodel.Document(object, labels)
  }

  public static function create(object : entity.Document, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.document.documentmodel.Document {
    return new gw.integration.document.production.gxmodel.document.documentmodel.Document(object, options, labels)
  }

  public static function create(object : entity.Document) : gw.integration.document.production.gxmodel.document.documentmodel.Document {
    return new gw.integration.document.production.gxmodel.document.documentmodel.Document(object)
  }

  public static function create(object : entity.Document, options : gw.api.gx.GXOptions) : gw.integration.document.production.gxmodel.document.documentmodel.Document {
    return new gw.integration.document.production.gxmodel.document.documentmodel.Document(object, options)
  }

  public static function create(object : entity.Document, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.document.documentmodel.Document {
    return new gw.integration.document.production.gxmodel.document.documentmodel.Document(object, labels, throughLabels)
  }

  public static function create(object : entity.Document, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.document.documentmodel.Document {
    return new gw.integration.document.production.gxmodel.document.documentmodel.Document(object, options, labels, throughLabels)
  }

}