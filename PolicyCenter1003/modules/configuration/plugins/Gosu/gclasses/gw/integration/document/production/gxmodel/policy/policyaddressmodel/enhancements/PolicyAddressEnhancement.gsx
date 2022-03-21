package gw.integration.document.production.gxmodel.policy.policyaddressmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PolicyAddressEnhancement : gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress {
  public static function create(object : entity.PolicyAddress, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress {
    return new gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress(object, labels)
  }

  public static function create(object : entity.PolicyAddress, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress {
    return new gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress(object, options, labels)
  }

  public static function create(object : entity.PolicyAddress) : gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress {
    return new gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress(object)
  }

  public static function create(object : entity.PolicyAddress, options : gw.api.gx.GXOptions) : gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress {
    return new gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress(object, options)
  }

  public static function create(object : entity.PolicyAddress, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress {
    return new gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress(object, labels, throughLabels)
  }

  public static function create(object : entity.PolicyAddress, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress {
    return new gw.integration.document.production.gxmodel.policy.policyaddressmodel.PolicyAddress(object, options, labels, throughLabels)
  }

}