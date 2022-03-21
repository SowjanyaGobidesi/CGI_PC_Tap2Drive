package gw.rating.rtm.builders.scenario.sample

uses gw.rating.rtm.builders.RateTableArgumentSourceBuilder
uses gw.rating.rtm.builders.RateTableArgumentSourceSetBuilder
uses gw.rating.rtm.builders.RateTableBuilder
uses gw.rating.rtm.builders.RateTableDefinitionBuilder
uses gw.sampledata.tiny.TinySampleRatingData
uses gw.util.concurrent.LockingLazyVar

@Export
class HOPSampleDataTablesBuilder extends AbstractSampleDataTablesBuilder {

  public static final var HOP_LINE: String = "HOPLine"

  // Argument Source Sets
  public static final var HOP_BASE_PREMIUM_ARG_SET_CODE: String = "hop_base_premium_arg_src_set"
  public static final var HOP_INCREASED_LIMIT_ARG_SET_CODE: String = "hop_increased_limit_arg_src_set"
  public static final var HOP_SCHEDULED_ITEM_ARG_SET_CODE: String = "hop_sch_item_arg_src_set"
  public static final var HOP_ORDINANCE_OR_LAW_ARG_SET_CODE: String = "hop_ordinance_arg_src_set"
  public static final var HOP_ALL_PERILS_DEDUCT_ARG_SET_CODE: String = "hop_all_perils_deduct_arg_src_set"
  public static final var HOP_MOD_PREM_ARG_SET_CODE: String = "hop_mod_prem_arg_src_set"

  // Form Factor Rate Table
  public static final var HOP_FORM_FACTOR_CODE: String = "hop_form_factor"
  public static final var HOP_FORM_FACTOR: String = "Factor"

  // Key Factor Rate Table
  public static final var HOP_KEY_FACTOR_CODE: String = "hop_key_factor"
  public static final var HOP_KEY_FACTOR: String = "Factor"

  // Protection Construction Rate Table
  public static final var HOP_PROTECTION_CONSTRUCTION_CODE: String = "hop_protection_construction"
  public static final var HOP_PROTECTION_CONSTRUCTION_FACTOR: String = "Factor"

  // Company Loss Cost Multiplier Rate Table
  public static final var HOP_COMPANY_LOSS_COST_MULTIPLIER_CODE: String = "hop_loss_cost_multiplier"
  public static final var HOP_COMPANY_LOSS_COST_MULTIPLIER_FACTOR: String = "Multiplier"

  // Territory Loss Cost Rate Table
  public static final var HOP_TERRITORY_LOSS_COST_CODE: String = "hop_territory_loss_cost"
  public static final var HOP_TERRITORY_LOSS_COST_FACTOR: String = "LostCost"

  // Scheduled Personal Property Rate Table
  public static final var HOP_SCHEDULED_PERSONAL_PROPERTY_FACTOR_CODE: String = "hop_sch_personal_property_factor"
  public static final var HOP_SCHEDULED_PERSONAL_PROPERTY_FACTOR: String = "Factor"

  // Coverage C Increased Limit Cost Rate Table
  public static final var HOP_COV_C_INCREASED_LIMIT_FACTOR_CODE: String = "hop_cov_c_incr_limit_factor"
  public static final var HOP_COV_C_INCREASED_LIMIT_FACTOR: String = "CostPerThousand"

  // Coverage D Increased Limit Cost Rate Table
  public static final var HOP_COV_D_INCREASED_LIMIT_FACTOR_CODE: String = "hop_cov_d_incr_limit_factor"
  public static final var HOP_COV_D_INCREASED_LIMIT_FACTOR: String = "CostPerThousand"

  // Coverage E Increased Limit Cost Rate Table
  public static final var HOP_COV_E_INCREASED_LIMIT_FACTOR_CODE: String = "hop_cov_e_incr_limit_factor"
  public static final var HOP_COV_E_INCREASED_LIMIT_FACTOR: String = "Cost"

  // Coverage F Increased Limit Cost Rate Table
  public static final var HOP_COV_F_INCREASED_LIMIT_FACTOR_CODE: String = "hop_cov_f_incr_limit_factor"
  public static final var HOP_COV_F_INCREASED_LIMIT_FACTOR: String = "Cost"

  // Ordinance or Law Rate Table
  public static final var HOP_ORDINANCE_LAW_CODE: String = "hop_ordinance_or_law_factor"
  public static final var HOP_ORDINANCE_LAW_FACTOR: String = "Factor"

  // All Perils Deductible
  public static final var HOP_ALL_PERILS_DEDUCTIBLE_FACTOR_CODE: String = "hop_all_perils_deductible_factor"
  public static final var HOP_ALL_PERILS_DEDUCTIBLE_FACTOR: String = "Factor"

  // Modifier
  public static final var HOP_MODIFIER_FACTOR_CODE: String = "hop_modifier_factor"
  public static final var HOP_MODIFIER_FACTOR : String = "Factor"

  //----------------- Parameter Sets -----------------//

  static var _HOPBasePremiumParamSetLocal = LockingLazyVar.make(\-> {
    new TinySampleRatingData().load()
    return getCalcRoutineParameterSet(TinySampleRatingData.HOP_BASE_PREMIUM_PARAM_SET_CODE)
  })
  static var _HOPBasePremiumParamSet: CalcRoutineParameterSet as HOPBasePremiumParamSet = _HOPBasePremiumParamSetLocal.get()

  static var _HOPCoverageWrapperParamSetLocal = LockingLazyVar.make(\-> {
    new TinySampleRatingData().load()
    return getCalcRoutineParameterSet(TinySampleRatingData.HOP_COVERAGE_WRAPPER_PARAM_SET_CODE)
  })
  static var _HOPCoverageWrapperParamSet: CalcRoutineParameterSet as HOPCoverageWrapperParamSet = _HOPCoverageWrapperParamSetLocal.get()

  static var _HOPAllPerilsDeductParamSetLocal = LockingLazyVar.make(\-> {
    new TinySampleRatingData().load()
    return getCalcRoutineParameterSet(TinySampleRatingData.HOP_ALL_PERILS_PARAM_SET_CODE)
  })
  static var _HOPAllPerilsDeductParamSet: CalcRoutineParameterSet as HOPAllPerilsDeductParamSet = _HOPAllPerilsDeductParamSetLocal.get()

  static var _HOPModifierPremiumParamSetLocal = LockingLazyVar.make(\-> {
    new TinySampleRatingData().load()
    return getCalcRoutineParameterSet("HOPModifierPremiumParamSet")
  })
  static var _HOPModifierPremiumParamSet: CalcRoutineParameterSet as HOPModifierPremiumParamSet = _HOPModifierPremiumParamSetLocal.get()

  //----------------- Form Factor Rate Table -----------------//

  static property get FormFactorRateTable(): RateTableBuilder {
    return new RateTableBuilder(FormFactorRateTableDefinition)
  }

  static property get FormFactorRateTableDefinition(): RateTableDefinition {
    return FormFactorRateTableDefinitionBuilder.createAndCommit()
  }

  static property get FormFactorRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var paramBldr1 = getParam(10, "COVERAGE_FORM", "str1")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPCoverageForm.Label")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.HOPCoverageForm)")

    // Argument source builders
    var coverageFormArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPDWELLING)
        .withArgumentSource("CoverageForm")

    // Match operation builders
    var matchOpBldr1 = getMatchOp(paramBldr1, {coverageFormArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPCoverageForm.Name")

    // Argument source set builders
    var argSrcSetBldr1 = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_BASE_PREMIUM_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPBasePremium.Name")
        .withCalcRoutineParamSet(HOPBasePremiumParamSet)
        .addArgumentSource(coverageFormArgSrcBldr1)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr1)
        .withCode(HOP_FORM_FACTOR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPFormFactorTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr1)
        .addFactor(getFactor(HOP_FORM_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Key Factor Rate Table -----------------//

  static property get KeyFactorRateTable(): RateTableBuilder {
    return new RateTableBuilder(KeyFactorRateTableDefinition)
  }

  static property get KeyFactorRateTableDefinition(): RateTableDefinition {
    return KeyFactorRateTableDefinitionBuilder.createAndCommit()
  }

  static property get KeyFactorRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var paramBldr1 = getParam(10, "COVERAGE_PART", "str1")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPCoveragePart.Label")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.CoveragePartType)")

    var limitMinParamBldr = getParam(20, "MIN", "int1", RateTableDataType.TC_INTEGER)
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPMin.Label")

    var limitMaxParamBldr = getParam(30, "MAX", "int2", RateTableDataType.TC_INTEGER)
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPMax.Label")

    // Argument source builders
    var coverageArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPCOVERAGEPART)
        .withArgumentSource("CoveragePartType")

    var limitArgSrcBldr1 = new RateTableArgumentSourceBuilder()

    // Match operation builders
    var matchOpBldr1 = getMatchOp(paramBldr1, {coverageArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPCoveragePart.Name")

    var limitMinMatchOpBldr = getMatchOp({limitMinParamBldr, limitMaxParamBldr}, "LIMIT", null, limitArgSrcBldr1)
        .withOpName("LIMIT")
        .withDefinition(RANGE_MAX_INCL_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPLimit.Name")

    // Argument source set builders
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_BASE_PREMIUM_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPBasePremium.Name")
        .withCalcRoutineParamSet(HOPBasePremiumParamSet)
        .addArgumentSource(coverageArgSrcBldr1)
        .addArgumentSource(limitArgSrcBldr1.withRoot(null as CalcRoutineParamName))

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr)
        .withCode(HOP_KEY_FACTOR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPKeyFactorTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr1)
        .addMatchOperation(limitMinMatchOpBldr)
        .addFactor(getFactor(HOP_KEY_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Protection Construction Rate Table -----------------//

  static property get ProtectionConstructionRateTable(): RateTableBuilder {
    return new RateTableBuilder(ProtectionConstructionRateTableDefinition)
  }

  static property get ProtectionConstructionRateTableDefinition(): RateTableDefinition {
    return ProtectionConstructionRateTableDefinitionBuilder.createAndCommit()
  }

  static property get ProtectionConstructionRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var paramBldr1 = getParam(10, "COVERAGE_PART", "str1")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPCoveragePart.Label")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.CoveragePartType)")

    var paramBldr2 = getParam(20, "PROTECTION_CLASS", "str2")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPProtectionClass.Label")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.FireProtectClass)")

    var paramBldr3 = getParam(30, "CONSTRUCTION_TYPE", "str3")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPConstructionType.Label")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.HOPConstructionType)")

    // Argument source builders
    var coveragePartArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPCOVERAGEPART)
        .withArgumentSource("CoveragePartType")

    var protectionClasseArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPDWELLING)
        .withArgumentSource("Location.FireProtectClass")

    var constructionTypeArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPDWELLING)
        .withArgumentSource("ConstructionType")

    // Match operation builders
    var matchOpBldr1 = getMatchOp(paramBldr1, {coveragePartArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPCoveragePart.Name")

    var matchOpBldr2 = getMatchOp(paramBldr2, {protectionClasseArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPProtectionClass.Name")

    var matchOpBldr3 = getMatchOp(paramBldr3, {constructionTypeArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPConstructionType.Name")

    // Argument source set builders
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_BASE_PREMIUM_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPBasePremium.Name")
        .withCalcRoutineParamSet(HOPBasePremiumParamSet)
        .addArgumentSource(coveragePartArgSrcBldr1)
        .addArgumentSource(protectionClasseArgSrcBldr1)
        .addArgumentSource(constructionTypeArgSrcBldr1)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr)
        .withCode(HOP_PROTECTION_CONSTRUCTION_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPProtectionConstructionTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr1)
        .addMatchOperation(matchOpBldr2)
        .addMatchOperation(matchOpBldr3)
        .addFactor(getFactor(HOP_PROTECTION_CONSTRUCTION_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Company Loss Cost Multiplier Rate Table -----------------//

  static property get CompanyLossMultiplierRateTable(): RateTableBuilder {
    return new RateTableBuilder(CompanyLossMultiplierRateTableDefinition)
  }

  static property get CompanyLossMultiplierRateTableDefinition(): RateTableDefinition {
    return CompanyLossMultiplierRateTableDefinitionBuilder.createAndCommit()
  }

  static property get CompanyLossMultiplierRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var paramBldr1 = getParam(10, "UW_COMPANY", "str1")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPUWCompany.Label")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.UWCompanyCode)")

    // Argument source builders
    var policyLineArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_POLICYLINE)
        .withArgumentSource("UWCompanyCode")

    // Match operation builders
    var matchOpBldr1 = getMatchOp(paramBldr1, {policyLineArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPUWCompany.Name")

    // Argument source set builders
    var argSrcSetBldr1 = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_BASE_PREMIUM_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPBasePremium.Name")
        .withCalcRoutineParamSet(HOPBasePremiumParamSet)
        .addArgumentSource(policyLineArgSrcBldr1)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr1)
        .withCode(HOP_COMPANY_LOSS_COST_MULTIPLIER_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPLossCostMultiplierTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr1)
        .addFactor(getFactor(HOP_COMPANY_LOSS_COST_MULTIPLIER_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Territory Loss Rate Table -----------------//

  static property get TerritoryLossCostRateTable(): RateTableBuilder {
    return new RateTableBuilder(TerritoryLossCostRateTableDefinition)
  }

  static property get TerritoryLossCostRateTableDefinition(): RateTableDefinition {
    return TerritoryLossCostRateTableDefinitionBuilder.createAndCommit()
  }

  static property get TerritoryLossCostRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var paramBldr1 = getParam(10, "COVERAGE_PART", "str1")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPCoveragePart.Label")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.CoveragePartType)")

    var paramBldr2 = getParam(20, "TERRITORY_CODE", "str2")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPTerritoryCode.Label")

    // Argument source builders
    var covPartArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPCOVERAGEPART)
        .withArgumentSource("CoveragePartType")

    var territoryArgSrcBldr1 = new RateTableArgumentSourceBuilder()

    // Match operation builders
    var matchOpBldr1 = getMatchOp(paramBldr1, {covPartArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPCoveragePart.Name")

    var matchOpBldr2 = getMatchOp({paramBldr2}, "TerritoryCode", null, territoryArgSrcBldr1)
        .withOpName("TERRITORY_CODE")
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPTerritoryCode.Name")

    // Argument source set builders
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_BASE_PREMIUM_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPBasePremium.Name")
        .withCalcRoutineParamSet(HOPBasePremiumParamSet)
        .addArgumentSource(covPartArgSrcBldr1)
        .addArgumentSource(territoryArgSrcBldr1.withRoot(null as CalcRoutineParamName))

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr)
        .withCode(HOP_TERRITORY_LOSS_COST_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPTerritoryLossCostTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr1)
        .addMatchOperation(matchOpBldr2)
        .addFactor(getFactor(HOP_TERRITORY_LOSS_COST_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Scheduled Personal Property Factor Rate Table -----------------//

  static property get ScheduledPersonalPropertyRateTable(): RateTableBuilder {
    return new RateTableBuilder(ScheduledPersonalPropertyRateTableDefinition)
  }

  static property get ScheduledPersonalPropertyRateTableDefinition(): RateTableDefinition {
    return ScheduledPersonalPropertyRateTableDefinitionBuilder.createAndCommit()
  }

  static property get ScheduledPersonalPropertyRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var paramBldr1 = getParam(10, "CODE", "str1")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPScheduledPersonalPropertyItemTypeCode.Label")

    // Argument source builders
    var itemTypeCodeArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_COVERAGE)
        .withArgumentSource("TypeCode")

    // Match operation builders
    var matchOpBldr1 = getMatchOp(paramBldr1, {itemTypeCodeArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPItemTypeCode.Name")

    // Argument source set builders
    var argSrcSetBldr1 = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_SCHEDULED_ITEM_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPScheduledItem.Name")
        .withCalcRoutineParamSet(HOPCoverageWrapperParamSet)
        .addArgumentSource(itemTypeCodeArgSrcBldr1)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr1)
        .withCode(HOP_SCHEDULED_PERSONAL_PROPERTY_FACTOR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPScheduledPersonalPropertyFactorTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr1)
        .addFactor(getFactor(HOP_SCHEDULED_PERSONAL_PROPERTY_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Coverage C Increased Limit Factor Rate Table -----------------//

  static property get CovCIncreasedLimitFactorRateTable(): RateTableBuilder {
    return new RateTableBuilder(CovCIncreasedLimitFactorRateTableDefinition)
  }

  static property get CovCIncreasedLimitFactorRateTableDefinition(): RateTableDefinition {
    return CovCIncreasedLimitFactorRateTableDefinitionBuilder.createAndCommit()
  }

  static property get CovCIncreasedLimitFactorRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var paramBldr1 = getParam(10, "COVERAGE_FORM", "str1")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPCoverageForm.Label")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.HOPCoverageForm)")

    // Argument source builders
    var coverageFormArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPDWELLING)
        .withArgumentSource("CoverageForm")

    // Match operation builders
    var matchOpBldr1 = getMatchOp(paramBldr1, {coverageFormArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPCoverageForm.Name")

    // Argument source set builders
    var argSrcSetBldr1 = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_INCREASED_LIMIT_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPIncreasedLimit.Name")
        .withCalcRoutineParamSet(HOPCoverageWrapperParamSet)
        .addArgumentSource(coverageFormArgSrcBldr1)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr1)
        .withCode(HOP_COV_C_INCREASED_LIMIT_FACTOR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPCoverageCIncreasedLimitTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr1)
        .addFactor(getFactor(HOP_COV_C_INCREASED_LIMIT_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Coverage D Increased Limit Factor Rate Table -----------------//

  static property get CovDIncreasedLimitFactorRateTable(): RateTableBuilder {
    return new RateTableBuilder(CovDIncreasedLimitFactorRateTableDefinition)
  }

  static property get CovDIncreasedLimitFactorRateTableDefinition(): RateTableDefinition {
    return CovDIncreasedLimitFactorRateTableDefinitionBuilder.createAndCommit()
  }

  static property get CovDIncreasedLimitFactorRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var paramBldr1 = getParam(10, "COVERAGE_FORM", "str1")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPCoverageForm.Label")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.HOPCoverageForm)")

    // Argument source builders
    var coverageFormArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPDWELLING)
        .withArgumentSource("CoverageForm")

    // Match operation builders
    var matchOpBldr1 = getMatchOp(paramBldr1, {coverageFormArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPCoverageForm.Name")

    // Argument source set builders
    var argSrcSetBldr1 = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_INCREASED_LIMIT_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPIncreasedLimit.Name")
        .withCalcRoutineParamSet(HOPCoverageWrapperParamSet)
        .addArgumentSource(coverageFormArgSrcBldr1)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr1)
        .withCode(HOP_COV_D_INCREASED_LIMIT_FACTOR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPCoverageDIncreasedLimitTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr1)
        .addFactor(getFactor(HOP_COV_D_INCREASED_LIMIT_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Coverage E Increased Limits Factor Rate Table -----------------//

  static property get CoverageEIncreasedLimitFactorRateTable(): RateTableBuilder {
    return new RateTableBuilder(CoverageEIncreasedLimitsFactorRateTableDefinition)
  }

  static property get CoverageEIncreasedLimitsFactorRateTableDefinition(): RateTableDefinition {
    return CoverageEIncreasedLimitsFactorRateTableDefinitionBuilder.createAndCommit()
  }

  static property get CoverageEIncreasedLimitsFactorRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var limitParamBldr = getParam(10, "LIMIT", "str1", RateTableDataType.TC_STRING)
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPLimit.Name")

    // Argument Source Builder
    var limitArgSrcBldr = new RateTableArgumentSourceBuilder()
        .withRoot(TC_COVERAGE)
        .withArgumentSource("Limit")

    // Match operation builders
    var matchOpBldr = getMatchOp(limitParamBldr, {limitArgSrcBldr})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPLimit.Name")

    // Argument source set builders
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.Default.Name")
        .withCalcRoutineParamSet(HOPCoverageWrapperParamSet)
        .addArgumentSource(limitArgSrcBldr)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr)
        .withCode(HOP_COV_E_INCREASED_LIMIT_FACTOR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPCoverageEIncreasedLimitTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr)
        .addFactor(getFactor(HOP_COV_E_INCREASED_LIMIT_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Coverage F Increased Limits Factor Rate Table -----------------//

  static property get CoverageFIncreasedLimitFactorRateTable(): RateTableBuilder {
    return new RateTableBuilder(CoverageFIncreasedLimitsFactorRateTableDefinition)
  }

  static property get CoverageFIncreasedLimitsFactorRateTableDefinition(): RateTableDefinition {
    return CoverageFIncreasedLimitsFactorRateTableDefinitionBuilder.createAndCommit()
  }

  static property get CoverageFIncreasedLimitsFactorRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var limitParamBldr = getParam(10, "LIMIT", "str1", RateTableDataType.TC_STRING)
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPLimit.Name")

    // Argument Source Builder
    var limitArgSrcBldr = new RateTableArgumentSourceBuilder()
        .withRoot(TC_COVERAGE)
        .withArgumentSource("Limit")

    // Match operation builders
    var matchOpBldr = getMatchOp(limitParamBldr, {limitArgSrcBldr})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPLimit.Name")

    // Argument source set builders
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
        .withCode("DEFAULT")
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.Default.Name")
        .withCalcRoutineParamSet(HOPCoverageWrapperParamSet)
        .addArgumentSource(limitArgSrcBldr)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr)
        .withCode(HOP_COV_F_INCREASED_LIMIT_FACTOR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPCoverageFIncreasedLimitTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr)
        .addFactor(getFactor(HOP_COV_F_INCREASED_LIMIT_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Ordinance or Law Rate Table -----------------//

  static property get OrdinanceOrLawFactorsRateTable(): RateTableBuilder {
    return new RateTableBuilder(OrdinanceOrLawFactorsRateTableDefinition)
  }

  static property get OrdinanceOrLawFactorsRateTableDefinition(): RateTableDefinition {
    return OrdinanceOrLawFactorsRateTableDefinitionBuilder.createAndCommit()
  }

  static property get OrdinanceOrLawFactorsRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var paramBldr1 = getParam(10, "LIMIT_PERCENTAGE", "str1", RateTableDataType.TC_STRING)
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPLimitPercentage.Label")

    // Argument source builders
    var limitArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_COVERAGE)
        .withArgumentSource("Limit")

    // Match operation builders
    var matchOpBldr1 = getMatchOp(paramBldr1, {limitArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPLimit.Name")

    // Argument source set builders
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_ORDINANCE_OR_LAW_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPOrdinanceOrLaw.Name")
        .withCalcRoutineParamSet(HOPCoverageWrapperParamSet)
        .addArgumentSource(limitArgSrcBldr1)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr)
        .withCode(HOP_ORDINANCE_LAW_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPOrdinanceOrLawFactorTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(matchOpBldr1)
        .addFactor(getFactor(HOP_ORDINANCE_LAW_FACTOR)
            .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- All Perils Deductible Factor Rate Table -----------------//

  static property get AllPerilsDeductibleFactorRateTable(): RateTableBuilder {
    return new RateTableBuilder(AllPerilsDeductibleFactorRateTableDefinition)
  }

  static property get AllPerilsDeductibleFactorRateTableDefinition(): RateTableDefinition {
    return AllPerilsDeductibleFactorRateTableDefinitionBuilder.createAndCommit()
  }

  static property get AllPerilsDeductibleFactorRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var covPartParamBldr = getParam(10, "COVERAGE_PART", "str1")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPCoveragePart.Label")
        .withValueProvider("gw.rating.rtm.valueprovider.TypeListValueProvider(typekey.CoveragePartType)")

    var deductibleParamBldr = getParam(20, "DEDUCTIBLE", "int1", RateTableDataType.TC_INTEGER)
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPDeductible.Label")

    var limitMinParamBldr = getParam(30, "LIMIT_MIN", "int2", RateTableDataType.TC_INTEGER)
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPLimitMin.Label")

    var limitMaxParamBldr = getParam(40, "LIMIT_MAX", "int3", RateTableDataType.TC_INTEGER)
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPLimitMax.Label")

    var territoryParamBldr = getParam(50, "TERRITORY_CODE", "str2")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPTerritoryCode.Label")

    // Argument source builders
    var coverageArgSrcBldr1 = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPCOVERAGEPART)
        .withArgumentSource("CoveragePartType")

    var territoryArgSrcBldr1 = new RateTableArgumentSourceBuilder().withRoot(null as CalcRoutineParamName)

    var perilsDeductibleArgSrcBldr = new RateTableArgumentSourceBuilder().withRoot(null as CalcRoutineParamName)

    var limitArgSrcBldr = new RateTableArgumentSourceBuilder().withRoot(null as CalcRoutineParamName)

    // Match operation builders
    var coveragePartMatchOpBldr = getMatchOp(covPartParamBldr, {coverageArgSrcBldr1})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPCoveragePart.Name")

    var territoryCodeMatchOpBldr = getMatchOp({territoryParamBldr}, "TERRITORY_CODE", null, territoryArgSrcBldr1)
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPTerritoryCode.Name")

    var limitMatchOpBldr = getMatchOp({limitMinParamBldr, limitMaxParamBldr}, "LIMIT", null, limitArgSrcBldr)
        .withDefinition(RANGE_MAX_INCL_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPLimit.Name")

    var deductibleMatchOpBldr = getMatchOp({deductibleParamBldr}, "DEDUCTIBLE", null, perilsDeductibleArgSrcBldr)
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPDeductible.Name")

    // Argument source set builders
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_ALL_PERILS_DEDUCT_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPAllPerils.Name")
        .withCalcRoutineParamSet(HOPAllPerilsDeductParamSet)
        .addArgumentSource(coverageArgSrcBldr1)
        .addArgumentSource(territoryArgSrcBldr1)
        .addArgumentSource(perilsDeductibleArgSrcBldr)
        .addArgumentSource(limitArgSrcBldr)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr)
        .withCode(HOP_ALL_PERILS_DEDUCTIBLE_FACTOR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPAllPerilsDeductTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(coveragePartMatchOpBldr)
        .addMatchOperation(territoryCodeMatchOpBldr)
        .addMatchOperation(limitMatchOpBldr)
        .addMatchOperation(deductibleMatchOpBldr)
        .addFactor(getFactor(HOP_ALL_PERILS_DEDUCTIBLE_FACTOR)
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }

  //----------------- Modifiers Rate Table -----------------//

  static property get ModifierRateTable(): RateTableBuilder {
    return new RateTableBuilder(ModifierRateTableDefinition)
  }

  static property get ModifierRateTableDefinition(): RateTableDefinition {
    return ModifierRateTableDefinitionBuilder.createAndCommit()
  }

  static property get ModifierRateTableDefinitionBuilder(): RateTableDefinitionBuilder {
    // Parameter builders
    var modifierParamBldr = getParam(10, "MODIFIER", "str1")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPModifier.Label")

    var modifierValueParamBldr = getParam(20, "MODIFIER_VALUE", "str2")
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPModifierValue.Label")

    // Argument source builders
    var modifierArgSrcBldr = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPMODIFIER)
    var modifierValueArgSrcBldr = new RateTableArgumentSourceBuilder()
        .withRoot(TC_HOPMODIFIERVALUE)

    // Match operation builders
    var modifierMatchOpBldr = getMatchOp(modifierParamBldr, {modifierArgSrcBldr})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPModifier.Name")
    var modifierValueMatchOpBldr = getMatchOp(modifierValueParamBldr, {modifierValueArgSrcBldr})
        .withDefinition(EXACT_MATCH_OP_DEF)
        .withLocalizedMatchOpNameFromDisplayKey("Web.Rating.RateTable.MatchOp.HOPModifierValue.Name")

    // Argument source set builders
    var argSrcSetBldr = new RateTableArgumentSourceSetBuilder()
        .withCode(HOP_MOD_PREM_ARG_SET_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.ArgumentSourceSet.HOPModifiers.Name")
        .withCalcRoutineParamSet(HOPModifierPremiumParamSet)
        .addArgumentSource(modifierArgSrcBldr)
        .addArgumentSource(modifierValueArgSrcBldr)

    // Rate table builder
    var definitionBuilder = new RateTableDefinitionBuilder()
        .addArgumentSourceSet(argSrcSetBldr)
        .withCode(HOP_MODIFIER_FACTOR_CODE)
        .withLocalizedNameFromDisplayKey("Web.Rating.RateTable.HOPModifierTable.Name")
        .withPolicyLine(HOP_LINE)
        .addMatchOperation(modifierMatchOpBldr)
        .addMatchOperation(modifierValueMatchOpBldr)
        .addFactor(getFactor(HOP_MODIFIER_FACTOR)
        .withLocalizedColumnLabelFromDisplayKey("Web.Rating.RateTable.Column.HOPFactor.Label"))

    return definitionBuilder
  }
}
