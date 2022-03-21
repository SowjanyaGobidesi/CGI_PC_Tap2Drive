package gw.lob.hop

uses gw.api.locale.DisplayKey
uses typekey.Job

enhancement HOPDwellingEnhancement: HOPDwelling {

  function createAndAddDwellingAnimal() : DwellingAnimal {
    var newAnimal = new DwellingAnimal(this.getBranch())
    this.addToDwellingAnimals(newAnimal)
    return newAnimal
  }

  function createAndAddDwellingHazard() : DwellingHazard {
    var newHazard = new entity.DwellingHazard(this.getBranch())
    this.addToDwellingHazards(newHazard)
    return newHazard
  }

  function createAndAddSwimmingPool() : HOPSwimmingPool {
    if (this.SwimmingPool != null) {
      throw new IllegalStateException(DisplayKey.get("Web.Policy.HOP.SwimmingPool.AlreadyExists", this))
    }
    var pool = new HOPSwimmingPool(this.Branch)
    this.SwimmingPool = pool
    return pool
  }

  function removeSwimmingPool() {
    if (this.SwimmingPool != null) {
      this.SwimmingPool.remove()
    }
  }

  /**
   * Returns true if the dwelling location can be edited in this job. This checks that the type of the current
   * job is in the list of job types returned by {@link JobsThatCanEditLocation}.
   */
  property get CanEditLocation() : boolean {
    return JobsThatCanEditLocation.contains(this.Branch.Job.Subtype)
  }

  /**
   * Returns the types of jobs in which the dwelling location may be edited.
   */
  property get JobsThatCanEditLocation() : typekey.Job[] {
    return {Job.TC_SUBMISSION, Job.TC_ISSUANCE, Job.TC_REWRITE, Job.TC_REWRITENEWACCOUNT}
  }
}
