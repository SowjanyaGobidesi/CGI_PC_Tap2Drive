package gw.api.databuilder.gl
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.builder.SubmissionBuilderBase

@Export
class GLSubmissionBuilder extends SubmissionBuilderBase<GLSubmissionBuilder> {
  var lineBuilder = new GeneralLiabilityLineBuilder()

  construct() {
    withProduct("GeneralLiability")
    withPolicyLine(lineBuilder)
  }

  function withLocation(state: State): GLSubmissionBuilder {
    var policyLocBuilder = new PolicyLocationBuilder().withState( state )
    withPolicyLocation(policyLocBuilder)
    lineBuilder.withExposure( 
      new GLExposureBuilder()
        .withLocation( policyLocBuilder )
        .withClassCodeAndBasis( "0012", 5555 )
    )
    return this
  }

  function withPolicyBasis(gLCoverageFormType : GLCoverageFormType) : GLSubmissionBuilder {
    lineBuilder.withGLCoverageForm( gLCoverageFormType )
    return this
  }
}
