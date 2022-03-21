package gw.pcf.solr

uses gw.api.locale.DisplayKey
uses gw.solr.SolrPolicyResultDocument
uses pcf.PolicyFileForward
uses gw.api.database.Query
uses pcf.JobForward
uses java.util.List

@Export
class SolrPolicySearchHelper {
  
  static function getDetails(result : SolrPolicyResultDocument) : String{
  
    var details : List<String> = {}
    if (result.AdditionalInsureds.HasElements){
      details.add("Additional insureds:\n" + result.AdditionalInsureds.join("\n"))
    }
  
    if (result.Phones.HasElements) {
      details.add("Phones:\n" + result.Phones.join("\n"))
    }

    if (result.OfficialId != null) {
      details.add("Official Id:\n" + result.OfficialId + "\n")
    }
  
    return details.join("\n\n")  
  
  }

  /**
   *  Get the icon which indicates what type of the job of a policy period is on Solr Search Screen
   *  Either it's a Bound period or it's unbound.
   * @param result The SolrPolicyResultDocument
   * @return the file name of the icon
   */
  static function getIcon( result : SolrPolicyResultDocument) : String{

    if (result.PeriodStatus == PolicyPeriodStatus.TC_BOUND.Code){
      return "policy_file"
    }
  
    return "policy_change"
  
  }

  /**
   *  Get the icon label on Solr Search Screen
   *  Either it's a bound period or it's unbound
   * @param result The SolrPolicyResultDocument
   * @return the label of the icon
   */
  static function getIconLabel(result : SolrPolicyResultDocument) : String{
  
    if (result.PeriodStatus == PolicyPeriodStatus.TC_BOUND.Code){
      return DisplayKey.get("Web.PolicySearch.Solr.Result.PolicyFile")
    }
  
    return DisplayKey.get("Web.PolicySearch.Solr.Result.Unbound") 
  
  }
  
  static function navigateToPolicyOrJob(result : SolrPolicyResultDocument){

    var period = Query.make(PolicyPeriod).compare(PolicyPeriod#PublicID, Equals, result.PeriodID).select().single()
    
    if (result.PeriodStatus == "Bound") {
      PolicyFileForward.go(result.PolicyNumber, result.SliceDate)    
    } else {
      JobForward.go(period.Job, period)
    }
    
  }
  
  
}
