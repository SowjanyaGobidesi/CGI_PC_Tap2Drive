package gw.webservice.pc.pc900.gxmodel.clausemodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement ClauseEnhancement : gw.webservice.pc.pc900.gxmodel.clausemodel.Clause {
  public static function create(object : gw.api.domain.Clause) : gw.webservice.pc.pc900.gxmodel.clausemodel.Clause {
    return new gw.webservice.pc.pc900.gxmodel.clausemodel.Clause(object)
  }

  public static function create(object : gw.api.domain.Clause, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.clausemodel.Clause {
    return new gw.webservice.pc.pc900.gxmodel.clausemodel.Clause(object, options)
  }

}