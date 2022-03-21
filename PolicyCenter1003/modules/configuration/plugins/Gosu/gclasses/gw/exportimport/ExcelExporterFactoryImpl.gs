package gw.exportimport

@Export
class ExcelExporterFactoryImpl implements IExcelExporterFactory {
  override function newInstance(exportData: ExportData<KeyableBean>, listener: RowProcessedListener): ExcelExporterBase {
    return new ExcelExporter(exportData, listener)
  }
}