package gw.api.databuilder.gl
uses gw.api.databuilder.DataBuilder
uses java.lang.Integer
uses gw.api.databuilder.populator.BeanPopulator
uses gw.entity.IEntityPropertyInfo
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.builder.BuilderPropertyPopulator
uses gw.api.database.Query

@Export
class GLExposureBuilder extends DataBuilder<GLExposure, GLExposureBuilder>{
  construct() {
    super(GLExposure)
    addPopulator(Integer.MAX_VALUE, new BeanPopulator<GLExposure>() {
      override function execute(exposure : GLExposure) {
        if (exposure.Location == null) {
          // always edit exposure in window mode @jira CC-50396
          exposure.VersionList.AllVersions[0].LocationWM = 
            exposure.Branch.PolicyLocations.first().Unsliced
        }
      }
    })
  }

  final function withLocation(locationBuilder : PolicyLocationBuilder) : GLExposureBuilder {
    var locationProp = WCCoveredEmployee.Type.TypeInfo.getProperty("Location") as IEntityPropertyInfo
    addPopulator(new BuilderPropertyPopulator<GLExposure>(locationProp, locationBuilder))
    return this
  }

  static function getClassCode(code : String) : GLClassCode {
    var glassCodeQuery = Query.make(GLClassCode).compare(GLClassCode#Code, Equals, code)
    var glassCode = glassCodeQuery.select().getAtMostOneRow()
    return glassCode
  }
  
  function withClassCodeAndBasis(code : String, basis : Integer) : GLExposureBuilder {
    var actualClassCode = getClassCode(code)
    this.set(GLExposure.Type.TypeInfo.getProperty("ClassCodeInternal"), actualClassCode)
    var propertyName = actualClassCode.Basis.Auditable ? "ScalableBasisAmount" : "FixedBasisAmount"
    this.set(GLExposure.Type.TypeInfo.getProperty(propertyName), basis)
    return this
  }

  function withGLClassCodeAndBasis(code : GLClassCode, basis : Integer) : GLExposureBuilder {
   this.set(GLExposure.Type.TypeInfo.getProperty("ClassCodeInternal"), code)  
   var propertyName = code.Basis.Auditable ? "ScalableBasisAmount" : "FixedBasisAmount"
   this.set(GLExposure.Type.TypeInfo.getProperty(propertyName), basis)
   return this
  }
}
