package gw.quoting.impl

uses gw.account.AccountSearchCriteria
uses gw.api.locale.DisplayKey
uses gw.api.quoting.QuoteDataManagerException
uses gw.beantransfer.BeanExportHandler
uses gw.beantransfer.BeanTransferUtil
uses gw.beantransfer.impl.BeanImportGraph
uses org.w3c.dom.Element
uses org.w3c.dom.Document

/**
 * Handler for setting up the Account for the quote PolicyPeriod.
 */
@Export
class AccountHandler implements BeanExportHandler {

  public static final var NS : String = ArchiveXmlQuoteConverter.GW_QUOTE_SIDECAR_NS_PREFIX

  var _additionalInfoDoc : Document

  construct(additionalInfoDoc : Document) {
    _additionalInfoDoc = additionalInfoDoc
  }

  private function exportContactInfoSidecar(element : Element, graph : BeanImportGraph, contactID : String) {
    var contact = graph.getElement(contactID)
    var contactType = BeanTransferUtil.getEntityIntrinsicType(contact.EntityTypeName)
    if (BeanTransferUtil.isSourceTypeAssignable(Person, contactType)) {
      var firstName = contact.getAttribute("FirstName")
      if (firstName != null) {
        element.setAttribute("FirstName", firstName)
      }
      var lastName = contact.getAttribute("LastName")
      if (lastName != null) {
        element.setAttribute("LastName", lastName)
      }
    } else {
      var name = contact.getAttribute("Name")
      if (name != null) {
        element.setAttribute("Name", name)
      }
    }
    var phone = contact.getAttribute("WorkPhone")
    if (phone != null) {
      element.setAttribute("Phone", phone)
    }
  }

  /**
   * Get the AccountHolder specified in the quote Graph and create search criteria for the contact in the sidecar XML.
   * @param graph
   */
  override function handlePostExport(graph : BeanImportGraph) {
    var accountHolder = graph.getAssignableElementsForType(AccountHolder).single()
    var accountContactID = accountHolder.getAttribute("AccountContact")
    var accountContact = graph.getElement(accountContactID)
    var contactID = accountContact.getAttribute("Contact")

    var handlerElement = _additionalInfoDoc.createElement("AccountHandler")
    _additionalInfoDoc.DocumentElement.appendChild(handlerElement)
    var criteriaElement = _additionalInfoDoc.createElement("AccountSearchCriteria")
    handlerElement.appendChild(criteriaElement)

    exportContactInfoSidecar(criteriaElement, graph, contactID)
  }

  /**
   * To find an existing Account from the SoR, create an AccountSearchCriteria populated with search criteria defined
   * in the sidecar XML.
   *
   * @return AccountSearchCriteria
   */
  function createAccountSearchCriteria() : AccountSearchCriteria {
    var criteriaNode = createCriteriaNode(_additionalInfoDoc, ArchiveXmlQuoteConverter.createGWNamespaceContext(),
        "/${NS}:AdditionalEntity/${NS}:AccountHandler/${NS}:AccountSearchCriteria")
    if (criteriaNode == null) {
      throw new QuoteDataManagerException(DisplayKey.get("Quoting.AccountHandler.Missing.System.AccountSearchCriteria"))
    }
    var firstName = criteriaNode.Attributes.getNamedItem("FirstName").TextContent
    var lastName = criteriaNode.Attributes.getNamedItem("LastName").TextContent
    var companyName = criteriaNode.Attributes.getNamedItem("Name").TextContent
    var phone = criteriaNode.Attributes.getNamedItem("Phone").TextContent

    var searchCriteria = new AccountSearchCriteria()
    searchCriteria.Secure = true
    searchCriteria.RestrictiveMinimumSearchCriteriaForPersonName = true
    searchCriteria.FirstName = firstName
    searchCriteria.LastName = lastName
    searchCriteria.CompanyName = companyName
    searchCriteria.FirstNameExact = true
    searchCriteria.LastNameExact = true
    searchCriteria.CompanyNameExact = true
    searchCriteria.Phone = phone
    return searchCriteria
  }
}