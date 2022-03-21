package gw.product

uses gw.api.locale.DisplayKey
uses gw.api.database.IQueryBeanResult
uses gw.search.EntitySearchCriteria
uses gw.address.AddressQueryBuilder
uses gw.address.AddressAreaImpl

/**
 * A search criteria used for searching ProducerCodes via the UI.
 */
@Export
class ProducerCodeSearchCriteria extends EntitySearchCriteria<ProducerCode> {

  var _secure                    : boolean
  var _filterByUserSecurityZones : boolean
  var _statusUse                 : ProducerStatusUse

  var _address       : AddressAreaImpl as Address = new AddressAreaImpl()
  var _code          : String as Code
  var _description   : String as Description
  var _parentCode    : String as ParentCode
  var _branchCode    : String as BranchCode
  var _status        : ProducerStatus as Status
  var _branch        : Group as Branch
  var _producer      : Organization as Producer
  var _producerUser  : User as ProducerUser
  var _missingPrefUW : Boolean as MissingPrefUW
  var _prefUW        : User as PrefUW
  var _currency      : Currency as Currency

  internal construct() {}  // for testing only

  construct(organization : Organization) {
    this(organization, true, null, false)
  }

  construct(toBeSetOrganization : Organization, checkUserSecurityZone : boolean, usedFor : ProducerStatusUse, secure : boolean) {
    // Initialize the producer criterion to the current user's Organization for external users. Otherwise, it can be
    // the specified organization as long as it is not the carrier (UI typically sends the current user's organization
    // regardless)
    if (User.util.CurrentUser.ExternalUser
        and gw.api.system.ExternalUserAccessParameterKey.ExternalUserAccessIsFullyRestricted()) {
      _producer =  User.util.CurrentUser.Organization
    } else {
      _producer = toBeSetOrganization
    }

    // Filter by user security zones if we're checking (<code>checkUserSecurityZone</code> = true) and the user is
    // an internal user without the <code>userviewall</code> permission.
    _filterByUserSecurityZones = checkUserSecurityZone and !User.util.CurrentUser.ExternalUser and !perm.System.userviewall

    _statusUse = usedFor
    _secure = secure
  }


  override protected property get InvalidSearchCriteriaMessage() : String {
    return null
  }

  override protected property get MinimumSearchCriteriaMessage() : String {
    if (_branch != null ||
        _branchCode != null ||
        _code != null ||
        _description != null ||
        _parentCode != null ||
        _producer != null ||
        _producerUser != null ||
        _status != null ||
        _missingPrefUW ||
        _statusUse != null ||
        _prefUW != null ||
        _address.State != null) {
      return null
    }
    return DisplayKey.get("Web.ProducerCodeSearch.NotEnoughInfo")
  }

  override protected function doSearch() : IQueryBeanResult {
    var producerCodeQueryBuilder = new ProducerCodeQueryBuilder()
      .withSecure(_secure)
      .withFilterByUserSecurityZones(_filterByUserSecurityZones)
      .withCode(_code)
      .withDescription(_description)
      .withParentCode(_parentCode)
      .withBranchCode(_branchCode)
      .withMissingPrefUW(_missingPrefUW)
      .withStatus(_status)
      .withStatusUse(_statusUse)
      .withBranch(_branch)
      .withProducer(_producer)
      .withProducerUser(_producerUser)
      .withPrefUW(_prefUW)
      .withCurrency(_currency)
      
    if (_address.isAnyFieldSet()) {
      var addressQueryBuilder = new AddressQueryBuilder()
        .withCity(_address.City)
        .withCityKanjiStarting(_address.CityKanji)
        .withCountry(_address.Country)
        .withCounty(_address.County)
        .withPostalCode(_address.PostalCode)
        .withState(_address.State)
      producerCodeQueryBuilder.withAddress(addressQueryBuilder)
    }
      
    return producerCodeQueryBuilder.build().withDistinct(true).select()
  }
}

