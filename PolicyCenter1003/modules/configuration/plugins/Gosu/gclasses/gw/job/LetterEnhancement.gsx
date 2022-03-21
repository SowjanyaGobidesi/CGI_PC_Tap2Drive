package gw.job
uses java.lang.IllegalStateException
uses gw.document.DocumentProduction

enhancement LetterEnhancement : Letter {

  function createAndAttachDocument() {
    var docType = this.RelatedDocumentType
    for (jobLetter in this.JobLetters) {
      var policyPeriod = jobLetter.Job.LatestPeriod
      var document = new Document(policyPeriod)
      document.Name = docType.DisplayName
      document.Type = docType
      document.Account = policyPeriod.Policy.Account
      document.Policy = policyPeriod.Policy
      document.Job = jobLetter.Job
      document.PolicyPeriod = policyPeriod
      DocumentProduction.createAndStoreBestDocumentSynchronously(docType, document, policyPeriod)
    }
  }
  
  property get RelatedDocumentType() : DocumentType {
    switch (this.Type) {
      case TC_CONFIRMATION:
        return TC_CONFIRM_LETTER
      case TC_DECLINATION:
        return TC_DECLINE_LETTER
      case TC_NOTTAKENACK:
        return TC_NOT_TAKEN_LETTER
      default:
        throw new IllegalStateException("Unknown letter type \"${this.Type}\"")
    }
  }
  
}
