package gw.contact

uses gw.api.database.ISelectQueryBuilder
uses gw.pl.persistence.core.Bean
uses gw.search.StringColumnRestrictor

/**
 * Additional restrictions for ContactQueryBuilder for columns added in pc-pl-content.
 */
@Export
class ContactQueryBuilderExtendedRestrictions {

  static function restrictFirstNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor : StringColumnRestrictor, value : String){
    if (value.NotBlank) {
      selectQueryBuilder.cast(Person)
      restrictor.restrict(selectQueryBuilder, Person#FirstNameKanji, value)
    }
  }

  static function restrictLastNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor : StringColumnRestrictor, value : String) {
    if (value.NotBlank) {
      selectQueryBuilder.cast(Person)
      restrictor.restrict(selectQueryBuilder, Person#LastNameKanji, value)
    }
  }

  static function restrictNameKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor : StringColumnRestrictor, value : String){
    if (value.NotBlank) {
      selectQueryBuilder.cast(Company)
      restrictor.restrict(selectQueryBuilder, Company#NameKanji, value)
    }
  }

  static function restrictParticleInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor : StringColumnRestrictor, value : String){
    if (value.NotBlank) {
      selectQueryBuilder.cast(Person)
      restrictor.restrict(selectQueryBuilder, Person#Particle, value)
    }
  }

}