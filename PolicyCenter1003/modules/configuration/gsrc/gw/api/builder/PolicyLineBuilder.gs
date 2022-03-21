package gw.api.builder

uses gw.api.databuilder.contact.PolicyAddlInsuredBuilder
uses gw.entity.IArrayPropertyInfo
uses gw.entity.IEntityType

@Export
class PolicyLineBuilder<T extends PolicyLine, B extends PolicyLineBuilder<T, B>> extends PolicyLineBuilderBase<T, B> {
  construct(IEntityType : IEntityType) {
    super(IEntityType)
  }

  construct(productModelType : Type<T>) {
    super(productModelType)
  }

  function withAdditionalInsured(addlInsuredBuilder : PolicyAddlInsuredBuilder) : B {
    addPopulator(new BuilderArrayPopulator<T>(PolicyLine.Type.TypeInfo.getProperty("AdditionalInsureds") as IArrayPropertyInfo, addlInsuredBuilder))
    return this as B
  }
}
