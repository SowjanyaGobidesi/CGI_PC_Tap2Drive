package gw.note

enhancement NoteSearchCriteriaEnhancement : NoteSearchCriteria {
  function setSearchCriteria(activity: Activity) {
    if (this.RelatedTo == null or this.RelatedTo == activity) {
      this.RelatedTo = activity
      this.Activity = activity
      this.Policy = activity?.Policy
      this.Job = activity?.Job
    } else {
      this.Activity = null
    }
  }

  function getRelatedToSearchCriteria(policyPeriod: PolicyPeriod): Object[] {
    var related =
        (policyPeriod != null) ?
            this.getRelatedToOptionsForPolicyFile(policyPeriod) :
            this.getRelatedToOptionsForAccount()
    return getRelatedToSearchCriteria(related)
  }

  private function getRelatedToSearchCriteria(nullableRelated: Object[]): Object[] {
    var relatedToOptions = Optional
        .ofNullable(nullableRelated)
        .map(\arr -> arr.toList())
        .orElse({})
    if (this.Activity != null) {
      relatedToOptions.add(this.Activity)
    }
    return relatedToOptions.toTypedArray()
  }

}