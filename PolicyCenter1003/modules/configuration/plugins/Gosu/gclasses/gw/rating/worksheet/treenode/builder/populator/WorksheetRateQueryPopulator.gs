package gw.rating.worksheet.treenode.builder.populator
uses gw.api.locale.DisplayKey
uses gw.rating.worksheet.treenode.builder.WorksheetPopulatorUtil
uses gw.rating.worksheet.domain.WorksheetOperand
uses gw.rating.worksheet.treenode.builder.populator.WorksheetOperandContainerPopulator
uses gw.rating.worksheet.domain.WorksheetRateQuery
uses java.lang.StringBuilder

@Export
class WorksheetRateQueryPopulator extends WorksheetOperandContainerPopulator<WorksheetRateQuery> {

  override function populateOperandAndValue(operandContainer : WorksheetRateQuery, operandBuilder : StringBuilder, valueBuilder : StringBuilder, displayArgumentValues : boolean) {
    operandBuilder.append(DisplayKey.get("Web.Policy.RatingWorksheet.Node.Table") + "${operandContainer.TableName}")
    switch(operandContainer.Type) {
      case WorksheetRateQuery.MultiFactorType:
        operandBuilder.append(".${operandContainer.FactorName}")
        break  
      case WorksheetRateQuery.MultiFactorVarType:
        var multiFactorVarLabel = DisplayKey.get("Web.Policy.RatingWorksheet.Node.MultiFactorVariable")
        operandBuilder.append(".[${multiFactorVarLabel}]")
        break
    }
    
    if (displayArgumentValues) {
      if (operandContainer.FactorSource.HasContent) {
        valueBuilder.append("[")
        valueBuilder.append(operandContainer.FactorSource)
        valueBuilder.append("] ")
      }
      valueBuilder.append("(")
      for (op in operandContainer.WorksheetOperands index i) {
        WorksheetPopulatorUtil.populate(op, new StringBuilder(), valueBuilder, displayArgumentValues)
        if (i < operandContainer.WorksheetOperands.Count - 1) {
          valueBuilder.append(", ")  
        }
      }
      valueBuilder.append(") = ${super.localize(operandContainer)}")
    } else {
      valueBuilder.append(super.localize(operandContainer))
    }
  }
}
