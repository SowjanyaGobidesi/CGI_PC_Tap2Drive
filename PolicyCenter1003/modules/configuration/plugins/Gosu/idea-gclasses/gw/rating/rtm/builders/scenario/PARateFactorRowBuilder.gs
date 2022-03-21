package gw.rating.rtm.builders.scenario
uses gw.rating.rtm.builders.RateFactorRowBuilder
uses gw.rating.rtm.builders.CoverageRateFactorBuilder
uses java.math.BigDecimal
uses java.util.List

@Export
class PARateFactorRowBuilder {

  
  property get MakeModelYearData() :  RateFactorRowBuilder[] {
    return {
      new RateFactorRowBuilder()
        .withStr(1, "Toyota") 
        .withStr(2, "RAV4") 
        .withInt(1, 2007)
        .withInt(2, 2009)
        .withDecFactor(1, 2.1), 
      new RateFactorRowBuilder()
        .withStr(1, "Toyota") 
        .withStr(2, "RAV4") 
        .withInt(1, 2009)
        .withInt(2, 2010)
        .withDecFactor(1, 2.5)
    }
  }
  
  property get DeductibleData() : RateFactorRowBuilder[] {
    return {
      new RateFactorRowBuilder()
        .withStr(1, "250")
        .withDecFactor(1, 1.5),
      new RateFactorRowBuilder()
        .withStr(1, "500")
        .withDecFactor(1, 1.0),
      new RateFactorRowBuilder()
        .withStr(1, "1000")
        .withDecFactor(1, 0.85)
    }
  }

  property get VehicleAgeData() : RateFactorRowBuilder[] {
    return {
      new RateFactorRowBuilder()
        .withInt(1, null)
        .withInt(2, 2)
        .withDecFactor(1, 1.0), 
      new RateFactorRowBuilder()
        .withInt(1, 2)
        .withInt(2, 5)
        .withDecFactor(1, 0.9), 
      new RateFactorRowBuilder()
        .withInt(1, 5)
        .withInt(2, 10)
        .withDecFactor(1, 0.5), 
      new RateFactorRowBuilder()
        .withInt(1, 10)
        .withInt(2, null)
        .withDecFactor(1, 0.25)
    }
  }

  static property get DriverAgeData() : RateFactorRowBuilder[] {
    return {
      new RateFactorRowBuilder()
        .withStr(1, "M")
        .withInt(1, 18)
        .withInt(2, 35)
        .withDecFactor(1, 1.15), 
      new RateFactorRowBuilder()
        .withStr(1, "F")
        .withInt(1, 18)
        .withInt(2, 35)
        .withDecFactor(1, 1.12), 
      new RateFactorRowBuilder()
        .withStr(1, null)
        .withInt(1, 35)
        .withInt(2, 45)
        .withDecFactor(1, 1.1),
      new RateFactorRowBuilder()
        .withStr(1, null)
        .withInt(1, 45)
        .withInt(2, null)
        .withDecFactor(1, 1)
    }
  }
  
  property get CoverageTermData() : RateFactorRowBuilder[] {
    return {
      new RateFactorRowBuilder()
        .withStr(1, "PALiabilityCov")
        .withStr(2, "PALiability")
        .withStr(3, "50/100/25")
        .withDecFactor(1, 1.5),      
      new RateFactorRowBuilder()
        .withStr(1, "PALiabilityCov")
        .withStr(2, "PALiability")
        .withStr(3, "0/0/5")
        .withDecFactor(1, 0.5)
    }
  }

  property get PACoveragesData() : CoverageRateFactorBuilder[] {
    return {
      new CoverageRateFactorBuilder()
        .withCovCode("PACollisionCov")
        .withCovTermCode("PACollDeductible")
        .withCovTermOptCode("250")
        .withFactor(1.5),
      new CoverageRateFactorBuilder()
        .withCovCode("PACollisionCov")
        .withCovTermCode("PACollDeductible")
        .withCovTermOptCode("500")
        .withFactor(1.0),
      new CoverageRateFactorBuilder()
        .withCovCode("PACollisionCov")
        .withCovTermCode("PACollDeductible")
        .withCovTermOptCode("1000")
        .withFactor(0.85),
      new CoverageRateFactorBuilder()
        .withCovCode("PACollisionCov")
        .withCovTermCode("PACollisionLimitedBroad")
        .withFactor(1.22),
      new CoverageRateFactorBuilder()
        .withCovCode("PALimitedMexicoCov")
        .withFactor(1.11)
    }
  }

  property get PACoveragesData2() : RateFactorRowBuilder[] {
    return {
        new RateFactorRowBuilder()
            .withStr(1, "PADeathDisabilityCov")
            .withStr(2, "DeathBenefit")
            .withInt(1, 2500)
            .withDecFactor(1, 1.525),
        new RateFactorRowBuilder()
            .withStr(1, "PACollisionCov")
            .withStr(2, "PACollDeductible")
            .withInt(1, 250)
            .withDecFactor(1, 0.525)
    }
  }

  property get PAMultiSelectBasicData() : RateFactorRowBuilder[] {
    return {
        new RateFactorRowBuilder()
            .withStr(1, "CA,DE")
            .withInt(1, 2500)
            .withDecFactor(1, 1.525),
        new RateFactorRowBuilder()
            .withStr(1, "UT,CT,NJ")
            .withInt(1, 250)
            .withDecFactor(1, 0.525),
        new RateFactorRowBuilder()
            .withInt(1, 500)
            .withDecFactor(1, 1.525),
        new RateFactorRowBuilder()
            .withStr(1, "MA")
            .withInt(1, 250)
            .withDecFactor(1, 2.525),
        new RateFactorRowBuilder()
            .withDecFactor(1, 4.525)
    }
  }

  property get PACoveragesMultiSelectData() : CoverageRateFactorBuilder[] {
    return {
        new CoverageRateFactorBuilder()
            .withCovCode("PACollisionCov")
            .withCovTermCode("PACollDeductible")
            .withCovTermOptCode(RateTableColumn.packMultiSelectValues({"250","500"}))
            .withFactor(1.5bd),
        new CoverageRateFactorBuilder()
            .withCovCode("PACollisionCov")
            .withCovTermCode("PACollDeductible")
            .withCovTermOptCode("1000")
            .withFactor(0.525bd)
    }
  }

  property get PAPrevInsuranceData() : RateFactorRowBuilder[] {
    return {
      new RateFactorRowBuilder()
        .withBit(1, true)
        .withDecFactor(1, 0.9),
      new RateFactorRowBuilder()
        .withBit(1, false)
        .withDecFactor(1, 1.1)
    }
  }

  property get PAMakeGeoClassData() : RateFactorRowBuilder[] {
    var ASIA = "Asia"
    var EUROPE = "Europe"
    var AMERICA = "America"
    return {
      new RateFactorRowBuilder().withStr(1, "Toyota"        ).withStrFactor(1, ASIA),
      new RateFactorRowBuilder().withStr(1, "Honda"         ).withStrFactor(1, ASIA),
      new RateFactorRowBuilder().withStr(1, "Nissan"        ).withStrFactor(1, ASIA),
      new RateFactorRowBuilder().withStr(1, "Subaru"        ).withStrFactor(1, ASIA),

      new RateFactorRowBuilder().withStr(1, "Mercedes-Benz" ).withStrFactor(1, EUROPE),
      new RateFactorRowBuilder().withStr(1, "BMW"           ).withStrFactor(1, EUROPE),
      new RateFactorRowBuilder().withStr(1, "Volkswagen"    ).withStrFactor(1, EUROPE),

      new RateFactorRowBuilder().withStr(1, "Ford"          ).withStrFactor(1, AMERICA),
      new RateFactorRowBuilder().withStr(1, "Chevrolet"     ).withStrFactor(1, AMERICA),
      new RateFactorRowBuilder().withStr(1, "Chrysler"      ).withStrFactor(1, AMERICA)
    }
  }

  property get PAGeoRateData() : RateFactorRowBuilder[] {
    return {
      new RateFactorRowBuilder().withStr(1, "America").withDecFactor(1, 1.1),
      new RateFactorRowBuilder().withStr(1, "Asia"   ).withDecFactor(1, 1.2),
      new RateFactorRowBuilder().withStr(1, "Europe" ).withDecFactor(1, 1.3)
    }
  }

  property get PAPostCodeData() : RateFactorRowBuilder[] {
  var POSTCODE_TABLE : List<Object[]> = {
    // Country    Postal Code    Coverage Code    Rating Area
    { "GB",          "AB",          "PACollisionCov", 3},
    { "GB",          "AB",          null,             7},
    { "GB",          "AB0",         null,             6},
    { "GB",          "AB00",        null,             2},
    { "GB",          "AB000",       "PACollisionCov", 6},
    { "GB",          "AB0000",      null,             9},
    { "GB",          "AB0001",      null,             3},
    { "GB",          "AB0002",      null,             3},
    { "GB",          "AB001",       "PACollisionCov", 2},
    { "GB",          "AB0010",      null,             9},
    { "GB",          "AB0011",      null,             9},
    { "GB",          "AB0012",      null,             5},
    { "GB",          "AB002",       null,             9},
    { "GB",          "AB0020",      null,             5},
    { "GB",          null,          null,             15},
    { "GB",          "AB0021",      null,             10},
    { "GB",          "AB0022",      null,             10}  
  }
  return POSTCODE_TABLE.map(\ row -> 
      new RateFactorRowBuilder().withStr(1, row[0] as String)
                                .withStr(2, row[1] as String)
                                .withStr(3, row[2] as String)
                                .withDecFactor(1, row[3] as BigDecimal))
      .toTypedArray()
  }
}
