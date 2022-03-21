package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/question/QuestionModalInput.BooleanRadio.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class QuestionModalInput_BooleanRadio extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($question :  gw.api.productmodel.Question, $answerContainer :  AnswerContainer, $onChangeBlock :  block()) : void {
    __widgetOf(this, pcf.QuestionModalInput_BooleanRadio, SECTION_WIDGET_CLASS).setVariables(false, {$question, $answerContainer, $onChangeBlock})
  }
  
  function refreshVariables ($question :  gw.api.productmodel.Question, $answerContainer :  AnswerContainer, $onChangeBlock :  block()) : void {
    __widgetOf(this, pcf.QuestionModalInput_BooleanRadio, SECTION_WIDGET_CLASS).setVariables(true, {$question, $answerContainer, $onChangeBlock})
  }
  
  
}