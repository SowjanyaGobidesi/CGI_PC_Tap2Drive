package gw.lob.wc.forms

uses java.util.Set
uses gw.forms.FormInferenceContext
uses gw.forms.generic.AbstractSimpleAvailabilityForm
uses java.util.Date

@Export
class Form_7_CA extends AbstractSimpleAvailabilityForm {
  override function isAvailable(context : FormInferenceContext, specialCaseStates: Set<Jurisdiction>) : boolean {
    var line = context.Period.WorkersCompLine
    return line.WCWorkCompExMedExcl != null and line.WCCoveredEmployeeBases.hasMatch(\w -> w.Location.State == TC_CA)
  }

  override function getLookupDate(context: FormInferenceContext, state : Jurisdiction) : Date {
    return context.Period.WorkersCompLine.WCWorkCompExMedExcl.ReferenceDate
  }
}
