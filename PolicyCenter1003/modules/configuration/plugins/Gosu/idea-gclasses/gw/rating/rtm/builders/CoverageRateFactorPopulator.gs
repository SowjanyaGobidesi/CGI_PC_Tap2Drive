package gw.rating.rtm.builders
uses gw.api.databuilder.populator.BeanPopulator
uses java.lang.RuntimeException

@Export
class CoverageRateFactorPopulator implements BeanPopulator<CoverageRateFactor> {

  var builder : RateTableBuilder

  construct(b : RateTableBuilder) {
    this.builder = b
  }

  override function execute(bean : CoverageRateFactor) {
    var table = builder.LastCreatedBean
    if (table == null) {
      throw new RuntimeException("failed to set the rating table on a factor row because the table is null")
    }
    bean.RateTable = table
  }
}
