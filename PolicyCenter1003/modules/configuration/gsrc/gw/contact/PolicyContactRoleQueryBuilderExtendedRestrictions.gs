package gw.contact

uses gw.api.database.ISelectQueryBuilder
uses gw.pl.persistence.core.Bean
uses gw.search.StringColumnRestrictor

/**
 * Additional restrictions for PolicyContactRoleQueryBuilder for columns added in pc-content.
 */
@Export
class PolicyContactRoleQueryBuilderExtendedRestrictions {

  static function restrictCompanyNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor : StringColumnRestrictor, value : String){
    if (value.NotBlank) {
      restrictor.restrict(selectQueryBuilder, PolicyContactRole#CompanyNameKanjiInternal, value)
    }
  }

  static function restrictFirstNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<gw.pl.persistence.core.Bean>, restrictor : StringColumnRestrictor, value : String) {
    if (value.NotBlank) {
      restrictor.restrict(selectQueryBuilder, PolicyContactRole#FirstNameKanjiInternal, value)
    }
  }

  static function restrictLastNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<gw.pl.persistence.core.Bean>, restrictor : StringColumnRestrictor, value : String){
    if (value.NotBlank) {
      restrictor.restrict(selectQueryBuilder, PolicyContactRole#LastNameKanjiInternal, value)
    }
  }

}