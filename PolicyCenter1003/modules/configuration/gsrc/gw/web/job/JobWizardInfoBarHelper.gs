package gw.web.job

@Export
class JobWizardInfoBarHelper {

  static function shouldDisplayPolicyNumber(job : Job) : boolean {
    if (job == null) {
      return false
    }
    return (job typeis Renewal)
        or (job typeis Rewrite)
        or (job typeis PolicyChange)
        or (job typeis Reinstatement)
        or (job typeis Issuance)
        or (job.NewTerm and job.DisplayStatus == "Bound")
  }
}