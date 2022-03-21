package gw.pcf.tools

uses com.guidewire.pc.domain.archiving.PCDomainGraphs
uses com.guidewire.pc.domain.personaldata.purge.PersonalDataPurgeTree
uses com.guidewire.pc.system.dependency.PCDependencies
uses com.guidewire.pl.domain.extract.impl.GraphInstanceLoader
uses entity.Contact
uses gw.api.database.InOperation
uses gw.api.database.Query
uses gw.api.database.Relop
uses gw.api.locale.DisplayKey
uses gw.api.system.PLDependenciesGateway
uses gw.api.tree.SimpleTreeNode
uses gw.api.tree.TreeNode
uses gw.api.util.TypeUtil


/**
 * This is ONLY used for testing.  This SHOULD NOT END UP IN PRODUCTION CODE.
 */
@Export
class PersonalDataPurgeTestPageHelper {

  var _purgeMessage: String as readonly PurgeMessage
  var _contactNode: PersonalDataTreeNode as readonly PreviewTreeNode
  var _purgeTree: PersonalDataPurgeTree as PurgeTree
  var _domainGraphPinnables : List<KeyableBean> as readonly DomainGraphPinnables

  construct() {
    _purgeMessage = ""
  }

  public property get Accounts() : List<PersonalDataPurgeTree.Node> {
    var nodes = new ArrayList<PersonalDataPurgeTree.Node>()
    _contactNode.Children*.Data.each(\elt -> nodes.add(elt as PersonalDataPurgeTree.Node))
    return nodes
  }

  public function resetPurgeTree() {
    _purgeTree = null
    _contactNode = null
    _purgeMessage = ""
  }

  private function cleanupBeforePurge() {
    _purgeMessage = ""
    PLDependenciesGateway.getBatchProcessManager().startBatchProcess(BatchProcessType.TC_WORKFLOW, null)
    PLDependenciesGateway.getBatchProcessManager().startBatchProcess(BatchProcessType.TC_PURGEWORKFLOWS, null)
    PLDependenciesGateway.getBatchProcessManager().startBatchProcess(BatchProcessType.TC_PURGEWORKFLOWLOGS, null)
    PLDependenciesGateway.getBatchProcessManager().startBatchProcess(BatchProcessType.TC_PREMIUMCEDING, null)
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      Query.make(Message).withFindRetired(true).select().each(\elt -> bundle.delete(elt))
      Query.make(MessageHistory).withFindRetired(true).select().each(\elt -> bundle.delete(elt))
    })
  }

  public function purgeContact(publicID : String) {
    var contact = Query.make(Contact).compare(Contact#PublicID, Equals, publicID).withFindRetired(true).select().AtMostOneRow
    if (contact == null) {
      _purgeMessage = DisplayKey.get("Web.PersonalData.InternalTools.ContactPublicIDNotFound", publicID)
    } else {
      cleanupBeforePurge()
      _purgeMessage = PCDependencies.getPersonalDataPurger().purgeContactForPersonalData(contact).getStatus().toString();
    }
  }

  public function purgeAccount(accountNumber : String) {
    cleanupBeforePurge()
    var account = Query.make(Account).compare(Account#AccountNumber, Equals, accountNumber).withFindRetired(true).select().AtMostOneRow
    if (account == null) {
      _purgeMessage = DisplayKey.get("Web.PersonalData.InternalTools.AccountNumberNotFound", accountNumber)
    } else {
      _purgeMessage = PCDependencies.getPersonalDataPurger().purgeAccountForPersonalData(account).getStatus().toString();
    }
  }

  public function purgePolicy(policyNumber : String, publicID : String) {
    cleanupBeforePurge()
    var policy = findPolicy(policyNumber, publicID)

    if (policy == null) {
      _purgeMessage = "policy could not be found"
    } else {
      _purgeMessage = PCDependencies.getPersonalDataPurger().purgePolicyForPersonalData(policy).getStatus().toString();
    }
  }

  public function readableString(pinnable : DestructionRootPinnable) : String {
    var node = _purgeTree.findNode(pinnable)
    return node == null ? "NOT IN TREE: " + pinnable.toString() : readableString(node)
  }

  public function readableString(node : PersonalDataPurgeTree.Node) : String {
    var destructionDecision = " (" + node.DestructionDecision + ") "
    var purgeability = node.Purgeable ? " (P) " : " (NP) "
    var referencedFromArchive = node.ReferencedFromArchive ? " (A) " : " (NA) "
    var finalString : String
    var data = node.Pinnable
    var retired : String
    if (data typeis Retireable) {
      retired = data.Retired ? " (Retired)" : ""
    }

    if (data typeis Contact) {
      finalString =  "Contact: " + data.DisplayName
    } else if (data typeis Account) {
      finalString = "Account: " + data.AccountNumber
    } else if (data typeis Policy) {
      var policyNumber = data.Periods?.first()?.PolicyNumber
      finalString =  "Policy: " + policyNumber
    } else if (data typeis PolicyTerm) {
      var termNumber = data.findTermNumber()
      finalString =  "PolicyTerm: " + termNumber
    } else if (data typeis PolicyPeriod) {
      finalString =  "PolicyPeriod: " + data.DisplayName
    }
    return finalString + " publicID: " + (data as KeyableBean).PublicID + " " + purgeability + referencedFromArchive + destructionDecision + retired
  }

  public function displayContactToBePurged(publicID : String) {
    resetPurgeTree()
    if (publicID == null) {
      _purgeMessage = DisplayKey.get("Web.PersonalData.InternalTools.ContactPublicIDNotFound", publicID)
      return
    }

    var contact = Query.make(Contact).compare(Contact#PublicID, Equals, publicID).withFindRetired(true).select().AtMostOneRow
    if (contact == null) {
      _purgeMessage = DisplayKey.get("Web.PersonalData.InternalTools.ContactPublicIDNotFound", publicID)
    } else {
      _purgeTree = new PersonalDataPurgeTree(contact)
      _purgeMessage = _purgeTree.PurgeableNodes.contains(_purgeTree.StartNode) ? "Contact is purgeable" : "Contact is NOT purgeable"
      createDisplay(contact)
      _domainGraphPinnables = getAllDomainGraphPinnables()
    }
  }

  public function displayAccountToBePurged(accountNumber : String){
    resetPurgeTree()
    if (accountNumber == null) {
      _purgeMessage = DisplayKey.get("Web.PersonalData.InternalTools.AccountNumberNotFound", accountNumber)
      return
    }

    var account = Query.make(Account).compare(Account#AccountNumber, Equals, accountNumber).withFindRetired(true).select().AtMostOneRow
    if (account == null) {
      _purgeMessage = DisplayKey.get("Web.PersonalData.InternalTools.AccountNumberNotFound", accountNumber)
    } else {
      _purgeTree = new PersonalDataPurgeTree(account)
      _purgeMessage = _purgeTree.PurgeableNodes.contains(_purgeTree.StartNode) ? "Account is purgeable" : "Account is NOT purgeable"
      createDisplay(account)
      _domainGraphPinnables = getAllDomainGraphPinnables()
    }
  }

  protected function findPolicy(policyNumber : String, publicID : String) : Policy {
    if (policyNumber == null and publicID == null) {
      _purgeMessage = "Must specify either policy number or publicID for the policy"
      return null
    } else if (policyNumber != null and publicID != null) {
      _purgeMessage = "Please specify either policy number or public ID, not both"
      return null
    }

    var policy : Policy
    if (policyNumber != null) {
      var query = Query.make(Policy)
      query.withFindRetired(true)
      var periodTable = query.subselect(Policy.ID_PROP.get(), InOperation.CompareIn, PolicyPeriod.POLICY_PROP.get())
      periodTable.compare(PolicyPeriod.POLICYNUMBER_PROP.get(), Relop.Equals, policyNumber)
      return query.select().getAtMostOneRow();
    } else {
      policy = Query.make(Policy).compare(Policy#PublicID, Equals, publicID).withFindRetired(true).select().AtMostOneRow
    }

    if (policy == null) {
      _purgeMessage = "Could not find policy"
    }
    return policy
  }

  public function displayPolicyToBePurged(policyNumber : String, publicID : String) {
    resetPurgeTree()
    var policy = findPolicy(policyNumber, publicID)

    if (policy == null) {
      _purgeMessage = "policy could not be found"
    } else {
      _purgeTree = new PersonalDataPurgeTree(policy)
      _purgeMessage = _purgeTree.PurgeableNodes.contains(_purgeTree.StartNode) ? "Policy is purgeable" : "Policy is NOT purgeable"
      createDisplay(policy)
      _domainGraphPinnables = getAllDomainGraphPinnables()
    }
  }

  private function getAllDomainGraphPinnables() : List<KeyableBean> {
    var allRoots = new ArrayList<KeyableBean>()
    if (_purgeTree != null) {
      var loader = new GraphInstanceLoader()
      _purgeTree.getPurgeableNodes().each(\root -> {
        var rootEntityType = root.Pinnable.getIntrinsicType().getRootType()
        var domainGraphSupport = PCDomainGraphs.getDomainGraphForRootEntity(rootEntityType)
        if (domainGraphSupport == null) {
          throw new IllegalArgumentException(
              "No purge domain graph registered for entity ${rootEntityType.RelativeName}"
          )
        }
        var graphInstance = loader.loadGraphInstance(domainGraphSupport.getDomainGraph(), root.Pinnable as KeyableBean)
        var beforeWeAddCheck = graphInstance.AllBeans.where(\elt -> TypeUtil.isNominallyOrStructurallyAssignable(DestructionRootPinnable, elt.getIntrinsicType()))
        allRoots.addAll(beforeWeAddCheck)
      })
    }

    return allRoots
  }

  private function createDisplay(root: DestructionRootPinnable) {
    if (root typeis Contact) {
      _contactNode = new PersonalDataTreeNode(_purgeTree.findNode(root));
    } else {
      var accountRoot = root
      while (not (accountRoot typeis Account)) {
        accountRoot = accountRoot.PinnableParents.single()
      }
      var rootNode = new PersonalDataTreeNode(_purgeTree.findNode(accountRoot).Parents.first(), false);
      rootNode.addChild(new PersonalDataTreeNode(_purgeTree.findNode(accountRoot)));
      _contactNode = rootNode;
    }
  }


  public class PersonalDataTreeNode extends SimpleTreeNode {

    construct(data : PersonalDataPurgeTree.Node) {
      this(data, true);
    }

    construct(data : PersonalDataPurgeTree.Node, createChildren : boolean) {
      super(data, true);
      if (createChildren) {
        for (child in data.Children) {
          this.addChild(new PersonalDataTreeNode(child, true));
        }
      }
    }

    override property set Data(data: Object) {
      if (data typeis PersonalDataPurgeTree.Node) {
        this.Data = data
      } else {
        throw new IllegalStateException("not a node type")
      }
    }
  }
}