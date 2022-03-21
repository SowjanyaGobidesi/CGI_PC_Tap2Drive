package gw.web.job.submission

uses gw.api.locale.DisplayKey
uses gw.api.web.job.submission.SubmissionUtil
uses gw.api.util.DisplayableException
uses pcf.SubmissionManager
uses gw.api.util.JurisdictionMappingUtil
uses pcf.JobForward

@Export
class NewSubmissionUIHelper {

  var _currentLocation : pcf.NewSubmission

  construct(currentLocation : pcf.NewSubmission) {
    _currentLocation = currentLocation

  }

  function initializeProducerSelection(acct : Account) : ProducerSelection
  {
    var rtn = NewSubmissionUtil.getOrCreateProducerSelection(acct)
    SubmissionUtil.validateForSubmission(rtn)
    return rtn
  }

  function changedProducer(acct : Account, selectionOfProducer: ProducerSelection)
  {
    var producerCodeRange = selectionOfProducer.getRangeOfActiveProducerCodesForCurrentUser()?.toTypedArray()
    if( producerCodeRange.Count == 1 )
    {
      selectionOfProducer.ProducerCode = producerCodeRange[0]
    }
    else
    {
      selectionOfProducer.ProducerCode = null
    }
    refreshProductOffers(acct, selectionOfProducer)
  }

  function refreshProductOffers(acct : Account, selectionOfProducer: ProducerSelection)
  {
    if (selectionOfProducer.Account != acct) {
      selectionOfProducer.Account = acct
      selectionOfProducer.State =
        JurisdictionMappingUtil.getJurisdiction(acct.AccountHolderContact.PrimaryAddress)
    }
    var productOffers = performNameClearance(acct, selectionOfProducer)
    gw.api.web.PebblesUtil.invalidateIterators(_currentLocation, ProductSelection )
  }

  function performNameClearance(acct: Account, selectionOfProducer: ProducerSelection) : ProductSelection[]
  {
    if(selectionOfProducer.DefaultPPEffDate == null) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.SubmissionManagerLV.DefaultPPEffDateRequired"))
    }
    if( canPerformNameClearance(acct, selectionOfProducer) )
    {
      var offers = acct.getAvailableProducts(selectionOfProducer.SubmissionPolicyProductRoot)?.toTypedArray()
      for (offer in offers)
      {
        offer.NumToCreate = 0
      }
      // if there is at list one offer that is not selectable, display a warning message
      if (offers != null && offers.countWhere( \ offer -> !isProductOfferSelectable(acct, offer)) > 0) {
        gw.api.util.LocationUtil.addRequestScopedInfoMessage(DisplayKey.get("Web.NewSubmission.ProductsNotSelectable"))
      }
      return offers
    }
    else
    {
      return null
    }
  }

  function canPerformNameClearance(acct: Account, selectionOfProducer: ProducerSelection) : boolean
  {
    return acct != null && perm.Account.newSubmission(acct) &&
        selectionOfProducer.Producer != null && selectionOfProducer.ProducerCode != null
  }

  function createMultipleSubmissions( offers : ProductSelection[] , acct: Account, selectionOfProducer: ProducerSelection, typeOfQuote: QuoteType)
  {
    SubmissionUtil.setLastProducerSelection( selectionOfProducer )
    var submissions = SubmissionUtil.createSubmissions( offers, acct, selectionOfProducer, typeOfQuote )
    if( submissions.Count == 0 )
    {
      throw new DisplayableException( DisplayKey.get("Web.ProductOffers.NoSubmissionsCreated") )
    }
    SubmissionManager.go( submissions[0].Policy.Account )
  }

  // a Product can be selected if the account Primary Location state is specified
  // or if there is no associated PolicyLinePattern requiring state for TerritoryCodeLookup
  function isProductOfferSelectable(account: Account, productSelection: ProductSelection) : boolean {
    var accountStateExists = account.PrimaryLocation.State != null
    var atLeastOneStateForThatCountry = JurisdictionMappingUtil.getJurisdiction(account.PrimaryLocation) != null
    var territoryCodeNeeded = productSelection.Product.ProductPolicyLinePatterns
        .countWhere( \ pplp -> pplp.PolicyLinePattern.TerritoryCodeNeeded == true) > 0
    return accountStateExists || atLeastOneStateForThatCountry || !territoryCodeNeeded
  }

  static function createOneSubmission( offer : ProductSelection, producerSelection : ProducerSelection, account : Account, quoteType : QuoteType )
  {
    if( producerSelection.DefaultPPEffDate == null ) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.SubmissionManagerLV.DefaultPPEffDateRequired"))
    }
    var availOffer = account.getAvailableProduct( producerSelection.SubmissionPolicyProductRoot, offer.Product )
    if( availOffer == null )
    {
      throw new gw.api.util.DisplayableException( DisplayKey.get("Web.SubmissionManagerLV.UnavailableProduct", offer.Product ) )
    }
    if( producerSelection.ProducerCode == null )
    {
      throw new gw.api.util.DisplayableException( DisplayKey.get("Web.SubmissionManagerLV.ProducerCodeRequired"))
    }
    if (producerSelection.State == null) {
      throw new gw.api.util.DisplayableException( DisplayKey.get("Web.SubmissionManagerLV.BaseStateRequired"))
    }

    SubmissionUtil.setLastProducerSelection(producerSelection)
    offer.NumToCreate = 1
    var submission = SubmissionUtil.createSubmission( offer, account, producerSelection, quoteType )
    // For one new submission - go straight to Submission view
    var policyPeriod = submission.LatestPeriod
    gw.transaction.Transaction.runWithNewBundle( \ bun -> {
      policyPeriod = bun.add( policyPeriod )
      policyPeriod.SubmissionProcess.beginEditing()
    } )

    JobForward.go(submission, policyPeriod)
  }

  static function makeNumberRange( max : int ) : java.util.List<java.lang.Integer>
  {
    var result = new java.util.ArrayList<java.lang.Integer>()
    var count = 0
    while( count <= max )
    {
      result.add( count )
      count = count + 1
    }
    return result
  }
}