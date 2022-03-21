package gw.solr.mapper
uses gw.xsd.config.solr_search_config.DataProperty
uses gw.solr.utils.PCSolrUtils
uses org.json.simple.JSONArray
uses java.util.List

@Export
class BuildANIPersonName implements ISolrIndexMapper {

  static function buildANIPersonNameList(roles : PolicyContactRole[], dataHolder : IDataHolder = null) : List<String> {
    var ani = roles.whereTypeIs(PolicyAddlNamedInsured)?.toList() as List<PolicyContactRole>
    var sni = roles.whereTypeIs(PolicySecNamedInsured)?.toList() as List<PolicyContactRole>
    return ani.union(sni).where(\ c -> c.ContactDenorm typeis Person).map(\ c -> {
      dataHolder?.addReferences( { c, c.ContactDenorm } )
      return BuildPersonName.mapRoleToFullName(c) 
      })
  }
  
  override function mapIndex(inputDataProperties : List<DataProperty>, dataHolder : IDataHolder) : JSONArray {
    PCSolrUtils.validate(inputDataProperties.Count == 1, "ANIPersonName mapper expects a single target field.")
    
    var idp = inputDataProperties.get(0)
    var ani = dataHolder.lookup<PolicyContactRole[]>(idp)?.toList()
    
    var result : JSONArray = null
    if(ani != null && !ani.Empty) {
      result = new JSONArray()
      for (r in buildANIPersonNameList(ani.toTypedArray(), dataHolder)) {
        result.add(r)
      }
    }
    return result
  }
}
