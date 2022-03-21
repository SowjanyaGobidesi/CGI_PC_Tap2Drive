package gw.sharding.impl

uses gw.api.importing.ImportingUtil
uses gw.api.importing.XmlExporterXmlWriter
uses gw.api.importing.graph.Graph
uses gw.api.importing.graph.MapBackedGraph
uses gw.api.profiler.PCProfilerTag
uses gw.api.sharding.AccountTransferRepresentation
uses gw.beantransfer.BeanTransferUtil
uses gw.beantransfer.BeanTransferXmlExporter
uses gw.beantransfer.impl.BeanImportGraph
uses gw.beantransfer.impl.BeanImportGraphSupport
uses gw.pl.persistence.core.Bundle
uses gw.pl.util.ArgCheck
uses gw.pl.util.GWDOMDocumentFactory
uses gw.sharding.AccountNotFrozenException
uses gw.sharding.AccountTransferManager
uses gw.sharding.FlatAccountTransferContent
uses gw.sharding.XmlAccountBeanExportHandler
uses gw.sharding.XmlAccountBeanImportHandler
uses org.apache.commons.io.output.ByteArrayOutputStream
uses org.w3c.dom.Document

uses javax.xml.namespace.NamespaceContext
uses javax.xml.transform.TransformerFactory
uses javax.xml.transform.dom.DOMSource
uses javax.xml.transform.stream.StreamResult
uses java.nio.charset.StandardCharsets

/**
 * This is an implementation of the AccountTransferManager that creates representations of the Account entity
 * in XML form for transfer from one system to another.
 */
@Export
class XmlAccountTransferManager implements AccountTransferManager {

  public static final var GW_SHARDING_SIDECAR_NS : String = "http://guidewire.com/sharding/sidecar"
  public static final var GW_SHARDING_SIDECAR_NS_PREFIX : String = "gw"
  public static final var GW_SHARDING_SIDECAR_ROOT_ELEM : String = "AdditionalTransferInfo"

  override function createAccountTransferRepresentation(account: Account) : AccountTransferRepresentation {
    /*
     * Only frozen accounts can be exported
     */
    if (!account.Frozen) {
      throw new AccountNotFrozenException(account)
    }
    /*
     * Convert the account and its related accounts to a flat representation
     */
    var flatAccountTransferContent = new FlatAccountTransferContent(account)

    var additionalInfo = createSidecarForExport()
    /*
     * Convert the flat representation into XML in String form
     */
    return createXmlAccountRepresentation(account.Bundle, flatAccountTransferContent, additionalInfo)
  }

  override function importAccounts(accountTransferRepresentation : AccountTransferRepresentation) : Set<Account> {
    var graph : MapBackedGraph
    using (var primaryInputStream = accountTransferRepresentation.AccountTransferInputStream) {
      ArgCheck.nonNull(primaryInputStream, "Primary AccountTransfer XML")
      graph = new MapBackedGraph("AccountTransfer", primaryInputStream)
    }
    var importGraph = createImportGraph(graph)
    prepareImportGraph(importGraph)

    var additionalInfo = parseSideCarForImport(accountTransferRepresentation)
    var helper = new BeanImportGraphSupport(importGraph, createImportBeanTransferHandlers(importGraph, additionalInfo))

    return BeanTransferUtil.runWithRestoreBeanTransferBundle(\bundle -> {
      var map = ImportingUtil.processImport(importGraph, helper, true, bundle)
      var accounts = importGraph.RootBeanIDs.map(\id -> map[id] as Account).toSet()
      helper.handlePostImport(accounts)
      return accounts
    })
  }

  /**
   * Create a BeanImportGraph out of a Graph so it can be modified before importing the Graph.
   *
   * @param graph the Graph representation of the import XML.
   * @return BeanImportGraph
   */
  protected function createImportGraph(graph : Graph) : BeanImportGraph {
    return new BeanImportGraph(graph, entity.Account)
  }

  /**
   * Prepare a BeanImportGraph for import. It makes the necessary modifications to the Graph before importing it.
   *
   * @param importGraph the import Graph
   */
  protected function prepareImportGraph(importGraph : BeanImportGraph) {
    importGraph.rekeyFixedIds()
  }

  /**
   * Create a List of BeanImportHandlers that is to be used during Graph import.
   *
   * @param importGraph the Graph to be imported
   * @param additionalInfoDoc additional info document for import handlers
   * @return List of BeanImportHandlers
   */
  protected function createImportBeanTransferHandlers(importGraph : BeanImportGraph, additionalInfoDoc : Document) : List<XmlAccountBeanImportHandler> {
    var beanHandlers =  {
        new AccountTransferEffDatedContainerPropertyHandler(importGraph, additionalInfoDoc),
        new CleanupPolicyEffDatedRegistryEntries(importGraph, additionalInfoDoc),
        new MessageImportHandler(importGraph, additionalInfoDoc),
        new ABLinkableConvertableImportHandler(importGraph, additionalInfoDoc),
        new LinkedAddressImportHandler(importGraph, additionalInfoDoc),
        new OfficialIDHandler(importGraph, additionalInfoDoc),
        new SoftEntityReferenceImportHandler(importGraph, additionalInfoDoc)
    }

    return beanHandlers
  }

  /**
   * Creates xml account transfer representation containing all beans to be transferred and additional information document
   *
   * @param accountContent flattened list of beans to be included in the xml representation
   * @param bundle the bundle to which the beans belong
   * @param additionalInfoDoc xml document containing additional information necessary for import handlers
   * @return account transfer representation in XML format
   */
  protected function createXmlAccountRepresentation(bundle : Bundle, accountContent : FlatAccountTransferContent, additionalInfoDoc : Document) : XmlAccountTransferRepresentation {
    var xmlWriter = new XmlExporterXmlWriter()
    try {
      var beanHandlers = createExportBeanTransferHandlers(accountContent, additionalInfoDoc)
      var exporter = new BeanTransferXmlExporter(xmlWriter, beanHandlers, accountContent)
      exporter.exportAllBeans()
      xmlWriter.finishExport(bundle)


      //get archive xml stream
      var graph : BeanImportGraph
      // We don't really need to use a using-block below because we call {@link XmlExporter#releaseResources()} later.
      using (var archiveXMLStream = xmlWriter.InputStream) {
        graph = new BeanImportGraph(archiveXMLStream, entity.Account)
      }
      using (PCProfilerTag.BEAN_TRANSFER_POST_EXPORT) {
        beanHandlers.each(\h -> h.handlePostExport(graph))
      }

      //get additional xml stream
      var transformer = TransformerFactory.newInstance().newTransformer()
      using (var stream = new ByteArrayOutputStream()) {
        transformer.transform(new DOMSource(additionalInfoDoc), new StreamResult(stream))
        // Create new stream since the existing stream has already be read.
        return new XmlAccountTransferRepresentation(xmlWriter.InputStream.TextContent, stream.toString(StandardCharsets.UTF_8))
      }
    } finally {
      xmlWriter.releaseResources()
    }
  }

  /**
   * Create a List of BeanExportHandlers that is to be used during Graph export.
   *
   * @param exporter the XmlExporter used during export
   * @return List of BeanExportHandlers
   */
  protected function createExportBeanTransferHandlers(accTransferContent : FlatAccountTransferContent, additionalInfoDoc: Document) : List<XmlAccountBeanExportHandler> {
    var handlers = {
        new MessageExportHandler(accTransferContent,additionalInfoDoc),
        new SoftEntityReferenceExportHandler(accTransferContent,additionalInfoDoc)
    }

    return handlers
  }

  /**
   * Setup the XML Document for the sidecar.
   *
   * Add the high-level XML Element for the sidecar.
   */
  private function createSidecarForExport() : Document {
    //initiate the additional info sidecar doc and give it a root element
    var docBuilderFactory = GWDOMDocumentFactory.newInstance()
    docBuilderFactory.setNamespaceAware(true)
    var documentBuilder = docBuilderFactory.newDocumentBuilder()
    var additionalInfoDoc = documentBuilder.DOMImplementation.createDocument(GW_SHARDING_SIDECAR_NS, GW_SHARDING_SIDECAR_ROOT_ELEM, null)
    additionalInfoDoc.DocumentElement.setAttribute("xmlns:${GW_SHARDING_SIDECAR_NS_PREFIX}", GW_SHARDING_SIDECAR_NS)
    return additionalInfoDoc
  }

  private function parseSideCarForImport(accountRepresentation : AccountTransferRepresentation) : Document {
    var documentBuilderFactory = GWDOMDocumentFactory.newInstance()
    documentBuilderFactory.setNamespaceAware(true)
    using (var inputStream = accountRepresentation.AdditionalInfoInputStream) {
      return (inputStream == null)
          ? null
          : documentBuilderFactory.newDocumentBuilder().parse(inputStream)
    }
  }

  static function createGWNamespaceContext() : NamespaceContext {
    return new NamespaceContext() {
      override function getNamespaceURI(prefix : String) : String {
        if (prefix == GW_SHARDING_SIDECAR_NS_PREFIX) {
          return GW_SHARDING_SIDECAR_NS
        }
        return null
      }

      override function getPrefixes(uri : String) : Iterator<String> {
        return null
      }

      override function getPrefix(uri : String) : String {
        return null
      }
    }
  }

}