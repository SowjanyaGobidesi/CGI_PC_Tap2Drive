package gw.rating.worksheet.treenode.builder.populator

uses gw.rating.worksheet.domain.WorksheetConstant
uses java.lang.StringBuilder
uses gw.api.locale.DisplayKey
uses java.util.List

@Export
class WorksheetConstantPopulator extends WorksheetOperandContainerPopulator<WorksheetConstant> {

  override function populateOperandAndValue(operandContainer : WorksheetConstant, operandBuilder : StringBuilder, valueBuilder : StringBuilder, displayArgumentValues : boolean) {
    if (operandContainer.Value typeis List) {
      var values = operandContainer.Value.cast(gw.entity.TypeKey).map(\ tk -> tk.DisplayName)
      operandBuilder.append(DisplayKey.get("Web.Rating.Flow.CalcRoutine.Collection"
          , values.join(DisplayKey.get("Web.Rating.Flow.CalcRoutine.CollectionSeparator"))  ))

      valueBuilder.append(DisplayKey.get("Web.Rating.Flow.CalcRoutine.Collection"
          , values.join(DisplayKey.get("Web.Rating.Flow.CalcRoutine.CollectionSeparator"))  ))

    } else {
      var localizedOperandValue = super.localize(operandContainer)
      operandBuilder.append(localizedOperandValue)
      valueBuilder.append(localizedOperandValue)
    }
  }
}
