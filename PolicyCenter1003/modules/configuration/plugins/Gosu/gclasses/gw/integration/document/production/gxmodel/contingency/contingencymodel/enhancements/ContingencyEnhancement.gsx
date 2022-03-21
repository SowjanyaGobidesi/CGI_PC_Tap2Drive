package gw.integration.document.production.gxmodel.contingency.contingencymodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement ContingencyEnhancement : gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency {
  public static function create(object : entity.Contingency, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency {
    return new gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency(object, labels)
  }

  public static function create(object : entity.Contingency, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency {
    return new gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency(object, options, labels)
  }

  public static function create(object : entity.Contingency) : gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency {
    return new gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency(object)
  }

  public static function create(object : entity.Contingency, options : gw.api.gx.GXOptions) : gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency {
    return new gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency(object, options)
  }

  public static function create(object : entity.Contingency, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency {
    return new gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency(object, labels, throughLabels)
  }

  public static function create(object : entity.Contingency, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency {
    return new gw.integration.document.production.gxmodel.contingency.contingencymodel.Contingency(object, options, labels, throughLabels)
  }

}