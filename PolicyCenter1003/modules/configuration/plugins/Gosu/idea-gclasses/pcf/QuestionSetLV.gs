package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/question/QuestionSetLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class QuestionSetLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($questionSet :  gw.api.productmodel.QuestionSet, $answerContainer :  AnswerContainer, $onChangeBlock :  block()) : void {
    __widgetOf(this, pcf.QuestionSetLV, SECTION_WIDGET_CLASS).setVariables(false, {$questionSet, $answerContainer, $onChangeBlock})
  }
  
  function refreshVariables ($questionSet :  gw.api.productmodel.QuestionSet, $answerContainer :  AnswerContainer, $onChangeBlock :  block()) : void {
    __widgetOf(this, pcf.QuestionSetLV, SECTION_WIDGET_CLASS).setVariables(true, {$questionSet, $answerContainer, $onChangeBlock})
  }
  
  
}