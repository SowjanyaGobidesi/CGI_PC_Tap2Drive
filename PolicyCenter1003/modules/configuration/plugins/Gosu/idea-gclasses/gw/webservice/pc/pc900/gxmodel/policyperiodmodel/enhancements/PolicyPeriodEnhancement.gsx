package gw.webservice.pc.pc900.gxmodel.policyperiodmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PolicyPeriodEnhancement : gw.webservice.pc.pc900.gxmodel.policyperiodmodel.PolicyPeriod {
  public static function create(object : entity.PolicyPeriod) : gw.webservice.pc.pc900.gxmodel.policyperiodmodel.PolicyPeriod {
    return new gw.webservice.pc.pc900.gxmodel.policyperiodmodel.PolicyPeriod(object)
  }

  public static function create(object : entity.PolicyPeriod, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.policyperiodmodel.PolicyPeriod {
    return new gw.webservice.pc.pc900.gxmodel.policyperiodmodel.PolicyPeriod(object, options)
  }

}