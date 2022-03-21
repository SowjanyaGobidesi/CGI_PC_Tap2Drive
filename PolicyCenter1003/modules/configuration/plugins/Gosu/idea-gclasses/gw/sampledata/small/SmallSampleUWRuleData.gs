package gw.sampledata.small

uses gw.api.builder.UWRuleBuilder
uses gw.api.system.PCLoggerCategory
uses gw.bizrules.databuilder.LookupExpressionFragmentBuilder
uses gw.bizrules.databuilder.RuleConditionBuilder
uses gw.pl.persistence.core.Bundle
uses gw.sampledata.AbstractSampleDataCollection
uses typekey.*
uses typekey.PolicyLine

/**
 * Small sample UWIssue Rules
 */
@Export
class SmallSampleUWRuleData extends AbstractSampleDataCollection {

  public static final var HIGH_EXPOSURE_VEHICLE_RULE_NAME : String = "Vehicle is a high exposure vehicle"

  override property get CollectionName() : String {
    return "Small Lookup Table Definitions"
  }

  override property get AlreadyLoaded() : boolean {
    return UWIssueType.finder.findUWIssueTypeByCode("IsHighExposureVehicle") != null
  }

  override function load() {
    if (not AlreadyLoaded) {
      gw.transaction.Transaction.runWithNewBundle(\bundle -> {
        PCLoggerCategory.SAMPLE_DATA.info("  - loading Small UWIssueTypeData ...")
        load(bundle)
      }, "su")
    }
  }

  private static function load(bundle: Bundle) {
    var vehicleLookupYearSymbols = {
        "VehicleMake" -> "paVehicle.Make",
        "VehicleModel" -> "paVehicle.Model",
        "Year" -> "paVehicle.Year"
    }

    var vehicleLookupYearMinusOneSymbols = {
        "VehicleMake" -> "paVehicle.Make",
        "VehicleModel" ->  "paVehicle.Model",
        "Year" -> "paVehicle.Year-1"
    }

    var vehicleLeftOperandYear = new LookupExpressionFragmentBuilder()
        .createRuleLookupRequestDefBuilder(SmallSampleLookupData.HIGHEXPOSUREVEHICLECODE, vehicleLookupYearSymbols)
        .withRuleCondition(new RuleConditionBuilder()
            .withRuleConditionType(RuleConditionType.TC_ALWAYSTRUE))

    var vehicleLeftOperandYearMinusOne = new LookupExpressionFragmentBuilder()
        .createRuleLookupRequestDefBuilder(SmallSampleLookupData.HIGHEXPOSUREVEHICLECODE, vehicleLookupYearMinusOneSymbols)
        .withRuleCondition(new RuleConditionBuilder()
            .withRuleConditionType(RuleConditionType.TC_ALWAYSTRUE))

    DefaultBuilder
        .withName(HIGH_EXPOSURE_VEHICLE_RULE_NAME)
        .withCode("IsHighExposureVehicle")
        .withDescription("Check if vehicle of the same or previous year is a high exposure vehicle")
        .withPolicyLine(TC_PERSONALAUTOLINE)
        .withRuleContextDefinitionKey(TC_PAPOLICYVEHICLEITERATIVE)
        .withRuleCondition(
            new RuleConditionBuilder()
                .withRuleConditionType(RuleConditionType.TC_ALLOR)
                .addRuleConditionLine(vehicleLeftOperandYear, RuleOperator.TC_ISTRUE, null)
                .addRuleConditionLine(vehicleLeftOperandYearMinusOne, RuleOperator.TC_ISTRUE, null)
        )
        .withIssueKeyParam("Vehicle:\${paVehicle.FixedId}")
        .withShortDescParamForAllLanguages("Vehicle is a high exposure vehicle")
        .withLongDescParamForAllLanguages("Vehicle: \${paVehicle.Make}, \${paVehicle.Model}, \${paVehicle.Year} is a high exposure vehicle")
        .withAvailableToRun(true)
        .withAutoApprovable(true)
        .create(bundle)


    var hazardousCodeSymbols =  {
        "Code" -> "cpBuilding.ClassCode.Code",
        "ClassIndicator" -> "cpBuilding.ClassCode.ClassIndicator"
    }

    var hazardousCodeLeftOperand = new LookupExpressionFragmentBuilder()
        .createRuleLookupRequestDefBuilder(SmallSampleLookupData.UWINTERVENTIONCLASSIFICATIONCODE, hazardousCodeSymbols)
        .withRuleCondition(new RuleConditionBuilder()
            .withRuleConditionType(RuleConditionType.TC_ALWAYSTRUE))
    DefaultBuilder
        .withName("Classification code is hazardous")
        .withCode("IsClassificationCodeHazardous")
        .withDescription("Check if classification code is hazardous")
        .withPolicyLine(PolicyLine.TC_COMMERCIALPROPERTYLINE)
        .withRuleContextDefinitionKey(TC_CPPOLICYBUILDINGITERATIVE)
        .withRuleCondition(
            new RuleConditionBuilder()
                .withRuleConditionType(RuleConditionType.TC_ALLAND)
                .addRuleConditionLine(hazardousCodeLeftOperand, RuleOperator.TC_ISTRUE, null)
        )
        .withIssueKeyParam("CP Building:\${cpBuilding.FixedId}")
        .withShortDescParamForAllLanguages("Classification code is hazardous")
        .withLongDescParamForAllLanguages("Classification code: \${cpBuilding.ClassCode.Classification} of building: \${cpBuilding.DisplayName} is hazardous")
        .withAvailableToRun(true)
        .create(bundle)


    var coastalCountySymbols = {
        "State" -> "hopDwelling.Location.State",
        "County" -> "hopDwelling.Location.County"
    }

    var coastalOperand = new LookupExpressionFragmentBuilder()
        .createRuleLookupRequestDefBuilder(SmallSampleLookupData.COASTALEXPOSURECOUNTYCODE, coastalCountySymbols)
        .withRuleCondition(new RuleConditionBuilder()
            .withRuleConditionType(RuleConditionType.TC_ALWAYSTRUE))

    DefaultBuilder
        .withName("Coastal county has a high flood exposure level")
        .withCode("CoastalCountyExposureLevel")
        .withDescription("Check if coastal county has a high flood exposure level")
        .withPolicyLine(TC_HOPLINE)
        .withRuleContextDefinitionKey(TC_HOPPOLICYDWELLINGITERATIVE)
        .withRuleCondition(
            new RuleConditionBuilder()
                .withRuleConditionType(RuleConditionType.TC_ALLAND)
                .addRuleConditionLine(coastalOperand, RuleOperator.TC_HASAVALUE, null)
                .addRuleConditionLine("2", RuleOperator.TC_LESSTHANOREQUAL, coastalOperand)
        )
        .withIssueKeyParam("Homeowner dwelling:\${hopDwelling.FixedId}")
        .withShortDescParamForAllLanguages("Coastal county has a high flood exposure level")
        .withLongDescParamForAllLanguages("Coastal county: \${hopDwelling.Location.County} in \${hopDwelling.Location.State} has a high flood exposure level")
        .withAvailableToRun(true)
        .create(bundle)


    var cpCoastalCountySymbols = {
        "State" -> "cpLocation.Location.State",
        "County" -> "cpLocation.Location.County"
    }

    var cpCoastalOperand = new LookupExpressionFragmentBuilder()
        .createRuleLookupRequestDefBuilder(SmallSampleLookupData.COASTALEXPOSURECOUNTYCODE, cpCoastalCountySymbols)
        .withRuleCondition(new RuleConditionBuilder()
            .withRuleConditionType(RuleConditionType.TC_ALWAYSTRUE))

    DefaultBuilder
        .withName("CP coastal county has a high flood exposure level")
        .withCode("CPCoastalCountyExposureLevel")
        .withDescription("Check if CP coastal county has a high flood exposure level")
        .withPolicyLine(TC_COMMERCIALPROPERTYLINE)
        .withRuleContextDefinitionKey(TC_CPPOLICYLOCATIONITERATIVE)
        .withRuleCondition(
            new RuleConditionBuilder()
                .withRuleConditionType(RuleConditionType.TC_ALLAND)
                .addRuleConditionLine(cpCoastalOperand, RuleOperator.TC_HASAVALUE, null)
                .addRuleConditionLine("2", RuleOperator.TC_LESSTHANOREQUAL, cpCoastalOperand)
        )
        .withIssueKeyParam("CPLocation:\${cpLocation.FixedId}")
        .withShortDescParamForAllLanguages("CP coastal county has a high flood exposure level")
        .withLongDescParam("Coastal")
        .withLongDescParamForAllLanguages("CP coastal county: \${cpLocation.Location.County} in \${cpLocation.Location.State} has a high flood exposure level")
        .withAvailableToRun(true)
        .create(bundle)

    var dogBreedSymbols = {
        "DogBreed" -> "hopDwellAnimal.AnimalBreed.DisplayName"
    }

    var dogBreedLeftOperand = new LookupExpressionFragmentBuilder()
        .createRuleLookupRequestDefBuilder(SmallSampleLookupData.INELIGIBLEDOGBREEDCODE, dogBreedSymbols)
        .withRuleCondition(new RuleConditionBuilder()
            .withRuleConditionType(RuleConditionType.TC_ALWAYSTRUE))

    DefaultBuilder
        .withName("Dwelling animal is an ineligible dog breed")
        .withCode("IsDangerousDogBreed")
        .withDescription("Check if animal is a ineligible dog breed")
        .withPolicyLine(TC_HOPLINE)
        .withRuleContextDefinitionKey(TC_HOPPOLICYDWELLINGANIMALITERATIVE)
        .withRuleCondition(
            new RuleConditionBuilder()
                .withRuleConditionType(RuleConditionType.TC_ALLAND)
                .addRuleConditionLine(dogBreedLeftOperand, RuleOperator.TC_ISTRUE, null)
        )
        .withIssueKeyParam("Homeowner Dwelling Animal:\${hopDwellAnimal.FixedId}")
        .withShortDescParamForAllLanguages("Dwelling animal is an ineligible dog breed")
        .withLongDescParamForAllLanguages("Dwelling animal: \${hopDwellAnimal.AnimalBreed.DisplayName} in \${hopDwellAnimal.HOPDwelling.DisplayName} is an ineligible dog breed")
        .withAvailableToRun(true)
        .create(bundle)


    var fireProtectionSymbols = {
        "Score" -> "hopDwelling.Location.FireProtectClass.Code.toString()",
        "LineOfBusiness"-> "hopLine.PatternCode"
    }

    var fireProtectionLeftOperand = new LookupExpressionFragmentBuilder()
        .createRuleLookupRequestDefBuilder(SmallSampleLookupData.UNACCEPTABLEFIREPROTECTIONCODE, fireProtectionSymbols)
        .withRuleCondition(new RuleConditionBuilder()
            .withRuleConditionType(RuleConditionType.TC_ALWAYSTRUE))

    DefaultBuilder
        .withName("Score indicates unacceptable fire protection risk")
        .withCode("IsUnacceptableFireProtection")
        .withDescription("Check if score indicates unacceptable fire protection risk")
        .withPolicyLine(TC_HOPLINE)
        .withRuleContextDefinitionKey(TC_HOPPOLICYDWELLINGITERATIVE)
        .withRuleCondition(
            new RuleConditionBuilder()
                .withRuleConditionType(RuleConditionType.TC_ALLAND)
                .addRuleConditionLine(fireProtectionLeftOperand, RuleOperator.TC_ISTRUE, null)
        )
        .withIssueKeyParam("Homeowner Dwelling:\${hopDwelling.FixedId}")
        .withShortDescParamForAllLanguages("Score indicates unacceptable fire protection risk")
        .withLongDescParamForAllLanguages("Fire protection score is \${hopDwelling.Location.FireProtectClass.DisplayName}, with location: \${hopDwelling.Location.DisplayName}, indicates unacceptable fire protection risk")
        .withAvailableToRun(true)
        .create(bundle)


    var cpFireProtectionSymbols = {
        "Score" -> "cpLocation.Location.FireProtectClass.Code.toString()",
        "LineOfBusiness"-> "cpLocation.CPLine.PatternCode"
    }

    var cpFireProtectionLeftOperand = new LookupExpressionFragmentBuilder()
        .createRuleLookupRequestDefBuilder(SmallSampleLookupData.UNACCEPTABLEFIREPROTECTIONCODE, cpFireProtectionSymbols)
        .withRuleCondition(new RuleConditionBuilder()
            .withRuleConditionType(RuleConditionType.TC_ALWAYSTRUE))

    DefaultBuilder
        .withName("CP score indicates unacceptable fire protection risk")
        .withCode("CPIsUnacceptableFireProtection")
        .withDescription("Check if CP score indicates unacceptable fire protection risk")
        .withPolicyLine(TC_COMMERCIALPROPERTYLINE)
        .withRuleContextDefinitionKey(TC_CPPOLICYLOCATIONITERATIVE)
        .withRuleCondition(
            new RuleConditionBuilder()
                .withRuleConditionType(RuleConditionType.TC_ALLAND)
                .addHasValueRuleConditionLine("cpLocation.Location.FireProtectClass", TC_HASAVALUE)
                .addRuleConditionLine(cpFireProtectionLeftOperand, RuleOperator.TC_ISTRUE, null)
        )
        .withIssueKeyParam("CPLocation:\${cpLocation.FixedId}")
        .withShortDescParamForAllLanguages("CP score indicates unacceptable fire protection risk")
        .withLongDescParamForAllLanguages("CP fire protection score is \${cpLocation.Location.FireProtectClass.DisplayName}, with location: \${cpLocation.DisplayName}, indicates unacceptable fire protection risk")
        .withAvailableToRun(true)
        .create(bundle)
  }

  private static property get DefaultBuilder(): UWRuleBuilder {
    return new UWRuleBuilder()
        .withTriggeringPointKey(TC_PREQUOTE)
        .withRuleContextDefinitionKey(TC_GENERICPOLICY)
        .withBlockingPoint(TC_BLOCKSQUOTE)
        .withAutoApprovable(false)
        .withDefaultApprovalBlockingPoint(TC_NONBLOCKING)
        .withDefaultDurationType(TC_RESCINDED)
        .withDefaultEditBeforeBind(false)
        .withComparator(TC_NONE)
        .withValueFormatter(TC_UNFORMATTED)
        .withRuleCondition(new RuleConditionBuilder().withRuleConditionType(TC_ALWAYSTRUE))
        .withAvailableToRun(false)
  }
}
