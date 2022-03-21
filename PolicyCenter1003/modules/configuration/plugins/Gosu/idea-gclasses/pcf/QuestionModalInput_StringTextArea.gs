package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/question/QuestionModalInput.StringTextArea.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class QuestionModalInput_StringTextArea extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($question :  gw.api.productmodel.Question, $answerContainer :  AnswerContainer, $onChangeBlock :  block()) : void {
    __widgetOf(this, pcf.QuestionModalInput_StringTextArea, SECTION_WIDGET_CLASS).setVariables(false, {$question, $answerContainer, $onChangeBlock})
  }
  
  function refreshVariables ($question :  gw.api.productmodel.Question, $answerContainer :  AnswerContainer, $onChangeBlock :  block()) : void {
    __widgetOf(this, pcf.QuestionModalInput_StringTextArea, SECTION_WIDGET_CLASS).setVariables(true, {$question, $answerContainer, $onChangeBlock})
  }
  
  
}