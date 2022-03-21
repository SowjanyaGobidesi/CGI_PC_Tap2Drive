package gw.webservice.pc.pc900.gxmodel.ratefactormodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement RateFactorEnhancement : gw.webservice.pc.pc900.gxmodel.ratefactormodel.RateFactor {
  public static function create(object : entity.RateFactor) : gw.webservice.pc.pc900.gxmodel.ratefactormodel.RateFactor {
    return new gw.webservice.pc.pc900.gxmodel.ratefactormodel.RateFactor(object)
  }

  public static function create(object : entity.RateFactor, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.ratefactormodel.RateFactor {
    return new gw.webservice.pc.pc900.gxmodel.ratefactormodel.RateFactor(object, options)
  }

}