package gw.system.messaging
uses java.lang.Integer

uses gw.api.database.LazyJoinTable
uses gw.api.productmodel.Product
uses gw.datatype.annotation.DataType
uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.search.EntitySearchCriteria

@Export
class MessageSearchCriteria extends EntitySearchCriteria<Message> {
  
  var _destination : Integer as Destination
  var _jobNumber : String as JobNumber
  var _accountNumber : String as AccountNumber
  var _policyNumber : String 
  var _product : Product as Product
  var _jobType : typekey.Job as JobType
  var _messageStatus : MessageSearchStatus as MessageStatus

  construct() {
  }
  
  @DataType("policynumber")
  property get PolicyNumber() : String {
    return _policyNumber
  }
  
  property set PolicyNumber(value : String) {
    _policyNumber = value
  }
  
  override protected function doSearch() : IQueryBeanResult<Message> {
    var messageQuery = Query.make(Message)
    var periodTable = new LazyJoinTable(messageQuery, Message.POLICYPERIOD_PROP.get())
    var policyTable = new LazyJoinTable(messageQuery, Message.POLICY_PROP.get())
    var accountTable = new LazyJoinTable(messageQuery, Message.ACCOUNT_PROP.get())
    var jobTable = new LazyJoinTable(periodTable, PolicyPeriod.JOB_PROP.get())

    if (MessageStatus == MessageSearchStatus.TC_FAILED) {
      messageQuery.compareIn("Status", gw.pl.messaging.MessageStatus.ERROR_STATES)
    } else if (MessageStatus == MessageSearchStatus.TC_NEEDRETRY) {
      messageQuery.compareIn("Status", gw.pl.messaging.MessageStatus.RETRYABLE_STATES)
    }
    
    if (Destination != null) {
      messageQuery.compare("DestinationID", Equals, Destination)
    }

    if (PolicyNumber != null) {
      periodTable.joinIfNecessary().compare("PolicyNumber", Equals, PolicyNumber)
    }

    if (AccountNumber != null) {
      accountTable.joinIfNecessary().compare("AccountNumber", Equals, AccountNumber)
    }

    if (Product != null) {
      policyTable.joinIfNecessary().compare("ProductCode", Equals, Product.PublicID)
    }

    if (JobNumber != null) {
      jobTable.joinIfNecessary().compare("JobNumber", Equals, JobNumber)
    }

    if (JobType != null) {
      jobTable.joinIfNecessary().compare("SubType", Equals, JobType)
    }

    return messageQuery.select()
  }

  override protected property get InvalidSearchCriteriaMessage() : String {
    return null
  }

  override protected property get MinimumSearchCriteriaMessage() : String {
    return null
  }

}
