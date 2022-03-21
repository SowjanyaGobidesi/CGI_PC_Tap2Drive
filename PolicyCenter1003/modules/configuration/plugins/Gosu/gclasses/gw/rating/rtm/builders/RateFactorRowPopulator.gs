package gw.rating.rtm.builders

uses java.lang.RuntimeException
uses gw.api.databuilder.populator.BeanPopulator

@Export
class RateFactorRowPopulator implements BeanPopulator<DefaultRateFactorRow> {

  var builder : RateTableBuilder

  construct(b : RateTableBuilder) {
    this.builder = b
  }

  override function execute(bean : DefaultRateFactorRow) {
    var table = builder.LastCreatedBean
    if (table == null) {
      throw new RuntimeException("failed to set the rating table on a factor row because the table version is null")
    }
    bean.RateTable = table
  }
}
