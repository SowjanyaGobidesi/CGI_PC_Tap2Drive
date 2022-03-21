package gw.webservice.pc.pc900.gxmodel.costmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement CostEnhancement : gw.webservice.pc.pc900.gxmodel.costmodel.Cost {
  public static function create(object : entity.Cost) : gw.webservice.pc.pc900.gxmodel.costmodel.Cost {
    return new gw.webservice.pc.pc900.gxmodel.costmodel.Cost(object)
  }

  public static function create(object : entity.Cost, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.costmodel.Cost {
    return new gw.webservice.pc.pc900.gxmodel.costmodel.Cost(object, options)
  }

}