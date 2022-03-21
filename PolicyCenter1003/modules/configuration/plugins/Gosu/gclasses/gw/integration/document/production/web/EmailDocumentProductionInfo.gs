package gw.integration.document.production.web

uses gw.api.email.Email
uses gw.integration.document.production.dto.EmailDocumentContentSource
uses gw.plugin.document.IDocumentTemplateDescriptor

@Export
class EmailDocumentProductionInfo extends DocumentProductionInfoBase {
  var _user: User as User
  var _email: Email as Email
  var _dateSent: Date as DateSent

  function buildEmailDocumentContent(): EmailDocumentContentSource {
    // Note that we don't set templateID, it is passed as separate parameter
    // later.
    var source = new EmailDocumentContentSource()
    source.Account = this.Account
    source.Policy = this.Policy
    source.PolicyPeriod = this.PolicyPeriod
    source.Activity = this.Activity
    source.Contingency = this.Contingency
    source.Job = this.Job

    source.User = this.User
    source.Email = this.Email
    source.DateSent = this.DateSent
    return source
  }
}