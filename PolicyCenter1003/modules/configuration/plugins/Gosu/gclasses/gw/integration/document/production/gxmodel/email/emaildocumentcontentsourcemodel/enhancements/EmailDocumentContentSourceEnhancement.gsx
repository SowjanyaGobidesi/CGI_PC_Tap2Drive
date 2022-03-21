package gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement EmailDocumentContentSourceEnhancement : gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource {
  public static function create(object : gw.integration.document.production.dto.EmailDocumentContentSource, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource {
    return new gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource(object, labels)
  }

  public static function create(object : gw.integration.document.production.dto.EmailDocumentContentSource, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource {
    return new gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource(object, options, labels)
  }

  public static function create(object : gw.integration.document.production.dto.EmailDocumentContentSource) : gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource {
    return new gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource(object)
  }

  public static function create(object : gw.integration.document.production.dto.EmailDocumentContentSource, options : gw.api.gx.GXOptions) : gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource {
    return new gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource(object, options)
  }

  public static function create(object : gw.integration.document.production.dto.EmailDocumentContentSource, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource {
    return new gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource(object, labels, throughLabels)
  }

  public static function create(object : gw.integration.document.production.dto.EmailDocumentContentSource, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource {
    return new gw.integration.document.production.gxmodel.email.emaildocumentcontentsourcemodel.EmailDocumentContentSource(object, options, labels, throughLabels)
  }

}