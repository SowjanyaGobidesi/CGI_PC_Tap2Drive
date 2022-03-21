package gw.rating.rtm.builders
uses gw.rating.rtm.domain.table.RateTableModel
uses java.util.ArrayList
uses gw.rating.rtm.util.RateTableColumnMapper
uses gw.api.databuilder.UniqueKeyGenerator
uses java.lang.Comparable

@Export
class RateTableModelBuilder {

  var _rateTableDefBuilder = new RateTableDefinitionBuilder().withValidation(false)
  var _rateTableBuilder = new RateTableBuilder()
  var _sortOrder : int
  var _data = new ArrayList<Object[]>()
  var _mapper = new RateTableColumnMapper( DefaultRateFactorRow, {"str","dec", "int", "bit", "date"} )
  var _rateBookBuilder = new RateBookBuilder()
  
  construct() {
    
    _rateTableBuilder.withRateTableDefinition( _rateTableDefBuilder )
    _rateTableDefBuilder.withCode("TestTable" + UniqueKeyGenerator.get().nextInteger())
    _rateTableBuilder.withRateBook(_rateBookBuilder)
    _rateTableBuilder.withQueryStrategy( FactorQueryStrategy.TC_DATABASE )
    _rateBookBuilder.withBookCode("Test Rate Book" + UniqueKeyGenerator.get().nextInteger())
    
  }
  
  /** RateTable Attributes**/
  function withRateBook( rateBook : RateBook ) : RateTableModelBuilder {
    _rateTableBuilder.withRateBook(rateBook)
    return this
  }

  /** RateTable Attributes**/
  function withRateBook( rateBookBuilder : RateBookBuilder ) : RateTableModelBuilder {
    _rateTableBuilder.withRateBook(rateBookBuilder)
    _rateBookBuilder = rateBookBuilder
    return this
  }
      
  /*** RateTableDefinition Attributes **/
  function withTableName( tableName : String ) : RateTableModelBuilder {
    _rateTableDefBuilder.named( tableName )
    return this
  }

  function withTableCode( tableCode : String ) : RateTableModelBuilder {
    _rateTableDefBuilder.withCode( tableCode )
    return this
  }
  
  function withTableDesc( desc : String ) : RateTableModelBuilder {
    _rateTableDefBuilder.withDescription(desc)
    return this
  }
  
  function withQueryStrategy( strategy : FactorQueryStrategy) : RateTableModelBuilder {
    _rateTableBuilder.withQueryStrategy(strategy)
    return this  
  }

  function withReduceMemoryUsage( reduceMemoryUsage : Boolean) : RateTableModelBuilder {
    _rateTableBuilder.withReduceMemoryUsage(reduceMemoryUsage)
    return this
  }

  function withPolicyLine(line : String) : RateTableModelBuilder {
    _rateTableDefBuilder.withPolicyLine(line)
    return this
  }
  
  /** Factor/MatchOp Column functions **/
  function addRange(type : RateTableDataType, opName : String, minColName : String, maxColName : String, maxInclusive : boolean) : RateTableModelBuilder{

    var rateTableMatchOpBuilder = new RateTableMatchOpBuilder()
      .withMatchOpDefinition(maxInclusive ? RateTableMatchOpDefinitionBuilder.RangeMatchMaxInclOp : RateTableMatchOpDefinitionBuilder.RangeMatchMaxExclOp)
      .withOpName(opName)
      .addParam(createColBuilder(type, minColName))
      .addParam(createColBuilder(type, maxColName))
    
    _rateTableDefBuilder.addMatchOperation(rateTableMatchOpBuilder)
    
    return this
  }

  private function addSingleOp(matchOpDef : RateTableMatchOpDefinitionBuilder, type : RateTableDataType, columnName : String) : RateTableModelBuilder{
    return addSingleOp(matchOpDef, type, columnName, false)
  }

  private function addSingleOp(matchOpDef : RateTableMatchOpDefinitionBuilder, type : RateTableDataType, columnName : String, multiSelect : boolean) : RateTableModelBuilder{

    var opBuilder = new RateTableMatchOpBuilder()
        .withMatchOpDefinition(matchOpDef)
        .withOpName(columnName)
        .addParam(createColBuilder(type, columnName, multiSelect))

    _rateTableDefBuilder.addMatchOperation(opBuilder)

    return this
  }

  function addMultiValueExactMatchOp(type : RateTableDataType, columnName : String) : RateTableModelBuilder{
    return addSingleOp(RateTableMatchOpDefinitionBuilder.ExactMatchOp, type, columnName, true)
   }

  function addExactMatchOp(type : RateTableDataType, columnName : String) : RateTableModelBuilder{
    return addSingleOp(RateTableMatchOpDefinitionBuilder.ExactMatchOp, type, columnName)
   }

  function addLongestSubstringMatchOp(type : RateTableDataType, columnName : String) : RateTableModelBuilder{
    return addSingleOp(RateTableMatchOpDefinitionBuilder.LongestSubstringMatchOp, type, columnName)
  }
  
  function addInterpolationMatchOp(type : RateTableDataType, columnName : String) : RateTableModelBuilder{
    return addSingleOp(RateTableMatchOpDefinitionBuilder.InterpolationMatchOp, type, columnName)
  }

  function addInterpolateWithRelaxMatchOp(type : RateTableDataType, columnName : String) : RateTableModelBuilder{
    return addSingleOp(RateTableMatchOpDefinitionBuilder.InterpolateWithRelaxMatchOp, type, columnName)
  }

  function addGreaterMatchOp(type: RateTableDataType, columnName: String) : RateTableModelBuilder{
    return addSingleOp(RateTableMatchOpDefinitionBuilder.GreaterThanOp, type, columnName)
  }

  function addGreaterEqMatchOp(type: RateTableDataType, columnName: String) : RateTableModelBuilder{
    return addSingleOp(RateTableMatchOpDefinitionBuilder.GreaterThanOrEqualOp, type, columnName)
  }

  function addLessEqMatchOp(type: RateTableDataType, columnName: String) : RateTableModelBuilder{
    return addSingleOp(RateTableMatchOpDefinitionBuilder.LessThanOrEqualOp, type, columnName)
  }

  function addLessMatchOp(type: RateTableDataType, columnName: String) : RateTableModelBuilder{
    return addSingleOp(RateTableMatchOpDefinitionBuilder.LessThanOp, type, columnName)
  }

  function addFactor(type : RateTableDataType, columnName: String, scale: int) : RateTableModelBuilder{
    _rateTableDefBuilder.addFactor(createColBuilder(type, columnName).withScale(scale))
    return this
  }
  
  function addFactor(type : RateTableDataType, columnName : String) : RateTableModelBuilder{
   _rateTableDefBuilder.addFactor(createColBuilder(type, columnName))
   return this
  }
  
  /** Data Adding functions **/
  function addRow( values : Object[] ) : RateTableModelBuilder {
    _data.add( values )
    return this
  }
  
  function create() : RateTableModel{
    
    var rateTableModel = new RateTableModel( _rateTableBuilder.create() ) 
    _data.each(\ r -> {
      
      var row = rateTableModel.addEmptyRow()
      for( val in r index i){
        row.Cells[i].Value = val as Comparable
      }
      
      // Add the rate factor row
      var _rateFactorRowBuilder = new RateFactorRowBuilder()
      _rateFactorRowBuilder.mappedTo(_rateTableBuilder)

      r.eachWithIndex(\ o, i -> {
        if( o != null){
          // Get the column definition 
          var physicalColumnName = _mapper.UsedColumns.get(i)          
          _rateFactorRowBuilder.with( physicalColumnName, o )
        }
      })

      _rateFactorRowBuilder.createAndCommit()    
      
    })

    return rateTableModel
  }
  
  function createAndCommit() : RateTableModel{
  
    var rateTableModel = create()
    _rateTableBuilder.LastCreatedBean.Bundle.commit()
    return rateTableModel
  }
  
  private function createColBuilder(type : RateTableDataType, columnName : String) : RateTableColumnBuilder{
    return createColBuilder(type, columnName, false)
  }

  private function createColBuilder(type : RateTableDataType, columnName : String, multiSelect: boolean) : RateTableColumnBuilder{

    return new RateTableColumnBuilder()
      .withType(type)
      .withColumnName(columnName)
      .withMultiSelect(multiSelect)
      .mappedTo(nextPhysicalColumn(type))
      .withSortOrder(nextSortOrder())

  }

  private function nextSortOrder() : int{
    _sortOrder++ 
    return _sortOrder
  }
  
  private function nextPhysicalColumn( type : RateTableDataType ) : String{
    return _mapper.map(type)
  }
  
  
}
