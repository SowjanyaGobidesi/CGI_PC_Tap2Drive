package gw.admin

uses gw.api.locale.DisplayKey
uses gw.api.database.IQueryBeanResult

enhancement GroupSearchCriteriaEnhancement : GroupSearchCriteria
{

  /** This is the minimally acceptable information for a query
  */
  property get MinimumCriteriaForSearch() : boolean {  
    return this.Organization != null
      or this.GroupName != null
      or this.GroupNameKanji != null
      or this.GroupType != null 
      or this.Organization != null 
      or this.ParentGroup != null
      or this.ProducerCode != null
      or this.BranchSearch
  }

  /* This will check that the minimally acceptable information has been supplied
  * and perform the query
  * otherwize it will throw an exception
  */
  function validateAndSearch() : IQueryBeanResult<Group> {
    if (this.MinimumCriteriaForSearch) {
      // explicitly filtering out root groups from search results if user sets GroupType == "Any" in UI
      if (this.GroupType == null) {
        this.ExcludeRootGroup = true
      }
     return this.performSearch() as IQueryBeanResult<Group>
   }
   throw new gw.api.util.DisplayableException(DisplayKey.get("Web.GroupSearch.NotEnoughInfo"))
  }

  static function createBranchSearchCriteria() : GroupSearchCriteria {
    return createCriteria().asBranchSearch()
  }

  static function createCriteria() : GroupSearchCriteria {
    return new GroupSearchCriteria() { :Organization = User.util.CurrentUser.Producer, :ExcludeRootGroup = true}
  }
}
