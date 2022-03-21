package gw.webservice.pc.pc1000.gxmodel.questionsetmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement QuestionSetEnhancement : gw.webservice.pc.pc1000.gxmodel.questionsetmodel.QuestionSet {
  public static function create(object : gw.api.productmodel.QuestionSet) : gw.webservice.pc.pc1000.gxmodel.questionsetmodel.QuestionSet {
    return new gw.webservice.pc.pc1000.gxmodel.questionsetmodel.QuestionSet(object)
  }

  public static function create(object : gw.api.productmodel.QuestionSet, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc1000.gxmodel.questionsetmodel.QuestionSet {
    return new gw.webservice.pc.pc1000.gxmodel.questionsetmodel.QuestionSet(object, options)
  }

}