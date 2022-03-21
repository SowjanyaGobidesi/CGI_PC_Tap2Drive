package gw.plugin.document.impl

uses gw.plugin.document.IDocumentMetadataSource

@Export
class LocalDocumentMetadataSource extends BaseLocalDocumentMetadataSource  implements IDocumentMetadataSource {
  protected override function documentMatchesCriteria(doc: Document, criteria: DocumentSearchCriteria): boolean {
    updateCriteriaForSearchWithMultipleDocumentTypes(criteria)
    if (not super.documentMatchesCriteria(doc, criteria)) {
      return false
    }
    if (criteria.DateFrom != null and doc.DateModified.Time < criteria.DateFrom.Time) {
      return false
    }
    if (criteria.DateTo != null and doc.DateModified.Time > criteria.DateTo.Time) {
      return false
    }
    if (criteria.Account != null and criteria.Account != doc.Account) {
      return false
    }
    if (criteria.Policy != null and criteria.Policy != doc.Policy) {
      return false
    }
    if (criteria.Contingency != null and criteria.Contingency != doc.Contingency) {
      return false
    }
    if (criteria.Job != null and criteria.Job != doc.Job) {
      return false
    }
    if (criteria.TypeWrappers.HasElements) {
      if (doc.Type == null or (not criteria.TypeWrappers.map(\typeWrapper -> typeWrapper.getDocumentType()).contains(doc.Type))) {
        return false
      }
    }
    var policyPeriods = getPolicyPeriods(criteria)
    if (policyPeriods.HasElements and (doc.PolicyPeriod == null or (not policyPeriods.contains(doc.PolicyPeriod)))) {
      return false;
    }
    return true
  }

  private function updateCriteriaForSearchWithMultipleDocumentTypes(criteria: DocumentSearchCriteria) {
    if (criteria.Type != null) {
      if (criteria.TypeWrappers.IsEmpty) {
        criteria.TypeWrappers = {wrap(criteria.Type)}
      } else {
        var typeWrappers = Arrays.copyOf(criteria.TypeWrappers, criteria.TypeWrappers.length + 1)
        typeWrappers[typeWrappers.length - 1] = wrap(criteria.Type)
        criteria.TypeWrappers = typeWrappers
      }
      criteria.Type = null
    }
  }

  private function wrap(type: DocumentType): DocumentSearchTypeWrapper {
    var wrapper = new DocumentSearchTypeWrapper()
    wrapper.setDocumentType(type)
    return wrapper
  }

  private function getPolicyPeriods(criteria: DocumentSearchCriteria): Collection<PolicyPeriod> {
    var policyPeriods = new HashSet<PolicyPeriod>()
    if (criteria.PolicyPeriodWrappers.HasElements) {
      Collections.addAll(policyPeriods, criteria.PolicyPeriodWrappers.map(\wrapper -> wrapper.getPolicyPeriod()))
    }
    if (criteria.PolicyPeriod != null) {
      policyPeriods.add(criteria.PolicyPeriod)
    }
    return policyPeriods
  }
}
