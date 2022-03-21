package gw.webservice.pc.pc1000.gxmodel.documentmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement DocumentEnhancement : gw.webservice.pc.pc1000.gxmodel.documentmodel.Document {
  public static function create(object : entity.Document) : gw.webservice.pc.pc1000.gxmodel.documentmodel.Document {
    return new gw.webservice.pc.pc1000.gxmodel.documentmodel.Document(object)
  }

  public static function create(object : entity.Document, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.documentmodel.Document {
    return new gw.webservice.pc.pc1000.gxmodel.documentmodel.Document(object, options)
  }

}