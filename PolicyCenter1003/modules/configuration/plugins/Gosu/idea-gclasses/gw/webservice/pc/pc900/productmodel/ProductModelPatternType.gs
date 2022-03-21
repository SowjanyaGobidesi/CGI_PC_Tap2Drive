package gw.webservice.pc.pc900.productmodel

uses gw.api.productmodel.AuditSchedulePattern
uses gw.api.productmodel.AvailableCoverageCurrency
uses gw.api.productmodel.AvailablePolicyTerm
uses gw.api.productmodel.ClausePattern
uses gw.api.productmodel.CovTermChoice
uses gw.api.productmodel.CovTermDefault
uses gw.api.productmodel.CovTermLimits
uses gw.api.productmodel.CovTermPattern
uses gw.api.productmodel.CoverageCategory
uses gw.api.productmodel.CoverageSymbolGroupPattern
uses gw.api.productmodel.CoverageSymbolPattern
uses gw.api.productmodel.DocTemplateRef
uses gw.api.productmodel.GrandfatherState
uses gw.api.productmodel.ModifierMinMaxLookup
uses gw.api.productmodel.ModifierPattern
uses gw.api.productmodel.Offering
uses gw.api.productmodel.OfferingSelection
uses gw.api.productmodel.OfficialIdPattern
uses gw.api.productmodel.PackageTerm
uses gw.api.productmodel.PolicyLinePattern
uses gw.api.productmodel.Product
uses gw.api.productmodel.ProductModelClass
uses gw.api.productmodel.ProductModifierPattern
uses gw.api.productmodel.ProductPolicyLinePattern
uses gw.api.productmodel.ProductQuestionSetPattern
uses gw.api.productmodel.ProductRateFactorPattern
uses gw.api.productmodel.Question
uses gw.api.productmodel.QuestionChoice
uses gw.api.productmodel.QuestionFilter
uses gw.api.productmodel.QuestionSet
uses gw.api.productmodel.RateFactorMinMaxLookup
uses gw.api.productmodel.RateFactorPattern
uses gw.api.productmodel.SupplementalText
uses gw.xml.ws.annotation.WsiExportable
uses gw.api.productmodel.ProductQuestionSetPattern
uses gw.api.productmodel.CoverageSymbolPattern
uses gw.api.productmodel.CovTermChoice
uses gw.api.productmodel.QuestionChoice
uses gw.api.productmodel.Question
uses gw.api.productmodel.AvailableCoverageCurrency
uses gw.api.productmodel.QuestionFilter
uses gw.api.productmodel.CovTermLimits
uses gw.api.productmodel.AvailablePolicyTerm
uses gw.api.productmodel.OfferingSelection
uses gw.api.productmodel.ProductPolicyLinePattern
uses gw.api.productmodel.OfferingQuestionFilter
uses gw.api.productmodel.PackageTerm
uses gw.api.productmodel.OfficialIdPattern
uses gw.api.productmodel.SupplementalText
uses gw.api.productmodel.CovTermOpt

@Export
@WsiExportable("http://guidewire.com/pc/ws/gw/webservice/pc/pc900/productmodel/ProductModelPatternType")
/**
 * Enum for product model pattern type where each enum constant is declared with value for product model pattern.
 */
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enum ProductModelPatternType {
  PRODUCT(Product),
  POLICYLINEPATTERN(PolicyLinePattern),
  CLAUSEPATTERN(ClausePattern),
  COVTERMPATTERN(CovTermPattern),
  AUDITSCHEDULEPATTERN(AuditSchedulePattern),
  QUESTIONSETPATTERN(QuestionSet),
  OFFERING(Offering),
  MODIFIERPATTERN(ModifierPattern),
  COVERAGESYMBOLGROUPPATTERN(CoverageSymbolGroupPattern),
  PRODUCTMODIFIER(ProductModifierPattern),
  COVERAGECATEGORY(CoverageCategory),
  RATEFACTORPATTERN(RateFactorPattern),
  PRODUCTRATEFACTORPATTERN(ProductRateFactorPattern),
  PRODUCTQUESTIONSETPATTERN(ProductQuestionSetPattern),
  COVERAGESYMBOLPATTERN(CoverageSymbolPattern),
  COVTERMCHOICE(CovTermChoice),
  QUESTIONCHOICE(QuestionChoice),
  QUESTION(Question),
  AVAILABLECOVERAGECURRENCY(AvailableCoverageCurrency),
  QUESTIONFILTER(QuestionFilter),
  COVTERMLIMITS(CovTermLimits),
  AVAILABLEPOLICYTERM(AvailablePolicyTerm),
  OFFERINGSELECTION(OfferingSelection),
  PRODUCTPOLICYLINEPATTERN(ProductPolicyLinePattern),
  PACKAGETERM(PackageTerm),
  OFFICIALIDPATTERN(OfficialIdPattern),
  SUPPLEMENTALTEXT(SupplementalText),
  COVTERMDEFAULT(CovTermDefault),
  DOCTEMPLATEREF(DocTemplateRef),
  MODIFIERMINMAXLOOKUP(ModifierMinMaxLookup),
  RATEFACTORMINMAXLOOKUP(RateFactorMinMaxLookup),
  GRANDFATHERSTATE(GrandfatherState)

  var _productModelClass: Type<ProductModelClass> as ProductModelClass

  private construct(productModelClass: Type<ProductModelClass>) {
    _productModelClass = productModelClass
  }
}