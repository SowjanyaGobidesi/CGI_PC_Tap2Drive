package gw.webservice.pc.pc1000.policy

uses gw.api.locale.DisplayKey
uses gw.api.webservice.exception.BadIdentifierException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.SOAPException
uses gw.transaction.Transaction
uses gw.webservice.SOAPUtil
uses gw.xml.ws.annotation.WsiPermissions
uses gw.xml.ws.annotation.WsiWebService

/**
 * External API for performing various operations on PolicyPeriods within
 * PolicyCenter.
 *
 * @see PolicySearchAPI
 */
@WsiWebService( "http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/policy/PolicyPeriodAPI" )
@Export
class PolicyPeriodAPI {

  /**
   * Adds a note to a policy.
   * 
   * @param policyId ID of the policy which will receive the new note. Must not be null.
   * @param externalNote Note to add. Must not be null.
   * @return The public ID of the newly added note.
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier")
  @Param("policyId", "ID of the policy which will receive the new note. Must not be null.")
  @Param("externalNote", "Note to add. Must not be null.")
  @WsiPermissions({SystemPermissionType.TC_NOTECREATE})
  @Returns("The public ID of the newly added note.")
  function addNoteToPolicy(policyId : String, 
      externalNote : gw.webservice.pc.pc1000.gxmodel.notemodel.types.complex.Note) : String {
    SOAPUtil.require(policyId, "policyId")
    SOAPUtil.require(externalNote, "externalNote")
    var note : Note
    Transaction.runWithNewBundle(\ bundle -> {
      note = new Note(bundle)
      var policy = bundle.loadByPublicIdOrThrow(entity.Policy, policyId, "policy") as Policy
      note.Level = policy
      gw.webservice.pc.pc1000.gxmodel.SimpleValuePopulator.populate(externalNote, note)
    })
    return note.PublicID
  }

  /**
   * Adds a note to a policy period.
   *
   * @param policyPeriodId ID of the policy period which will receive the new note. Must not be null.
   * @param externalNote Note to add. Must not be null.
   * @return The public ID of the newly added note.
   */
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier, or if the policy period is archived")
  @Param("policyPeriodId", "ID of the policy period which will receive the new note. Must not be null.")
  @Param("externalNote", "Note to add. Must not be null.")
  @WsiPermissions({SystemPermissionType.TC_NOTECREATE})
  @Returns("The public ID of the newly added note.")
  function addNoteToPolicyPeriod(policyPeriodId : String, 
      externalNote : gw.webservice.pc.pc1000.gxmodel.notemodel.types.complex.Note) : String {
    SOAPUtil.require(policyPeriodId, "policyPeriodId")
    SOAPUtil.require(externalNote, "externalNote")
    var note : Note
    Transaction.runWithNewBundle(\ bundle -> {
      note = new Note(bundle)
      var policyPeriod = bundle.loadByPublicIdOrThrow(PolicyPeriod, policyPeriodId, "policyPeriod") as PolicyPeriod
      if (policyPeriod.Archived) {
        throw new BadIdentifierException(DisplayKey.get("PolicyPeriodAPI.AddNote.Error.PolicyPeriodArchived", policyPeriod))
      }
      
      note.Level = policyPeriod
      gw.webservice.pc.pc1000.gxmodel.SimpleValuePopulator.populate(externalNote, note)
    })
    return note.PublicID
  }

  /**
   * Adds a document to a policy period.
   *
   * @param policyPeriodId ID of the policy period which will receive the new document. Must not be null.
   * @param externalDocument Document to add. Must not be null.
   * @return The public ID of the newly added document.
   */   
  @Throws(SOAPException, "If communication errors occur")
  @Throws(RequiredFieldException, "If required field is missing")
  @Throws(BadIdentifierException, "If cannot find entity with given identifier, or if the policy period is archived")
  @Param("policyPeriodId", "ID of the policy period which will receive the new document. Must not be null.")
  @Param("externalDocument", "Document to add. Must not be null.")
  @WsiPermissions({SystemPermissionType.TC_DOCCREATE})
  @Returns("The public ID of the newly added document.")
  function addDocumentToPolicyPeriod(policyPeriodId : String, 
      externalDocument : gw.webservice.pc.pc1000.gxmodel.documentmodel.types.complex.Document) : String {
    SOAPUtil.require(policyPeriodId, "policyPeriodId")
    SOAPUtil.require(externalDocument, "externalDocument")
    var document : Document
    Transaction.runWithNewBundle(\ bundle -> {
      document = new Document(bundle)
      var policyPeriod = bundle.loadByPublicIdOrThrow(PolicyPeriod, policyPeriodId, "policyPeriod") as PolicyPeriod
      
      if (policyPeriod.Archived) {
        throw new BadIdentifierException(DisplayKey.get("PolicyPeriodAPI.AddDocument.Error.PolicyPeriodArchived", policyPeriod))
      }
      
      document.Level = policyPeriod
      gw.webservice.pc.pc1000.gxmodel.SimpleValuePopulator.populate(externalDocument, document)
    })
    return document.PublicID
  }
}