package gw.rating.rtm.builders.scenario.sample

uses gw.rating.rtm.builders.AbstractFactorRowBuilder

@Export
class HOPSampleDataFactorRowBuilder extends AbstractSampleDataFactorRowBuilder {

  public final static var FORM_FACTOR_TABLE: List<Object[]> = {
      // HOPCoverageForm, Factor
      {"ho2", 0.95},
      {"ho3", 1.00},
      {"ho4", 1.00},
      {"ho5", 1.15},
      {"ho6", 1.00}
  }

  public final static var KEY_FACTOR_TABLE: List<Object[]> = {
      // CoveragePart, Minimum, Maximum, Factor
      {"hoprental", 0, 10000, 0.054},
      {"hoprental", 10001, 20000, 0.05},
      {"hoprental", 20001, 30000, 0.046},
      {"hoprental", 30001, 40000, 0.044},
      {"hoprental", 40001, 50000, 0.043},
      {"hoprental", 50001, 60000, 0.041},
      {"hoprental", 60001, 70000, 0.038},
      {"hoprental", 70001, 80000, 0.039},
      {"hoprental", 80001, null, 0.028},
      {"hopcondo", 0, 10000, 0.062},
      {"hopcondo", 10001, 20000, 0.05},
      {"hopcondo", 20001, 30000, 0.045},
      {"hopcondo", 30001, 40000, 0.042},
      {"hopcondo", 40001, 50000, 0.04},
      {"hopcondo", 50001, 60000, 0.039},
      {"hopcondo", 60001, 70000, 0.037},
      {"hopcondo", 70001, 80000, 0.036},
      {"hopcondo", 80001, null, 0.029},
      {"hopdwelling", 0, 10000, 0.059},
      {"hopdwelling", 10001, 20000, 0.031},
      {"hopdwelling", 20001, 30000, 0.021},
      {"hopdwelling", 30001, 40000, 0.018},
      {"hopdwelling", 40001, 50000, 0.015},
      {"hopdwelling", 50001, 60000, 0.013},
      {"hopdwelling", 60001, 70000, 0.013},
      {"hopdwelling", 70001, 80000, 0.012},
      {"hopdwelling", 80001, 90000, 0.011},
      {"hopdwelling", 90001, 100000, 0.01},
      {"hopdwelling", 100001, null, 0.009}
  }

  public final static var PROTECTION_CONSTRUCTION_TABLE: List<Object[]> = {
      // CoveragePart, ProtectionClass, ConstructionType, Factor
      {"hoprental", 1, "frame", 0.93},
      {"hoprental", 2, "frame", 0.96},
      {"hoprental", 3, "frame", 0.99},
      {"hoprental", 4, "frame", 0.99},
      {"hoprental", 5, "frame", 1.00},
      {"hoprental", 1, "masonry", 0.80},
      {"hoprental", 2, "masonry", 0.82},
      {"hoprental", 3, "masonry", 0.84},
      {"hoprental", 4, "masonry", 0.85},
      {"hoprental", 5, "masonry", 0.85},
      {"hoprental", 1, "concrete", 0.80},
      {"hoprental", 2, "concrete", 0.82},
      {"hoprental", 3, "concrete", 0.84},
      {"hoprental", 4, "concrete", 0.85},
      {"hoprental", 5, "concrete", 0.85},
      {"hoprental", 1, "steel", 0.80},
      {"hoprental", 2, "steel", 0.82},
      {"hoprental", 3, "steel", 0.84},
      {"hoprental", 4, "steel", 0.85},
      {"hoprental", 5, "steel", 0.85},
      {"hoprental", 1, null, 0.93},
      {"hoprental", 2, null, 0.96},
      {"hoprental", 3, null, 0.99},
      {"hoprental", 4, null, 0.99},
      {"hoprental", 5, null, 1.00},
      {"hopcondo", 1, "frame", 0.96},
      {"hopcondo", 2, "frame", 0.97},
      {"hopcondo", 3, "frame", 0.98},
      {"hopcondo", 4, "frame", 0.99},
      {"hopcondo", 5, "frame", 1.00},
      {"hopcondo", 1, "masonry", 0.85},
      {"hopcondo", 2, "masonry", 0.86},
      {"hopcondo", 3, "masonry", 0.87},
      {"hopcondo", 4, "masonry", 0.88},
      {"hopcondo", 5, "masonry", 0.89},
      {"hopcondo", 1, "concrete", 0.85},
      {"hopcondo", 2, "concrete", 0.86},
      {"hopcondo", 3, "concrete", 0.87},
      {"hopcondo", 4, "concrete", 0.88},
      {"hopcondo", 5, "concrete", 0.89},
      {"hopcondo", 1, "steel", 0.85},
      {"hopcondo", 2, "steel", 0.86},
      {"hopcondo", 3, "steel", 0.87},
      {"hopcondo", 4, "steel", 0.88},
      {"hopcondo", 5, "steel", 0.89},
      {"hopcondo", 1, null, 0.96},
      {"hopcondo", 2, null, 0.97},
      {"hopcondo", 3, null, 0.98},
      {"hopcondo", 4, null, 0.99},
      {"hopcondo", 5, null, 1.00},
      {"hopdwelling", 1, "frame", 0.79},
      {"hopdwelling", 2, "frame", 0.84},
      {"hopdwelling", 3, "frame", 0.90},
      {"hopdwelling", 4, "frame", 0.95},
      {"hopdwelling", 5, "frame", 1.00},
      {"hopdwelling", 1, "masonry", 0.62},
      {"hopdwelling", 2, "masonry", 0.66},
      {"hopdwelling", 3, "masonry", 0.70},
      {"hopdwelling", 4, "masonry", 0.74},
      {"hopdwelling", 5, "masonry", 0.78},
      {"hopdwelling", 1, "concrete", 0.62},
      {"hopdwelling", 2, "concrete", 0.66},
      {"hopdwelling", 3, "concrete", 0.70},
      {"hopdwelling", 4, "concrete", 0.74},
      {"hopdwelling", 5, "concrete", 0.78},
      {"hopdwelling", 1, "steel", 0.62},
      {"hopdwelling", 2, "steel", 0.66},
      {"hopdwelling", 3, "steel", 0.70},
      {"hopdwelling", 4, "steel", 0.74},
      {"hopdwelling", 5, "steel", 0.78},
      {"hopdwelling", 1, null, 0.79},
      {"hopdwelling", 2, null, 0.84},
      {"hopdwelling", 3, null, 0.90},
      {"hopdwelling", 4, null, 0.95},
      {"hopdwelling", 5, null, 1.00}
  }

  public final static var COMPANY_LOSS_COST_MULTIPLIER_TABLE: List<Object[]> = {
      // UWCompanyCode, Multiplier
      {"1111_11111", 0.9},
      {"2111_11111", 1},
      {"3111_33333", 1.1},
      {"4111_44444", 0.9},
      {"5666_55555", 1},
      {"6666_66666", 1.1},
      {"7777_12345", 0.9},
      {"7777_23211", 1},
      {"9000_00001", 1.1}
  }

  public final static var TERRITORY_LOSS_COST_TABLE: List<Object[]> = {
      // CoveragePart, TerritoryCode, LostCost
      {"hoprental", null, 37},
      {"hoprental", 30, 29.50},
      {"hoprental", 230, 37.00},
      {"hoprental", 240, 46.00},
      {"hoprental", 250, 48.00},
      {"hoprental", 260, 55.00},
      {"hopcondo", null, 38.48},
      {"hopcondo", 30, 30.68},
      {"hopcondo", 230, 38.48},
      {"hopcondo", 240, 47.84},
      {"hopcondo", 250, 49.92},
      {"hopcondo", 260, 57.20},
      {"hopdwelling", null, 355.94},
      {"hopdwelling", 30, 283.66},
      {"hopdwelling", 230, 355.94},
      {"hopdwelling", 240, 442.52},
      {"hopdwelling", 250, 461.76},
      {"hopdwelling", 260, 529.10}
  }

  public final static var COV_C_INCREASED_LIMIT_FACTOR_TABLE: List<Object[]> = {
      // HOPCoverageForm, CostPerThousand
      {"ho2", 1.73},
      {"ho3", 2},
      {"ho4", 0},
      {"ho5", 2.2},
      {"ho6", 0}
  }

  public final static var COV_D_INCREASED_LIMIT_FACTOR_TABLE: List<Object[]> = {
    // HOPCoverageForm, CostPerThousand
    {null, 2.3}
  }

  public final static var COV_E_INCREASED_LIMIT_FACTOR_TABLE : List<Object[]> = {
      // Limit, Cost
      {"100000", 0},
      {"200000", 8},
      {"250000", 12},
      {"300000", 15},
      {"400000", 19},
      {"500000", 23}
  }

  public final static var COV_F_INCREASED_LIMIT_FACTOR_TABLE: List<Object[]> = {
      // Limit, Cost
      {"1000", 0},
      {"2000", 3},
      {"3000", 6},
      {"4000", 9},
      {"5000", 11},
      {"10000", 11},
      {"15000", 11}
  }

  public final static var SCHEDULED_PERSONAL_PROPERTY_FACTOR_TABLE: List<Object[]> = {
      // CoverageType, Factor
      {"jewelry", 7},
      {"furs", 7},
      {"silverware", 3},
      {"guns", 3},
      {null, 4}
  }

  public final static var ORDINANCE_LAW_FACTOR_TABLE: List<Object[]> = {
      // Limit Percentage, Factor
      {"10", 0},
      {"15", 0.02},
      {"25", 0.03},
      {"50", 0.07},
      {"75", 0.11},
      {"100", 0.15}
  }


  //(hopdwelling, 30, <<500000,500000>>, 500) = 0.96
  public final static var ALL_PERILS_DEDUCTIBLE_FACTOR_TABLE: List<Object[]> = {
      {"hoprental",     100,	      0,	        null,	    null,	           0.18},
      {"hoprental",	    250,	      0,	        null,	    null,	           0.09},
      {"hoprental",	    500,	      0,	        25000,	  null,	          -0.09},
      {"hoprental",	    500,	      25001,	    null,	    null,	          -0.07},
      {"hoprental",	    1000,	      0,	        25000,	  null,	          -0.23},
      {"hoprental",	    1000,	      25001,	    null,	    null,	          -0.16},
      {"hoprental",     1500,       0,          25000,    null,           -0.36},
      {"hoprental",     1500,       25001,      null,     null,           -0.24},
      {"hoprental",	    2500,	      0,	        25000,	  null,	          -0.41},
      {"hoprental",	    2500,	      25001,	    null,	    null,	          -0.32},
      {"hopcondo",	    100,	      0,	        null,	    null,	           0.18},
      {"hopcondo",	    250,	      0,	        null,	    null,	           0.09},
      {"hopcondo",	    500,	      0,	        40000,	  null,	          -0.1},
      {"hopcondo",	    500,	      40001,	    null,	    null,	          -0.08},
      {"hopcondo",	    1000,	      0,	        40000,	  null,	          -0.24},
      {"hopcondo",	    1000,	      40001,	    null,	    null,	          -0.19},
      {"hopcondo",      1500,       0,          40000,    null,           -0.34},
      {"hopcondo",      1500,       40001,      null,     null,           -0.28},
      {"hopcondo",	    2500,	      0,	        40000,	  null,	          -0.44},
      {"hopcondo",	    2500,	      40001,	    null,	    null,         	-0.37},
      {"hopdwelling",	  100,	      0,	        null,	    null,	           0.18},
      {"hopdwelling",	  250, 	      0,	        null,	    null,	           0.09},
      {"hopdwelling",	  500,	      0,	        99999,	  null,	          -0.04},
      {"hopdwelling",	  500,	      100000,	    200000,	  null,	          -0.02},
      {"hopdwelling",	  500,	      200001,	    null,	    null,	          -0.01},
      {"hopdwelling",	  1000,	      0,	        99999,	  null,	          -0.08},
      {"hopdwelling",	  1000,	      100000,	    200000,	  null,	          -0.07},
      {"hopdwelling",	  1000,	      200001,	    null,	    null,	          -0.05},
      {"hopdwelling",   1500,       0,          99999,    null,           -0.15},
      {"hopdwelling",   1500,       100000,     200000,   null,           -0.12},
      {"hopdwelling",   1500,       200001,     null,     null,           -0.08},
      {"hopdwelling",	  2500,	      0,	        99999,	  null,	          -0.22},
      {"hopdwelling",	  2500,	      100000,	    200000,	  null,	          -0.16},
      {"hopdwelling",	  2500,	      200001,	    null,	    null,	          -0.12},
      {"hopdwelling",	  5000,	      0,	        99999,	  null,	          -0.31},
      {"hopdwelling",	  5000,	      100000,	    200000,	  null,	          -0.25},
      {"hopdwelling",	  5000,	      200001,	    null,	    null,	          -0.19}
  }

  public final static var MODIFIER_FACTOR_TABLE: List<Object[]> = {
      // Modifier, Modifier Value, Factor
      {"HOPNonSmoker", "true", -0.02},
      {"HOPMannedSecurity", "true", -0.02},
      {"HOPMultiPolicy", "true", -0.1},
      {"HOPLightningProtection", "true", -0.01},
      {"HOPInternetOfThings", "true", -0.02},
      {"HOPLoyalty","1year", -0.01},
      {"HOPLoyalty","2years", -0.02},
      {"HOPLoyalty","3years", -0.03},
      {"HOPLoyalty","4years", -0.04},
      {"HOPLoyalty","5years_plus", -0.05},
      {"HOPProfessional", "Astronomers_Astrophysicists", -0.01},
      {"HOPProfessional", "Educators", -0.02},
      {"HOPProfessional", "FirstResponders", -0.03},
      {"HOPProfessional", "HealthCareProfessionals", -0.02},
      {"HOPProfessional", "Librarians", -0.01},
      {"HOPProfessional", "MaritimeCrew", -0.02},
      {"HOPProfessional", "RailRoadTrainCrew", -0.02},
      {"HOPProfessional", "SoftwareProfessionals", -0.01}
  }

  private final static var NAME_MAP: Map<String, List<Object[]>> = {
      HOPSampleDataTablesBuilder.HOP_FORM_FACTOR_CODE->FORM_FACTOR_TABLE,
      HOPSampleDataTablesBuilder.HOP_KEY_FACTOR_CODE->KEY_FACTOR_TABLE,
      HOPSampleDataTablesBuilder.HOP_PROTECTION_CONSTRUCTION_CODE->PROTECTION_CONSTRUCTION_TABLE,
      HOPSampleDataTablesBuilder.HOP_COMPANY_LOSS_COST_MULTIPLIER_CODE->COMPANY_LOSS_COST_MULTIPLIER_TABLE,
      HOPSampleDataTablesBuilder.HOP_TERRITORY_LOSS_COST_CODE->TERRITORY_LOSS_COST_TABLE,
      HOPSampleDataTablesBuilder.HOP_SCHEDULED_PERSONAL_PROPERTY_FACTOR_CODE->SCHEDULED_PERSONAL_PROPERTY_FACTOR_TABLE,
      HOPSampleDataTablesBuilder.HOP_COV_C_INCREASED_LIMIT_FACTOR_CODE->COV_C_INCREASED_LIMIT_FACTOR_TABLE,
      HOPSampleDataTablesBuilder.HOP_COV_D_INCREASED_LIMIT_FACTOR_CODE->COV_D_INCREASED_LIMIT_FACTOR_TABLE,
      HOPSampleDataTablesBuilder.HOP_COV_E_INCREASED_LIMIT_FACTOR_CODE->COV_E_INCREASED_LIMIT_FACTOR_TABLE,
      HOPSampleDataTablesBuilder.HOP_COV_F_INCREASED_LIMIT_FACTOR_CODE->COV_F_INCREASED_LIMIT_FACTOR_TABLE,
      HOPSampleDataTablesBuilder.HOP_ORDINANCE_LAW_CODE->ORDINANCE_LAW_FACTOR_TABLE,
      HOPSampleDataTablesBuilder.HOP_ALL_PERILS_DEDUCTIBLE_FACTOR_CODE->ALL_PERILS_DEDUCTIBLE_FACTOR_TABLE,
      HOPSampleDataTablesBuilder.HOP_MODIFIER_FACTOR_CODE ->MODIFIER_FACTOR_TABLE
  }

  static function getData(tableDef: RateTableDefinition): AbstractFactorRowBuilder[] {
    var data = NAME_MAP.get(tableDef.TableCode)
    return getData(tableDef, data)
  }
}
