package gw.solr.mapper
uses gw.xsd.config.solr_search_config.DataProperty
uses gw.solr.utils.PCSolrUtils
uses org.json.simple.JSONArray
uses java.util.List

@Export
class BuildANICompanyName implements ISolrIndexMapper{

  static function buildANICompanyNameList(roles : PolicyContactRole[], dataHolder : IDataHolder = null) : List<String> {
    var ani = roles.whereTypeIs(PolicyAddlNamedInsured)?.toList() as List<PolicyContactRole>
    //OOTB PolicySecNameInsured only applies to Person, but we want to make it company tolerable
    var sni = roles.whereTypeIs(PolicySecNamedInsured)?.toList() as List<PolicyContactRole>
    return ani.union(sni).where(\ c -> c.ContactDenorm typeis Company).map(\ c -> {
      dataHolder?.addReferences( { c, c.ContactDenorm } )
      return BuildCompanyName.mapRoleToCompanyName(c)
    })
  }
  
  override function mapIndex(inputDataProperties : List<DataProperty>, dataHolder : IDataHolder) : JSONArray {
    PCSolrUtils.validate(inputDataProperties.Count == 1, "ANICompanyName mapper expects a single target field.")
    
    var idp = inputDataProperties.get(0)
    var ani = dataHolder.lookup<PolicyContactRole[]>(idp)?.toList()

    var result : JSONArray = null
    if(ani != null && !ani.Empty) {
      result = new JSONArray()
      for (r in buildANICompanyNameList(ani.toTypedArray(), dataHolder)) {
        result.add(r)
      }
    }
    return result

  }

}
