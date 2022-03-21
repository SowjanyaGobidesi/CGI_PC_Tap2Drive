package gw.rating.rtm.builders

uses java.lang.Integer
uses java.math.BigDecimal
uses java.util.Date
uses java.util.HashMap
uses java.lang.IllegalArgumentException

@Export
class RateFactorRowBuilder extends AbstractFactorRowBuilder<DefaultRateFactorRow, RateFactorRowBuilder> {
    
  var values : HashMap<String, Object> = new HashMap<String, Object>()
  
  private function put(field: String, value : Object) {
    values.put(field, value)    
  }
  
  override function with(field : String, value : Object) : AbstractFactorRowBuilder {
    super.with(field, value)
    if (not(field == "str7" or field == "str8")
      and not(field == "int7" or field == "int8")
      and not(field == "dec5" or field == "dec6")
    ) {
      put(field, value)
    }
    return this  
  }
  
  function withStr(indx : int, val : String) : RateFactorRowBuilder {
    if (indx > 6) throw new IllegalArgumentException("Index for string parameter must be between 1 and 6")
    else this.with("str${indx}", val)
    return this    
  }

  function withInt(indx : int, val : Integer) : RateFactorRowBuilder {
    if (indx > 6) throw new IllegalArgumentException("Index for integer parameter must be between 1 and 6")
    else this.with("int${indx}", val)
    return this    
  }

  function withDec(indx : int, val : BigDecimal) : RateFactorRowBuilder {
    if (indx > 6) throw new IllegalArgumentException("Index for decimal parameter must be between 1 and 4")
    else this.with("dec${indx}", val)
    return this    
  }
  
  function withBit(indx : int, val : Boolean) : RateFactorRowBuilder {
    this.with("bit${indx}", val)
    return this    
  }

  function withDate(indx : int, val : Date) : RateFactorRowBuilder {
    this.with("date${indx}", val)
    return this    
  }

  function withStrFactor(indx : int, val : String) : RateFactorRowBuilder {
    if (indx > 2) throw new IllegalArgumentException("Index for string factor must be either 1 or 2")
    this.with("str${indx + 6}", val)
    return this    
  }

  function withIntFactor(indx : int, val : Integer) : RateFactorRowBuilder {
    if (indx > 2) throw new IllegalArgumentException("Index for integer factor must be either 1 or 2")
    this.with("int${indx + 6}", val)
    return this    
  }

  function withDecFactor(indx : int, val : BigDecimal) : RateFactorRowBuilder {
    if (indx > 2) throw new IllegalArgumentException("Index for decimal factor must be either 1 or 2")
    this.with("dec${indx + 4}", val)
    return this    
  }

  function mappedTo(table : RateTableBuilder) : RateFactorRowBuilder {
    addPopulator(new RateFactorRowPopulator(table))
    return this
  }

  function mappedTo(table : RateTable) : RateFactorRowBuilder {
    set(DefaultRateFactorRow.Type.TypeInfo.getProperty("RateTable"), table.ID)
    return this
  }
  
  override function equals(that : Object) : boolean {
    if (this === that) {
      return true
    }
    if (that == null) return false
    if (that typeis RateFactorRowBuilder) {
      return this.values.equals(that.values)
    } else {
      return false
    }
  }
  
  override function hashCode() : int {
    return values.hashCode()
  }  
}
