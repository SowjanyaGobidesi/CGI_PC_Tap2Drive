package gw.rating.impact

uses gw.api.database.IQueryResult
uses gw.api.database.Query
uses gw.api.database.QuerySelectColumns
uses gw.api.locale.DisplayKey
uses gw.api.path.Paths
uses gw.api.rating.impact.ImpactExportCancelSignal
uses gw.api.upgrade.Coercions
uses gw.api.util.DateUtil
uses gw.rating.RateFlowLogger
uses gw.rating.impact.ImpactTestingWorksheetColumnTypeDef.ImpactTestingWorksheetColumnType
uses gw.rating.rtm.excel.ExcelHeader
uses org.apache.poi.ss.usermodel.FillPatternType
uses org.apache.poi.xssf.usermodel.XSSFCellStyle
uses org.apache.poi.xssf.usermodel.XSSFColor
uses org.apache.poi.xssf.usermodel.XSSFRow
uses org.apache.poi.xssf.usermodel.XSSFSheet
uses org.apache.poi.xssf.usermodel.XSSFWorkbook

uses java.io.ByteArrayInputStream
uses java.io.ByteArrayOutputStream
uses java.math.BigDecimal

@Export
class RatingExportUtil {

  public static final var EXPORT_FILE_PREFIX : String = "ImpactTestResult_"
  public static final var CANCEL_SIGNAL : ImpactExportCancelSignalImpl = new ImpactExportCancelSignalImpl()

  static final var COLUMN_TO_INDEX : Map<ImpactTestingWorksheetColumnType, Integer> = {
      AccountNumber -> 1,
      AccountName -> 2,
      AccountJurisdiction -> 3,
      Product -> 4,
      Offering -> 5,
      Issued -> 6,
      PolicyNumber -> 7,
      PolicyJurisdiction -> 8,
      PeriodStart -> 9,
      PeriodEnd -> 10,
      TermNumber -> 11,
      BaselineTotalCost -> 12,
      ComparisonTotalCost -> 13,
      ProducerCodeOfRecord -> 14,
      ProducerCodeOfService -> 15,
      UWCompany -> 16,
      Coverable -> 17,
      CostDescription -> 18,
      CostType -> 19,
      ActiveRateBook -> 20,
      BaseTermAmount -> 21,
      BaseActualAmount -> 22,
      ComparisonRateBook -> 23,
      ComparisonTermAmount -> 24,
      ComparisonActualAmount -> 25,
      InvalidRate-> 26
    }

  static function getColumnIndex(col : ImpactTestingWorksheetColumnType) : Integer {
    return COLUMN_TO_INDEX.get(col)
  }

  static function getCancelSignal() : ImpactExportCancelSignal{
    return CANCEL_SIGNAL
  }

  static function getExcelAsBytes(iaTestCase : ImpactTestingTestCase, signal : ImpactExportCancelSignal) : byte[] {
    var worksheet = createWorkSheet(DisplayKey.get("Rating.Impact.TableTitle"), iaTestCase, signal)
    var outputByteArray = getByteArray(worksheet)
    return outputByteArray
  }

  static function createWorkSheet(title : String, iaTestCase : ImpactTestingTestCase, signal : ImpactExportCancelSignal) : XSSFSheet {
    var workbook = new XSSFWorkbook()
    var worksheet = workbook.createSheet(title)
    var rowNumber = addHeaderTo(worksheet, iaTestCase)
    var boldStyle = workbook.createCellStyle()
    boldStyle.setFillForegroundColor(new XSSFColor(new java.awt.Color(242, 242, 242)))
    boldStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND)

    addCosts(iaTestCase, worksheet, rowNumber, COLUMN_TO_INDEX, signal, boldStyle)  // could allow user customization of COLUMN_TO_INDEX map
    return worksheet
  }

  static function getInputStream(worksheet : XSSFSheet) : ByteArrayInputStream {
    var outputStream = new ByteArrayOutputStream()
    worksheet.Workbook.write(outputStream)
    var bytearray = outputStream.toByteArray()
    var inputStream = new ByteArrayInputStream(bytearray)
    return inputStream
  }

  static function getByteArray(worksheet : XSSFSheet) : byte[] {
    var outputStream = new ByteArrayOutputStream()
    worksheet.Workbook.write(outputStream)
    return outputStream.toByteArray()
  }

  static function getFileName(iaTestCase : ImpactTestingTestCase) : String {
    return EXPORT_FILE_PREFIX + iaTestCase.Result.UpdateTime.format("yyyyMMddkkmmssSS")
  }

  function generateIAStatistics(iaTestCase : ImpactTestingTestCase) : ImpactTestingStatistics {

    // Refresh the test period status before generating stats.  There's a window of time between this and the previous wizard
    // step where the quoted test periods are not up to date in the wizard's bundle.
    iaTestCase.Periods.each(\testCasePeriod -> testCasePeriod?.TestPeriod?.refresh())

    var impactTestingData : List<ImpactTestingDataPoint> = {}
    iaTestCase.Periods.where(\testCase -> testCase.BaselinePeriod.Status == TC_QUOTED and testCase.TestPeriod.Status == TC_QUOTED)
                      .each(\testCase -> {
                        var data = new ImpactTestingDataPoint(testCase.BaselinePeriod.TotalPremiumRPT.Amount,
                                                              testCase.TestPeriod.TotalPremiumRPT.Amount)

                        impactTestingData.add(data)
                      })
    return generateStatistics(impactTestingData)
  }

  protected static function generateStatistics(data : List<ImpactTestingDataPoint>) : ImpactTestingStatistics {
    var sortedValues = data.sortBy(\diffStat -> diffStat.DiffInValueAsPercent)
    var stats = new ImpactTestingStatistics(
      { new ImpactTestingResultBucket("<50","< -50%",        null, -0.50),
        new ImpactTestingResultBucket("<40","-50% =< -40%", -0.50, -0.40),
        new ImpactTestingResultBucket("<30","-40% =< -30%", -0.40, -0.30),
        new ImpactTestingResultBucket("<20","-30% =< -20%", -0.30, -0.20),
        new ImpactTestingResultBucket("<10","-20% =< -10%", -0.20, -0.10),
        new ImpactTestingResultBucket("<5","-10% =< -5%",   -0.10, -0.05),
        new ImpactTestingResultBucket("<0","-5% =< 0%",     -0.05,  0.00),
        new ImpactTestingResultBucket("0","0%",              0.00,  0.00),
        new ImpactTestingResultBucket(">0","0% < 5%",        0.00,  0.05),
        new ImpactTestingResultBucket(">5","5% =< 10%",      0.05,  0.10),
        new ImpactTestingResultBucket(">10","10% =< 20%",    0.10,  0.20),
        new ImpactTestingResultBucket(">20","20% =< 30%",    0.20,  0.30),
        new ImpactTestingResultBucket(">30","30% =< 40%",    0.30,  0.40),
        new ImpactTestingResultBucket(">40","40% =< 50%",    0.40,  0.50),
        new ImpactTestingResultBucket(">50","50% =<",        0.50,  null) })
    var valueIdx = 0
    var numValues = sortedValues.Count

    for (bucket in stats.Buckets) {
      while ((valueIdx < numValues) and
             bucket.matches(sortedValues[valueIdx].DiffInValueAsPercent)) {
        bucket.Data.add(sortedValues[valueIdx])
        valueIdx++
      }
    }
    return stats
  }


  /**
   * Add the header information, including the following:
   * Date
   * BulkSearchCriteria
   * ID
   */
  private static function addHeaderTo(sheet : XSSFSheet, iaTestCase : ImpactTestingTestCase) : int {
    var i = 0
    addLine(sheet, DateUtil.currentDate().formatDateTime(LONG, LONG), i)
    i++

    i = addSearchCriteria(i, sheet, getCriteriaFrom(iaTestCase))

    addLine(sheet, "", i)
    i++
    addLine(sheet, "", i)
    i++
    return i

  }

  private static function getCriteriaFrom(iaTestCase : ImpactTestingTestCase) : ImpactTestingSearchCriteria {
    if (iaTestCase.SearchCriteria.HasContent) {
     var criteria = new ImpactTestingSearchCriteria()
     new ImpactTestingSearchCriteriaImportExport(criteria)
        .populateFromXML(iaTestCase.SearchCriteria)
     return criteria
   }
   return null
  }

  /**
   * Search criteria are organized in two columns.   This is a utility that allows
   * us to create a data structure describing a column, and then fill it into the sheet.
   */
  static function fillInColumn(rowStart : int, colStart : int,
                               sheet : XSSFSheet, contents : List<Map<Integer, String>>) {
    for (entry in contents index i) {
      var row = sheet.getRow(rowStart + i) ?: sheet.createRow(rowStart + i)
      entry.eachKeyAndValue(\ c, value -> row.createCell(colStart + c).setCellValue(value))
    }
  }

  /**
   * get criteria from test case and format them into the worksheet starting at startLine
   * return index of last line populated
   */
  static function addSearchCriteria(startLine : int, sheet : XSSFSheet, criteria : ImpactTestingSearchCriteria) : int {

    var fmt = \ d : Date -> (d == null ? "-" : d.ShortFormat)
    var row = sheet.createRow(startLine)
    row.createCell(0).setCellValue(DisplayKey.get("Rating.Impact.SearchCriteria"))

    if (criteria == null) { // test case created with no search criteria!
      row.createCell(1).setCellValue(DisplayKey.get("Rating.Impact.Unknown"))
      return startLine + 1
    }

    var leftCol = new LinkedList<Map<Integer, String>>()

    leftCol.add({0 -> DisplayKey.get("Rating.Impact.Products")})
    criteria.Products.each(\ p -> leftCol.add({1 -> p.DisplayName}))
    leftCol.add({0 -> DisplayKey.get("Rating.Impact.Jurisdictions")})
    criteria.Jurisdictions.each(\ j -> leftCol.add({1 -> j.DisplayName}))
    leftCol.add({0->DisplayKey.get("Rating.Impact.ProducerCodes")})
    criteria.ProducerCodes.each(\c -> leftCol.add({1 -> c.Code}))

    var rightCol = new LinkedList<Map<Integer, String>>()
    if (criteria.PostalCodeRangeMin != null) {
      rightCol.add({0 -> DisplayKey.get("Rating.Impact.PostalCodes")})
      rightCol.add({1 -> criteria.PostalCodeRangeMin, 0 -> DisplayKey.get("Rating.Impact.Min")})
      rightCol.add({1 -> criteria.PostalCodeRangeMax, 0 -> DisplayKey.get("Rating.Impact.Max")})
    } else {
      rightCol.add({1 -> criteria.PostalCodesList, 0 -> DisplayKey.get("Rating.Impact.PostalCodes")})
      if (criteria.UseStartsWithForPostalCodes) {
        rightCol.add({0 -> DisplayKey.get("Rating.Impact.UsesStartsWith")})
      }
    }
    rightCol.add({})
    rightCol.add({0 -> DisplayKey.get("Rating.Impact.EffectiveDate")})
    rightCol.add({1 -> fmt(criteria.EffectiveDateMin), 0 -> DisplayKey.get("Rating.Impact.Start")})
    rightCol.add({1 -> fmt(criteria.EffectiveDateMax), 0 -> DisplayKey.get("Rating.Impact.End")})
    rightCol.add({})
    rightCol.add({0 -> DisplayKey.get("Rating.Impact.ExpirationDate")})
    rightCol.add({1 -> fmt(criteria.ExpirationDateMin), 0 -> DisplayKey.get("Rating.Impact.Start")})
    rightCol.add({1 -> fmt(criteria.ExpirationDateMax), 0 -> DisplayKey.get("Rating.Impact.End")})
    rightCol.add({})
    rightCol.add({1 -> fmt(criteria.InForceOnDate), 0 -> DisplayKey.get("Rating.Impact.InForceOn")})

    fillInColumn(startLine + 1, 1, sheet, leftCol)
    fillInColumn(startLine + 1, 4, sheet, rightCol)

    return startLine + 1 + java.lang.Math.max(leftCol.size(), rightCol.size())
  }

  private static function addLine(sheet: XSSFSheet, line: String, ind: int) {
    var sheetRow = sheet.createRow(ExcelHeader.RATE_TABLE_HEADER_START_ROW + ind)
    var infoCell = sheetRow.createCell(0)
    infoCell.setCellValue(line)
  }

  private static function fillInRow(row : XSSFRow, boldStyle : XSSFCellStyle, colToColIndex : Map<ImpactTestingWorksheetColumnType, Integer>, data : Map<ImpactTestingWorksheetColumnType, Object>) {
    data.eachKeyAndValue(\ k, v -> {
      var colIndex = colToColIndex.get(k) as short
      if (v != null) {
        // how can colIndex be null?  (a) programmer error; (b) future functionality if we allow user to specify which columns to output
        var cell = row.createCell(colIndex)
        // POI is picky about its data format
        switch (typeof v) {
          case BigDecimal:
          case Integer:
            cell.setCellValue(Coercions.makePDoubleFrom(v))
            break
          case Date:
            cell.setCellValue(v)
            break
          case Boolean:
              cell.setCellValue(Coercions.makePBooleanFrom(v))
              break
          default:
            cell.setCellValue(v.toString())
        }

        if (boldStyle != null)
          cell.setCellStyle(boldStyle)
      }
    })
  }


  private static function addCosts(testCase : ImpactTestingTestCase, sheet : XSSFSheet, rowNumber : int, colToColIndex : Map<ImpactTestingWorksheetColumnType, Integer>,
                                   signal : ImpactExportCancelSignal, boldStyle : XSSFCellStyle) {
    var queryResult = getOrderedIAPeriodsToExport(testCase)
    if (queryResult.Empty)
      return

   //populate, add to file

    var dataMap : Map<ImpactTestingWorksheetColumnType, Object> = {
      AccountNumber -> ImpactTestingWorksheetColumnTypeDef.getLabel(AccountNumber),
      AccountName -> ImpactTestingWorksheetColumnTypeDef.getLabel(AccountName),
      AccountJurisdiction -> ImpactTestingWorksheetColumnTypeDef.getLabel(AccountJurisdiction),
      Product -> ImpactTestingWorksheetColumnTypeDef.getLabel(Product),
      Offering -> ImpactTestingWorksheetColumnTypeDef.getLabel(Offering),
      Issued -> ImpactTestingWorksheetColumnTypeDef.getLabel(Issued),
      PolicyNumber -> ImpactTestingWorksheetColumnTypeDef.getLabel(PolicyNumber),
      PolicyJurisdiction -> ImpactTestingWorksheetColumnTypeDef.getLabel(PolicyJurisdiction),
      PeriodStart -> ImpactTestingWorksheetColumnTypeDef.getLabel(PeriodStart),
      PeriodEnd -> ImpactTestingWorksheetColumnTypeDef.getLabel(PeriodEnd),
      TermNumber -> ImpactTestingWorksheetColumnTypeDef.getLabel(TermNumber),
      BaselineTotalCost -> ImpactTestingWorksheetColumnTypeDef.getLabel(BaselineTotalCost),
      ComparisonTotalCost -> ImpactTestingWorksheetColumnTypeDef.getLabel(ComparisonTotalCost),
      ProducerCodeOfRecord -> ImpactTestingWorksheetColumnTypeDef.getLabel(ProducerCodeOfRecord),
      ProducerCodeOfService -> ImpactTestingWorksheetColumnTypeDef.getLabel(ProducerCodeOfService),
      UWCompany -> ImpactTestingWorksheetColumnTypeDef.getLabel(UWCompany),
      Coverable -> ImpactTestingWorksheetColumnTypeDef.getLabel(Coverable),
      CostDescription -> ImpactTestingWorksheetColumnTypeDef.getLabel(CostDescription),
      CostType -> ImpactTestingWorksheetColumnTypeDef.getLabel(CostType),
      ActiveRateBook -> ImpactTestingWorksheetColumnTypeDef.getLabel(ActiveRateBook),
      BaseTermAmount -> ImpactTestingWorksheetColumnTypeDef.getLabel(BaseTermAmount),
      BaseActualAmount -> ImpactTestingWorksheetColumnTypeDef.getLabel(BaseActualAmount),
      ComparisonRateBook -> ImpactTestingWorksheetColumnTypeDef.getLabel(ComparisonRateBook),
      ComparisonTermAmount -> ImpactTestingWorksheetColumnTypeDef.getLabel(ComparisonTermAmount),
      ComparisonActualAmount -> ImpactTestingWorksheetColumnTypeDef.getLabel(ComparisonActualAmount),
      InvalidRate-> ImpactTestingWorksheetColumnTypeDef.getLabel(InvalidRate)
    }

    var row = sheet.createRow(rowNumber)
    fillInRow(row, boldStyle, COLUMN_TO_INDEX, dataMap)

    var iter = queryResult.iterator()
    var lastAcctNumber = ""
    var lastPolicyNumber = ""
    var lastTermNumber : Integer = null
    var numPeriods = queryResult.Count
    for (iaPeriod in iter index processedPeriods) {

      if (signal.Cancel) {
        RateFlowLogger.Logger.info("Cancelling impact testing excel export")
        break
      }

      testCase.Result.CompletionPercentage = (100*processedPeriods) / numPeriods
      testCase.Result.Bundle.commit()

      dataMap.clear()

      if (iaPeriod.AccountNumber != lastAcctNumber) {
        dataMap.put(AccountNumber, iaPeriod.AccountNumber)
        dataMap.put(AccountName, iaPeriod.BaselinePeriod.Policy.Account.AccountHolderContact.DisplayName)
        dataMap.put(AccountJurisdiction, iaPeriod.BaselinePeriod.Policy.Account.PrimaryLocation.State)
        lastAcctNumber = iaPeriod.AccountNumber
      }

      if (iaPeriod.PolicyNumber != lastPolicyNumber or iaPeriod.BaselinePeriod.TermNumber != lastTermNumber) {
        dataMap.put(Product, iaPeriod.BaselinePeriod.Policy.Product)
        dataMap.put(Offering, iaPeriod.BaselinePeriod.Offering) //TODO check multi lines
        dataMap.put(Issued, iaPeriod.BaselinePeriod.Policy.IssueDate.ShortFormat)
        dataMap.put(PolicyNumber, iaPeriod.BaselinePeriod.PolicyNumber)
        dataMap.put(PolicyJurisdiction, iaPeriod.BaselinePeriod.BaseState)
        dataMap.put(PeriodStart, iaPeriod.BaselinePeriod.PeriodStart.ShortFormat)
        dataMap.put(PeriodEnd, iaPeriod.BaselinePeriod.PeriodEnd.ShortFormat)
        dataMap.put(TermNumber, iaPeriod.BaselinePeriod.TermNumber)
        dataMap.put(BaselineTotalCost, iaPeriod.BaselinePeriod.TotalCostRPT.Amount)
        dataMap.put(ComparisonTotalCost, iaPeriod.TestPeriod.TotalCostRPT.Amount)
        dataMap.put(ProducerCodeOfRecord, iaPeriod.BaselinePeriod.ProducerCodeOfRecord)
        dataMap.put(ProducerCodeOfService, iaPeriod.BaselinePeriod.Policy.ProducerCodeOfService)
        dataMap.put(UWCompany, iaPeriod.BaselinePeriod.UWCompany)
        lastPolicyNumber = iaPeriod.PolicyNumber
        lastTermNumber = iaPeriod.BaselinePeriod.TermNumber
      }

      doCostsForOnePeriod(iaPeriod.BaselinePeriod, iaPeriod.TestPeriod, \ m -> {
        dataMap.putAll(m) // fill in cost-related stuff
        rowNumber++
        row = sheet.createRow(rowNumber)
        fillInRow(row, null, colToColIndex, dataMap)
        dataMap.clear()
      })
    }

    colToColIndex.eachValue(\ i -> sheet.autoSizeColumn(i))
    sheet.setColumnWidth(0, 1024)
  }

  private static function doCostsForOnePeriod(baselinePeriod : PolicyPeriod, comparison : PolicyPeriod, addRow : block(m : Map<ImpactTestingWorksheetColumnType, Object>)) {
    if (not baselinePeriod.ValidRate and not comparison.ValidRate) {
      addRow({InvalidRate-> DisplayKey.get("Web.Rating.ImpactTesting.NotRatedBaselinePeriod")})
      return
    }

    var costs = baselinePeriod.AllCosts.toList()
    if (comparison.AllCosts.HasElements) {
      costs.addAll(comparison.AllCosts)
    }

    var costMap = costs.partition(\ c -> c.CostKey)
    var orderedList = costMap.Values.orderBy(\ m -> m.first().CoverableName).thenBy(\ m -> m.first().DisplayName)
    orderedList.each(\ s -> {
      var dataMap : Map<ImpactTestingWorksheetColumnType, Object> = {}
      var baseCost = s.singleWhere(\ cc -> cc.BranchUntyped == baselinePeriod)

      if (comparison.ValidRate) {
        var comparisonCost = s.singleWhere(\ cc -> cc.BranchUntyped == comparison)
        dataMap.put(Coverable, comparisonCost.Coverable.DisplayName)
        dataMap.put(CostDescription, comparisonCost.DisplayName)
        dataMap.put(CostType, comparisonCost.ChargePattern)
        dataMap.put(ComparisonRateBook, comparisonCost.RateBook.DisplayName)
        dataMap.put(ComparisonTermAmount, comparisonCost.ActualTermAmount.Amount)
        dataMap.put(ComparisonActualAmount, comparisonCost.ActualAmount.Amount)
      }
      else {
        dataMap.put(InvalidRate, DisplayKey.get("Web.Rating.ImpactTesting.NotRatedTestPeriod"))
      }

      if (baselinePeriod.ValidRate) {
        dataMap.put(Coverable, baseCost.Coverable.DisplayName)
        dataMap.put(CostDescription, baseCost.DisplayName)
        dataMap.put(CostType, baseCost.ChargePattern)
        dataMap.put(ActiveRateBook, baseCost.RateBook.DisplayName)
        dataMap.put(BaseTermAmount, baseCost.ActualTermAmount.Amount)
        dataMap.put(BaseActualAmount, baseCost.ActualAmount.Amount)
      }
      else {
        dataMap.put(InvalidRate, DisplayKey.get("Web.Rating.ImpactTesting.NotRatedBaselinePeriod"))
      }

      addRow(dataMap)
    })
  }

  static function getOrderedIAPeriodsToExport(testCase : ImpactTestingTestCase) : IQueryResult<ImpactTestingPolicyPeriod, ImpactTestingPolicyPeriod> {
    var q = Query.make(ImpactTestingPolicyPeriod)
    q.compare(ImpactTestingPolicyPeriod#TestCase, Equals, testCase)
    // TODO: also denorm term number
    return q.select().orderBy(QuerySelectColumns.path(Paths.make(ImpactTestingPolicyPeriod#AccountNumber))).thenBy(QuerySelectColumns.path(Paths.make(ImpactTestingPolicyPeriod#PolicyNumber))).thenBy(QuerySelectColumns.path(Paths.make(ImpactTestingPolicyPeriod#BaselinePeriod, PolicyPeriod#TermNumber)))
  }

}
