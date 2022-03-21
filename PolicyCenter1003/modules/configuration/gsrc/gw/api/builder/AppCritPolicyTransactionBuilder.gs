package gw.api.builder

uses gw.api.databuilder.DataBuilder

@Export
class AppCritPolicyTransactionBuilder extends DataBuilder<AppCritPolicyTransaction, AppCritPolicyTransactionBuilder> {

  construct() {
    super(AppCritPolicyTransaction)
  }

  function withJob(job: typekey.Job): AppCritPolicyTransactionBuilder {
    set(AppCritPolicyTransaction#Job, job)
    return this
  }

  function withUWRule(rule: UWRule): AppCritPolicyTransactionBuilder {
    set(AppCritPolicyTransaction#UWRule, rule)
    return this
  }
}