package gw.exportimport.resolver

uses gw.api.locale.DisplayKey
uses gw.api.util.StateJurisdictionMappingUtil
uses gw.exportimport.ColumnInfo
uses gw.exportimport.CellData
uses gw.exportimport.ImportMetaData

uses java.util.Map
uses gw.api.extension.ExtensionInterfaces

/**
 * Resolves the leaf of a {@link ColumnDataResolver} path as a
 * {@link CPClassCode}. This exports the {@link CPClassCode#Code} value
 * and resolves it back to a <code>CPClassCode</code> on import.
 */
@Export
class CPClassCodeColumnDataResolver extends AbstractColumnDataResolver<CPClassCode> {

  construct(aColumnInfo : ColumnInfo) {
    super(aColumnInfo)
  }

  override function resolveCellValue(bean : KeyableBean) : Object {
    var resolvedBean = resolveBean(bean)
    if (resolvedBean typeis CPClassCode) {
      return resolvedBean.Code
    }
    return null
  }

  override function calculateCellValue(bean : KeyableBean, cellData : CellData, metaData : ImportMetaData, dependentData : Map<String, Object>) : CPClassCode {
    var period = (bean as EffDated).BranchUntyped as PolicyPeriod
    if (cellData.Data.NotBlank) {
      var searchCriteria = ExtensionInterfaces.ICPClassCodeSearchCriteriaFactory.newInstance()
      searchCriteria.Code = cellData.Data

      var state = dependentData["State"] as State
      if (state == null) {
        createIssue(bean, cellData, metaData, DisplayKey.get("Import.Validation.Errors.MissingDependentDataState"))
      }

      var jurisdiction = StateJurisdictionMappingUtil.getJurisdictionMappingForState(state)
      searchCriteria.EffectiveAsOfDate = ExtensionInterfaces.IPolicyPeriodExtensions.getCPLine(period).getReferenceDateForCurrentJob(jurisdiction)

      var searchResults = searchCriteria.performSearch()
      if (searchResults.Empty) {
        createIssue(bean, cellData, metaData, DisplayKey.get("Import.Validation.Errors.NoClassCodeFound", cellData.Data, jurisdiction))
      }
      return searchResults.FirstResult
    }
    return null
  }
}