package gw.api.databuilder.cp
uses entity.*
uses entity.CPBlanketCov
uses gw.api.databuilder.DataBuilder
uses gw.api.builder.BuilderPropertyPopulator
uses gw.entity.IEntityPropertyInfo
uses gw.api.databuilder.BuilderContext
uses java.lang.Integer
uses java.lang.IllegalArgumentException
uses gw.api.builder.CoverageBuilder
uses gw.api.builder.BuilderArrayPopulator
uses gw.entity.IArrayPropertyInfo
uses gw.api.util.CurrencyUtil

@Export
class CPBlanketBuilder extends DataBuilder<CPBlanket, CPBlanketBuilder>{

  construct() {
     this(true)
  }

  construct(createCoverages : boolean) {
    super(CPBlanket)
    if(createCoverages) {
      withBlanketCov(new CoverageBuilder(entity.CPBlanketCov)
                            .withPatternCode("CPBlanketCov")
                            .withOptionCovTerm("CPBlanketDeductible", "2,500"))       
      withBlanketCov(new CoverageBuilder(CPBlanketCov)
                            .withPatternCode("CPBlanketCov")
                            .withOptionCovTerm("CPBlanketCoinsurance", "80%"))    
    }
  }
     
  protected override function createBean(context : BuilderContext) : CPBlanket {
    var parent = context.ParentBean
    if (parent typeis CommercialPropertyLine) {
      var cpBlanket = new CPBlanket(parent.Branch)
      parent.addAndNumberCPBlanket(cpBlanket)
      return cpBlanket
    } else {
      throw new IllegalArgumentException("Can only create CPBlanket if context is for CommercialPropertyLine")
    }
  }

  function withBlanketType(blanketType : BlanketType) : CPBlanketBuilder {
    set(CPBlanket.Type.TypeInfo.getProperty("BlanketType"), blanketType)
    return this
  }

  function withBlanketGroupType(blanketGroupType : BlanketGroupType) : CPBlanketBuilder {
    set(CPBlanket.Type.TypeInfo.getProperty("BlanketGroupType"), blanketGroupType)
    return this
  }
  
   function withDescription(desc : String) : CPBlanketBuilder {
    set(CPBlanket.Type.TypeInfo.getProperty("CPBlanketDescription"), desc)
    return this
  }
  
   function withBlanketLocation(loc : CPLocationBuilder) : CPBlanketBuilder {
    addPopulator(new BuilderPropertyPopulator<CPBlanket>(CPBlanket.Type.TypeInfo.getProperty("CPLocation") as IEntityPropertyInfo, loc))
    return this
  }

  function withBlanketNum(number : Integer) : CPBlanketBuilder {
    set(CPBlanket.Type.TypeInfo.getProperty("CPBlanketNum"), number)
    return this
  }
  
  final function withBlanketCov(blanketCov : CoverageBuilder) : CPBlanketBuilder {
    addAdditiveArrayElement(CPBlanket.Type.TypeInfo.getProperty("Coverages"), blanketCov)
   return this 
  }
  
  final function withBuildingCov(buildingCov : CoverageBuilder) : CPBlanketBuilder {
    addPopulator(new BuilderArrayPopulator<CPBlanket>(CPBlanket.Type.TypeInfo.getProperty("BuildingCoverages")  as IArrayPropertyInfo, buildingCov))
    return this
  }

  function withCurrency(currency : Currency) : CPBlanketBuilder {
    set(CPBlanket#PreferredCoverageCurrency, currency)
    return this
  }
}
