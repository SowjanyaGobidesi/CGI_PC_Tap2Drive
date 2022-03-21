package gw.api.databuilder.wc

uses gw.api.locale.DisplayKey
uses gw.api.databuilder.DataBuilder
uses gw.entity.IEntityType
uses gw.api.databuilder.populator.BeanPopulator
uses java.lang.Integer
uses gw.entity.IEntityPropertyInfo
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.builder.BuilderPropertyPopulator
uses gw.api.util.JurisdictionMappingUtil
uses gw.api.database.Query

@Export
class WCCoveredEmployeeBuilderBase<T extends WCCoveredEmployeeBase, B extends WCCoveredEmployeeBuilderBase> extends DataBuilder<T, B> {
  var _validateClassCode = true
  var _classCodeCode: String

  construct(type: IEntityType) {
    super(type)

    withPayroll(100000)
    withAuditedAmount(130000)
    withClassCode("0005")  // exists in most WC Domains, but not all, so be careful

    addPopulator(Integer.MAX_VALUE, new BeanPopulator<T>() {
      public override function execute(exposure : T) {
        var period = exposure.WorkersCompLine.Branch
        if (exposure.Location == null) {
          exposure.Location = period.PrimaryLocation
        }

        if (exposure.ClassCode == null && _classCodeCode != null) {
          var classCodeQuery = Query.make(WCClassCode)
                  .compare("Code", Equals, _classCodeCode)
                  .compare("WCDomain", Equals, exposure.Location.State.Code)
          var classCode = classCodeQuery.select().FirstResult
          exposure.ClassCode = classCode
        }

        if (_validateClassCode && exposure.ClassCode != null) {
          var classCode = exposure.WorkersCompLine.doesClassCodeExist(
            exposure.ClassCode.Code, JurisdictionMappingUtil.getJurisdiction(exposure.Location), exposure.Location.State.Code, null, null)
        }
      }
    })
  }

  function validateClassCode(validate: boolean): B {
    _validateClassCode = validate
    return this as B
  }

  final function withPayroll(payroll : Integer) : B {
    set(WCCoveredEmployee.Type.TypeInfo.getProperty("BasisAmount"), payroll)
    return this as B
  }

  final function withAuditedAmount(auditedAmount : Integer) : B {
    set(WCCoveredEmployee.Type.TypeInfo.getProperty("AuditedAmount"), auditedAmount)
    return this as B
  }

  final function withLocation(locationBuilder : PolicyLocationBuilder) : B {
    var locationProp = WCCoveredEmployee.Type.TypeInfo.getProperty("Location") as IEntityPropertyInfo
    addPopulator(new BuilderPropertyPopulator<T>(locationProp, locationBuilder))
    return this as B
  }

  final function withClassCode(code : WCClassCode) : B {
    set(WCFedCoveredEmployee.Type.TypeInfo.getProperty("ClassCode"), code)
    return this as B
  }

  final function withClassCode(code : String) : B {
    _classCodeCode = code
    return this as B
  }

  final function withSpecialCoverage(specialCov : SpecialCov) : B {
    set(WCCoveredEmployee.Type.TypeInfo.getProperty("SpecialCov"), specialCov)
    return this as B
  }

}