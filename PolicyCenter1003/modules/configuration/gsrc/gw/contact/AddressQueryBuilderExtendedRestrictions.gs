package gw.contact

uses gw.api.database.ISelectQueryBuilder
uses gw.pl.persistence.core.Bean
uses gw.search.StringColumnRestrictor

/**
 * Additional restrictions for AddressQueryBuilder for columns added in pc-pl-content.
 */
@Export
class AddressQueryBuilderExtendedRestrictions {

  static function restrictAddressLine1KanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor : StringColumnRestrictor, value : String){
    if (value.NotBlank) {
      restrictor.restrict(selectQueryBuilder, Address#AddressLine1Kanji, value)
    }
  }

  static function restrictAddressLine2KanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor : StringColumnRestrictor, value : String) {
    if (value.NotBlank) {
      restrictor.restrict(selectQueryBuilder, Address#AddressLine2Kanji, value)
    }
  }

  static function restrictCityKanjiInternal(selectQueryBuilder: ISelectQueryBuilder<Bean>, restrictor : StringColumnRestrictor, value : String){
    if (value.NotBlank) {
      restrictor.restrict(selectQueryBuilder, Address#CityKanji, value)
    }
  }

}