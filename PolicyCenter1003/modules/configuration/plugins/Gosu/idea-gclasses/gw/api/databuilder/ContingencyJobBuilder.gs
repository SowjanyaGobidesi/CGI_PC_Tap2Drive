package gw.api.databuilder

@Export
class ContingencyJobBuilder extends DataBuilder<ContingencyJob, ContingencyJobBuilder> {

  construct() {
    super(ContingencyJob)
  }

  final function withContingency(contigency : Contingency) : ContingencyJobBuilder {
    set(ContingencyJob#Contingency, contigency)
    return this
  }

  final function withJob(job : Job) : ContingencyJobBuilder {
    set(ContingencyJob#Job, job)
    return this
  }
}