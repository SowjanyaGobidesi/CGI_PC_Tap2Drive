package gw.rating.flow.builders

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.UniqueKeyGenerator
uses gw.api.system.PCLoggerCategory
uses gw.lang.reflect.IType
uses gw.rating.rtm.builders.RateBookCalcRoutineBuilder
uses gw.rating.rtm.builders.scenario.sample.SampleDataTablesBuilder

uses javax.lang.model.type.ErrorType
uses java.math.BigDecimal

@Export
class CalcRoutineDefinitionBuilder extends DataBuilder<CalcRoutineDefinition, CalcRoutineDefinitionBuilder> {

  static final var _builderTag: String as PUBLICID_BUILDER_TAG = "pc:FromBuilder:"

  var _stepIndex = 1

  construct() {
    super(CalcRoutineDefinition)
  }

  function withDefaults(): CalcRoutineDefinitionBuilder {

    withCode(gw.pl.util.GUIDGenerator.generateGUID().substring(0, 48))
    withName(gw.pl.util.GUIDGenerator.generateGUID().substring(0, 48))
    withParamSet(new CalcRoutineParameterSetBuilder().withDefaults())
    withPolicyLinePatternCode("PersonalAutoLine")
    return this

  }

  final function withTaggedPublicId(): CalcRoutineDefinitionBuilder {
    this.withPublicId(PUBLICID_BUILDER_TAG + UniqueKeyGenerator.get().nextKey())
    return this
  }

  function withCode(code: String): CalcRoutineDefinitionBuilder {
    set(CalcRoutineDefinition.Type.TypeInfo.getProperty("Code"), code)
    return this
  }

  function withName(name: String): CalcRoutineDefinitionBuilder {
    set(CalcRoutineDefinition.Type.TypeInfo.getProperty("Name"), name)
    setForAllLanguages(CalcRoutineDefinition#Name.PropertyInfo, name)
    return this
  }

  function withLocalizedNameFromDisplayKey(displayKey: String): CalcRoutineDefinitionBuilder {
    setLocalizedFieldFromDisplayKey(CalcRoutineDefinition#Name.PropertyInfo, displayKey)
    return this
  }

  function withVersion(version: int): CalcRoutineDefinitionBuilder {
    set(CalcRoutineDefinition.Type.TypeInfo.getProperty("Version"), version)
    return this
  }

  function withJurisdiction(jurisdiction: Jurisdiction): CalcRoutineDefinitionBuilder {
    set(CalcRoutineDefinition.Type.TypeInfo.getProperty("Jurisdiction"), jurisdiction)
    return this
  }

  function withParamSet(paramSet: CalcRoutineParameterSet): CalcRoutineDefinitionBuilder {
    set(CalcRoutineDefinition.Type.TypeInfo.getProperty("ParameterSet"), paramSet)
    if (paramSet.PolicyLinePatternCode != null) {
      withPolicyLinePatternCode(paramSet.PolicyLinePatternCode)
    }
    return this
  }

  function withParamSet(paramSet: CalcRoutineParameterSetBuilder): CalcRoutineDefinitionBuilder {
    set(CalcRoutineDefinition.Type.TypeInfo.getProperty("ParameterSet"), paramSet)
    return this
  }

  function withStep(step: CalcStepDefinition): CalcRoutineDefinitionBuilder {
    step.SortOrder = _stepIndex
    _stepIndex += 1
    addArrayElement(CalcRoutineDefinition.Type.TypeInfo.getProperty("Steps"), step)
    return this
  }

  function withStep(step: CalcStepDefinitionBuilder): CalcRoutineDefinitionBuilder {
    step.withSortOrder(_stepIndex)
    _stepIndex += 1
    addArrayElement(CalcRoutineDefinition.Type.TypeInfo.getProperty("Steps"), step)
    return this
  }

  function withDescription(desc: String): CalcRoutineDefinitionBuilder {
    set(CalcRoutineDefinition.Type.TypeInfo.getProperty("Description"), desc)
    return this
  }

  function withPolicyLinePatternCode(code: String): CalcRoutineDefinitionBuilder {
    set(CalcRoutineDefinition.Type.TypeInfo.getProperty("PolicyLinePatternCode"), code)
    return this
  }

  //compound builders for convenience

  function ifStep(operand: CalcStepDefinitionOperandBuilder): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_IF)
        .withOperand(operand))
    return this
  }

  function ifStep(operands: CalcStepDefinitionOperandBuilder[]): CalcRoutineDefinitionBuilder {
    final var ifStepBuilder = new CalcStepDefinitionBuilder().withStepType(TC_IF)
    for (var operandBuilder in operands) {
      ifStepBuilder.withOperand(operandBuilder)
    }
    withStep(ifStepBuilder)
    return this
  }

  function ifFunction(funcName: String): CalcRoutineDefinitionBuilder {
    ifStep(new CalcStepDefinitionOperandBuilder()
        //.withOperatorType(null) // should be able to get rid of this eventually?
        .withFunctionName(funcName))
    return this
  }

  function ifConstant(constVal: String): CalcRoutineDefinitionBuilder {
    ifStep(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(null)
        .withConstant(constVal))
    return this
  }

  function loopStep(dtoType: IType, varName: String): CalcRoutineDefinitionBuilder {
    return loopStep(varName, dtoType, TC_POLICYLINE, "ChildDTOList")
  }

  /**
   * for(loopVarName:type in scope.path) {
   */
  function loopStep(storeloc: String, type: IType, scope: CalcRoutineParamName, path: String): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_LOOP)
        .withOperand(new CalcStepDefinitionOperandBuilder()
            .withOperandType(TC_INSCOPE)
            .withInScope(scope, path, "java.util.List<" + type.Name + ">", false)
            .withOperandOrder(0))
        .withStoreLocation(storeloc)
        .withStoreType(type))
    return this
  }

  /**
   * .each(\->loopVar:List<type>,{
   * for(storeloc:type in loopvar){
   */
  function nestedLoopStep(storeLoc : String, type : IType, loopVar : String) : CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_LOOP)
        .withOperand(new CalcStepDefinitionOperandBuilder()
            .withOperandType(TC_LOOPVAR)
            .withLoopVariable(loopVar, null, "java.util.List<" + type.Name + ">")
            .withOperandOrder(0))
        .withStoreLocation(storeLoc)
        .withStoreType(type))
    return this
  }

  function endloopStep(): CalcRoutineDefinitionBuilder{
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_ENDLOOP)
        .withOperand(new CalcStepDefinitionOperandBuilder()))
    //.withOperatorType(null)))
    return this
  }

  private function conditionalStep(stepType: CalcStepType, subOperands: List<CalcStepDefinitionOperandBuilder>, notes: String = null): CalcRoutineDefinitionBuilder {
    var conditionalOperand = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(null)
        .withOperandType(TC_CONDITIONAL)
        .withOperandOrder(0)

    var calcStepDefinitionBuilder = new CalcStepDefinitionBuilder()
        .withStepType(stepType)
        .withOperand(conditionalOperand)
    if (notes.HasContent) {
      calcStepDefinitionBuilder.withNotes(notes)
    }

    addSubOperandsToStep(subOperands, calcStepDefinitionBuilder)

    withStep(calcStepDefinitionBuilder)
    return this
  }

  function ifConditional(subOperands: List<CalcStepDefinitionOperandBuilder>, notes: String = null): CalcRoutineDefinitionBuilder {
    return conditionalStep(TC_IF, subOperands, notes)
  }

  function elseStep(operand: CalcStepDefinitionOperandBuilder): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_ELSE)
        .withOperand(operand))
    return this
  }

  function elseifStep(operand: CalcStepDefinitionOperandBuilder): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_ELSEIF)
        .withOperand(operand))
    return this
  }

  function elseifConditional(subOperands: List<CalcStepDefinitionOperandBuilder>, notes: String = null): CalcRoutineDefinitionBuilder {
    return conditionalStep(TC_ELSEIF, subOperands, notes)
  }

  function elseifFunction(funcName: String): CalcRoutineDefinitionBuilder {
    elseifStep(new CalcStepDefinitionOperandBuilder()
        //.withOperatorType(null)
        .withFunctionName(funcName))
    return this
  }

  function elseifConstant(constVal: String): CalcRoutineDefinitionBuilder {
    elseifStep(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(null)
        .withConstant(constVal))
    return this
  }

  function elseStep(): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_ELSE)
        .withOperand(new CalcStepDefinitionOperandBuilder()))
    //.withOperatorType(null)))
    return this
  }

  function endifStep(): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_ENDIF)
        .withOperand(new CalcStepDefinitionOperandBuilder()))
    //.withOperatorType(null)))
    return this
  }

  function voidFunctionStep(functionName: String): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_VOIDFUNCTION)
        .withOperand(new CalcStepDefinitionOperandBuilder()
            .withFunctionName(functionName)))
    return this
  }

  function storeConstant(storeLoc: String, constValue: String, type: IType = null): CalcRoutineDefinitionBuilder {
    var calcStepDefOpBuilder = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
    if (constValue != null) {
      if (type == null) {
        type = CalcStepValueDelegate.deduceTypeFromValue(constValue)
        if (type == ErrorType) {
          PCLoggerCategory.RATEFLOW.warn("Cannot deduce type for constant value '" + constValue + "'")
          type = null
        }
      }
      if (type == null) {
        calcStepDefOpBuilder.withConstant(constValue)
      } else {
        calcStepDefOpBuilder.withTypedConstant(constValue, type)
      }
    }
    return storeValue(storeLoc, calcStepDefOpBuilder)
  }

  function storeConstantWithLeftParen(storeLoc: String, constValue: String): CalcRoutineDefinitionBuilder {
    return storeWithLeftParenAndConstant(storeLoc, constValue, 1)
  }

  function storeWithLeftParenAndConstant(storeLoc: String, constValue: String, numLeft : int) : CalcRoutineDefinitionBuilder{
    var calcStepDefBuilder = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withLeftParentheses(numLeft)
    if (constValue != null) {
      calcStepDefBuilder.withConstant(constValue)
    }
    return storeValue(storeLoc, calcStepDefBuilder)
  }

  function storeConstantWithRightParen(storeLoc: String, constValue: String): CalcRoutineDefinitionBuilder {
    return storeWithRightParenAndConstant(storeLoc, constValue, 1)
  }

  function storeWithRightParenAndConstant(storeLoc: String, constValue: String, numRight : int) : CalcRoutineDefinitionBuilder{
    var calcStepDefBuilder = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withRightParentheses(numRight)
    if (constValue != null) {
      calcStepDefBuilder.withConstant(constValue)
    }
    return storeValue(storeLoc, calcStepDefBuilder)
  }

  function storeFunctionValue(storeLoc: String, funcName: String): CalcRoutineDefinitionBuilder {
    return storeValue(storeLoc, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withFunctionName(funcName))
  }

  function storeConditional(storeLoc: String, conditionalSubOperands: List<CalcStepDefinitionOperandBuilder>)
      : CalcRoutineDefinitionBuilder {

    var conditionalOperand = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withOperandType(TC_CONDITIONAL)
        .withOperandOrder(0)

    var calcStepDefinitionBuilder = new CalcStepDefinitionBuilder()
        .withStepType(TC_ASSIGNMENT)
        .withStoreLocation(storeLoc)
        .withOperand(conditionalOperand)

    addSubOperandsToStep(conditionalSubOperands, calcStepDefinitionBuilder)

    withStep(calcStepDefinitionBuilder)
    return this
  }

  function storeStep(storeLoc: String): CalcRoutineDefinitionBuilder {
    return storeConstant(storeLoc, null)
  }

  /**
   * each(\-> loopVar, {
   * var storeLoc:dataType = loopVar.field
   */
  function storeFromLoopVar(storeLoc : String, dataType : String, loopVar : String, field : String) : CalcRoutineDefinitionBuilder {
    return storeValue(storeLoc, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withLoopVariable(loopVar, field, dataType))
  }

  function storeFromLocalVar(storeLoc: String, varName: String): CalcRoutineDefinitionBuilder {
    return storeValue(storeLoc, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withLocalVariable(varName))
  }

  function storeFromLocalVar(storeLoc: String, varName: String, varField: String): CalcRoutineDefinitionBuilder {
    return storeValue(storeLoc, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withLocalVariable(varName, varField))
  }

  function storeFromLocalVarWithLeftParen(storeLoc: String, localVar: String, numLeft: int = 1): CalcRoutineDefinitionBuilder {
    return storeValue(storeLoc, new CalcStepDefinitionOperandBuilder()
        .withLeftParentheses(numLeft)
        .withOperandType(TC_LOCALVAR)
        .withLocalVariable(localVar))
  }

  function storeFromLocalVarWithRightParen(storeLoc: String, localVar: String, numRight: int = 1): CalcRoutineDefinitionBuilder {
    return storeValue(storeLoc, new CalcStepDefinitionOperandBuilder()
        .withRightParentheses(numRight)
        .withOperandType(TC_LOCALVAR)
        .withLocalVariable(localVar))
  }

  function storeFromInScope(storeLoc: String, param: CalcRoutineParamName, path: String, dataType: String): CalcRoutineDefinitionBuilder {
    return storeValue(storeLoc, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withOperandType(TC_INSCOPE)
        .withInScopeReference(param, path, dataType, false))
  }

  function storeRateTableLookup(storeLoc: String, rateTableCode: String,
                                param: List<CalcStepDefinitionArgumentBuilder>,
                                factorColumnName: String): CalcRoutineDefinitionBuilder {
    return storeRateTableLookup(storeLoc, rateTableCode, param, {factorColumnName})

  }

  function storeRateTableLookup(storeLoc: String, rateTableCode: String,
                                param: List<CalcStepDefinitionArgumentBuilder>,
                                factorColumnNames: List<String>): CalcRoutineDefinitionBuilder {
    return storeRateTableLookup(storeLoc, rateTableCode, param, factorColumnNames, null)
  }

  function storeRateTableLookup(storeLoc: String, rateTableCode: String,
                                params: List<CalcStepDefinitionArgumentBuilder>,
                                factorColumnNames: List<String>,
                                argSrcSetCode: String): CalcRoutineDefinitionBuilder {

    var stepDefOperandBuilder =
        new CalcStepDefinitionOperandBuilder()
            .withOperatorType(TC_STORE)
            .withTableCode(rateTableCode)

    if (argSrcSetCode.HasContent) {
      stepDefOperandBuilder.withArgumentSourceSetCode(argSrcSetCode)
    }

    factorColumnNames.each(\fcn -> {
      var factorBuilder = new CalcStepDefinitionRateFactorBuilder()
          .withColumnName(fcn)
      stepDefOperandBuilder.withReturnFactor(factorBuilder)
    })

    params.each(\p -> {
      stepDefOperandBuilder.withArgumentSource(p)
    })

    return storeValue(storeLoc, stepDefOperandBuilder)
  }

  function storeBaseRateLookup(storeLoc: String): CalcRoutineDefinitionBuilder {
    return storeValue(storeLoc, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withTableCode(SampleDataTablesBuilder.PA_COV_BASE_RATE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(SampleDataTablesBuilder.PA_COV_BASE_RATE_FACTOR))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("COV_CODE")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("JURISDICTION")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("POSTAL_CODE")
            .withParamType("String")
            .withConstant("")))
  }

  function storeValue(storeLoc: String, operand: CalcStepDefinitionOperandBuilder): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_ASSIGNMENT)
        .withStoreLocation(storeLoc)
        .withOperand(operand.withOperatorType(TC_STORE))) // TODO: Right now, operator type must be store, dependency
    return this
  }

  private function makeAConstant(const: String): CalcStepDefinitionOperandBuilder {
    var operand = new CalcStepDefinitionOperandBuilder()
    if (const != null) {
      operand.withConstant(const)
    }
    return operand
  }

  function mathStepWithLeftParenAndConstant(operator : CalcStepOperatorType, const : String) : CalcRoutineDefinitionBuilder{
    return mathStepWithLeftParenAndConstant(operator, const, 1)
  }

  function mathStepWithLeftParenAndConstant(operator: CalcStepOperatorType, const: String, numLeft: int): CalcRoutineDefinitionBuilder {
    var operand = makeAConstant(const).withLeftParentheses(numLeft).withOperatorType(operator)
    mathStep(operand)
    return this
  }

  function mathStepWithRightParenAndConstant(operator : CalcStepOperatorType, const : String) : CalcRoutineDefinitionBuilder{
    return mathStepWithRightParenAndConstant(operator, const, 1)
  }

  function mathStepWithRightParenAndConstant(operator: CalcStepOperatorType, const: String, numRight: int): CalcRoutineDefinitionBuilder {
    var operand = makeAConstant(const).withRightParentheses(numRight).withOperatorType(operator)
    mathStep(operand)
    return this
  }

  function mathStep(operand: CalcStepDefinitionOperandBuilder): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_CONTINUE)
        .withOperand(operand))
    return this
  }

  function mathStep(operator: CalcStepOperatorType): CalcRoutineDefinitionBuilder {
    return mathStepConstant(operator, null)
  }

  function mathStepWithLeftParen(operand: CalcStepDefinitionOperandBuilder, numLeft: int = 1): CalcRoutineDefinitionBuilder {
    operand.withLeftParentheses(numLeft)
    return mathStep(operand)
  }

  function mathStepWithRightParen(operand: CalcStepDefinitionOperandBuilder, numRight: int = 1): CalcRoutineDefinitionBuilder {
    operand.withRightParentheses(numRight)
    return mathStep(operand)
  }

  function roundingStep(operatorTyp: CalcStepOperatorType, scale: RoundingScaleType): CalcRoutineDefinitionBuilder {
    var operand = new CalcStepDefinitionOperandBuilder().withOperatorType(operatorTyp).withOperandType(TC_ROUNDING)
        .withRoundingScale(scale)
    return mathStep(operand)
  }

  function mathStepConstant(operator: CalcStepOperatorType, const: String): CalcRoutineDefinitionBuilder {
    return mathStepConstant(operator, null, const)
  }

  function mathStepConstant(operator: CalcStepOperatorType, typeDecl: String, const: String): CalcRoutineDefinitionBuilder {
    var operand = new CalcStepDefinitionOperandBuilder()
    if (const != null) {
      operand.withConstant(const)
    }
    if (typeDecl != null) {
      operand.withTypeDeclaration(typeDecl)
    }
    operand.withOperatorType(operator)
    mathStep(operand)
    return this
  }

  function mathWithLocalVar(operatorType: CalcStepOperatorType, localVal: String): CalcRoutineDefinitionBuilder {
    return mathStep(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(operatorType)
        .withLocalVariable(localVal))
  }

  function mathWithCostDataField(operatorType: CalcStepOperatorType, costDataField: String): CalcRoutineDefinitionBuilder {
    return mathStep(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(operatorType)
        .withCostDataField(costDataField))
  }

  function mathWithFunction(operatorType: CalcStepOperatorType, funcName: String): CalcRoutineDefinitionBuilder {
    return mathStep(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(operatorType)
        .withFunctionName(funcName))
  }

  function mathWithBaseRateLookup(operatorType: CalcStepOperatorType): CalcRoutineDefinitionBuilder {
    return mathStep(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(operatorType)
        .withTableCode(SampleDataTablesBuilder.PA_COV_BASE_RATE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(SampleDataTablesBuilder.PA_COV_BASE_RATE_FACTOR))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("COV_CODE")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("JURISDICTION")
            .withParamType("String")))
  }

  function mathWithInscopeOperand(operatorType: CalcStepOperatorType, param: CalcRoutineParamName, path: String, dataType: String): CalcRoutineDefinitionBuilder {
    return mathStep(new CalcStepDefinitionOperandBuilder()
        .withOperatorType(operatorType)
        .withOperandType(TC_INSCOPE)
        .withInScopeReference(param, path, dataType, false))
  }

  // TODO: Some of the CostData methods need to be changed when CostData becomes a true In-Scope value
  function copyCostDataField(dest: String, src: String): CalcRoutineDefinitionBuilder {
    return storeToCostDataField(dest, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withInScope(TC_COSTDATA, src, "java.math.BigDecimal", false)) // TODO: what if wrapped CostData has other types besides BigDecimal?
  }

  function storeToWriteableParam(targetParam: CalcRoutineParamName, targetPath: String, targetType: IType,
                                 operand: CalcStepDefinitionOperandBuilder): CalcRoutineDefinitionBuilder {
    return storeToWriteableParam(targetParam, targetPath, targetType, operand, null)
  }

  function storeToWriteableParam(targetParam: CalcRoutineParamName, targetPath: String, targetType: IType,
                                 operand: CalcStepDefinitionOperandBuilder,
                                 notes: String): CalcRoutineDefinitionBuilder {
    var bldr = new CalcStepDefinitionBuilder()
        .withStepType(TC_ASSIGNMENT)
        .withInScopeLocation(targetParam, targetPath)
        .withStoreType(targetType)
    if (notes.HasContent) {
      bldr.withNotes(notes)
    }
    if (operand != null) {
      bldr.withOperand(operand.withOperatorType(TC_STORE))
    } else {
      bldr.withOperand(new CalcStepDefinitionOperandBuilder().withOperatorType(TC_STORE)) // operator type must be store, dependency
    }
    withStep(bldr)
    return this
  }

  function storeInScopeToWritableParam(storeLoc: String, param: CalcRoutineParamName, path: String, dataType: IType): CalcRoutineDefinitionBuilder {
    var scopeOperand = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withOperandType(TC_INSCOPE)
        .withInScopeReference(param, path, dataType.Name, false)

    return storeToWriteableParam(param, storeLoc, dataType, scopeOperand)
  }

  function storeToCostDataField(fieldName: String, operand: CalcStepDefinitionOperandBuilder): CalcRoutineDefinitionBuilder {
    return storeToCostDataField(fieldName, BigDecimal, operand)
  }

  function storeToCostDataField(fieldName: String, fieldType: IType, operand: CalcStepDefinitionOperandBuilder): CalcRoutineDefinitionBuilder {
    var bldr = new CalcStepDefinitionBuilder()
        .withStepType(TC_ASSIGNMENT)
        .withInScopeLocation(TC_COSTDATA, fieldName)
        .withStoreType(fieldType)
    if (operand != null) {
      bldr.withOperand(operand.withOperatorType(TC_STORE))
    } else {
      bldr.withOperand(new CalcStepDefinitionOperandBuilder().withOperatorType(TC_STORE)) // operator type must be store, dependency
    }
    withStep(bldr)
    return this
  }

  function storeToCostDataFieldFromVar(fieldName: String, localVar: String): CalcRoutineDefinitionBuilder {
    return storeToCostDataFieldFromVar(fieldName, BigDecimal, localVar)
  }

  function storeToCostDataFieldFromVar(fieldName: String, fieldType: IType, localVar: String): CalcRoutineDefinitionBuilder {
    var bldr = new CalcStepDefinitionBuilder()
        .withStepType(TC_ASSIGNMENT)
        .withInScopeLocation(TC_COSTDATA, fieldName)
        .withStoreType(fieldType)
        .withOperand(new CalcStepDefinitionOperandBuilder()
            .withLocalVariable(localVar).withOperatorType(TC_STORE)) // operator type must be store, dependency
    withStep(bldr)
    return this
  }

  function storeToCostDataFieldWithLeftParenAndConstant(fieldName : String, const : String) : CalcRoutineDefinitionBuilder {
    return storeConstantToCostDataFieldWithLeftParen(fieldName, const, 1)
  }
  function storeConstantToCostDataFieldWithLeftParen(fieldName: String, const: String, numLeft: int): CalcRoutineDefinitionBuilder {
    return storeToCostDataField(fieldName, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withTypeDeclaration("java.math.BigDecimal")
        .withConstantValue(const)
        .withLeftParentheses(numLeft))
  }

  function storeBaseRateLookupToCostData(fieldName: String): CalcRoutineDefinitionBuilder {
    return storeToCostDataField(fieldName, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withTableCode(SampleDataTablesBuilder.PA_COV_BASE_RATE)
        .withArgumentSourceSetCode("DEFAULT")
        .withReturnFactor(new CalcStepDefinitionRateFactorBuilder()
            .withColumnName(SampleDataTablesBuilder.PA_COV_BASE_RATE_FACTOR))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("COV_CODE")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("JURISDICTION")
            .withParamType("String"))
        .withArgumentSource(new CalcStepDefinitionArgumentBuilder()
            .withParam("POSTAL_CODE")
            .withParamType("String")
            .withConstant("")))
  }

  function storeLocalVarToCostData(fieldName: String, varName: String): CalcRoutineDefinitionBuilder {
    return storeLocalVarToCostData(fieldName, varName, null)
  }

  function storeLocalVarToCostData(fieldName: String, varName: String, varFieldName: String): CalcRoutineDefinitionBuilder {
    var calcRoutineOpBuilder =
        new CalcStepDefinitionOperandBuilder()
            .withOperatorType(TC_STORE)
            .withLocalVariableName(varName)

    if (varFieldName != null) {
      calcRoutineOpBuilder.withLocalVariableFieldName(varFieldName)
    }

    return storeToCostDataField(fieldName, calcRoutineOpBuilder)
  }

  function storeConstantToCostData(fieldName: String, constValue: String): CalcRoutineDefinitionBuilder {
    return storeToCostDataField(fieldName, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withTypeDeclaration("java.math.BigDecimal")
        .withConstantValue(constValue))
  }

  function storeFunctionValueToCostData(fieldName: String, funcName: String): CalcRoutineDefinitionBuilder {
    return storeToCostDataField(fieldName, new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withFunctionName(funcName))
  }

  function storeConstantToWritableParam(param: CalcRoutineParamName,
                                        fieldName: String,
                                        constValue: String): CalcRoutineDefinitionBuilder {
    var operand = new CalcStepDefinitionOperandBuilder()
        .withOperatorType(TC_STORE)
        .withConstantValue(constValue)
    var bldr = new CalcStepDefinitionBuilder()
        .withStepType(TC_ASSIGNMENT)
        .withInScopeLocation(param, fieldName)
        .withOperand(operand)
    withStep(bldr) // operator type must be store, dependency
    return this
  }

  function mathWithCostDataOperand(operatorType: CalcStepOperatorType, field: String): CalcRoutineDefinitionBuilder {
    return mathWithInscopeOperand(operatorType, TC_COSTDATA, field, "java.math.BigDecimal") // TODO: what if wrapped CostData has other types besides BigDecimal?
  }

  function sectionCommentStep(comment: String): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_COMMENT)
        .withSectionComment(comment)
        .withOperand(new CalcStepDefinitionOperandBuilder().withOperatorType(TC_STORE).withOperandType(TC_CONSTANT)))
    return this
  }

  function blankStep(): CalcRoutineDefinitionBuilder {
    withStep(new CalcStepDefinitionBuilder()
        .withStepType(TC_ASSIGNMENT)
        .withOperand(new CalcStepDefinitionOperandBuilder().withOperandType(TC_CONSTANT)))
    return this
  }


  function withRatebookCalcRoutine(rateBookCalcRoutine: RateBookCalcRoutine): CalcRoutineDefinitionBuilder {
    addArrayElement(CalcRoutineDefinition.Type.TypeInfo.getProperty("RateBookCalcRoutines"), rateBookCalcRoutine)
    return this
  }

  function withRatebookCalcRoutine(rateBookCalcRoutine: RateBookCalcRoutineBuilder): CalcRoutineDefinitionBuilder {
    addArrayElement(CalcRoutineDefinition.Type.TypeInfo.getProperty("RateBookCalcRoutines"), rateBookCalcRoutine)
    return this
  }

  // Ensures we always have matching left and right suboperands to make it UI happy
  private function addSubOperandsToStep(subOperands: List<CalcStepDefinitionOperandBuilder>,
                                        calcStepDefinitionBuilder: CalcStepDefinitionBuilder) {
    subOperands.eachWithIndex(\so, idx -> {
      if (so == null) {
        so = new CalcStepDefinitionOperandBuilder()
            .withOperatorType(null)
            .withOperandType(null)
      }
      so.withOperandOrder(idx + 1)
      calcStepDefinitionBuilder.withOperand(so)
    })

    if (subOperands.Count % 2 == 1) {
      calcStepDefinitionBuilder.withOperand(
          new CalcStepDefinitionOperandBuilder()
              .withOperatorType(null)
              .withOperandType(null)
              .withOperandOrder(subOperands.Count + 1))
    }
  }
}
