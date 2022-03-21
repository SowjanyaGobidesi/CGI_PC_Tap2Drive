package gw.rating.rtm.builders.scenario.sample

uses java.lang.Integer
uses java.lang.IllegalArgumentException
uses java.math.BigDecimal
uses java.math.MathContext
uses java.util.Date
uses java.util.Map
uses java.util.ArrayList
uses gw.rating.rtm.builders.AbstractFactorRowBuilder
uses gw.rating.rtm.builders.RateFactorRowBuilder
uses gw.rating.rtm.builders.CoverageRateFactorBuilder
uses java.util.List
uses gw.api.upgrade.Coercions

@Export
class SampleDataFactorRowBuilder {

  public final static var BASE_RATE_TABLE : List<Object[]> = {
   // CovCode               Jurisdiction  Postal Code   Base Rate
    { "PACollisionCov",     "",           "",           93.00 },
    { "PACollisionCov",     "CA",         "",           95.00 },
    { "PACollisionCov",     "CA",         "94404",      85.00 },
    { "PACollisionCov",     "CA",         "94404-5063", 80.00 },
    { "PAComprehensiveCov", "",           "",           57.00 },
    { "PALiabilityCov",     "",           "",           172.00 },
    { "PARentalCov",        "",           "",           20.00 },
    { "PATowingLaborCov",   "",           "",           15.00 },
    { "PAUIMBICov",         "",           "",           14.00 },
    { "PAUMBICov",          "",           "",           41.00 },
    { "PAUMPDCov",          "",           "",           13.00 },
    { "PAMedPayCov",        "",           "",           1.00 },
    { "PALimitedMexicoCov", "",           "",           15.00},
    // PA PIP coverages
    { "PAPIP_AR",           "AR",          "",           1.87 },
    { "PAPIP_NJ",           "NJ",          "",           0.07 },
    { "PAPIP_KY",           "KY",          "",           0.053 },
    { "PACollision_MA_MI_Limited", "MA",   "",           90.0},
    { "PACollision_MA_MI_Limited", "MI",   "",           90.0},
    { "PAExcessElectronicsCov", "",        "",           20.0},
    { "PATapeDiscMediaCov",   "",          "",           15.0}
  }

  public final static var INCREASED_BASE_RATE_TABLE : List<Object[]> = {
   // CovCode               Jurisdiction  Postal Code,  Base Rate
    { "PACollisionCov",     "",           "",           930.00 },
    { "PAComprehensiveCov", "",           "",           570.00 },
    { "PALiabilityCov",     "",           "",           1720.00 },
    { "PARentalCov",        "",           "",           200.00 },
    { "PATowingLaborCov",   "",           "",           150.00 },
    { "PAUIMBICov",         "",           "",           140.00 },
    { "PAUMBICov",          "",           "",           410.00 },
    { "PAUMPDCov",          "",           "",           130.00 },
    { "PAMedPayCov",        "",           "",           10.00 },
    // PA PIP coverages
    { "PAPIP_AR",           "AR",         "",           10.87 },
    { "PAPIP_NJ",           "NJ",         "",           0.7 },
    { "PAPIP_KY",           "KY",         "",           0.53 }
  }

  final static var COVERAGES_TABLE : List<Object[]> = {
   // CovCode                 CovTermCode             CovTermValueCode  Jurisdiction  Base Rate
    { "PACollisionCov",       "PACollDeductible",     "250",            "",            1.50 },
    { "PACollisionCov",       "PACollDeductible",     "500",            "",            1.00 },
    { "PACollisionCov",       "PACollDeductible",     "1000",           "",            0.85 },
    { "PACollisionCov",       "PACollDeductible",     "",               "",            1.00 },

    { "PAComprehensiveCov",   "PACompDeductible",     "250",            "",            1.50 },
    { "PAComprehensiveCov",   "PACompDeductible",     "500",            "",            1.00 },
    { "PAComprehensiveCov",   "PACompDeductible",     "1000",           "",            0.85 },
    { "PAComprehensiveCov",   "PACompDeductible",     "",               "",            1.00 },

    { "PALiabilityCov",       "PALiability",          "0/0/10",         "",            0.55 },
    { "PALiabilityCov",       "PALiability",          "20/40/10",       "",            0.90 },
    { "PALiabilityCov",       "PALiability",          "20/40/15",       "",            0.93 },
    { "PALiabilityCov",       "PALiability",          "25/50/10",       "",            1.00 },
    { "PALiabilityCov",       "PALiability",          "25/50/15",       "",            1.03 },
    { "PALiabilityCov",       "PALiability",          "25/50/20",       "",            1.05 },
    { "PALiabilityCov",       "PALiability",          "25/50/25",       "KY",          1.00 },
    { "PALiabilityCov",       "PALiability",          "25/50/25",       "",            1.14 },
    { "PALiabilityCov",       "PALiability",          "30/60/10",       "",            1.18 },
    { "PALiabilityCov",       "PALiability",          "50/100/50",      "",            1.70 },
    { "PALiabilityCov",       "PALiability",          "100/200/50",     "",            2.80 },
    { "PALiabilityCov",       "PALiability",          "250/500/100",    "",            3.80 },
    { "PALiabilityCov",       "PALiability",          "40K",            "",            0.85 },
    { "PALiabilityCov",       "PALiability",          "50K",            "",            0.97 },
    { "PALiabilityCov",       "PALiability",          "100K",           "",            1.60 },
    { "PALiabilityCov",       "PALiability",          "250K",           "",            2.60 },
    { "PALiabilityCov",       "PALiability",          "500K",           "",            3.60 },
    { "PALiabilityCov",       "PALiability",          "1M",             "",            4.50 },
    { "PALiabilityCov",       "PALiability",          "12.5/25/7.5",    "",            0.72 },
    { "PALiabilityCov",       "PALiability",          "15/30/5",        "",            0.75 },
    { "PALiabilityCov",       "PALiability",          "15/30/10",       "",            0.84 },
    { "PALiabilityCov",       "PALiability",          "20/40/5",        "",            0.87 },
    { "PALiabilityCov",       "PALiability",          "",               "",            0.20 },
    { "PALiabilityCov",       "PAFullLimitedTort",    "full",           "",            3.00 },
    { "PALiabilityCov",       "PAFullLimitedTort",    "limited",        "",            2.00 },
    { "PALiabilityCov",       "PAFullLimitedTort",    "",               "",            1.00 },

    { "PAMedPayCov",          "PAMedLimit",           "10000",          "",           50.00 },
    { "PAMedPayCov",          "PAMedLimit",           "15000",          "",           75.00 },
    { "PAMedPayCov",          "PAMedLimit",           "20000",          "",          100.00 },
    { "PAMedPayCov",          "PAMedLimit",           "25000",          "",          125.00 },
    { "PAMedPayCov",          "PAMedLimit",           "",               "",            0.00 },

    { "PAUIMBICov",           "PAUIMBI",              "15/30",          "",            0.75 },
    { "PAUIMBICov",           "PAUIMBI",              "25/50",          "",            1.00 },
    { "PAUIMBICov",           "PAUIMBI",              "50/100",         "",            1.70 },
    { "PAUIMBICov",           "PAUIMBI",              "250/500",        "",            3.80 },
    { "PAUIMBICov",           "PAUIMBI",              "",               "",            1.00 },

    { "PAUMBICov",            "PAUMBI",               "15/30",          "",            0.75 },
    { "PAUMBICov",            "PAUMBI",               "25/50",          "",            1.00 },
    { "PAUMBICov",            "PAUMBI",               "50/100",         "",            1.70 },
    { "PAUMBICov",            "PAUMBI",               "250/500",        "",            3.80 },
    { "PAUMBICov",            "PAUMBI",               "",               "",            1.00 },

    { "PAUMPDCov",            "PAUMPDLimit",          "25000",          "",            1.00 },
    { "PAUMPDCov",            "PAUMPDLimit",          "50000",          "",            1.70 },
    { "PAUMPDCov",            "PAUMPDLimit",          "",               "",            1.00 },

    { "PAPIP_AR",             "PAPIP_AR_WorkLoss",    true,             "AR",          3.12 },
    { "PAPIP_AR",             "PAPIP_AR_WorkLoss",    false,            "AR",          3.12 },

    { "PAPIP_NJ",             "PAPIPNJ_OTHER_LIMS",   "PIPNJ_ADDED1",   "NJ",          3.03 },
    { "PAPIP_NJ",             "PAPIPNJ_OTHER_LIMS",   "PIPNJ_ADDED2",   "NJ",          6.04 },
    { "PAPIP_NJ",             "PAPIPNJ_OTHER_LIMS",   "PIPNJ_ADDED3",   "NJ",          7.26 },
    { "PAPIP_NJ",             "PAPIPNJ_OTHER_LIMS",   "PIPNJ_ADDED4",   "NJ",          9.07 },
    { "PAPIP_NJ",             "PAPIPNJ_OTHER_LIMS",   "PIPNJ_ADDED5",   "NJ",         15.71 },
    { "PAPIP_NJ",             "PAPIPNJ_OTHER_LIMS",   "PIPNJ_ADDED6",   "NJ",         22.96 },
    { "PAPIP_NJ",             "PAPIPNJ_OTHER_LIMS",   "PIPNJ_ADDED7",   "NJ",         27.80 },
    { "PAPIP_NJ",             "PAPIPNJ_OTHER_LIMS",   "PIPNJ_ADDED8",   "NJ",         33.24 },

    { "PAPIP_NJ",             "PAPIPNJ_MEDsecondary", "true",           "NJ",          0.75 },
    { "PAPIP_NJ",             "PAPIPNJ_MEDsecondary", "false",          "NJ",          1.00 },

    { "PAPIP_KY",             "PAPIPKY_AggLimit",     "10000",          "KY",          1.00 },
    { "PAPIP_KY",             "PAPIPKY_AggLimit",     "20000",          "KY",          3.06 },
    { "PAPIP_KY",             "PAPIPKY_AggLimit",     "30000",          "KY",          5.51 },
    { "PAPIP_KY",             "PAPIPKY_AggLimit",     "40000",          "KY",          7.97 },
    { "PAPIP_KY",             "PAPIPKY_AggLimit",     "65000",          "KY",         10.42 },
    { "PAPIP_KY",             "PAPIPKY_AggLimit",     "90000",          "KY",         15.32 },
    { null,                   null,                   null,             null,          1.0 } // don't allow missing covterm to cause rating failure
  }

  final static var DRIVER_AGE_TABLE : List<Object[]> = {
  // AGE_MIN    AGE_MAX    Factor
    { null,        25,      1.25 },
    { 26,        null,      1.0  }
  }
  
  final static var YOUTHFUL_DRIVER_TABLE : List<Object[]> = {
  // JURISDICTION    AGE
    { null,          20 }
  }

  final static var PIP_NJ_TABLE : List<Object[]> = {
   // Limit      Deductible   MedOnly  Factor
    { "10",      "250",       true,    0.59 },
    { "10",      "250",       false,   0.60 },
    { "10",      "500",       true,    0.56 },
    { "10",      "500",       false,   0.57 },
    { "10",      "1000",      true,    0.52 },
    { "10",      "1000",      false,   0.53 },
    { "10",      "2000",      true,    0.46 },
    { "10",      "2000",      false,   0.47 },
    { "10",      "2500",      true,    0.43 },
    { "10",      "2500",      false,   0.44 },
    { "25",      "250",       true,    0.79 },
    { "25",      "250",       false,   0.81 },
    { "25",      "500",       true,    0.77 },
    { "25",      "500",       false,   0.78 },
    { "25",      "1000",      true,    0.72 },
    { "25",      "1000",      false,   0.73 },
    { "25",      "2000",      true,    0.65 },
    { "25",      "2000",      false,   0.66 },
    { "25",      "2500",      true,    0.62 },
    { "25",      "2500",      false,   0.63 },
    { "50",      "250",       true,    0.84 },
    { "50",      "250",       false,   0.85 },
    { "50",      "500",       true,    0.81 },
    { "50",      "500",       false,   0.83 },
    { "50",      "1000",      true,    0.77 },
    { "50",      "1000",      false,   0.78 },
    { "50",      "2000",      true,    0.69 },
    { "50",      "2000",      false,   0.71 },
    { "50",      "2500",      true,    0.66 },
    { "50",      "2500",      false,   0.67 },
    { "100",     "250",       true,    0.93 },
    { "100",     "250",       false,   0.95 },
    { "100",     "500",       true,    0.90 },
    { "100",     "500",       false,   0.92 },
    { "100",     "1000",      true,    0.86 },
    { "100",     "1000",      false,   0.87 },
    { "100",     "2000",      true,    0.78 },
    { "100",     "2000",      false,   0.80 },
    { "100",     "2500",      true,    0.75 },
    { "100",     "2500",      false,   0.76 },
    { "250",     "250",       true,    0.98 },
    { "250",     "250",       false,   1.00 },
    { "250",     "500",       true,    0.96 },
    { "250",     "500",       false,   0.97 },
    { "250",     "1000",      true,    0.91 },
    { "250",     "1000",      false,   0.93 },
    { "250",     "2000",      true,    0.84 },
    { "250",     "2000",      false,   0.85 },
    { "250",     "2500",      true,    0.80 },
    { "250",     "2500",      false,   0.82 }
  }

  final static var VEHICLE_AGE_TABLE : List<Object[]> = {
   // Min       Max        Jurisdiction  Factor
    { null,     1,         "CA",         1.20 },
    { null,     1,         "",           1.00 },
    { 2,        3,         "",           0.90 },
    { 3,        5,         "",           0.80 },
    { 5,        10,        "",           0.70 },
    { 10,       null,      "WI",         0.50 },
    { 10,       null,      "",           0.30 }
  }

  final static var VEHICLE_COST_TABLE : List<Object[]> = {
   // Min       Max       Jurisdiction  Factor
    { 0,        4500,     "",           0.44 },
    { 4501,     6000,     "",           0.50 },
    { 6001,     8000,     "",           0.65 },
    { 8001,     10000,    "",           0.80 },
    { 10001,    15000,    "",           0.90 },
    { 15001,    20000,    "",           1.00 },
    { 20001,    25000,    "",           1.20 },
    { 20001,    25000,    "KY",         1.50 },
    { 25001,    40000,    "",           1.50 },
    { 40001,    65000,    "",           2.00 },
    { 65001,    90000,    "",           3.00 },
    { 90001,    null,     "",           4.00 }
  }
  public final static var VEHICLE_COST_TABLE_UPDATE : List<Object[]> = {
    { 20001,    25000,   "KY",          1.3   }
  }

  final static var UW_COMPANY_TABLE : List<Object[]> = {
   // UW Code             Jurisdiction  Factor
    { "3111_33333",       "",           1.10 },
    { "2111_11111",       "",           1.00 },
    { "1111_11111",       "",           0.90 }
  }

  final static var DISCOUNT_TABLE : List<Object[]> = {
   // Type                Jurisdiction  Factor
    { "AntiLockBrakes",   "",           0.95 },
    { "AntiTheft",        "",           0.93 },
    { "GoodDriver",       "",           0.90 },
    { "NoLoss",           "",           0.85 }
  }

  final static var COVERAGE_DISCOUNT_TABLE : List<Object[]> = {
    // Coverage            // Factor (discount type)
    {"PALiabilityCov",     "GoodDriver"},
    {"PACollisionCov",     "AntiLockBrakes"},
    {"PAComprehensiveCov", "AntiTheft"},
    {null,                 "NoLoss"}
  }

  final static var MULTIPOLICY_TABLE : List<Object[]> = {
   // Multi Policy        Jurisdiction  Factor
    { "3policy",          "",           0.85 },
    { "2policy",          "",           0.90 },
    { null,               "",           1.00 }
  }

  final static var POSTCODE_TABLE : List<Object[]> = {
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
    { "GB",          "AB0021",      null,             10},
    { "GB",          "AB0022",      null,             10}
  }
  
  public final static var INTERPOLATED_TABLE : List<Object[]> = {
   // Exact(State)     Interpolated(vehicle age)   exact(discount code)    factor

    { null,                 null,                      null,                 1.4      }, 
    { "NJ",                 null,                      null,                 1.3      }, 
    { "NJ",                   0,                       null,                 1.0      }, 
    { "NJ",                   2,                       null,                 1.0      }, 
    { "NJ",                   3,                       null,                 0.9      }, 
    { "NJ",                   6,                       null,                 0.8      }, 
    { "NJ",                  10,                       null,                 0.7      }, 
    { "NJ",                  10,                       1234,                 0.5      }
  }

  public final static var INTERPOLATED_WITH_RELAX_TABLE : List<Object[]> = {
   // Exact(State)     Interpolated(vehicle age)   exact(discount code)    factor

    { null,                 null,                      null,                 1.4      },
    { "NJ",                 null,                      null,                 1.3      },
    { "NJ",                   0,                       null,                 1.0      },
    { "NJ",                   2,                       null,                 1.0      },
    { "NJ",                   3,                       null,                 0.9      },
    { "NJ",                   6,                       null,                 0.8      },
    { "NJ",                  10,                       null,                 0.7      },
    { "NJ",                  12,                       null,                 0.4      },
    { "NJ",                  10,                       1234,                 0.2      }
  }

  public final static var RENEWAL_CAP_TABLE : List<Object[]> = {
    // Exact (Cov code)      Range min, max (new term amount)     Cap amount factor      Cap percent factor
    { "PAComprehensiveCov",        null,   250,                               25,               null},
    { "PAComprehensiveCov",        250,    500,                              null,              10.0},
    { "PAComprehensiveCov",        500,   null,                              null,               8.0},
    { "PACollisionCov",           null,    250,                              null,               3.0},
    { "PACollisionCov",            250,    500,                               25,               null}
    // PACollisionCov above 500 no cap
    // Other vehicle coverages no cap
  }

  public final static var REF_VALUE_PROVIDER_TEST_TABLE : List<Object[]> = {
    //Integer Param      String Param    Boolean Param   Date Param    Decimal Factor
    { 1,              "One",            true,         Date.Today,         1.0},
    { 5,              "Five",           false,        Date.Tomorrow,      5.0},
    { 10,             "Ten",            true,         Date.Today,         10.0},
    { 15,             "Fifteen",        true,         Date.Today,         15.0},
    { 20,             "Twenty",         false,        Date.Today,         20.0}
  }

  final private static var NAME_MAP : Map<String, List<Object[]>> = {
      SampleDataTablesBuilder.PA_COV_BASE_RATE   -> BASE_RATE_TABLE,
      SampleDataTablesBuilder.PA_COVERAGES       -> COVERAGES_TABLE,
      SampleDataTablesBuilder.PA_DRIVER_AGE      -> DRIVER_AGE_TABLE,
      SampleDataTablesBuilder.PA_YOUTHFUL_DRIVER -> YOUTHFUL_DRIVER_TABLE,
      SampleDataTablesBuilder.PA_VEHICLE_AGE     -> VEHICLE_AGE_TABLE,
      SampleDataTablesBuilder.PA_VEHICLE_COST    -> VEHICLE_COST_TABLE,
      SampleDataTablesBuilder.PA_UW_COMPANY      -> UW_COMPANY_TABLE,
      SampleDataTablesBuilder.PA_DISCOUNT        -> DISCOUNT_TABLE,
      SampleDataTablesBuilder.PA_MULTIPOLICY     -> MULTIPOLICY_TABLE,
      SampleDataTablesBuilder.PA_PIP_NJ          -> PIP_NJ_TABLE,
      SampleDataTablesBuilder.POSTCODE_RATING    -> POSTCODE_TABLE,
      SampleDataTablesBuilder.PA_COV_DISCOUNT    -> COVERAGE_DISCOUNT_TABLE,
      SampleDataTablesBuilder.INTERPOLATED_PARAM -> INTERPOLATED_TABLE,
      SampleDataTablesBuilder.INTERPOLATED_WITH_RELAX_PARAM -> INTERPOLATED_WITH_RELAX_TABLE,
      SampleDataTablesBuilder.PA_RENEWAL_CAP     -> RENEWAL_CAP_TABLE,
      SampleDataTablesBuilder.REF_VALUE_PROVIDER_TEST   -> REF_VALUE_PROVIDER_TEST_TABLE
  }

  static function getData(tableDef : RateTableDefinition) : AbstractFactorRowBuilder[] {
    var data = NAME_MAP.get(tableDef.TableCode)
    return getData(tableDef, data)
  }

  static function getData(tableDef : RateTableDefinition, data : List<Object[]>) : AbstractFactorRowBuilder[] {
    var rows = new ArrayList<AbstractFactorRowBuilder>()
    for (i in 0..|data.Count) {
      var builder = createRowBuilderFor(tableDef.TableCode)
      tableDef.AllColumns.eachWithIndex(\ col, j -> {
        builder.with(col.PhysicalColumnName, wrap(col, data[i][j]))
      })
      rows.add(builder)
    }
    return rows.toTypedArray()
  }

  static function createRowBuilderFor(tableCode : String) : AbstractFactorRowBuilder {
    switch (tableCode) {
      case SampleDataTablesBuilder.PA_COVERAGES:
        return new CoverageRateFactorBuilder()
      default:
        return new RateFactorRowBuilder()
    }
  }

  static function wrap(column : RateTableColumn, value : Object) : Object {
    try {
      switch (column.ColumnType) {
        case RateTableDataType.TC_BOOLEAN : return Coercions.makeBooleanFrom(value)
        case RateTableDataType.TC_DATE    : return Coercions.makeDateFrom(value)
        case RateTableDataType.TC_DECIMAL : return value != null ? new BigDecimal(Coercions.makePDoubleFrom(value), new MathContext(4)) : null as BigDecimal
        case RateTableDataType.TC_INTEGER : return value != null ? Integer.valueOf(Coercions.makePIntFrom(value)) : null as Integer
        case RateTableDataType.TC_STRING  : return value != null ? String.valueOf(value) : null as String
      }
      throw new IllegalArgumentException("Invalid column type ${column.ColumnType}")
    } catch (nfe: java.lang.NumberFormatException) {
      throw new IllegalArgumentException("Value \"" +value+ "\" for column " +column.ColumnName+ " is not "
                                         +(column.ColumnType == TC_INTEGER ? "an integer" : "a decimal"),
      nfe)
    } catch (cce: java.lang.ClassCastException) {
      throw new IllegalArgumentException("Could not parse " +value+ " for column " +column.ColumnName, cce)
    }
  }

}
