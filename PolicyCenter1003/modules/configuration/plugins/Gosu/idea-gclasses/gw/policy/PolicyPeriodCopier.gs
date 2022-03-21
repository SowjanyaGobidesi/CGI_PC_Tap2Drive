package gw.policy
uses gw.api.locale.DisplayKey
uses gw.api.copy.CompositeCopier
uses gw.lob.pa.PersonalVehicleCopier
uses gw.api.copy.Copier
uses gw.lob.pa.PolicyDriverCopier
uses gw.note.NoteCopier
uses gw.note.AllNoteCopier
uses java.util.ArrayList
uses gw.lob.pa.PAPolicyLineCopier
uses java.util.Map
uses java.util.List

/**
 * Copier for PolicyPeriods. Contains a Copier for each supported PolicyLine and delegates to them
 * when copyInto() is called.
 */
@Export
class PolicyPeriodCopier extends CompositeCopier<PolicyPeriod, PolicyPeriod> {

  var _policyPeriod : PolicyPeriod as readonly Source
  var _lineCopiers : Map<Type< PolicyLine >, Copier< Object >> = {}

  // Create all the delegate copiers here
  construct(thePolicyPeriod : PolicyPeriod) {
    _policyPeriod = thePolicyPeriod
    initLines()
    addAllNoteCopiers()
    shouldCopy()
  }
  
  private function initLines(){
    for(policyLine in _policyPeriod.Lines) {
      var lineCopier = policyLine.Copier
      if (lineCopier != null) {
        _lineCopiers[typeof policyLine] = lineCopier
        addCopier(lineCopier)
      }
    }
  }

  // Makes sure that copying is legal, does the copy and then does any necessary clean-up
  override function copy(target : PolicyPeriod) {
    getOrCreateMissingLines(target)
    super.copy(target)
  }
  
  protected function getOrCreateMissingLines(target : PolicyPeriod){
    for (lineCopier in LineCopiers){
      if (lineCopier.ShouldCopy){
        var linePattern = (lineCopier.Source as PolicyLine).Pattern
        if (not target.getLineExists(linePattern)){
          target.createPolicyLine(linePattern)
        }
      }
    }
  }

  // No need to translate, the delegate copiers will do that
  override function getOrCreateRoot(theTarget : PolicyPeriod) : PolicyPeriod {
    return theTarget
  }
  
  override function copyRoot(target : PolicyPeriod) {
    target.TotalCostRPT = (Source as PolicyPeriod).TotalCostRPT
    target.TotalPremiumRPT = (Source as PolicyPeriod).TotalPremiumRPT
    target.TaxSurchargesRPT = (Source as PolicyPeriod).TaxAndSurchargesRPT
  }

  /**
   * Copies data into the given target and adds history events to both the source and target jobs
   * to indicate that data was copied.
   */
  function copyIntoWithHistory(target : PolicyPeriod) {
    copyInto(target)
    addHistoryEvents(_policyPeriod.Job, target.Job)
  }
  
  private function addHistoryEvents(sourceJob : Job, targetJob : Job) {
    var message = ""
    
    // If there's a policy associated with the job, include the policy number in the history's message description
    if(sourceJob.LatestPeriod.Policy.Issued){
      var policyNumber = sourceJob.LatestPeriod.PolicyNumber
      message = DisplayKey.get("Job.CopyPolicyData.History.Description.WithSourcePolicy", sourceJob.DisplayType, sourceJob.JobNumber, targetJob.DisplayType, targetJob.JobNumber, policyNumber)
    }
    else{
      message = DisplayKey.get("Job.CopyPolicyData.History.Description", sourceJob.DisplayType, sourceJob.JobNumber, targetJob.DisplayType, targetJob.JobNumber)
    }
    sourceJob.createCustomHistoryEvent(CustomHistoryType.TC_POL_DATA_COPIED, \ -> message)
    targetJob.createCustomHistoryEvent(CustomHistoryType.TC_POL_DATA_COPIED, \ -> message)
  }
    
  // Make it easier to get the individual types of copier
  function getPersonalVehicleCopiers() : List<PersonalVehicleCopier> {
    return getCopiersWhere(\ c -> c typeis PersonalVehicleCopier ) as List<PersonalVehicleCopier>
  }

  function getPACovCopiers() : List<Copier< Object >> {
    return getCopiersWhere(\ c ->  {return c.Source typeis entity.PersonalAutoCov} )
  }

  function getPolicyDriverCopiers() : List<Copier< Object >> {
    return getCopiersWhere(\ c -> c typeis PolicyDriverCopier )
  }

  function getNoteCopiers() : List<NoteCopier> {
    var allNoteCopier = getAllNoteCopier()
    return (allNoteCopier != null ) ? allNoteCopier.AllCopiers as List<NoteCopier> : new ArrayList<NoteCopier>()
  }
  
  function getAllNoteCopier() : AllNoteCopier {
    return getCopiersWhere(\ c -> c typeis AllNoteCopier).single() as AllNoteCopier
  }
  
  property get PACopier() : PAPolicyLineCopier {
    return _lineCopiers[PersonalAutoLine] as PAPolicyLineCopier
  }
  
  property get LineCopiers() : List<Copier< Object >>{
    return _lineCopiers.values().toList().orderBy(\ c -> (c.Source as PolicyLine).Pattern.Priority)
  }

  /**
   * This function loops through the top level "Selected" copiers and check to see
   * if there are matches in the target period. It returns an array of matched keyable beans. 
   */
  function findMatchItems(target : PolicyPeriod) : KeyableBean[] {
    var matches = new ArrayList<KeyableBean>()
    matches.addAll(getMatchesInCopiers(getPersonalVehicleCopiers(), target.PersonalAutoLine))
    matches.addAll(getMatchesInCopiers(getPolicyDriverCopiers(), target.PersonalAutoLine))
    matches.addAll(getMatchesInCopiers(getPACovCopiers(), target.PersonalAutoLine))
    return matches?.toTypedArray()
  }
    
  private function getMatchesInCopiers(cprs : List<Copier>, target : Object) : List<KeyableBean> {
    var matches = new  ArrayList<KeyableBean>()
    cprs.where(\ c -> c.ShouldCopy).each(\ c -> {
       var match = c.findMatch(target)
       if (match != null) {
        matches.addAll(match?.toList())
      } 
    })
    return matches
  }
  
  private function addAllNoteCopiers() {
    addCopier(new AllNoteCopier(_policyPeriod))
  }
}
