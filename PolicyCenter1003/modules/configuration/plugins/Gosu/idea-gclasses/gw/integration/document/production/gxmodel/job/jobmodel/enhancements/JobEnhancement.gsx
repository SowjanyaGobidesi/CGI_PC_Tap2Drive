package gw.integration.document.production.gxmodel.job.jobmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement JobEnhancement : gw.integration.document.production.gxmodel.job.jobmodel.Job {
  public static function create(object : entity.Job, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.job.jobmodel.Job {
    return new gw.integration.document.production.gxmodel.job.jobmodel.Job(object, labels)
  }

  public static function create(object : entity.Job, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>) : gw.integration.document.production.gxmodel.job.jobmodel.Job {
    return new gw.integration.document.production.gxmodel.job.jobmodel.Job(object, options, labels)
  }

  public static function create(object : entity.Job) : gw.integration.document.production.gxmodel.job.jobmodel.Job {
    return new gw.integration.document.production.gxmodel.job.jobmodel.Job(object)
  }

  public static function create(object : entity.Job, options : gw.api.gx.GXOptions) : gw.integration.document.production.gxmodel.job.jobmodel.Job {
    return new gw.integration.document.production.gxmodel.job.jobmodel.Job(object, options)
  }

  public static function create(object : entity.Job, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.job.jobmodel.Job {
    return new gw.integration.document.production.gxmodel.job.jobmodel.Job(object, labels, throughLabels)
  }

  public static function create(object : entity.Job, options : gw.api.gx.GXOptions, labels : java.util.Collection<gw.xml.gx.PropertyLabel>, throughLabels : java.util.Collection<java.lang.String>) : gw.integration.document.production.gxmodel.job.jobmodel.Job {
    return new gw.integration.document.production.gxmodel.job.jobmodel.Job(object, options, labels, throughLabels)
  }

}