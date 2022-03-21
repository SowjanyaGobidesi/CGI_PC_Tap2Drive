package gw.admin
uses gw.api.locale.DisplayKey
uses gw.api.database.Query
uses gw.api.database.IQueryBeanResult

enhancement OrganizationSearchCriteriaEnhancement : OrganizationSearchCriteria
{
  /** This is the minimally acceptable information for a query
  */
  property get MinimumCriteriaForSearch() : boolean {
    if (this.Name != null or
        this.NameKanji != null or
        this.City != null or
        this.PostalCode != null or
        (this.Country != null and this.Country != gw.api.admin.BaseAdminUtil.getDefaultCountry()) or
        (this.ProducerStatus != null and this.ProducerStatus != TC_ACTIVE) or
        this.ProducerCode != null or
        this.BranchCode != null or
        this.PolicyNumber != null or
        this.AccountNumber != null) {
      return true
    }
    var count = 0
    if (this.Type != null) {
      count = count + ((this.Type != TC_AGENCY and this.Type != TC_BROKER) ? 2 : 1)
    }
    if (this.Country != null) count = count + 1
    if (this.ProducerStatus != null) count = count + 1
    if (this.Tier != null) count = count + 1
    if (this.State != null) count = count + 1
    return count >= 2
  }
  
  /* This will check that the minimally acceptable information has been supplied
  * and perform the query
  * otherwize it will throw an exception
  */
  function validateAndSearch() : IQueryBeanResult<Organization> {
    if (this.MinimumCriteriaForSearch) {
      //clear the real search fields and then reset them to the Addressautofillable ones
      this.ContactCity = null
      this.ContactState = null
      this.ContactCountry = null
      this.ContactPostal = null
      this.ContactCity = this.City
      this.ContactState = this.State
      this.ContactCountry = this.Country
      this.ContactPostal = this.PostalCode
      // ...
      return this.performSearch()
   }

   throw new gw.api.util.DisplayableException(DisplayKey.get("Java.OrganizationSearch.NotEnoughSearchCriteria"))
  }
}
