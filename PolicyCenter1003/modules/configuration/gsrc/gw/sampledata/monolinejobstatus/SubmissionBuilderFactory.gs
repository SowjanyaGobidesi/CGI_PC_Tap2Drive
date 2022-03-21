package gw.sampledata.monolinejobstatus

uses gw.api.builder.SubmissionBuilderBase
uses gw.api.databuilder.ba.BASubmissionBuilder
uses gw.api.databuilder.bop.BOPSubmissionBuilder
uses gw.api.databuilder.cp.CPSubmissionBuilder
uses gw.api.databuilder.cpp.CPPSubmissionBuilder
uses gw.api.databuilder.gl.GLSubmissionBuilder
uses gw.api.databuilder.im.IMSubmissionBuilder
uses gw.api.databuilder.pa.PASubmissionBuilder
uses gw.api.databuilder.wc.WCSubmissionBuilder

@Export
class SubmissionBuilderFactory {

  public static var INSTANCE : SubmissionBuilderFactory = new SubmissionBuilderFactory()

  private construct() {}

  static function get(productType : Type) : SubmissionBuilderBase {
    switch(productType) {
      case productmodel.BusinessAuto : return new BASubmissionBuilder()
      case productmodel.BusinessOwners : return new BOPSubmissionBuilder()
      case productmodel.CommercialPackage : return new CPPSubmissionBuilder()
      case productmodel.CommercialProperty : return new CPSubmissionBuilder()
      case productmodel.GeneralLiability : return new GLSubmissionBuilder()
      case productmodel.InlandMarine : return new IMSubmissionBuilder().withSignPart(10000)
      case productmodel.PersonalAuto : return new PASubmissionBuilder()
      case productmodel.WorkersComp : return new WCSubmissionBuilder()
      default: throw new java.lang.IllegalArgumentException("Unsupported product type '${productType}'")
    }
  }

}
