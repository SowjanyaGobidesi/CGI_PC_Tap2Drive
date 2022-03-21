package gw.rating.rtm.builders

uses gw.api.databuilder.DataBuilder
uses java.util.Collection
uses java.util.Date
uses java.util.Map
uses java.util.HashMap
uses java.util.ArrayList

uses gw.api.locale.DisplayKey
uses gw.rating.flow.builders.CalcRoutineDefinitionBuilder
uses gw.entity.IColumnPropertyInfo
uses gw.api.databuilder.BuilderContext
uses java.util.List

@Export
class RateBookBuilder extends DataBuilder<RateBook, RateBookBuilder> {

  var code : String as readonly RateBookCode
  var name : String
  var edition : String as readonly RateBookEdition
  var desc : String
  var line : String
  var offering : String
  var effDate : Date
  var renewalEffDate: Date
  var expDate : Date
  var _uwCompany : UWCompany
  var cascadedLookup : boolean
  var group : String
  protected var tableRows : Map<RateTableBuilder, List<AbstractFactorRowBuilder>>

  construct() {
    super(RateBook)
    withBookCode("Test Rate Book")
    withBookName("Test Rate Book")
    withBookEdition("1.0")
    withBookDesc("Sample rate book")
    withPolicyLine("PersonalAutoLine")
    withStatus(RateBookStatus.TC_DRAFT)
    effectiveOn(Date.Today)
    withLastStatusChangeDate(Date.Today)
    renewalEffectiveOn(Date.Today)
    expireOn(Date.Today.addMonths(6))
    tableRows = new HashMap<RateTableBuilder, List<AbstractFactorRowBuilder>>()
  }

  /**
   * New edition on this rate book builder:
   *  - Copy all book attributes and change its edition
   *  - Add tables from this book as referenced tables in the editioned book
   */
  function edition(newEdition : String) : RateBookBuilder {
    var editionedBuilder = new RateBookBuilder()
      .withBookCode(this.code)
      .withBookDesc(desc)
      .withBookEdition(newEdition)
      .withStatus(RateBookStatus.TC_DRAFT)
      .withPolicyLine(line)
      .withBookOffering(offering)
      .withUWCompany(_uwCompany)
      .effectiveOn(effDate)
      .withLastStatusChangeDate(effDate)
      .expireOn(expDate)
      .withCascadedLookup(cascadedLookup)

    tableRows.Keys.each(\ k ->{
      var refTable = RateTableBuilder.makeRefTable(k)
      editionedBuilder.includesRateTable(refTable)
      editionedBuilder.tableRows.put(refTable, new ArrayList<AbstractFactorRowBuilder>(tableRows.get(k)))
    })
    return editionedBuilder
  }
  
  /**
   * Update factors in a table:
   *  - Replace the (ref) table in the book with an owned table
   *  - Replace all updated factors in that table
   *    (factor are considered equal if all their parameters are equal)
   */
  function updateTable(tableCode : String, newRows : AbstractFactorRowBuilder[]) {
    var tableBuilder = tableRows.Keys.firstWhere(\ k -> k.Definition.TableCode.equals(tableCode))
    var updatedFactors = tableRows.remove(tableBuilder)
    newRows.each(\ newRow -> {
      updatedFactors.removeWhere(\ row -> row.equals(newRow))
      updatedFactors.add(newRow)
    })
    tableBuilder.owned()
    tableRows.put(tableBuilder, updatedFactors)
  }
  
  final function effectiveOn(date : Date) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("EffectiveDate"), date)
    this.effDate = date
    return this  
  }

  final function renewalEffectiveOn(date : Date) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("RenewalEffectiveDate"), date)
    this.renewalEffDate = date
    return this  
  }
  
  final function expireOn(date : Date) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("ExpirationDate"), date)
    this.expDate = date
    return this  
  }
  
  final function activeOn(date : Date) : RateBookBuilder {
    this.withStatus(RateBookStatus.TC_ACTIVE)
    withLastStatusChangeDate(date)
    return this
  }

  function includeAll(tables : Collection<RateTableBuilder>) : RateBookBuilder {
    tables.each(\ t -> includesRateTable(t))
    return this
  }
  
  function includesRateTable(table : RateTableBuilder) : RateBookBuilder {
    addArrayElement(RateBook.Type.TypeInfo.getProperty("RateTables"), table)
    return this
  }

  function insertRatingDataTo(tableCode : String, data : AbstractFactorRowBuilder) : RateBookBuilder {
    return insertRatingDataTo(tableCode, {data})
  }
  
  function insertRatingDataTo(table : RateTableBuilder, data : AbstractFactorRowBuilder[]) : RateBookBuilder {
    table.owned()
    if (!tableRows.containsKey(table)) {
      tableRows.put(table, new ArrayList<AbstractFactorRowBuilder>())
    }
    tableRows.get(table).addAll(data.toList())
    return this
  }
  
  function insertRatingDataTo(tableCode : String, data : AbstractFactorRowBuilder[]) : RateBookBuilder {
    var table = tableRows.Keys.firstWhere(\ t -> t.TableCode.equals(tableCode))
    insertRatingDataTo(table, data)
    return this
  }

  function createBookWithData() : RateBook {
    var book = create()
    tableRows.Keys.each(\ table -> {
      if (table.Owned) {
        tableRows.get(table).each(\ row -> {
          addPopulator(row, table)
          row.create(book.Bundle)
        })
      }
    } )
    return book
  }

  // TODO: this should be renamed or refactored, (a) because it commits; (b) because it does
  // what you really want createAndCommit() to do, but createAndCommit() is final.  :-(
  function createBook() : RateBook {
    var book = createAndCommit()
    tableRows.Keys.each(\ table -> {
      if (table.Owned) {
        tableRows.get(table).each(\ row -> {
          addPopulator(row, table)
          row.createAndCommit()
        })
      }
    } )
    return book
  }

  protected function addPopulator(row : AbstractFactorRowBuilder,
                                  table : RateTableBuilder) {
    // figure out which provider to use based on the actual type of the factor row builder
    if (row typeis RateFactorRowBuilder) {
      row.addPopulator(new RateFactorRowPopulator(table))
    } else if (row typeis CoverageRateFactorBuilder) {
      row.addPopulator(new CoverageRateFactorPopulator(table))
    }
  }

  function includeTableWithData(table : RateTableBuilder, data : AbstractFactorRowBuilder[]) : RateBookBuilder {
    includesRateTable(table)
    insertRatingDataTo(table, data)
    return this
  }
  
  final function withBookCode(bookCode : String) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("BookCode"), bookCode)
    this.code = bookCode
    return this
  }

  final function withBookName(bookName : String) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("BookName"), bookName)
    this.name = bookName
    setForAllLanguages(RateBook#BookName.PropertyInfo, bookName)
    return this
  }

  final function withLocalizedBookNameFromDisplayKey(displayKey : String) : RateBookBuilder {
    var bookName = DisplayKey.get(displayKey)
    this.name = bookName
    setLocalizedFieldFromDisplayKey(RateBook#BookName.PropertyInfo, displayKey)
    return this
  }

  final function withBookEdition(bookEdition : String) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("BookEdition"), bookEdition)
    this.edition = bookEdition
    return this
  }

  final function withBookDesc(bookDesc : String) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("BookDesc"), bookDesc)
    this.desc= bookDesc
    return this
  }

  function withCascadedLookup(cascadeLookup : boolean) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("CascadedLookup"), cascadeLookup)
    this.cascadedLookup = cascadeLookup
    return this
  }

  final function withBookGroup(bookGroup : String) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("BookGroup"), bookGroup)
    this.group = bookGroup
    return this
  }

  final function withPolicyLine(policyLine : String) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("PolicyLine"), policyLine)
    this.line = policyLine
    return this
  }

  final function withStatus(status : RateBookStatus) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("Status"), status)
    return this
  }
  
  final function withLastStatusChangeDate(statusDate : Date) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("LastStatusChangeDate"), statusDate)
    return this
  }

  final function asDraft() : RateBookBuilder {
    return withStatus(RateBookStatus.TC_DRAFT)
  }
  
  final function approved() : RateBookBuilder {
    return withStatus(RateBookStatus.TC_APPROVED)  
  }
  
  final function active() : RateBookBuilder {
    return withStatus(RateBookStatus.TC_ACTIVE)  
  }
  
  final function stage() : RateBookBuilder {
    return withStatus(RateBookStatus.TC_STAGE)  
  }

  final function withBookOffering(offeringCode : String) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("BookOffering"), offeringCode)
    this.offering = offeringCode
    return this
  }
  
  final function withJurisdiction(jurisdiction : Jurisdiction) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("BookJurisdiction"), jurisdiction)
    return this
  }

  final function withUWCompany(uwCompany : UWCompany) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("UWCompany"), uwCompany)
    _uwCompany = uwCompany
    return this
  }

  final function withExportLock(lock : boolean) : RateBookBuilder {
    set(RateBook.Type.TypeInfo.getProperty("ExportLock"), lock)
    return this
  }

  function withRatebookCalcRoutine( rateBookCalcRoutine : RateBookCalcRoutine ) : RateBookBuilder {
    addArrayElement( RateBook.Type.TypeInfo.getProperty("RateBookCalcRoutines"), rateBookCalcRoutine )
    return this    
  }
  
  function withRatebookCalcRoutine( rateBookCalcRoutine : RateBookCalcRoutineBuilder ) : RateBookBuilder {
    addArrayElement( RateBook.Type.TypeInfo.getProperty("RateBookCalcRoutines"), rateBookCalcRoutine )
    return this    
  }

  function withCalcRoutine( calcRoutineBuilder : CalcRoutineDefinitionBuilder ) : RateBookBuilder {
    addArrayElement( RateBook.Type.TypeInfo.getProperty("RateBookCalcRoutines"), new RateBookCalcRoutineBuilder().withCalcRoutine(calcRoutineBuilder))
    return this    
  }
  
  function withCalcRoutine( calcRoutine : CalcRoutineDefinition ) : RateBookBuilder {
    addArrayElement( RateBook.Type.TypeInfo.getProperty("RateBookCalcRoutines"), new RateBookCalcRoutineBuilder().withCalcRoutine(calcRoutine))
    return this    
  }

  function withBookNameLocalized(final bookName : String, final locale : LanguageType) : RateBookBuilder {
    return this.withLocalizedProperty(RateBook.Type.TypeInfo.getProperty("BookName") as IColumnPropertyInfo, locale, bookName)
  }

  function withBookDescLocalized(final bookDesc : String, final locale : LanguageType) : RateBookBuilder {
    return this.withLocalizedProperty(RateBook.Type.TypeInfo.getProperty("BookDesc") as IColumnPropertyInfo, locale, bookDesc)
  }

  function withRateBookExportResult(rateBookExportResult : RateBookExportResult) : RateBookBuilder {
    addArrayElement(RateBook.Type.TypeInfo.getProperty("RateBookExportResults"), rateBookExportResult)
    return this
  }

  function withRateBookExportResult(rateBookExportResultBuilder : RateBookExportResultBuilder) : RateBookBuilder {
    addArrayElement( RateBook.Type.TypeInfo.getProperty("RateBookExportResults"), rateBookExportResultBuilder)
    return this
  }

  override function createBean(context : BuilderContext) : RateBook {
    //for tests, initially set hierarchy to contain just itself
    var book = super.createBean(context)
    book.setRateBookHierarchy({book})
    return book
  }

}
