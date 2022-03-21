package gw.integration.document.production.dto

uses gw.api.email.Email

/**
 * Data to create document content that represents email.
 */
@Export
class EmailDocumentContentSource {
  var _account: Account as Account
  var _policy: Policy as Policy
  var _policyPeriod: PolicyPeriod as PolicyPeriod
  var _activity: Activity as Activity
  var _contingency: Contingency as Contingency
  var _job: Job as Job
  var _templateID: String as TemplateID
  var _language: LanguageType as Language

  var _user: User as User
  var _email: Email as Email
  var _dateSent: Date as DateSent
}