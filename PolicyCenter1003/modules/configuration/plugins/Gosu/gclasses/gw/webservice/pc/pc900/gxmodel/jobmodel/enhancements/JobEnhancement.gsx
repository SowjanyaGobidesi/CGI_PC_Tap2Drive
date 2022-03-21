package gw.webservice.pc.pc900.gxmodel.jobmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement JobEnhancement : gw.webservice.pc.pc900.gxmodel.jobmodel.Job {
  public static function create(object : entity.Job) : gw.webservice.pc.pc900.gxmodel.jobmodel.Job {
    return new gw.webservice.pc.pc900.gxmodel.jobmodel.Job(object)
  }

  public static function create(object : entity.Job, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.jobmodel.Job {
    return new gw.webservice.pc.pc900.gxmodel.jobmodel.Job(object, options)
  }

}