package gw.webservice.pc.pc1000.gxmodel.businessautolinemodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement BusinessAutoLineEnhancement : gw.webservice.pc.pc1000.gxmodel.businessautolinemodel.BusinessAutoLine {
  public static function create(object : entity.BusinessAutoLine) : gw.webservice.pc.pc1000.gxmodel.businessautolinemodel.BusinessAutoLine {
    return new gw.webservice.pc.pc1000.gxmodel.businessautolinemodel.BusinessAutoLine(object)
  }

  public static function create(object : entity.BusinessAutoLine, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.businessautolinemodel.BusinessAutoLine {
    return new gw.webservice.pc.pc1000.gxmodel.businessautolinemodel.BusinessAutoLine(object, options)
  }

}