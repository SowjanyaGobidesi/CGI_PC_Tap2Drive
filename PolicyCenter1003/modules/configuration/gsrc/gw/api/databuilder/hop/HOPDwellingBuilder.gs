package gw.api.databuilder.hop

uses entity.*
uses gw.api.builder.BuilderArrayPopulator
uses gw.api.builder.BuilderPropertyPopulator
uses gw.api.builder.CoverageBuilder
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.databuilder.BuilderContext
uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.populator.BeanPopulator
uses gw.api.domain.covterm.OptionCovTerm
uses gw.entity.IArrayPropertyInfo
uses gw.pl.currency.MonetaryAmount

@Export
class HOPDwellingBuilder extends DataBuilder<HOPDwelling, HOPDwellingBuilder> {

  var _createCoverages = false
  var _populateCovTermValues = true
  var _defaultEmptyFireProtection = true

  construct() {
    super(HOPDwelling)
    constructWithAddPopulator()
  }

  public function withDefaults() : HOPDwellingBuilder {
    //dwelling general fields
    withDwellingLocation(DwellingLocationType.TC_CITY)
    withResidenceType(ResidenceType.TC_FAM1)
    withReplacementCost(100000.00bd.ofDefaultCurrency())
    withUnitsNumber(1)
    withInsuredUnits(1)

    //dwelling occupancy fields
    withDwellingUsage(DwellingUsage.TC_PRIMARY)
    withOccupancy(DwellingOccupancyType.TC_OWNER)
    withRoomerBoardersNumber(0)

    //dwelling protection fields
    withBurglarAlarmType(BurglarAlarmType.TC_CENTRAL)
    withDeadbolts(Boolean.TRUE)
    withDistanceToFireHydrant(100)
    withDistanceToFireStation(4)
    withFireAlarmType(FireAlarmType.TC_MONITORINGCENTER)
    withNumberOfFireExtinguishers(2)
    withSmokeAlarm(SmokeAlarms.TC_ALLFLOORS)
    withSprinklerSystemType(SprinklerSystemType.TC_NONE)
    withVisibleToNeighbors(Boolean.TRUE)

    //dwelling construction fields
    withYearBuilt(2000)
    withConstructionType(HOPConstructionType.TC_CONCRETE)
    withStoriesNumber(1)
    withGarageType(GarageType.TC_NONE)
    withFoundation(FoundationType.TC_SLAB)
    withRoofType(HOPRoofType.TC_TILE)
    withPrimaryHeatingType(HeatingType.TC_ELECTRIC)
    withPlumbingType(PlumbingType.TC_COPPER)
    withWiringType(WiringType.TC_COPPER)
    withElectricalType(BreakerType.TC_CIRCUITBREAKER)
    withHeatingUpgradeDate(2010)
    withPlumbingUpgradeDate(2011)
    return this
  }

  function dontCreateCoverages() : HOPDwellingBuilder {
    _createCoverages = false
    return this
  }

  function createCoverages() : HOPDwellingBuilder {
    _createCoverages = true
    return this
  }

  function populateCovTerms() : HOPDwellingBuilder {
    _populateCovTermValues = true
    return this
  }

  function dontPopulateCovTerms() : HOPDwellingBuilder {
    _populateCovTermValues = false
    return this
  }

  function dontDefaultEmptyFireProtection() : HOPDwellingBuilder {
    _defaultEmptyFireProtection = false
    return this
  }

  private function constructWithAddPopulator() {
    addPopulator(Integer.MAX_VALUE, \dwelling -> {
      if (dwelling.Location == null) {
        dwelling.Location = dwelling.Branch.PrimaryLocation
        if (_defaultEmptyFireProtection && dwelling.Location.FireProtectClass == null) {
          dwelling.Location.FireProtectClass = TC_3
        }
      }
      if (_createCoverages) {
        dwelling.createCoverages()
        if (_populateCovTermValues) {
          //as the HOP product model doesn't have default values for some covterms, we need to do this programatically
          populateDwellingCoverages(dwelling)
        }
      }
    })
  }

  private function populateDwellingCoverages(dwelling : HOPDwelling) {
    //fill out required fields...
    if (dwelling.HOPCovAExists) {
      dwelling.HOPCovA.HOPCovALimitTerm.Value = 100000
      dwelling.HOPCovA.HOPCovAValuationTerm.setValueFromString("ReplCost")
      //because each CovForm has a different available cause of loss...
      setOptionCovTermToFirstAvailableOptionIfNoSelectionExists(dwelling.HOPCovA.HOPCovACauseOfLossTerm)
      dwelling.HOPCovA.HOPCovACoinsuranceTerm.setValueFromString("HOPCovACoinsurance80")
    }

    if (dwelling.HOPCovBExists) {
      //if the percentage limit doesn't exist we need to set the direct value manually
      if (!dwelling.HOPCovB.HasHOPCovBLimitTerm) {
        dwelling.HOPCovB.HOPCovBDirectLimitTerm.Value = 50000
      } else {
        dwelling.HOPCovB.fireInitializeEvent()
      }
    }

    if (dwelling.HOPCovCExists) {
      //if the percentage limit doesn't exist we need to set the direct value manually
      if (!dwelling.HOPCovC.HasHOPCovCLimitTerm) {
        dwelling.HOPCovC.HOPCovCDirectLimitTerm.Value = 50000
      } else {
        //init event is used to populate the direct limit from the percentage limit
        dwelling.HOPCovC.fireInitializeEvent()
      }
      dwelling.HOPCovC.HOPCovCCauseOfLossTerm.setValueFromString(dwelling.HOPCovA.HOPCovACauseOfLossTerm.OptionValue.OptionCode)
      dwelling.HOPCovC.HOPCovCValuationTerm.setValueFromString("ReplCost")

    }

    if (dwelling.HOPCovDExists) {
      //init event is used to populate the direct limit from the percentage limit
      dwelling.HOPCovD.fireInitializeEvent()

      if(dwelling.HOPCovD.HasHOPCovDLossOfRentTerm) {
        dwelling.HOPCovD.HOPCovDLossOfRentTerm.Value = Boolean.TRUE
      }
      dwelling.HOPCovD.HOPCovDProhibitedUseTerm.setValueFromString("HOPCovDProhibitedUse45")
    }
  }

  private function setOptionCovTermToFirstAvailableOptionIfNoSelectionExists(term : OptionCovTerm) {
    if (term.OptionValue == null) {
      var termPattern = term.getPattern()
      term.setOptionValue(termPattern.getAvailableValues(term).first())
    }
  }

  protected override function createBean(context : BuilderContext) : HOPDwelling {
    var coveragePart = context.ParentBean as HOPCoveragePart
    var dwelling = super.createBean(context)
    coveragePart.addToHOPDwellings(dwelling)
    return dwelling
  }

  function withCoverageBuilder(coverageBuilder: CoverageBuilder): HOPDwellingBuilder {
    addArrayElement(HOPDwelling#Coverages.PropertyInfo, coverageBuilder)
    return this
  }

  function withPolicyLocationBuilder(policyLocationBuilder : PolicyLocationBuilder) : HOPDwellingBuilder {
    addPopulator(new BuilderPropertyPopulator<HOPDwelling>(HOPDwelling#Location.PropertyInfo, policyLocationBuilder))
    return this
  }

  function withAdditionalInterest(addlInterestBuilder : HOPDwellingAdditionalInterestBuilder) : HOPDwellingBuilder {
    addPopulator(new BuilderArrayPopulator<HOPDwelling>(HOPDwelling#AdditionalInterests.PropertyInfo as IArrayPropertyInfo, addlInterestBuilder))
    return this
  }

  public function withCoverageForm(value:typekey.HOPCoverageForm) : HOPDwellingBuilder {
    set(HOPDwelling#CoverageForm, value)
    return this
  }

  public function withBurglarAlarmType(value:typekey.BurglarAlarmType) : HOPDwellingBuilder {
    set(HOPDwelling#BurglarAlarmType, value)
    return this
  }

  public function withConstructionType(value:typekey.HOPConstructionType) : HOPDwellingBuilder {
    set(HOPDwelling#ConstructionType, value)
    return this
  }

  public function withConstructionTypeDescription(value:String) : HOPDwellingBuilder {
    set(HOPDwelling#ConstructionTypeDescription, value)
    return this
  }

  public function withDeadbolts(value:Boolean) : HOPDwellingBuilder {
    set(HOPDwelling#Deadbolts, value)
    return this
  }

  public function withDwellingLocation(value:typekey.DwellingLocationType) : HOPDwellingBuilder {
    set(HOPDwelling#DwellingLocation, value)
    return this
  }

  public function withDwellingUsage(value:typekey.DwellingUsage) : HOPDwellingBuilder {
    set(HOPDwelling#DwellingUsage, value)
    return this
  }

  public function withElectricalSystemUpgradeDate(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#ElectricalSystemUpgradeDate, value)
    return this
  }

  public function withElectricalType(value:typekey.BreakerType) : HOPDwellingBuilder {
    set(HOPDwelling#ElectricalType, value)
    return this
  }

  public function withFireAlarmType(value: FireAlarmType) : HOPDwellingBuilder {
    set(HOPDwelling#FireAlarmType, value)
    return this
  }

  public function withFireplaceOrWoodStovesNumber(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#FireplaceOrWoodStovesNumber, value)
    return this
  }

  public function withFoundation(value:typekey.FoundationType) : HOPDwellingBuilder {
    set(HOPDwelling#Foundation, value)
    return this
  }

  public function withGarageType(value: typekey.GarageType) : HOPDwellingBuilder {
    set(HOPDwelling#GarageType, value)
    return this
  }

  public function withHeatingUpgradeDate(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#HeatingUpgradeDate, value)
    return this
  }

  public function withKnownWaterLeakage(value:Boolean) : HOPDwellingBuilder {
    set(HOPDwelling#KnownWaterLeakage, value)
    return this
  }

  public function withKnownWaterLeakageDescription(value:String) : HOPDwellingBuilder {
    set(HOPDwelling#KnownWaterLeakageDescription, value)
    return this
  }

  public function withOccupancy(value:typekey.DwellingOccupancyType) : HOPDwellingBuilder {
    set(HOPDwelling#Occupancy, value)
    return this
  }

  public function withPlumbingType(value:typekey.PlumbingType) : HOPDwellingBuilder {
    set(HOPDwelling#PlumbingType, value)
    return this
  }

  public function withPlumbingTypeDescription(value:String) : HOPDwellingBuilder {
    set(HOPDwelling#PlumbingTypeDescription, value)
    return this
  }

  public function withPlumbingUpgradeDate(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#PlumbingUpgradeDate, value)
    return this
  }

  public function withPrimaryHeatingType(value: typekey.HeatingType) : HOPDwellingBuilder {
    set(HOPDwelling#PrimaryHeatingType, value)
    return this
  }

  public function withPrimaryHeatingDescription(value:String) : HOPDwellingBuilder {
    set(HOPDwelling#PrimaryHeatingDescription, value)
    return this
  }

  public function withPrimaryHeatingFuelLineLocation(value:typekey.FuelLineLocationType) : HOPDwellingBuilder {
    set(HOPDwelling#PrimaryHeatingFuelLineLocation, value)
    return this
  }

  public function withPrimaryHeatingFuelTankLocation(value:typekey.FuelTankLocationType) : HOPDwellingBuilder {
    set(HOPDwelling#PrimaryHeatingFuelTankLocation, value)
    return this
  }

  public function withReplacementCost(value:MonetaryAmount) : HOPDwellingBuilder {
    set(HOPDwelling#ReplacementCost, value)
    return this
  }

  public function withResidenceType(value:typekey.ResidenceType) : HOPDwellingBuilder {
    set(HOPDwelling#ResidenceType, value)
    return this
  }

  public function withRoofType(value:typekey.HOPRoofType) : HOPDwellingBuilder {
    set(HOPDwelling#RoofType, value)
    return this
  }

  public function withRoofTypeDescription(value:String) : HOPDwellingBuilder {
    set(HOPDwelling#RoofTypeDescription, value)
    return this
  }

  public function withRoofingUpgradeDate(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#RoofingUpgradeDate, value)
    return this
  }

  public function withRoomerBoardersNumber(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#RoomerBoardersNumber, value)
    return this
  }

  public function withSecondaryHeatingType(value: HeatingType) : HOPDwellingBuilder {
    set(HOPDwelling#SecondaryHeatingType, value)
    return this
  }

  public function withSmokeAlarm(value:SmokeAlarms) : HOPDwellingBuilder {
    set(HOPDwelling#SmokeAlarm, value)
    return this
  }

  public function withSprinklerSystemType(value:typekey.SprinklerSystemType) : HOPDwellingBuilder {
    set(HOPDwelling#SprinklerSystemType, value)
    return this
  }

  public function withStoriesNumber(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#StoriesNumber, value)
    return this
  }

  public function withSwimmingPool(poolBuilder : HOPSwimmingPoolBuilder) : HOPDwellingBuilder {
    set(HOPDwelling#SwimmingPool, poolBuilder)
    return this
  }

  public function withTrampolineExists(value:Boolean) : HOPDwellingBuilder {
    set(HOPDwelling#TrampolineExists, value)
    return this
  }

  public function withTrampolineSafetyNet(value:Boolean) : HOPDwellingBuilder {
    set(HOPDwelling#TrampolineSafetyNet, value)
    return this
  }

  public function withUnitsNumber(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#UnitsNumber, value)
    return this
  }

  public function withVisibleToNeighbors(value:Boolean) : HOPDwellingBuilder {
    set(HOPDwelling#VisibleToNeighbors, value)
    return this
  }

  public function withWiringType(value:typekey.WiringType) : HOPDwellingBuilder {
    set(HOPDwelling#WiringType, value)
    return this
  }

  public function withYearBuilt(value: Integer) : HOPDwellingBuilder {
    set(HOPDwelling#YearBuilt, value)
    return this
  }

  public function withNumberOfFireExtinguishers(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#NumberOfFireExtinguishers, value)
    return this
  }

  public function withInsuredUnits(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#InsuredUnits, value)
    return this
  }

  public function withDistanceToFireHydrant(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#DistanceToFireHydrant, value)
    return this
  }

  public function withDistanceToFireStation(value:Integer) : HOPDwellingBuilder {
    set(HOPDwelling#DistanceToFireStation, value)
    return this
  }

  public function withHazard(hazardBuilder: HOPDwellingHazardBuilder) : HOPDwellingBuilder {
    addAdditiveArrayElement(HOPDwelling#DwellingHazards, hazardBuilder)
    return this
  }

  public function withAnimal(animalBuilder: HOPDwellingAnimalBuilder) : HOPDwellingBuilder {
    addAdditiveArrayElement(HOPDwelling#DwellingAnimals, animalBuilder)
    return this
  }

  function withHOPDwellingModBuilder(modBuilder: HOPDwellingModBuilder): HOPDwellingBuilder {
    addAdditiveArrayElement(HOPDwelling#HOPDwellingMods.PropertyInfo, modBuilder)
    return this
  }

}
