package gw.webservice.pc.pc1000.gxmodel.modifiermodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement ModifierEnhancement : gw.webservice.pc.pc1000.gxmodel.modifiermodel.Modifier {
  public static function create(object : entity.Modifier) : gw.webservice.pc.pc1000.gxmodel.modifiermodel.Modifier {
    return new gw.webservice.pc.pc1000.gxmodel.modifiermodel.Modifier(object)
  }

  public static function create(object : entity.Modifier, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.modifiermodel.Modifier {
    return new gw.webservice.pc.pc1000.gxmodel.modifiermodel.Modifier(object, options)
  }

}