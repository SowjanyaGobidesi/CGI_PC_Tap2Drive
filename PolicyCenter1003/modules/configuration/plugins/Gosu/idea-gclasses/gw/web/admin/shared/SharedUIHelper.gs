package gw.web.admin.shared

uses gw.api.locale.DisplayKey

@Export
class SharedUIHelper {

  public static function getAvailableSubtypes(availableSubtypes : typekey.Contact[]
                                , contactTypes : typekey.ContactType[]
                                , product : gw.api.productmodel.Product
                                , accountContactRole : typekey.AccountContactRole ) : typekey.Contact[] {
    if (availableSubtypes != null) {
      return availableSubtypes
    }
    var subTypes = contactTypes.map( \ c -> c == TC_COMPANY ?
        typekey.Contact.TC_COMPANY : typekey.Contact.TC_PERSON)
        .sortBy(\ c -> c.DisplayName)  // make the order deterministic
    if (product != null and accountContactRole == TC_NAMEDINSURED) {
      subTypes = subTypes.where(\ c -> product.isContactTypeSuitableForProductAccountType(c == TC_COMPANY ? Company : Person))
    }
    return subTypes
  }

  public static function createSearchCriteria(initialSearchCriteria : entity.ContactSearchCriteria
                              , availableSubtypes : typekey.Contact[]) : ContactSearchCriteria{
    if (initialSearchCriteria != null) {
      return initialSearchCriteria
    }
    var c = new ContactSearchCriteria()
    c.ContactSubtype = availableSubtypes.first()
    c.FirstNameExact = true;
    c.KeywordExact = true;
    c.PermissiveSearch = false;
    return c
  }

  public static function doSearch(criteria : ContactSearchCriteria) : gw.plugin.contact.impl.ContactResultWrapper {
    var result = criteria.performSearch()
    if (result.contactResults == null or result.contactResults.IsEmpty) {
      gw.api.util.LocationUtil.addRequestScopedWarningMessage(DisplayKey.get("Java.Search.NoResults"))
    }
    return result
  }
}
