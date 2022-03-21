package gw.webservice.pc.pc1000.gxmodel.quotingpolicyperiodmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PolicyPeriodEnhancement : gw.webservice.pc.pc1000.gxmodel.quotingpolicyperiodmodel.PolicyPeriod {
  public static function create(object : entity.PolicyPeriod) : gw.webservice.pc.pc1000.gxmodel.quotingpolicyperiodmodel.PolicyPeriod {
    return new gw.webservice.pc.pc1000.gxmodel.quotingpolicyperiodmodel.PolicyPeriod(object)
  }

  public static function create(object : entity.PolicyPeriod, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.quotingpolicyperiodmodel.PolicyPeriod {
    return new gw.webservice.pc.pc1000.gxmodel.quotingpolicyperiodmodel.PolicyPeriod(object, options)
  }

}