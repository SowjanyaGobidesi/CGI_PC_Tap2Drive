package gw.lob.wc

enhancement InclusionPersonEnhancement : InclusionPerson {

  /*
   * This rule is used to filter the relationship typelist for WC inclusion or exclusion
   */
   function filterRelationship(rel : Relationship) : boolean {
    //ambulance only applies in new york
    if (rel == TC_AMBEMP and not ((this.State == TC_NY) and (this.Inclusion == TC_INCL))) {
       return false
    }
    return true
  }
  
}
