package gw.rating.rtm.excel

uses gw.api.system.PCLoggerCategory
uses gw.util.Pair
uses org.apache.poi.ss.usermodel.DataFormatter
uses org.apache.poi.xssf.usermodel.XSSFSheet

@Export
class ExcelAutoSizer {
  static public final var TABLE_AUTO_SIZE_THRESHOLD : int = 1000

  /*
 * Because POI autosize is slow if the excel file has alot of rows,
 * this is a faster version of autosize, except the autosize is not as
 * perfect as the POI autosize.
 * That is why it has all these magic numbers
 */
  static function autoSizeForLargeRateTables( worksheet : XSSFSheet) {
    for (columnIndex in 0..|worksheet.RateTableColumnCount) {
      worksheet.setColumnWidth(columnIndex, getWidth(worksheet, columnIndex))
    }
  }

  private static function getWidth(worksheet : XSSFSheet, columnIndex : int) : int {
    var valueAndRowIndex = getCellValueAndRow(worksheet, columnIndex)
    if (valueAndRowIndex == null) {
      PCLoggerCategory.RATING.warn("Did not autosize correctly did not get row or cell value")
      return 2350 //This is the default excel column width 8.43
    }

    var cellFont = worksheet.getRow(valueAndRowIndex.Second.intValue()).getCell(columnIndex).getCellStyle().getFont()
    var fontNameAndSize = cellFont.getFontName() + cellFont.getFontHeightInPoints()
    var width = Float.valueOf(0)
    for (i in 0..|valueAndRowIndex.First.length) {
      var letter = valueAndRowIndex.First.charAt(i)

      width += _autoSizeFontHashMap.getOrDefault(letter + fontNameAndSize, 1.400)
    }

    //adding two character padding
    width += _autoSizeFontHashMap.getOrDefault("W" + fontNameAndSize, 1.400) * 2 //1.4 is W character width default

    return (width.floatValue() * 256) as int
  }

  private static function getCellValueAndRow(worksheet : XSSFSheet, columnIndex: int) : Pair<String, Integer> {
    var maxCharacter = 0
    var dataFormatter = new DataFormatter()
    var maxRowIndex = ExcelHeader.RATE_TABLE_HEADER_END_ROW
    var value = ""
    for (rowIndex in ExcelHeader.RATE_TABLE_HEADER_END_ROW..worksheet.getLastRowNum() ) {
      var row = worksheet.getRow(rowIndex)
      var cell = row.getCell(columnIndex)
      var cellValue = dataFormatter.formatCellValue(cell)
      if (cellValue == null) {
        continue
      }

      if (cellValue.length > maxCharacter) {
        maxRowIndex = rowIndex
        maxCharacter = cellValue.length
        value = cellValue
      }
    }

    var rowIndex = Integer.valueOf(maxRowIndex)
    return new Pair<String, Integer>(value, rowIndex)
  }


  //These magic numbers were reverse engineered using Excel 2013 using this formula:
  //width = Truncate([{Number of Visible Characters} * {Maximum Digit Width} + {5 pixel padding}]/{Maximum Digit Width}*256)/256
  //Calibri is the default font
  private static final var _autoSizeFontHashMap : Map<String, Float>  = {
      // Calibri font size 12 lower case
      "aCalibri12" -> 1.086,    "bCalibri12" -> 1.086,    "cCalibri12" -> 1.058,    "dCalibri12" -> 1.086,
      "eCalibri12" -> 1.086,    "fCalibri12" -> 1.000,    "gCalibri12" -> 1.086,    "hCalibri12" -> 1.086,
      "iCalibri12" -> 0.984,    "jCalibri12" -> 0.984,    "kCalibri12" -> 1.058,    "lCalibri12" -> 0.984,
      "mCalibri12" -> 1.200,    "nCalibri12" -> 1.086,    "oCalibri12" -> 1.086,    "pCalibri12" -> 1.086,
      "qCalibri12" -> 1.086,    "rCalibri12" -> 1.000,    "sCalibri12" -> 1.058,    "tCalibri12" -> 1.000,
      "uCalibri12" -> 1.086,    "vCalibri12" -> 1.058,    "wCalibri12" -> 1.172,    "xCalibri12" -> 1.058,
      "yCalibri12" -> 1.058,    "zCalibri12" -> 1.028,

      // Calibri font size 12 uppercase
      "ACalibri12" -> 1.114,    "BCalibri12" -> 1.114,    "CCalibri12" -> 1.114,    "DCalibri12" -> 1.142,
      "ECalibri12" -> 1.086,    "FCalibri12" -> 1.058,    "GCalibri12" -> 1.142,    "HCalibri12" -> 1.142,
      "ICalibri12" -> 0.984,    "JCalibri12" -> 1.000,    "KCalibri12" -> 1.086,    "LCalibri12" -> 1.058,
      "MCalibri12" -> 1.228,    "NCalibri12" -> 1.142,    "OCalibri12" -> 1.172,    "PCalibri12" -> 1.086,
      "QCalibri12" -> 1.172,    "RCalibri12" -> 1.114,    "SCalibri12" -> 1.058,    "TCalibri12" -> 1.086,
      "UCalibri12" -> 1.142,    "VCalibri12" -> 1.114,    "WCalibri12" -> 1.258,    "XCalibri12" -> 1.086,
      "YCalibri12" -> 1.086,    "ZCalibri12" -> 1.086,

      // Calibri font size 12 numbers
      "0Calibri12" -> 1.086,    "1Calibri12" -> 1.086,    "2Calibri12" -> 1.086,    "3Calibri12" -> 1.086,
      "4Calibri12" -> 1.086,    "5Calibri12" -> 1.086,    "6Calibri12" -> 1.086,    "7Calibri12" -> 1.086,
      "8Calibri12" -> 1.086,    "9Calibri12" -> 1.086,

      // --------
      // Calibri font size 14 Bold lower case
      "aCalibri14" -> 1.172,    "bCalibri14" -> 1.200,    "cCalibri14" -> 1.142,    "dCalibri14" -> 1.200,
      "eCalibri14" -> 1.200,    "fCalibri14" -> 1.086,    "gCalibri14" -> 1.172,    "hCalibri14" -> 1.200,
      "iCalibri14" -> 1.058,    "jCalibri14" -> 1.058,    "kCalibri14" -> 1.172,    "lCalibri14" -> 1.058,
      "mCalibri14" -> 1.342,    "nCalibri14" -> 1.200,    "oCalibri14" -> 1.200,    "pCalibri14" -> 1.200,
      "qCalibri14" -> 1.200,    "rCalibri14" -> 1.114,    "sCalibri14" -> 1.142,    "tCalibri14" -> 1.200,
      "uCalibri14" -> 1.200,    "vCalibri14" -> 1.172,    "wCalibri14" -> 1.314,    "xCalibri14" -> 1.172,
      "yCalibri14" -> 1.172,    "zCalibri14" -> 1.142,

      // Calibri font size 14 Bold uppercase
      "ACalibri14" -> 1.258,    "BCalibri14" -> 1.228,    "CCalibri14" -> 1.200,    "DCalibri14" -> 1.258,
      "ECalibri14" -> 1.172,    "FCalibri14" -> 1.172,    "GCalibri14" -> 1.258,    "HCalibri14" -> 1.258,
      "ICalibri14" -> 1.058,    "JCalibri14" -> 1.086,    "KCalibri14" -> 1.200,    "LCalibri14" -> 1.142,
      "MCalibri14" -> 1.400,    "NCalibri14" -> 1.286,    "OCalibri14" -> 1.286,    "PCalibri14" -> 1.200,
      "QCalibri14" -> 1.286,    "RCalibri14" -> 1.228,    "SCalibri14" -> 1.172,    "TCalibri14" -> 1.172,
      "UCalibri14" -> 1.258,    "VCalibri14" -> 1.228,    "WCalibri14" -> 1.400,    "XCalibri14" -> 1.200,
      "YCalibri14" -> 1.200,    "ZCalibri14" -> 1.172,

      // Calibri font size 14 Bold numbers
      "0Calibri14" -> 1.200,    "1Calibri14" -> 1.200,    "2Calibri14" -> 1.200,    "3Calibri14" -> 1.200,
      "4Calibri14" -> 1.200,    "5Calibri14" -> 1.200,    "6Calibri14" -> 1.200,    "7Calibri14" -> 1.200,
      "8Calibri14" -> 1.200,    "9Calibri14" -> 1.200
  }
}