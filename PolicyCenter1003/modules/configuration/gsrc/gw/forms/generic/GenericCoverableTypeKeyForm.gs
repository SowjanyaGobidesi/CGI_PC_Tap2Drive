package gw.forms.generic

uses gw.api.locale.DisplayKey
uses gw.admin.FormPatternValidation
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.productmodel.PolicyLinePatternLookup
uses gw.api.util.TypeUtil
uses gw.entity.TypeKey
uses gw.forms.FormData
uses gw.forms.FormInferenceContext
uses gw.forms.GenericFormInference
uses gw.lang.reflect.TypeSystem
uses gw.validation.PCValidationBase
uses gw.xml.XMLNode
uses java.util.HashMap
uses java.util.Map
uses java.util.Set
uses gw.entity.ITypeList
uses java.util.Date
uses java.util.List

/**
 * Generic class that can be used for any form that should be added to a policy whenever
 * the value set for a typekey field of a coverable matches the selected value.
 * 
 */
@Export
class GenericCoverableTypeKeyForm extends FormData implements GenericFormInference {

  var _coverables : Coverable[]

  override property get DisplayName() : String {
    return DisplayKey.get("Forms.Generic.GenericCoverableTypeKeyForm")
  }

  override property get ValidPolicylines() : List<PolicyLinePattern> {
    return PolicyLinePatternLookup.getAll()
  }

  override property get PolicyLineRequired() : boolean {
    return true
  }

  override function validateCustomFields(formPattern : FormPattern, validation : PCValidationBase) {
    if (missingRequiredFields(formPattern, validation)) {
      return
    }

    if (formPattern.PolicyLinePatternRef == null) {
      validation.Result.addError(formPattern, TC_DEFAULT, DisplayKey.get("Validation.FormPattern.Inference.LineDoesNotExist", formPattern.DisplayName, formPattern.PolicyLinePatternCode))
      return
    } else if (not formPattern.PolicyLinePatternRef.Pattern.AllCoverableEntityTypes*.RelativeName.contains(formPattern.CoverableType)) {
      validation.Result.addError(formPattern, TC_DEFAULT, DisplayKey.get("Validation.FormPattern.Inference.IncompatibleCoverableType", 
                                                           formPattern.DisplayName, formPattern.PolicyLinePatternCode, formPattern.CoverableType))
      return
    }

    if (formPattern.CoverableTypeListRef == null) {
      validation.Result.addError(formPattern, TC_DEFAULT, DisplayKey.get("Validation.FormPattern.Inference.IncompatibleCoverableTypeList", 
                                                           formPattern.DisplayName, formPattern.CoverableType, formPattern.CoverableTypeList))
      return
    } else if (not (formPattern.CoverableTypeListRef.FeatureType typeis ITypeList)) {
      validation.Result.addError(formPattern, TC_DEFAULT, DisplayKey.get("Validation.FormPattern.Inference.InvalidCoverableTypeList", 
                                                           formPattern.DisplayName, formPattern.CoverableTypeList))
      return
    }

    if (formPattern.CoverableTypeKeyRef == null) {
      validation.Result.addError(formPattern, TC_DEFAULT, DisplayKey.get("Validation.FormPattern.Inference.IncompatibleCoverableTypeKey", 
                                                           formPattern.DisplayName, formPattern.CoverableTypeList, formPattern.CoverableTypeKey))
    }
  }

  protected function missingRequiredFields(formPattern : FormPattern, validation : PCValidationBase) : boolean {
    var missingRequired = false
    if (formPattern.PolicyLinePatternCode == null) {
      validation.Result.addError(formPattern, TC_DEFAULT, DisplayKey.get("Validation.FormPattern.Inference.MissingRequired", formPattern.DisplayName, "PolicyLinePatternCode"))
      missingRequired = true
    }
    if (formPattern.CoverableType == null) {
      validation.Result.addError(formPattern, TC_DEFAULT, DisplayKey.get("Validation.FormPattern.Inference.MissingRequired", formPattern.DisplayName, "CoverableType"))
      missingRequired = true
    }
    if (formPattern.CoverableTypeList == null) {
      validation.Result.addError(formPattern, TC_DEFAULT, DisplayKey.get("Validation.FormPattern.Inference.MissingRequired", formPattern.DisplayName, "CoverableTypeList"))
      missingRequired = true
    }
    if (formPattern.CoverableTypeKey == null) {
      validation.Result.addError(formPattern, TC_DEFAULT, DisplayKey.get("Validation.FormPattern.Inference.MissingRequired", formPattern.DisplayName, "CoverableTypeKey"))
      missingRequired = true
    }
    return missingRequired
  }

  override function clearCustomFields(formPattern : FormPattern) {
    formPattern.CoverableTypeKeyExistsOnAll = false
    formPattern.CoverableType = null
    formPattern.CoverableTypeList = null
    formPattern.CoverableTypeKey = null
  }

  override function getLookupDates(context : FormInferenceContext) : Map<Jurisdiction, Date> {
    var entityType = TypeSystem.getByRelativeName(Pattern.CoverableType)
    var map = new HashMap<Jurisdiction, Date>()
    for (var coverable in context.Period.AllCoverables) {
      if (TypeUtil.isNominallyOrStructurallyAssignable(entityType, typeof coverable)) {
        var cs = context.getCoverableState(coverable)
        map.put(cs, getEarliestDate(map.get(cs), coverable.CoverableReferenceDate))
      }
    }
    return map
  }

  private function getEarliestDate(d1 : Date, d2 : Date) : Date {
    if (d1 == null) {
      return d2
    } else if (d2 == null) {
      return d1
    } else if (d2.before(d1)) {
      return d2
    } else {
      return d1
    }      
  }

  override function populateInferenceData(context : FormInferenceContext, availableStates : Set<Jurisdiction>) {
    var entityType = TypeSystem.getByRelativeName(Pattern.CoverableType)
    _coverables = context.Period.AllCoverables.where(\ c -> TypeUtil.isNominallyOrStructurallyAssignable(entityType, typeof c)
                                                              and availableStates.contains(context.getCoverableState(c)))
  }

  override property get InferredByCurrentData() : boolean {
    if (_coverables.IsEmpty) {
      return false
    }
    var formCoveragePartTypes = Pattern.FormPatternCoveragePartTypes*.getCoveragePartType()
    var hasCoveragePartsSpecified = formCoveragePartTypes?.Count > 0
    if (Pattern.CoverableTypeKeyExistsOnAll) {
      for (var c in _coverables) {
        if (not acceptCoverable(c)) {
          return false
        }
        if (hasCoveragePartsSpecified and
            formCoveragePartTypes.intersect(c.getAssociatedCoveragePartTypes()).Count == 0) {
          return false
        }
      }
      return true
    } else {
      for (var c in _coverables) {
        if (acceptCoverable(c)) {
          return !hasCoveragePartsSpecified or formCoveragePartTypes.intersect(c.getAssociatedCoveragePartTypes()).Count > 0
        }
      }
      return false
    }
  }

  function acceptCoverable(c : Coverable) : boolean {
    return (c[Pattern.CoverableTypeList] as TypeKey).Code == Pattern.CoverableTypeKey
  }

  override function addDataForComparisonOrExport(contentNode : XMLNode) {
    contentNode.addChild(createTextNode("CoverableTypeList", Pattern.CoverableTypeList))

    contentNode.addChild(createTextNode("CoverableTypeKey", Pattern.CoverableTypeKey))

    var allCoverablesNode = new XMLNode("Coverables")
    contentNode.addChild(allCoverablesNode)
    for (var c in _coverables) {
      if (acceptCoverable(c)) {
        var coverableNode = new XMLNode("Coverable")
        coverableNode.addChild(createTextNode("FixedId", c.TypeIDString))
        allCoverablesNode.addChild(coverableNode)
      }
    }
  }

}
