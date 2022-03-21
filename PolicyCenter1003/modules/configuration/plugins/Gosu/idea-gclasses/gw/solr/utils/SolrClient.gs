package gw.solr.utils

uses gw.api.system.PCDependenciesGateway
uses gw.plugin.Plugins
uses gw.plugin.solr.ISolrSearchPlugin
uses org.apache.solr.client.solrj.SolrQuery
uses org.apache.solr.client.solrj.SolrRequest
uses org.apache.solr.client.solrj.response.QueryResponse

/**
 * TODO This is a temporary class for communication directly to the SOLR server and will be
 * replaced once we get all necessary platform support in place
 */
@Export
class SolrClient implements ISolrClient {

  var _qualifiedDocumentType : String as QualifiedDocumentType
  static final var VERSION  = "2.2"

  construct() {  
    var plugin = Plugins.get(ISolrSearchPlugin)
    _qualifiedDocumentType = plugin.DocumentType + "_active"
  }
    
  override function standardQuery(query : String, start : int = 0, rows : int = 10) : QueryResponse {
  
    var argMap = new LinkedHashMap<String, String>()
    argMap.put("q", query)
    argMap.put("version", VERSION)
    argMap.put("start", Integer.toString(start))
    argMap.put("rows", Integer.toString(rows))
    argMap.put("indent", "on")
  
    var solrQuery = new SolrQuery()
    for(entry in argMap.entrySet()) {
      solrQuery.setParam(entry.Key, { entry.Value })
    }
    
    var solrClient = PCDependenciesGateway.findSolrClient(QualifiedDocumentType)
    var queryResponse = solrClient.query(solrQuery,SolrRequest.METHOD.POST)
    
    return queryResponse

  }
  
  function commit(){

    var solrClient = PCDependenciesGateway.findSolrClient(QualifiedDocumentType)
    solrClient.commit()

  }

  function dropdb(){

    var solrClient = PCDependenciesGateway.findSolrClient(QualifiedDocumentType)
    solrClient.deleteByQuery("*:*")
    solrClient.commit()

  }
}
