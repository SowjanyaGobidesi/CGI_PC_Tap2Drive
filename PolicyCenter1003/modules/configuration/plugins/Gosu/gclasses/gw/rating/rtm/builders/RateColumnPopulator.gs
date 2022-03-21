package gw.rating.rtm.builders

uses java.lang.RuntimeException
uses gw.api.databuilder.populator.BeanPopulator

@Export
class RateColumnPopulator implements BeanPopulator<RateTableColumn> {

  var builder : RateTableDefinitionBuilder

  construct(b : RateTableDefinitionBuilder) {
    this.builder = b
  }

  override function execute(bean : RateTableColumn) {
    var value = builder.LastCreatedBean
    if (value == null) {
      throw new RuntimeException("failed to set the rating table reference on a column")
    }
    bean.DefinitionForParam = value
  }
}
