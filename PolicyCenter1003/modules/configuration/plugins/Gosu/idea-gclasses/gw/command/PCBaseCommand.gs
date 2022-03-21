package gw.command

uses gw.command.critical.KeyGenerator
uses gw.api.builder.AccountBuilder
uses java.util.Date
uses gw.api.tools.TestingClock
uses java.lang.Exception
uses gw.api.database.Query

@Export
class PCBaseCommand extends BaseCommand{

  construct() {
  }
    
 /**
  * return the account param or if it is null, return a new created account
  */
  function getArgumentAsAccount(argName : String) : Account {
    var accountNumber = Arguments.firstWhere(\ a -> a.Name == argName).asString()
    var account : Account
    if (accountNumber != null) {
      var accountQuery = Query.make(entity.Account).compare(Account#AccountNumber, Equals, accountNumber)
      account = accountQuery.select().AtMostOneRow
    } else {
      accountNumber = KeyGenerator.nextString()
    }
    if (account == null) {
      account = new AccountBuilder()
      .withAccountNumber(accountNumber)
      .createAndCommit()
    }
    return account
  }
  
  protected function getCurrentAccount() : Account {
    try {
      return getVariableOfType(Account)
    } catch(e : Exception) {
      displayMessage("There is no account in scope of the current page " + e.Message)
      return null
    }
  }
  
  protected function getCurrentPolicyPeriod() : PolicyPeriod {
    try {
      return getVariableOfType(PolicyPeriod)
    } catch(e : Exception) {
      displayMessage("There is no policy period in scope of the current page " + e.Message)
      return null
    }
  }
  
  protected function getCurrentProducer() : Organization {
    try {
      var p = getVariableOfType(Organization)
      if(p.Producer){
        return p
      }else{
        displayMessage("The organization in this page is not producer")
      }
    } catch(e : Exception) {
      displayMessage("There is no producer in scope of the current page " + e.Message)
    }
    return null
  }

  protected function setDate(date : Date) : Date {
    var _clock = new TestingClock()
    if (_clock.DateTime < date) {
      _clock.DateTime = date
    }
    return _clock.DateTime
  }
  
}
