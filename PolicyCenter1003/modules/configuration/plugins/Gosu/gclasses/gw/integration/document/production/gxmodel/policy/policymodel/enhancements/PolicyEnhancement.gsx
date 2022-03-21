package gw.integration.document.production.gxmodel.policy.policymodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PolicyEnhancement : gw.integration.document.production.gxmodel.policy.policymodel.Policy {
  public static function create(object : entity.Policy, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.policy.policymodel.Policy {
    return new gw.integration.document.production.gxmodel.policy.policymodel.Policy(object, labels)
  }

  public static function create(object : entity.Policy, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.policy.policymodel.Policy {
    return new gw.integration.document.production.gxmodel.policy.policymodel.Policy(object, options, labels)
  }

  public static function create(object : entity.Policy) : gw.integration.document.production.gxmodel.policy.policymodel.Policy {
    return new gw.integration.document.production.gxmodel.policy.policymodel.Policy(object)
  }

  public static function create(object : entity.Policy, options : gw.api.gx.GXOptions) : gw.integration.document.production.gxmodel.policy.policymodel.Policy {
    return new gw.integration.document.production.gxmodel.policy.policymodel.Policy(object, options)
  }

  public static function create(object : entity.Policy, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.policy.policymodel.Policy {
    return new gw.integration.document.production.gxmodel.policy.policymodel.Policy(object, labels, throughLabels)
  }

  public static function create(object : entity.Policy, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.policy.policymodel.Policy {
    return new gw.integration.document.production.gxmodel.policy.policymodel.Policy(object, options, labels, throughLabels)
  }

}