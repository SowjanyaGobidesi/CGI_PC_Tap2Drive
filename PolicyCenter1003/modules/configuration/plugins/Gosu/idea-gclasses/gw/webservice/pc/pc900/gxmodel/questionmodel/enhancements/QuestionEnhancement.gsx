package gw.webservice.pc.pc900.gxmodel.questionmodel.enhancements

@javax.annotation.Generated("gw.xml.codegen.XmlCodeGenerator")
enhancement QuestionEnhancement : gw.webservice.pc.pc900.gxmodel.questionmodel.Question {
  public static function create(object : gw.api.productmodel.Question) : gw.webservice.pc.pc900.gxmodel.questionmodel.Question {
    return new gw.webservice.pc.pc900.gxmodel.questionmodel.Question(object)
  }

  public static function create(object : gw.api.productmodel.Question, options : gw.api.gx.GXOptions) : gw.webservice.pc.pc900.gxmodel.questionmodel.Question {
    return new gw.webservice.pc.pc900.gxmodel.questionmodel.Question(object, options)
  }

}