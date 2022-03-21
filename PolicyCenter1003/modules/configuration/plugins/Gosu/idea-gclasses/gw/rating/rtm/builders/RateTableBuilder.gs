package gw.rating.rtm.builders

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.populator.BeanPopulator
uses java.lang.RuntimeException

@Export
class RateTableBuilder extends DataBuilder<RateTable, RateTableBuilder> {
  
  var _tableCode : String as TableCode
  var _tableDef : RateTableDefinition as Definition
  var _queryStrategy : FactorQueryStrategy as QueryStrategy
  var owned : boolean as Owned
  
  construct() {
    this(new RateTableDefinitionBuilder().withValidation(false))
  }
  construct(def : RateTableDefinition) {
    super(RateTable)
    owned()
    withRateTableDefinition(def)
    this._tableDef = def
    this._tableCode = def.TableCode
  }
  construct(defBuilder : RateTableDefinitionBuilder) {
    super(RateTable)
    owned()
    withRateTableDefinition(defBuilder)
    this._tableCode = defBuilder.RateTableCode
  }
  private construct(copy : RateTableBuilder) {
    super(RateTable)
    withRateTableDefinition(copy.Definition)
    referencing(copy)
   this._tableCode = copy.Definition.TableCode
  }
  
  static function makeRefTable(copy : RateTableBuilder) : RateTableBuilder {
    return new RateTableBuilder(copy)  
  }
  
  final function owned() : RateTableBuilder {
    set(RateTable.Type.TypeInfo.getProperty("RefTable"), null)
    this.Owned = true
    return this
  }

  final function referencing(owning : RateTableBuilder) : RateTableBuilder {
    addPopulator(new RateTableRefPopulator(owning))
    this.Owned = false
    return this
  }
  
  function withRateBook(rateBook : RateBookBuilder) : RateTableBuilder {
    set(RateTable.Type.TypeInfo.getProperty("RateBook"), rateBook)
    return this
  }
  
  function withRateBook(rateBook : RateBook) : RateTableBuilder {
    set(RateTable.Type.TypeInfo.getProperty("RateBook"), rateBook.ID)
    return this
  }
  
  function withQueryStrategy( strategy : FactorQueryStrategy ) : RateTableBuilder{
    set(RateTable.Type.TypeInfo.getProperty("QueryStrategy"), strategy)
    _queryStrategy = strategy  
    return this
  }

  function withReduceMemoryUsage(reduceMemoryUsage : Boolean ) : RateTableBuilder {
    set(RateTable.Type.TypeInfo.getProperty("ReduceMemoryUsage"), reduceMemoryUsage)
    return this
  }

  final function withRateTableDefinition(rateTableDefinition : RateTableDefinitionBuilder) : RateTableBuilder {
    set(RateTable.Type.TypeInfo.getProperty("Definition"), rateTableDefinition)
    return this
  }

  final function withRateTableDefinition(rateTableDefinition : RateTableDefinition) : RateTableBuilder {
    set(RateTable.Type.TypeInfo.getProperty("Definition"), rateTableDefinition.ID)
    _tableDef = rateTableDefinition
    return this
  }

  override function toString() : String {
    return "${this.TableCode}" 
  }
  
  override function hashCode() : int {
    return 31 * this.TableCode.hashCode()
  }

  override function equals(other : Object) : boolean {
    if (this === other) {
      return true
    }
    if (other == null) return false
    if (other typeis RateTableBuilder) {
      return this.TableCode.equals(other.TableCode)
    } else {
      return false
    }
  }

  class RateTableRefPopulator implements BeanPopulator<RateTable> {

    var builder : RateTableBuilder

    construct(b : RateTableBuilder) {
      this.builder = b
    }

    override function execute(bean : RateTable) {
      var table = builder.LastCreatedBean
      if (table == null) {
        throw new RuntimeException("failed to set the ref table because the owning table is null")
      }
      bean.RefTable = table.TableOwningFactors
    }
  }
}
