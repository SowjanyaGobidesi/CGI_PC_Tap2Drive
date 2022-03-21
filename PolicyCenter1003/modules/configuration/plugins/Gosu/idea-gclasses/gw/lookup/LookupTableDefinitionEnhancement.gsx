package gw.lookup

uses entity.LookupTableDefinition
uses entity.LookupTableColumn
uses gw.bizrules.util.BizRulesLookupMethods

@Export
enhancement LookupTableDefinitionEnhancement: LookupTableDefinition {

  property get AllInputsAndOutput() : LookupTableColumn[] {
    var allColumns = new ArrayList<LookupTableColumn>()
    if(this.Output != null) {
      allColumns.add(this.Output)
    }
    allColumns.addAll(this.Inputs.toList())
    return allColumns.toTypedArray()
  }

  property get InputListDisplay() : String {
    var orderedInputs = this.Inputs*.ColumnLabel.toList()
    java.util.Collections.sort(orderedInputs, String.CASE_INSENSITIVE_ORDER)
    return orderedInputs.toString().remove("[").remove("]")
  }

  property get IsEntityBackedLookupTable() : boolean {
    return this.EntityName.HasContent
  }

  property get DisplayFactorDataType() : String {
    return this.Output.IType.RelativeName
  }

  property get SourceTableName() : String {
    if (this.IsEntityBackedLookupTable) {
      try {
        return gw.lang.reflect.TypeSystem.getByRelativeName(this.EntityName)?.DisplayName
      } catch (e : ClassNotFoundException) {
        return this.EntityName
      }
    }
    return null
  }

  /**
   * Find rules match the conditions
   *  - Rule is enabled
   *  - If rule deployment is enabled, the latest deployed or head version is using the lookup
   *  - If rule deployment is disabled, the head version is using the lookup
   * @return List of rules
   */
  property get RulesUsingLookup() : List<Rule> {
    return BizRulesLookupMethods.latestDeployedOrHeadVersionUsingLookup(this.TableCode)
  }

  property get IsLookupInUse() : boolean {
    return RulesUsingLookup.HasElements
  }
}
