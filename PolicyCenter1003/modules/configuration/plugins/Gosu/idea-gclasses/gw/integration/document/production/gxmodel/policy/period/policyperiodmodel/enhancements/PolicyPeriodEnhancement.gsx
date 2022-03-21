package gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PolicyPeriodEnhancement : gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod {
  public static function create(object : entity.PolicyPeriod, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod {
    return new gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod(object, labels)
  }

  public static function create(object : entity.PolicyPeriod, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod {
    return new gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod(object, options, labels)
  }

  public static function create(object : entity.PolicyPeriod) : gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod {
    return new gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod(object)
  }

  public static function create(object : entity.PolicyPeriod, options : gw.api.gx.GXOptions) : gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod {
    return new gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod(object, options)
  }

  public static function create(object : entity.PolicyPeriod, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod {
    return new gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod(object, labels, throughLabels)
  }

  public static function create(object : entity.PolicyPeriod, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod {
    return new gw.integration.document.production.gxmodel.policy.period.policyperiodmodel.PolicyPeriod(object, options, labels, throughLabels)
  }

}