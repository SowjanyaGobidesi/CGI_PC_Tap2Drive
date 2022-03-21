package gw.api.databuilder.contact
uses gw.api.builder.PolicyContactRoleBuilder
uses gw.entity.IEntityType

@Export
abstract class WCLaborContactBuilder<T extends WCLaborContact, B extends WCLaborContactBuilder<T,B>> extends PolicyContactRoleBuilder<T, B> {

  construct(type : IEntityType) {
    super(type)
  }
  
  function withDetail(detail : WCLaborContactDetailBuilder) : B  {
    addArrayElement(WCLaborContact.Type.TypeInfo.getProperty("Details"), detail)
    return this as B
  }

}
