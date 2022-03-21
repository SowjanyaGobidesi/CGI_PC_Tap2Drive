package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/question/QuestionSetsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class QuestionSetsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($questionSets :  gw.api.productmodel.QuestionSet[], $answerContainer :  AnswerContainer, $onChangeBlock :  block()) : void {
    __widgetOf(this, pcf.QuestionSetsDV, SECTION_WIDGET_CLASS).setVariables(false, {$questionSets, $answerContainer, $onChangeBlock})
  }
  
  function refreshVariables ($questionSets :  gw.api.productmodel.QuestionSet[], $answerContainer :  AnswerContainer, $onChangeBlock :  block()) : void {
    __widgetOf(this, pcf.QuestionSetsDV, SECTION_WIDGET_CLASS).setVariables(true, {$questionSets, $answerContainer, $onChangeBlock})
  }
  
  
}