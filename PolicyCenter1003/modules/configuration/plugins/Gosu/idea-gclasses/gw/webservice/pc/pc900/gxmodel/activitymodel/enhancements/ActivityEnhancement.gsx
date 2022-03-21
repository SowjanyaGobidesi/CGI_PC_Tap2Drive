package gw.webservice.pc.pc900.gxmodel.activitymodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement ActivityEnhancement : gw.webservice.pc.pc900.gxmodel.activitymodel.Activity {
  public static function create(object : entity.Activity) : gw.webservice.pc.pc900.gxmodel.activitymodel.Activity {
    return new gw.webservice.pc.pc900.gxmodel.activitymodel.Activity(object)
  }

  public static function create(object : entity.Activity, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.activitymodel.Activity {
    return new gw.webservice.pc.pc900.gxmodel.activitymodel.Activity(object, options)
  }

}