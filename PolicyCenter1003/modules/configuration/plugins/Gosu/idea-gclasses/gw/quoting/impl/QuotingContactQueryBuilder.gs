package gw.quoting.impl

uses gw.api.database.ISelectQueryBuilder
uses gw.contact.ContactQueryBuilder
uses gw.search.StringColumnRestrictor

@Export
class QuotingContactQueryBuilder extends ContactQueryBuilder {

  var _email : String as readonly Email
  var _emailRestrictor : StringColumnRestrictor as EmailColumnRestrictor

  function withEmail(value : String) : QuotingContactQueryBuilder {
    return withEmailRestricted(value, EqualsIgnoringCase)
  }

  function withEmailRestricted(value : String, restrictor : StringColumnRestrictor) : QuotingContactQueryBuilder {
    _email = value
    _emailRestrictor = restrictor
    return this
  }

  override function doRestrictQuery(selectQueryBuilder : ISelectQueryBuilder) {
    super.doRestrictQuery(selectQueryBuilder)
    if (Email?.NotBlank) {
      EmailColumnRestrictor.restrict(selectQueryBuilder, Contact#EmailAddress1, Email)
    }
  }

}