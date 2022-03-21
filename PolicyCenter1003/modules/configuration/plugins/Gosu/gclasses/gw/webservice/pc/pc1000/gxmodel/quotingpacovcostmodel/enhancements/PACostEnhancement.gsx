package gw.webservice.pc.pc1000.gxmodel.quotingpacovcostmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement PACostEnhancement : gw.webservice.pc.pc1000.gxmodel.quotingpacovcostmodel.PACost {
  public static function create(object : entity.PACost) : gw.webservice.pc.pc1000.gxmodel.quotingpacovcostmodel.PACost {
    return new gw.webservice.pc.pc1000.gxmodel.quotingpacovcostmodel.PACost(object)
  }

  public static function create(object : entity.PACost, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.quotingpacovcostmodel.PACost {
    return new gw.webservice.pc.pc1000.gxmodel.quotingpacovcostmodel.PACost(object, options)
  }

}