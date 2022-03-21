package gw.pcf.tools

uses com.guidewire.pl.system.bundle.EntityBundleImpl
uses gw.api.database.Query
uses gw.pl.persistence.core.Bundle
uses gw.plugin.Plugins
uses gw.plugin.personaldata.PersonalDataDestruction


/**
 * This is ONLY used for testing.  This SHOULD NOT END UP IN PRODUCTION CODE.
 */
@Export
class PersonalDataObfuscationTestPageHelper {

  var _obfuscateMessage: String as readonly ObfuscateMessage
  var _userContactDisposition : String as UserContactDisposition
  var _beansToObfuscate : List<ObfuscationEntityInfo> as BeansToObfuscate


  construct() {
    _obfuscateMessage = ""
  }

  public function resetObfuscationHelper() {
    _obfuscateMessage = ""
    _beansToObfuscate = new ArrayList<ObfuscationEntityInfo>()
  }

  public function obfuscateUserContact(publicID : String) {
    if (not loadUserContact(publicID)) {
      return
    }

    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      obfuscateUserContact(publicID, bundle)
    })

    _beansToObfuscate.each(\elt -> {
      elt.loadObfuscatedValueFromDB()
    })

  }

  public function loadUserContact(publicID : String) : boolean {
    var snapshot = (gw.transaction.Transaction.Current as EntityBundleImpl).pushVersion()
    var currentBundle = gw.transaction.Transaction.Current as EntityBundleImpl
    assert(currentBundle.InsertedBeans.Empty)
    assert(currentBundle.UpdatedBeans.Empty)
    assert(currentBundle.RemovedBeans.Empty)
    assert(currentBundle.ReadBeans.Empty)

    var found = obfuscateUserContact(publicID, currentBundle)

    var beans = currentBundle.InsertedBeans
    beans.addAll(currentBundle.RemovedBeans)
    beans.addAll(currentBundle.UpdatedBeans)
    currentBundle.ReadBeans.each(\elt -> {
      if (elt typeis KeyableBean) {
        beans.add(elt)
      }
    })

    _beansToObfuscate = beans.map(\elt -> new ObfuscationEntityInfo(elt))

    currentBundle.rollbackVersion(snapshot)

    _beansToObfuscate.each(\elt -> {
      elt.loadOriginalValueFromDB()
    })

    return found
  }

  public function obfuscateUser(username : String) {
    if (not loadUser(username)) {
      return
    }

    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      obfuscateUser(username, bundle)
    })

    _beansToObfuscate.each(\elt -> {
      elt.loadObfuscatedValueFromDB()
    })
  }

  public function loadUser(username : String) : boolean {
    //this code may or may not remain consistent with PersonalDataDestructionAPI#destroyUser()
    var snapshot = (gw.transaction.Transaction.Current as EntityBundleImpl).pushVersion()
    var currentBundle = gw.transaction.Transaction.Current as EntityBundleImpl
    assert(currentBundle.InsertedBeans.Empty)
    assert(currentBundle.UpdatedBeans.Empty)
    assert(currentBundle.RemovedBeans.Empty)
    assert(currentBundle.ReadBeans.Empty)

    var found = obfuscateUser(username, currentBundle)

    var beans = currentBundle.InsertedBeans
    beans.addAll(currentBundle.RemovedBeans)
    beans.addAll(currentBundle.UpdatedBeans)
    currentBundle.ReadBeans.each(\elt -> {
      if (elt typeis KeyableBean) {
        beans.add(elt)
      }
    })

    _beansToObfuscate = beans.map(\elt -> new ObfuscationEntityInfo(elt))

    currentBundle.rollbackVersion(snapshot)

    _beansToObfuscate.each(\elt -> {
      elt.loadOriginalValueFromDB()
    })

    return found
  }

  private function obfuscateUser(username : String, bundle : Bundle) : boolean {
    var credential = Query.make(Credential).compare(Credential#UserName, Equals, username).select().AtMostOneRow

    if (credential == null) {
      _obfuscateMessage = "User cannot be found with username: " + username
      return false
    } else {
      _obfuscateMessage = ""
    }

    var user = Query.make(User).compare(User#Credential, Equals, credential).select().AtMostOneRow

    if (user == null) {
      credential = bundle.add(credential)
      credential.obfuscate()
    } else {
      var plugin = Plugins.get(PersonalDataDestruction)
      _userContactDisposition = plugin.shouldDestroyUser(user.Contact).name()

      user = bundle.add(user)
      user.obfuscate()
    }

    return true
  }

  private function obfuscateUserContact(publicID : String, bundle : Bundle) : boolean {
    var userContact = Query.make(UserContact).compare(UserContact#PublicID, Equals, publicID).select().AtMostOneRow
    if (userContact == null) {
      _obfuscateMessage = "Could not find UserContact with publicID: " + publicID
      return false
    } else {
      _obfuscateMessage = ""
    }

    var plugin = Plugins.get(PersonalDataDestruction)
    _userContactDisposition = plugin.shouldDestroyUser(userContact).name()

    userContact = bundle.add(userContact)
    userContact.obfuscate()

    return true
  }

}