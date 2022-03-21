package gw.rating

uses gw.api.locale.DisplayKey
uses gw.validation.PCValidationContext
uses gw.validation.ValidationUtil
uses gw.validation.PCValidationBase

@Export
class CostOverrideValidation extends PCValidationBase {
  
  var _costs : Set<Cost>
  
  construct(valContext : PCValidationContext, costs : Set<Cost>) {
    super(valContext)
    _costs = costs
  }
  
  override protected function validateImpl() {
    Context.addToVisited(this, "validateImpl")
    for (cost in _costs) {
      if (hasMultipleOverrides(cost)) {
        Result.addError(cost, TC_DEFAULT, DisplayKey.get("Validator.CostOverride"))
      }
    }
  }
  
  static function validateHasSingleOverridePerCost(costs: Set<Cost>) {
    var context = ValidationUtil.createContext( TC_DEFAULT )
    new CostOverrideValidation(context, costs).validate()
    context.raiseExceptionIfProblemsFound()
  }

  private function hasMultipleOverrides(cost : Cost) : boolean {
    var notNulls = 0
    notNulls = notNulls + (cost.OverrideAdjRate == null ? 0 : 1) 
    notNulls = notNulls + (cost.OverrideBaseRate == null ? 0 : 1)
    notNulls = notNulls + (cost.OverrideAmount == null ? 0 : 1)
    notNulls = notNulls + (cost.OverrideTermAmount == null ? 0 : 1)
    return (notNulls > 1)
  }
}

