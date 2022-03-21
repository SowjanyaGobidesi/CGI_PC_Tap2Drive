package gw.job

uses com.guidewire.pl.system.dependency.PLDependencies
uses com.guidewire.pl.web.config.find.PCFElementFindUtil
uses com.guidewire.pl.web.iterator.IteratorOfTypeFindCriteria
uses com.guidewire.pl.web.iterator.IteratorWidget
uses gw.api.database.IQueryBeanResult
uses gw.api.locale.DisplayKey
uses gw.api.system.bundle.PCNeverPersistedBundle

@Export
class SubmissionLetterHelper {
  static function getCheckedSubmissions(): Submission[] {
    var criteria = new IteratorOfTypeFindCriteria(Submission)
    var submissionsIter = PCFElementFindUtil.findDescendantByCriteria(PLDependencies.getNavigator().getTopLocation(), criteria) as IteratorWidget
    var submissions = submissionsIter.getCheckedEntryValues() as List<Submission>
    if (submissions.size() == 0) {
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.SubmissionConfirmLetter.MustCheckErr"))
    }
    return submissions.toTypedArray()
  }

  /**
   * Returns a Set of keys of <code>Job.ID</code> and <code>LetterType</code> joined by a comma.
   */
  static function getSubmissionLettertypes(submissions: Submission[]): java.util.Set<String> {
    var q = gw.api.database.Query.make(JobLetter)
    var letterTable = q.join("Letter")
    letterTable.compareIn("Type", {LetterType.TC_CONFIRMATION, LetterType.TC_DECLINATION, LetterType.TC_NOTTAKENACK})
    q.compareIn("Job", submissions)
    return q.select().toList().partitionUniquely(\jl: JobLetter -> jl.Job.ID.toString() + "," + jl.Letter.Type.Code).Keys
  }

  /**
   * Returns a Map of <code>Documents</code> keyed by <code>PolicyPeriod.ID</code> and <code>LetterType</code> joined by a comma.
   */
  static function getDocumentsByPolicyPeriodAndDocType(submissions: Submission[]): java.util.Map<String, Document> {
    /*
     * If there are no Submissions then there are no Documents to fetch. In this case, DocumentSearchCriteria would
     * instead return Documents for ALL PolicyPeriods that match the other criteria.
     */
    if (submissions.IsEmpty) {
      return {}
    }

    var criteria = new DocumentSearchCriteria(new PCNeverPersistedBundle())
    criteria.TypeWrappers = createDocumentSearchTypes({DocumentType.TC_CONFIRM_LETTER, DocumentType.TC_DECLINE_LETTER, DocumentType.TC_NOT_TAKEN_LETTER});
    criteria.PolicyPeriodWrappers = createPolicyPeriodSearchTypes(submissions*.LatestPeriod)
    return (criteria.performSearch() as IQueryBeanResult<Document>).partitionUniquely(\document -> document.PolicyPeriod.ID.toString() + "," + document.Type.Code)
  }

  private static function createDocumentSearchTypes(documentTypes: DocumentType[]): DocumentSearchTypeWrapper[] {
    return documentTypes.map(\type -> {
      var wrapper = new DocumentSearchTypeWrapper()
      wrapper.setDocumentType(type)
      return wrapper
    });
  }

  private static function createPolicyPeriodSearchTypes(policyPeriods: PolicyPeriod[]): DocumentSearchPolicyPeriodWrapper[] {
    return policyPeriods.map(\policyPeriod -> {
      var policyPeriodWrapper = new DocumentSearchPolicyPeriodWrapper()
      policyPeriodWrapper.PolicyPeriod = policyPeriod
      return policyPeriodWrapper
    })
  }

  /**
   * Returns true if the <code>Submission</code> can have a letter of type letterType generated for it.
   */
  static function submissionCanSendLetterType(submissionLettertypes: java.util.Set<String>, letterType: LetterType, sub: Submission, latestPeriod: PolicyPeriod): boolean {
    if (not submissionLettertypes.contains(sub.ID.toString() + "," + letterType.Code)) {
      var status = latestPeriod.Status
      return status != null and status.hasCategory(letterType)
    }
    return false
  }

  /**
   * Returns true if at least one <code>Submission</code> can have a letter of type letterType generated for it.
   * Call function <code>getSubmissionLettertypes</code> to get the first argument of this function.
   */
  static function canSendLetterType(submissionLettertypes: java.util.Set<String>, letterType: LetterType, submissions: Submission[]): boolean {
    return submissions.hasMatch(\sub -> {
      if (not submissionLettertypes.contains(sub.ID.toString() + "," + letterType.Code)) {
        var status = sub.LatestPeriod.Status
        return status != null and status.hasCategory(letterType)
      }
      return false
    })
  }

  /**
   * Returns an array of <code>Submissions</code> for a given <code>Account</code>, filtered by passing the account submissions and <code>LetterType</code> into method <code>submissionCanSendLetterType</code>.
   */
  static function getAccountSubmissionsByLetterType(account: Account, letterType: LetterType): Submission[] {
    var selectedSubmissions = Job.finder.findSelectedSubmissionsByAccount(account).toTypedArray()
    var submissionLettertypes = getSubmissionLettertypes(selectedSubmissions)
    return selectedSubmissions.where(\submission_ -> {
      var latestPeriod_ = submission_.LatestPeriod
      return gw.job.SubmissionLetterHelper.submissionCanSendLetterType(submissionLettertypes, letterType, submission_, latestPeriod_)
          and perm.PolicyPeriod.view(latestPeriod_)
    })
  }

}
