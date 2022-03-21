package gw.admin

uses gw.api.locale.DisplayKey
uses gw.api.database.IQueryBeanResult

enhancement UserSearchCriteriaEnhancement : UserSearchCriteria
{
    /** This is the minimally acceptable information for a query
  */
  property get MinimumCriteriaForSearch() : boolean {
    return this.Organization != null 
      or this.Role != null 
      or this.UserType != null 
      or this.GroupName != null
      or this.GroupNameKanji != null
      or this.GroupType != null 
      or this.ProducerCode != null
      or this.Contact.FirstName != null
      or this.Username != null
      or this.Contact.Keyword != null
      or this.Contact.FirstNameKanji != null
      or this.Contact.KeywordKanji != null
  }
  
  /* This will check that the minimally acceptable information has been supplied
  * and perform the query
  * otherwize it will throw an exception
  */
  function validateAndSearch() : IQueryBeanResult<User> {
    if (this.MinimumCriteriaForSearch) {
      return this.performSearchWithOrganization() as IQueryBeanResult<User>
   }
   throw new gw.api.util.DisplayableException(DisplayKey.get("Web.UserSearch.NotEnoughInfo"))
  }
  
}
