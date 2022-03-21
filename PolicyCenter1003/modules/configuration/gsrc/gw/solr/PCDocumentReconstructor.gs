package gw.solr

uses gw.api.system.PLLoggerCategory
uses gw.solr.consistency.IReconstructor
uses org.json.simple.JSONObject
uses java.util.List
uses gw.api.upgrade.Coercions


@Export 
class PCDocumentReconstructor implements IReconstructor { 
  
  override function reconstructDocument(docObj : JSONObject, updatedBeans : List<KeyableBean>) : JSONObject { 
    var period = updatedBeans.firstWhere( \ b -> b typeis PolicyPeriod ) as PolicyPeriod 
    var sliceDate = Coercions.makeDateFrom(docObj.get("sliceDate"))
    period = period.getSlice(sliceDate)
    var contact = period.PNIContactDenorm
    
    if(PLLoggerCategory.SOLR_INDEX.TraceEnabled) {
      PLLoggerCategory.SOLR_INDEX.trace("Reconstructing document for period " + 
          period?.PublicID + " and contact " + contact?.PublicID + " ( " + contact?.Name + " )")
    }
    
    var result = SolrPolicyIndexDocument.createDocument(period, contact).asJSON() 
    
    if(PLLoggerCategory.SOLR_INDEX.TraceEnabled) {
      PLLoggerCategory.SOLR_INDEX.trace("RECONSTRUCTED : " + result.toJSONString())
    }
    
    return result
  } 
  
}
