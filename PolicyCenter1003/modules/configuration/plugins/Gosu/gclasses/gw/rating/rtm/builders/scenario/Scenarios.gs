package gw.rating.rtm.builders.scenario

uses gw.api.databuilder.UniqueKeyGenerator
uses gw.rating.rtm.builders.CoverageRateFactorBuilder
uses gw.rating.rtm.builders.RateFactorRowBuilder
uses gw.rating.rtm.builders.RateTableBuilder
uses java.util.Date

@Export
class Scenarios {
  
  static var rateFactorBuilder = new PARateFactorRowBuilder()
  
  static function aSimpleRateBookScenario() : RatingScenario  {
    return scenarioMaker(RatingScenario.PA_TEST_RATE_BOOK_CODE, 
            null, 
            \ ->PARateTablesBuilder.aVehicleAgeTable())
  }

  static function aSimpleDraftRateBookScenario() : RatingScenario  {
    return scenarioMaker(RatingScenario.PA_TEST_RATE_BOOK_CODE,
        null,
        \ ->PARateTablesBuilder.aVehicleAgeTable(), false) // make a draft scenario
  }

  static function uniqueSimpleDraftRateBookScenario() : RatingScenario  {
    return scenarioMaker(RatingScenario.PA_TEST_RATE_BOOK_CODE + UniqueKeyGenerator.get().nextID(),
        null,
        \ ->PARateTablesBuilder.uniqueVehicleAgeTable(), false) // make a draft scenario
  }

  static function uniqueSimpleRateBookScenario() : RatingScenario  {
    return scenarioMaker(RatingScenario.PA_TEST_RATE_BOOK_CODE + UniqueKeyGenerator.get().nextID(), 
            null, 
            \ ->PARateTablesBuilder.uniqueVehicleAgeTable()) 
  }

  static function aSimpleBARateBookScenario() : RatingScenario  {
    return scenarioMaker("BA_RATE_BOOK", 
            typekey.PolicyLine.TC_BUSINESSAUTOLINE, 
            \ ->PARateTablesBuilder.aBADriverAgeTable())
  }
  
  static function uniqueSimpleBARateBookScenario() : RatingScenario  {
    return scenarioMaker("BA_RATE_BOOK" + UniqueKeyGenerator.get().nextID(),  
            typekey.PolicyLine.TC_BUSINESSAUTOLINE, 
            \ ->PARateTablesBuilder.uniqueBADriverAgeTable())
  }
  
  static function aSimpleWCRateBookScenario() : RatingScenario  {
    return scenarioMaker("WC_RATE_BOOK", 
            typekey.PolicyLine.TC_WORKERSCOMPLINE, 
            \ ->PARateTablesBuilder.aWCDriverAgeTable())
  }
  
  static function uniqueSimpleWCRateBookScenario() : RatingScenario  {
    return scenarioMaker("WC_RATE_BOOK" + UniqueKeyGenerator.get().nextID(), 
            typekey.PolicyLine.TC_WORKERSCOMPLINE, 
            \ ->PARateTablesBuilder.uniqueWCDriverAgeTable())
  }
  
  static function aSimpleGLRateBookScenario() : RatingScenario  {
    return scenarioMaker("GL_RATE_BOOK", 
            typekey.PolicyLine.TC_GENERALLIABILITYLINE, 
            \ ->PARateTablesBuilder.aGLDriverAgeTable())
  }
  
  static function uniqueSimpleGLRateBookScenario() : RatingScenario  {
    return scenarioMaker("GL_RATE_BOOK" + UniqueKeyGenerator.get().nextID(), 
            typekey.PolicyLine.TC_GENERALLIABILITYLINE, 
            \ ->PARateTablesBuilder.uniqueGLDriverAgeTable())
  }
  
  static function aRateBookForQueryScenario() : RatingScenario {
    var scenario = new RatingScenario()
    var rateBookBuilder = scenario.addActiveBook()

    var deductibleTable = PARateTablesBuilder.aCollDeductibleTable()
    rateBookBuilder.includeTableWithData(deductibleTable, rateFactorBuilder.DeductibleData)

    var vehicleAgeTable = PARateTablesBuilder.aVehicleAgeTable()
    rateBookBuilder.includeTableWithData(vehicleAgeTable, rateFactorBuilder.VehicleAgeData)

    var coverageTermTable = PARateTablesBuilder.aCoverageTermTable()
    rateBookBuilder.includeTableWithData(coverageTermTable, rateFactorBuilder.CoverageTermData)

    var makeModelYearTable = PARateTablesBuilder.aMakeModelYearTable()
    rateBookBuilder.includeTableWithData(makeModelYearTable, rateFactorBuilder.MakeModelYearData)

    var postCodeTable = PARateTablesBuilder.aPOSTCODETable()
    rateBookBuilder.includeTableWithData(postCodeTable, rateFactorBuilder.PAPostCodeData)
    
    var customTableDef = PARateTablesBuilder
      .aMakeModelYearTableDefBuilder()
      .withCode(PARateTablesBuilder.MAKE_MODEL_YEAR_CUSTOM_TABLE)

    var customMakeModelYearTable = PARateTablesBuilder.createRateTable(customTableDef)
    rateBookBuilder.includeTableWithData(customMakeModelYearTable, rateFactorBuilder.MakeModelYearData)

    return scenario
  }
  
  static property get ProductModelIntegrationScenario() : RatingScenario {
    var scenario = new RatingScenario()
    var def = PARateTablesBuilder.aCoveragesTable()
    var rateBookBuilder = scenario.addDraftBook(RatingScenario.PA_TEST_RATE_BOOK_CODE)
    rateBookBuilder.withBookEdition("Empty")
    rateBookBuilder.includesRateTable(def)
    var rateBookBuilder2 = scenario.addDraftBook(RatingScenario.PA_TEST_RATE_BOOK_CODE)
    rateBookBuilder2.withBookEdition("Not Empty")
    rateBookBuilder2.includeTableWithData(def, rateFactorBuilder.PACoveragesData)

    return scenario
  }

  static property get RateTableValidationScenario() : RatingScenario  {
    var scenario = new RatingScenario()
    var rateBookBuilder = scenario.addDraftBook(RatingScenario.PA_TEST_RATE_BOOK_CODE)
    rateBookBuilder.withBookEdition("1.0")

    rateBookBuilder.includesRateTable(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aCoveragesTableDefBuilder().withCode("EMPTY"))
    )
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aCoveragesTableDefBuilder().withCode("SINGLE_ROW")), {
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("250").withFactor(1.11)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aCoveragesTableDefBuilder().withCode("MULTIPLE_ROWS")), {
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("100").withFactor(3.33),
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("250").withFactor(2.22),
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("500").withFactor(1.11)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aCoveragesTableDefBuilder().withCode("SINGLE_DUP")), {
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("100").withFactor(3.33),
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("250").withFactor(2.22),
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("250").withFactor(0.99),
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("500").withFactor(1.11)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aCoveragesTableDefBuilder().withCode("MULTIPLE_DUPS")), {
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("100").withFactor(3.33),
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("100").withFactor(0.33),
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("250").withFactor(2.22),
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("250").withFactor(0.22),
        new CoverageRateFactorBuilder()
          .withCovCode("PACollisionCov").withCovTermCode("PACollDeductible")
          .withCovTermOptCode("500").withFactor(1.11)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aVehicleAgeTableDefBuilder().withCode("MIN_ABOVE_MAX")), {
        new RateFactorRowBuilder().withInt(1, 10).withInt(2, 9).withDecFactor(1, 1.11)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aVehicleAgeTableDefBuilder().withCode("MIN_EQUALS_MAX")), {
        new RateFactorRowBuilder().withInt(1, 10).withInt(2, 10).withDecFactor(1, 1.11)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aVehicleAgeTableDefBuilder().withCode("OPEN_ENDED")), {
        new RateFactorRowBuilder().withInt(1, null).withInt(2, 10).withDecFactor(1, 1.11),
        new RateFactorRowBuilder().withInt(1, 10).withInt(2, null).withDecFactor(1, 2.22)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aVehicleAgeTableDefBuilder().withCode("CATCH_ALL")), {
        new RateFactorRowBuilder().withInt(1, null).withInt(2, null).withDecFactor(1, 1)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aVehicleAgeTableDefBuilder().withCode("UGLY_DUCKLING")), {
        new RateFactorRowBuilder().withInt(1, null).withInt(2, 9).withDecFactor(1, 1),
        new RateFactorRowBuilder().withInt(1, 10).withInt(2, 9).withDecFactor(1, 1.11),
        new RateFactorRowBuilder().withInt(1, 10).withInt(2, 20).withDecFactor(1, 1.22),
        new RateFactorRowBuilder().withInt(1, 20).withInt(2, null).withDecFactor(1, 1.33)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aMultiFactorTableDefBuilder().withCode("MultiFactorTable")), {
        new RateFactorRowBuilder().withStr(1, "SomeMatchString1").withDecFactor(1, 1.0).withDecFactor(2, null).withBit(1, null),
        new RateFactorRowBuilder().withStr(1, "SomeMatchString2").withDecFactor(1, null).withDecFactor(2, null).withBit(1, null),
        new RateFactorRowBuilder().withStr(1, "SomeMatchString3").withDecFactor(1, null).withDecFactor(2, 2.0).withBit(1, null)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aMakeModelYearTableDefBuilder().withCode("DATA_AFTER_NULL")), {
        new RateFactorRowBuilder().withStr(1, "Make 1").withStr(2, "Model 1").withInt(1, null).withInt(2, 3).withDecFactor(1, 0.8),
        new RateFactorRowBuilder().withStr(1, "Make 1").withStr(2, "Model 2").withInt(1, null).withInt(2, 3).withDecFactor(1, 0.85),
        new RateFactorRowBuilder().withStr(1, "Make 1").withStr(2, null).withInt(1, 3).withInt(2, null).withDecFactor(1, 0.88),
        new RateFactorRowBuilder().withStr(1, "Make 1").withStr(2, "Model 1").withInt(1, 3).withInt(2, null).withDecFactor(1, 0.86),
        new RateFactorRowBuilder().withStr(1, "Make 2").withStr(2, null).withInt(1, null).withInt(2, 3).withDecFactor(1, 0.9),
        new RateFactorRowBuilder().withStr(1, "Make 3").withStr(2, null).withInt(1, null).withInt(2, null).withDecFactor(1, 1.0),
        new RateFactorRowBuilder().withStr(1, null).withStr(2, "Model T").withInt(1, null).withInt(2, null).withDecFactor(1, 1.0)
    })
    rateBookBuilder.includeTableWithData(
        PARateTablesBuilder.createRateTable(PARateTablesBuilder.aVehicleAgeTableDefBuilder().withCode("DUPLICATE_CODE_NAME")), {
        new RateFactorRowBuilder().withInt(1, null).withInt(2, null).withDecFactor(1, 1)
    })

    GXRateTablesBuilder.GenericStateTaxTableDefBuilder.withCode("DUPLICATE_CODE_NAME").withPolicyLine("CPLine").create()

    return scenario
  }

  static property get ReferenceValueProviderScenario() : RatingScenario {
    var scenario = new RatingScenario()
    var vehicleMakeGeoClassTableDef = PARateTablesBuilder.VehicleMakeGeoClassTableDef
    var vehicleGeoRateTableDef = PARateTablesBuilder.VehicleGeoRateTableDef

    var rateBookBuilder = scenario.addDraftBook(RatingScenario.PA_TEST_RATE_BOOK_CODE)
    rateBookBuilder.withBookEdition("1.0")
    var owningTable = PARateTablesBuilder.createRateTable(vehicleMakeGeoClassTableDef)
    rateBookBuilder.includeTableWithData(
      owningTable, rateFactorBuilder.PAMakeGeoClassData)
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(vehicleGeoRateTableDef),
      rateFactorBuilder.PAGeoRateData)

    var rateBookBuilder2 = scenario.addDraftBook(RatingScenario.PA_TEST_RATE_BOOK_CODE)
    rateBookBuilder2.withBookEdition("2.0")
    rateBookBuilder2.includesRateTable(
      PARateTablesBuilder.createRateTable(vehicleMakeGeoClassTableDef).referencing(owningTable)
    )
    rateBookBuilder2.includeTableWithData(
      PARateTablesBuilder.createRateTable(vehicleGeoRateTableDef),
      rateFactorBuilder.PAGeoRateData)

    return scenario
  }

  static property get RateTableDefinitionUsageScenario() : RatingScenario {
    var scenario = new RatingScenario()
    var table = PARateTablesBuilder.aVehicleAgeTable()
    var data = new PARateFactorRowBuilder().VehicleAgeData

    var rateBookBuilderV1 = scenario.addActiveBook()
    rateBookBuilderV1.withBookEdition("1.0")
    rateBookBuilderV1.includesRateTable(table)
    rateBookBuilderV1.insertRatingDataTo(table, data)

    scenario.addEditionFromLastAdded("1.1")
    scenario.addEditionFromLastAdded("1.2")

    scenario.addEditionFromLastAdded("2.0").updateTable(table.Definition.TableCode, data)
    
    scenario.addEditionFromLastAdded("2.1")

    scenario.addEditionFromLastAdded("3.0").updateTable(table.Definition.TableCode, data)

    return scenario;
  }

  static function scenarioMaker(bookCode : String, policyLine : typekey.PolicyLine, builderMethod() : RateTableBuilder) : RatingScenario {
    return scenarioMaker(bookCode, policyLine, builderMethod, true)
  }

  static function scenarioMaker(bookCode : String, policyLine : typekey.PolicyLine, builderMethod() : RateTableBuilder, isActive : boolean) : RatingScenario {
    var scenario = new RatingScenario()
    var rateBookBuilder = isActive ? scenario.addActiveBook(bookCode) : scenario.addDraftBook(bookCode)
    if (policyLine != null) {
      rateBookBuilder.withPolicyLine(policyLine.Code)    
    }
    var aDriverAgeTable = builderMethod()
    rateBookBuilder.includeTableWithData(aDriverAgeTable, rateFactorBuilder.VehicleAgeData)
    return scenario
  }

  static function AllSingleFactorTypesScenario() : RatingScenario {
    var scenario = new RatingScenario()
    var rateBookBuilder = scenario.addDraftBook(RatingScenario.PA_TEST_RATE_BOOK_CODE)
    rateBookBuilder.withBookEdition("1.0")

    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aStringFactorTableDefBuilder()), {
        new RateFactorRowBuilder().withStr(1, null).withStrFactor(1, "testString")
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.anIntegerFactorTableDefBuilder()), {
        new RateFactorRowBuilder().withStr(1, null).withIntFactor(1, 1)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aBooleanFactorTableDefBuilder()), {
        new RateFactorRowBuilder().withStr(1, null).withBit(1, true)
    })
    rateBookBuilder.includeTableWithData(
      PARateTablesBuilder.createRateTable(PARateTablesBuilder.aDecimalFactorTableDefBuilder()), {
        new RateFactorRowBuilder().withStr(1, null).withDecFactor(1, 10.0bd)
    })
    rateBookBuilder.includeTableWithData(
        PARateTablesBuilder.createRateTable(PARateTablesBuilder.aDateFactorTableDefBuilder()), {
        new RateFactorRowBuilder().withStr(1, null).withDate(1, Date.create(2012, FEBRUARY, 1, 12, 0, 0, 0, TimeZone.getTimeZone("PST")))
    })

    return scenario
  }
}
