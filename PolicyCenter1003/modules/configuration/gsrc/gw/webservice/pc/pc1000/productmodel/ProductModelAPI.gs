package gw.webservice.pc.pc1000.productmodel

uses gw.api.locale.DisplayKey
uses gw.api.productmodel.OfferingLookup
uses gw.api.productmodel.PolicyLinePatternLookup
uses gw.api.productmodel.ProductLookup
uses gw.api.system.PCDependenciesGateway
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.SOAPException
uses gw.api.webservice.exception.SOAPServerException
uses gw.api.webservice.exception.ServerStateException
uses gw.api.webservice.pc.productmodel.ProductModelAPIImpl
uses gw.webservice.SOAPUtil
uses gw.webservice.pc.pc1000.gxmodel.clausepatternmodel.types.complex.ClausePattern
uses gw.webservice.pc.pc1000.gxmodel.questionsetmodel.types.complex.QuestionSet
uses gw.xml.ws.annotation.WsiPermissions

/**
 * Provides service API methods for modifying the PolicyCenter product model.
 *
 * Modifying the Product Model definition has three major prerequisites:
 * <br/><br/>
 * 1. User must have permission - only an administrator may make modifications to the product model<br/>
 * 2. Server must not be in dev mode - the environment property gw.server.mode must be "dev"<br/>
 * 3. Server must be in maintenance mode - put the server in this mode before making any of the modification calls.
 * <br/><br/>
 */
@gw.xml.ws.annotation.WsiWebService( "http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/productmodel/ProductModelAPI" )
@gw.xml.ws.annotation.WsiExposeEnumAsString(gw.webservice.pc.pc1000.productmodel.ProductModelPatternType)
@Export
class ProductModelAPI {

  /**
   * Return the list of available questions for the given policy period.
   *
   * @param lookupRoot the information about the entity to look up availability on. Must not be null.
   * @param offeringCode the offeringCode. Must not be null.
   * @param lookupDate the date to look up. Must not be null.
   *
   * @return the list of available questions
   */
  @Throws(SOAPException, "If communication fails")
  @Throws(RequiredFieldException, "If any required field is null")
  @Throws(BadIdentifierException, "If cannot find an instance with specified id")
  @Param("lookupRoot", "the information about the entity to look up availability on")
  @Param("offeringCode", "the offeringCode")
  @Param("lookupDate", "the date to look up")
  @WsiPermissions({SystemPermissionType.TC_TOOLSPRODUCTMODELINFOVIEW})
  @Returns("the list of available questions")
  function getAvailableQuestions(lookupRoot : gw.webservice.pc.pc1000.productmodel.LookupRootImpl,
                                  offeringCode : String,
                                  lookupDate : Date) : List<QuestionSet>{
    SOAPUtil.require(lookupRoot, "lookupRoot")
    SOAPUtil.require(lookupRoot.ProductCode, "lookupRoot.ProductCode")
    SOAPUtil.require(lookupDate, "lookupDate")
    var product = ProductLookup.getByPublicID(lookupRoot.ProductCode)
    if(product == null){
      throw new BadIdentifierException(DisplayKey.get("ProductModelAPI.Error.ProductCodeNotFound", lookupRoot.ProductCode))
    }
    var coverableType = lookupRoot.lookupType()
    if(coverableType == null){
      throw new BadIdentifierException(DisplayKey.get("ProductModelAPI.Error.EntityNotFound", lookupRoot.LookupTypeName))
    }
    var offering = OfferingLookup.getByPublicID(offeringCode)
    var allQuestionSets = product.getQuestionSets(PolicyPeriod)
    var results = new ArrayList<QuestionSet>()
    for(questionSet in allQuestionSets){
      // filter out questionsets
      if(questionSet.maybeQuestionSetAvailable(lookupRoot, lookupDate, offering)){
        var questionSetModel = new gw.webservice.pc.pc1000.gxmodel.questionsetmodel.QuestionSet(questionSet)
        // filter out question
        questionSetModel.Questions.Entry.removeWhere(\ q ->
          not questionSet.getQuestionByPublicId(q.PublicID).maybeQuestionAvailable(lookupRoot, lookupDate)
        )
        results.add(questionSetModel.$TypeInstance)
      }
    }
    return results
  }

  /**
   * Return the list of available clause patterns for the given parameters.
   *
   * @param lookupRoot the information about the entity to look up availability on
   * @param offeringCode the offeringCode
   * @param lookupDate the date to look up
   *
   * @return the list of available clause patterns
   */
  @Throws(SOAPException, "If communication fails")
  @Throws(RequiredFieldException, "If any required field is null")
  @Throws(BadIdentifierException, "If cannot find an instance with specified id")
  @Param("lookupRoot", "the information about the entity to look up availability on")
  @Param("offeringCode", "the offeringCode")
  @Param("lookupDate", "the date to look up")
  @WsiPermissions({SystemPermissionType.TC_TOOLSPRODUCTMODELINFOVIEW})
  @Returns("the list of available clause patterns")
  function getAvailableClausePatterns(lookupRoot : gw.webservice.pc.pc1000.productmodel.LookupRootImpl,
                                      offeringCode : String,
                                      lookupDate : Date) : List<ClausePattern>{
    SOAPUtil.require(lookupRoot, "lookupRoot")
    SOAPUtil.require(lookupRoot.PolicyLinePatternCode, "lookupRoot.PolicyLinePatternCode")
    SOAPUtil.require(lookupDate, "lookupDate")
    var linePattern = PolicyLinePatternLookup.getByPublicID(lookupRoot.PolicyLinePatternCode)
    if(linePattern == null){
      throw new BadIdentifierException(DisplayKey.get("ProductModelAPI.Error.PolicyLinePatternNotFound", lookupRoot.PolicyLinePatternCode))
    }
    var coverableType = lookupRoot.lookupType()
    if(coverableType == null){
      throw new BadIdentifierException(DisplayKey.get("ProductModelAPI.Error.EntityNotFound", lookupRoot.LookupTypeName))
    }

    var allPatterns = PCDependenciesGateway.getProductModel().getClausePatternsForEntity(lookupRoot.LookupTypeName);
    var cpCtx = PCDependenciesGateway.getProductModel().getClauseAvailabilityContext(lookupRoot, linePattern, lookupDate)
    var offering = OfferingLookup.getByPublicID(offeringCode)
    var results = new ArrayList<ClausePattern>()
    for(pattern in allPatterns){
      var clauseAvailabilityInfo = pattern.getAvailabilityInfo(cpCtx,lookupRoot, linePattern, offering)
      if(clauseAvailabilityInfo.Available){
        var result = new gw.webservice.pc.pc1000.gxmodel.clausepatternmodel.ClausePattern(pattern).$TypeInstance
        var covTermCtx = PCDependenciesGateway.getProductModel().getCovTermAvailabilityContext(lookupRoot, linePattern, lookupDate)
        for(covTerm in pattern.CovTerms){
          var covTermAvailabilityInfo = covTerm.getAvailabilityInfo(covTermCtx, linePattern, offering)
          if(not covTermAvailabilityInfo.Available){
            result.CovTerms.Entry.removeWhere(\ c -> c.PublicID == covTerm.PublicID)
          }
        }
        results.add(result)
      }
    }
    return results

  }

  /**
   * Synchronizes the contents of the database's product model to the contents of the server's XML configuration.
   * This is important to call in order to relay implicit delete information to the database after a sync to
   * source control or hand-edits of the XML.
   */
  @Throws(ServerStateException, "If the server is not in maintenance mode or is not in dev mode.")
  @Throws(SOAPServerException, "If the user does not have permission to access this functionality or an error occurs while doing the synchronization.")
  @WsiPermissions({SystemPermissionType.TC_TOOLSPRODUCTMODELINFOVIEW})
  function synchronizeProductModel(){
    new ProductModelAPIImpl().synchronizeProductModel()
  }

  /**
   * Synchronizes the contents of the database's system tables to the contents of the server's XML configuration.
   * This is important to call in order to relay implicit delete information to the database after a sync to
   * source control or hand-edits of the XML.
   */
  @Throws(ServerStateException, "If the server is not in maintenance mode or is not in dev mode.")
  @Throws(SOAPServerException, "If the user does not have permission to access this functionality or an error occurs while doing the synchronization.")
  @WsiPermissions({SystemPermissionType.TC_TOOLSPRODUCTMODELINFOVIEW})
  function synchronizeSystemTables() {
    new ProductModelAPIImpl().synchronizeSystemTables()
  }

  /**
   * Returns the publicId associated with given codeIdentifier for a product model pattern type
   *
   * @param codeIdentifier the code identifier of the product model pattern. Must not be null.
   * @param productModelType the product model pattern type. Must not be null.
   */
  @Throws(SOAPException, "If communication fails")
  @Throws(RequiredFieldException, "If any required field is null")
  @Param("codeIdentifier", "the code identifier")
  @Param("productModelType", "the type of the product model pattern")
  @WsiPermissions({SystemPermissionType.TC_TOOLSPRODUCTMODELINFOVIEW})
  @Returns("the public id of the product model pattern or null if no match is found")
  function getPublicIdForCodeIdentifier(codeIdentifier: String, productModelType: gw.webservice.pc.pc1000.productmodel.ProductModelPatternType): String {
    SOAPUtil.require(codeIdentifier, "codeIdentifier")
    SOAPUtil.require(productModelType, "productModelType")
    var productModelClass = productModelType.ProductModelClass
    return PCDependenciesGateway.getProductModel().getPublicIdForCodeIdentifier(codeIdentifier, productModelClass);
  }
}