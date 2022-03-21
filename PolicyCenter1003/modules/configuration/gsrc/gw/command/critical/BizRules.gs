package gw.command.critical

uses com.guidewire.bizrules.system.dependency.BizRulesDependencies
uses gw.api.builder.UWRuleBuilder
uses gw.bizrules.databuilder.ExpressionFragmentBuilders
uses gw.bizrules.databuilder.ListExpressionFragmentBuilder
uses gw.bizrules.databuilder.RuleConditionBuilder
uses gw.command.Argument
uses gw.command.BaseCommand
uses gw.command.DefaultMethod
uses gw.pc.bizrules.PCBizRulesVersionController
uses gw.pl.persistence.core.Bundle
uses gw.sampledata.tiny.TinySampleUWRuleData
uses pcf.UWRules

@Export
@DefaultMethod("wSampleRules")
class BizRules extends BaseCommand {
  function wSampleRules() {
    TinySampleUWRuleData.load()
    UWRules.go()
  }

  @Argument("boolean", Constants.BOOLEAN)
  function wDeployment() {
    var enabled = Constants.parseBoolean(getArgumentAsString("boolean"))
    var controller = BizRulesDependencies.getBizRulesVersionController() as PCBizRulesVersionController
    controller.setDeploymentId(enabled ? Optional.of("test_id") : Optional.empty())
    UWRules.go()
  }

  @Argument("PolicyLine", Constants.POLICY_TYPES)
  function wRules() {
    var line = getArgumentAsString("PolicyLine")
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      switch (line?.toLowerCase()) {
        case "ba":
          createBARules(bundle)
          break
        case "bop":
          createBOPRules(bundle)
          break
        case "cp":
          createCPRules(bundle)
          break
        case "gl":
          createGLRules(bundle)
          break
        case "im":
          createIMRules(bundle)
          break
        case "pa":
          createPARules(bundle)
          break
        case "wc":
          createWCRules(bundle)
          break
        case null:
        default:
          createBARules(bundle)
          createBOPRules(bundle)
          createCPRules(bundle)
          createGLRules(bundle)
          createIMRules(bundle)
          createPARules(bundle)
          createWCRules(bundle)
          createGenericRule(bundle)
      }
    }, "su")
    UWRules.go()
  }

  private function createWCRules(bundle: Bundle) {
    var code = "WCNumberOfEmployees"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("WC: Number of covered employees")
          .withCode(code)
          .withDescription("WC: The number of covered employees on the policy requires approval")
          .withPolicyLine(TC_WORKERSCOMPLINE)
          .withRuleContextDefinitionKey(TC_WCPOLICY)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("wcCoveredEmployees.Count", TC_GREATERTHANOREQUAL, "5"))
          .withIssueKeyParam(code)
          .withShortDescParam("WC: Five or more covered employees on a Workers Comp Policy")
          .withLongDescParam("WC: This policy contains \${wcCoveredEmployees.Count} covered employees")
          .withValueParam("\${wcCoveredEmployees.Count}")
          .withComparator(TC_NUMERIC_LE)
          .withValueFormatter(TC_INTEGER)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }

    code = "WCCoveredEmployeeLocation"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("WC: Covered Employee at location in specific states")
          .withCode(code)
          .withDescription("WC: Covered Employee has location with an address in CA, NV, or AZ")
          .withPolicyLine(TC_WORKERSCOMPLINE)
          .withRuleContextDefinitionKey(TC_WCPOLICYCOVEREDEMPLOYEEITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("wcCoveredEmployee.Location.State", TC_ISIN,
                  new ListExpressionFragmentBuilder()
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_CA))
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_NV))
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_AZ))
              )
          )
          .withIssueKeyParam("Location: \${wcCoveredEmployee.FixedId}")
          .withShortDescParam("WC: Covered Employee has location with address in a specific state")
          .withLongDescParam("WC: Covered Employee has a location with address in CA, NV, or AZ")
          .withValueParam("\${wcCoveredEmployee.Location.State}")
          .withComparator(TC_STATE_SET)
          .withValueFormatter(TC_STATESET)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }
  }

  private function createCPRules(bundle: Bundle) {
    var code = "CPNumberOfBuildings"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("CP: Number of buildings")
          .withCode(code)
          .withDescription("CP: The number of buildings on the policy requires approval")
          .withPolicyLine(TC_COMMERCIALPROPERTYLINE)
          .withRuleContextDefinitionKey(TC_CPPOLICY)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("cpBuildings.Count", TC_GREATERTHANOREQUAL, "5"))
          .withIssueKeyParam(code)
          .withShortDescParam("CP: Five or more buildings on a Commercial Property Policy")
          .withLongDescParam("CP: This policy contains \${cpBuildings.Count} buildings")
          .withValueParam("\${cpBuildings.Count}")
          .withValueFormatter(TC_INTEGER)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }

    code = "CPLocationState"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("CP: Location with address in specific states")
          .withCode(code)
          .withDescription("Commercial Property Policy has location with an address in CA, NV, or AZ")
          .withPolicyLine(TC_COMMERCIALPROPERTYLINE)
          .withRuleContextDefinitionKey(TC_CPPOLICYLOCATIONITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("cpLocation.Location.State", TC_ISIN,
                  new ListExpressionFragmentBuilder()
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_CA))
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_NV))
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_AZ))
              )
          )
          .withIssueKeyParam("Location: \${cpLocation.FixedId}")
          .withShortDescParam("CP: This policy has a location with address in a specific state")
          .withLongDescParam("CP: This policy has a location with address in CA, NV, or AZ")
          .withValueParam("\${cpLocation.Location.State}")
          .withComparator(TC_STATE_SET)
          .withValueFormatter(TC_STATESET)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }

    code = "CPTallBuilding"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("CP: Building too tall")
          .withCode(code)
          .withDescription("Commercial Property Policy has building with number of stories over the limit")
          .withPolicyLine(TC_COMMERCIALPROPERTYLINE)
          .withRuleContextDefinitionKey(TC_CPPOLICYBUILDINGITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("cpBuilding.Building.NumStories", TC_GREATERTHANOREQUAL, "10"))
          .withIssueKeyParam("Building: \${cpBuilding.FixedId}")
          .withShortDescParam("CP: This policy has a building 10 stories or taller")
          .withLongDescParam("CP: This policy has a building 10 stories or taller")
          .withValueParam("\${cpBuilding.Building.NumStories}")
          .withComparator(TC_NUMERIC_LE)
          .withValueFormatter(TC_INTEGER)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }
  }

  private function createPARules(bundle: Bundle) {
  }

  private function createGLRules(bundle: Bundle) {
    var code = "GLNumberOfExposures"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("GL: Number of exposures")
          .withCode(code)
          .withDescription("GL: The number of exposures on the policy requires approval")
          .withPolicyLine(TC_GENERALLIABILITYLINE)
          .withRuleContextDefinitionKey(TC_GLPOLICY)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("generalLiabilityLine.Exposures.Count", TC_GREATERTHANOREQUAL, "5"))
          .withIssueKeyParam(code)
          .withShortDescParam("GL: Five or more exposures on a General Liability Policy")
          .withLongDescParam("GL: This policy contains \${generalLiabilityLine.Exposures.Count} exposures")
          .withValueParam("\${generalLiabilityLine.Exposures.Count}")
          .withComparator(TC_NUMERIC_LE)
          .withValueFormatter(TC_INTEGER)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }

    code = "GLExposureBasisOver100k"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("GL: Exposure basis too high")
          .withCode(code)
          .withDescription("GL: Basis on an Exposure requires approval")
          .withPolicyLine(TC_GENERALLIABILITYLINE)
          .withRuleContextDefinitionKey(TC_GLPOLICYEXPOSUREITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("glExposure.BasisAmount", TC_GREATERTHANOREQUAL, "100000")
          )
          .withIssueKeyParam("Exposure: \${glExposure.FixedId}")
          .withShortDescParam("GL: This policy has an exposure with basis over 100k")
          .withLongDescParam("GL: This policy has an exposure with basis: \${glExposure.BasisAmount}")
          .withValueParam("\${glExposure.BasisAmount}")
          .withComparator(TC_NUMERIC_LE)
          .withValueFormatter(TC_INTEGER)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }
  }

  private function createIMRules(bundle: Bundle) {
    var code = "IMNumberOfBuildings"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("IM: Number of buildings")
          .withCode(code)
          .withDescription("IM: The number of buildings on the policy requires approval")
          .withPolicyLine(TC_INLANDMARINELINE)
          .withRuleContextDefinitionKey(TC_IMPOLICY)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("imBuildings.Count", TC_GREATERTHANOREQUAL, "5"))
          .withIssueKeyParam(code)
          .withShortDescParam("IM: Five or more buildiungs on Inland Marine Policy")
          .withLongDescParam("IM: This policy contains \${imBuildings.Count} buildings")
          .withValueParam("\${imBuildings.Count}")
          .withComparator(TC_NUMERIC_LE)
          .withValueFormatter(TC_INTEGER)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }

    code = "IMLocationState"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("IM: Location with addres in specific states")
          .withCode(code)
          .withDescription("IM: Inland Marine policy with location on an address in CA, NV, or AZ")
          .withPolicyLine(TC_INLANDMARINELINE)
          .withRuleContextDefinitionKey(TC_IMPOLICYLOCATIONITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("imLocation.Location.State", TC_ISIN,
                  new ListExpressionFragmentBuilder()
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_CA))
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_NV))
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_AZ))
              )
          )
          .withIssueKeyParam("Location: \${imLocation.FixedId}")
          .withShortDescParam("IM: This policy has a location with address in a specific state")
          .withLongDescParam("IM: This policy has a location with address in CA, NV, or AZ")
          .withValueParam("\${imLocation.Location.State}")
          .withComparator(TC_STATE_SET)
          .withValueFormatter(TC_STATESET)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }

    code = "IMBuildingWithUnknownAge"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("IM: Building with unknown age")
          .withCode(code)
          .withDescription("IM: Building with an unknown built year")
          .withPolicyLine(TC_INLANDMARINELINE)
          .withRuleContextDefinitionKey(TC_IMPOLICYBUILDINGITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addHasValueRuleConditionLine("imBuilding.Building.YearBuilt", TC_HASNOVALUE))
          .withIssueKeyParam("\${imBuilding.FixedId}")
          .withShortDescParam("IM: Building with unknown year built")
          .withLongDescParam("IM: Building with unknown year built")
          .create(bundle)
    }

    code = "IMAccountsReceivableBusinessClassOther"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("IM: AccountsReceivable with business class other")
          .withCode(code)
          .withDescription("IM: AccountsReceivable with BusinessClass 'Other' requires approval")
          .withPolicyLine(TC_INLANDMARINELINE)
          .withRuleContextDefinitionKey(TC_IMPOLICYACCOUNTSRECEIVABLEITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("imAccountsReceivable.IMAccountsRecPart.BusinessClass", TC_EQUALS, ExpressionFragmentBuilders.forTypeKeyExpression(BusinessClass.TC_OTHER)))
          .withIssueKeyParam("\${imAccountsReceivable.FixedId}")
          .withShortDescParam("IM: AccountsReceivable with BusinessClass 'Other'")
          .withLongDescParam("IM: AccountsReceivable with BusinessClass 'Other'")
          .create(bundle)
    }

    code = "IMSignOfTypeOther"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("IM: Sign with type 'Other'")
          .withCode(code)
          .withDescription("IM: Sign with SignType 'Other' requires approval")
          .withPolicyLine(TC_INLANDMARINELINE)
          .withRuleContextDefinitionKey(TC_IMPOLICYIMSIGNITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("imSign.SignType", TC_EQUALS, ExpressionFragmentBuilders.forTypeKeyExpression(SignType.TC_OTHER)))
          .withIssueKeyParam("\${imSign.FixedId}")
          .withShortDescParam("IM: Sign with SignType 'Other'")
          .withLongDescParam("IM: Sign with SignType 'Other'")
          .create(bundle)
    }

    code = "IMContractorsEquipmentHeavyConstruction"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("IM: ContractorsEquipment heavy construction")
          .withCode(code)
          .withDescription("IM: ContractorsEquipment contractor type 'HeavyConstruction' requires approval")
          .withPolicyLine(TC_INLANDMARINELINE)
          .withRuleContextDefinitionKey(TC_IMPOLICYCONTRACTORSEQUIPMENTITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("imContractorsEquipment.ContractorsEquipPart.ContractorType", TC_EQUALS, ExpressionFragmentBuilders.forTypeKeyExpression(ContractorType.TC_HEAVYCONSTRUCTION)))
          .withIssueKeyParam("\${imContractorsEquipment.FixedId}")
          .withShortDescParam("IM: ContractorsEquipment contractor type 'HeavyConstruction'")
          .withLongDescParam("IM: ContractorsEquipment contractor type 'HeavyConstruction'")
          .create(bundle)
    }
  }

  private function createBOPRules(bundle: Bundle) {
    var code = "BOPNumberOfBuildings"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("BOP: Number of buildings")
          .withCode(code)
          .withDescription("BOP: The number of buildings on the policy requires approval")
          .withPolicyLine(TC_BUSINESSOWNERSLINE)
          .withRuleContextDefinitionKey(TC_BOPPOLICY)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("bopBuildings.Count", TC_GREATERTHANOREQUAL, "5"))
          .withIssueKeyParam(code)
          .withShortDescParam("BOP: Five or more buildings on a Business Owners Property Policy")
          .withLongDescParam("BOP: This policy contains \${bopBuildings.Count} buildings")
          .withValueParam("\${bopBuildings.Count}")
          .withComparator(TC_NUMERIC_LE)
          .withValueFormatter(TC_INTEGER)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }

    code = "BOPLocationState"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("BOP: Location with address in specific states")
          .withCode(code)
          .withDescription("BOP: Location with address in CA, NV, or AZ")
          .withPolicyLine(TC_BUSINESSOWNERSLINE)
          .withRuleContextDefinitionKey(TC_BOPPOLICYLOCATIONITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("bopLocation.Location.State", TC_ISIN,
                  new ListExpressionFragmentBuilder()
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_CA))
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_NV))
                      .addExpression(ExpressionFragmentBuilders.forTypeKeyExpression(State.TC_AZ))
              ))
          .withIssueKeyParam("\${bopLocation.FixedId}")
          .withShortDescParam("BOP: Location with address in specific states")
          .withLongDescParam("BOP: Location with address in \${bopLocation.Location.State}")
          .withValueParam("\${bopLocation.Location.State}")
          .withComparator(TC_STATE_SET)
          .withValueFormatter(TC_STATESET)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }

    code = "BOPBuildingWithUnknownAge"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("BOP: Building with unknown age")
          .withCode(code)
          .withDescription("BOP: Building with an unknown built year")
          .withPolicyLine(TC_BUSINESSOWNERSLINE)
          .withRuleContextDefinitionKey(TC_BOPPOLICYBUILDINGITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addHasValueRuleConditionLine("bopBuilding.Building.YearBuilt", TC_HASNOVALUE))
          .withIssueKeyParam("\${bopBuilding.FixedId}")
          .withShortDescParam("BOP: Building with unknown year built")
          .withLongDescParam("BOP: Building with unknown year built")
          .create(bundle)
    }
  }

  private function createBARules(bundle: Bundle) {
    var code = "BANumberOfVehicles"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("BA: Number of vehicles")
          .withCode(code)
          .withDescription("BA: The number of vehicles on the policy requires approval")
          .withPolicyLine(TC_BUSINESSAUTOLINE)
          .withRuleContextDefinitionKey(TC_BAPOLICY)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("baVehicles.Count", TC_GREATERTHANOREQUAL, "5"))
          .withIssueKeyParam(code)
          .withShortDescParam("BA: Five or more vehicles on a Business Auto Policy")
          .withLongDescParam("BA: This policy contains \${baVehicles.Count} vehicles")
          .withValueParam("\${baVehicles.Count}")
          .withComparator(TC_NUMERIC_LE)
          .withValueFormatter(TC_INTEGER)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }

    code = "BADriverWithInsufficientExperience"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("BA: Driver with insufficient experience")
          .withCode(code)
          .withDescription("BA: A driver on the policy requires approval")
          .withPolicyLine(TC_BUSINESSAUTOLINE)
          .withRuleContextDefinitionKey(TC_BAPOLICYDRIVERITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("baDriver.YearsExperience", TC_EQUALS, ExpressionFragmentBuilders.forTypeKeyExpression(DriverExperience.TC_LESSTHAN6MO)))
          .withIssueKeyParam("Driver: \${baDriver.FixedId}")
          .withShortDescParam("BA: Driver may have insufficient experience")
          .withLongDescParam("BA: Driver \${baDriver} has less than 6 months of experience")
          .create(bundle)
    }

    code = "BAExpensiveVehicle"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("BA: Expensive Vehicle")
          .withCode(code)
          .withDescription("BA: A vehicle on the policy requires approval")
          .withPolicyLine(TC_BUSINESSAUTOLINE)
          .withRuleContextDefinitionKey(TC_BAPOLICYVEHICLEITERATIVE)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("baVehicle.CostNew", TC_GREATERTHANOREQUAL, "Util.monetaryAmount(100000, Currency.TC_USD)"))
          .withIssueKeyParam("Vehicle: \${baVehicle.FixedId}")
          .withShortDescParam("BA: Vehicle on the policy is too expensive")
          .withLongDescParam("BA: Vehicle on the policy is too expensive")
          .withValueParam("\${baVehicle.CostNew}")
          .withComparator(TC_MONETARY_LE)
          .withValueFormatter(TC_MONETARYAMOUNT)
          .withDefaultValueAssignmentType(TC_FIXED)
          .create(bundle)
    }
  }

  private function createGenericRule(bundle: Bundle) {
    var code = "PolicyPremiumOver100k"
    if (UWIssueType.finder.findUWIssueTypeByCode(code) == null) {
      BaseBuilder
          .withName("Policy Premium over 100k")
          .withCode(code)
          .withDescription("Policy premium too high")
          .withTriggeringPointKey(TC_PREQUOTERELEASE)
          .withRuleContextDefinitionKey(TC_GENERICPOLICY)
          .withRuleCondition(new RuleConditionBuilder()
              .addRuleConditionLine("Util.convertAmount(policyPeriod.TotalCostRPT, Currency.TC_USD)", TC_GREATERTHANOREQUAL, "Util.monetaryAmount(100000, Currency.TC_USD)"))
          .withIssueKeyParam(code)
          .withShortDescParam("Policy premium is over the limit")
          .withLongDescParam("Policy premium is over $100,000 USD")
          .withValueParam("\${policyPeriod.TotalCostRPT}")
          .withComparator(TC_MONETARY_LE)
          .withValueFormatter(TC_MONETARYAMOUNT)
          .withDefaultValueAssignmentType(TC_OFFSETAMOUNT)
          .withDefaultValueOffsetAmount(1)
          .withDefaultValueOffsetCurrency(TC_USD)
          .create(bundle)
    }
  }

  private property get BaseBuilder(): UWRuleBuilder {
    return new UWRuleBuilder()
        .withTriggeringPointKey(TC_PREQUOTE)
        .withBlockingPoint(TC_BLOCKSBIND)
        .withDefaultDurationType(TC_ENDOFTERM)
        .withAvailableToRun(true)
        .withAutoApprovable(false)
        .withComparator(TC_NONE)
        .withDefaultApprovalBlockingPoint(TC_NONBLOCKING)
        .withDefaultEditBeforeBind(true)
  }
}
