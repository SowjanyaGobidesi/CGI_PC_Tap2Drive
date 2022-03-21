package gw.pcf.tools

uses com.guidewire.commons.entity.type2.IEntityPropInfoInternal
uses com.guidewire.commons.metadata.MetadataDependencies
uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.system.PCDependenciesGateway
uses gw.api.system.PLDependenciesGateway
uses gw.entity.ILinkPropertyInfo
uses gw.transaction.Transaction

/**
 * Helper class to tools/PCArchive.pcf page
 */
@Export
class PCArchiveHelper {
  var archiveSucceeded: boolean as LastArchiveSucceeded;
  construct() {
    archiveSucceeded = false;
  }

  function doArchiveJob(archiveJob: String, skipValidation: boolean) {
    archiveSucceeded = false
    if (archiveJob == null or archiveJob.equalsIgnoreCase("")) {
      throw new gw.api.util.DisplayableException (DisplayKey.get("Web.Archive.InternalTools.JobIdIsMandatory"))
    }
    var job = PCDependenciesGateway.getJobFinder().findJobByJobNumber(archiveJob)
    if (job == null) {
      throw new gw.api.util.DisplayableException (DisplayKey.get("Web.Archive.InternalTools.JobDoesNotExist", archiveJob))
    }
    var term = job.Periods[0].PolicyTerm
    validateNoWorkItems(term)
    if (skipValidation) {
      //For testing only - do not bypass validation in production
      var handler = PCDependenciesGateway.getArchiver().getArchiveHandler(null, null)
      handler.archiveTerm(term)
    } else {
      Transaction.runWithNewBundle(\bundle -> {
        PCDependenciesGateway.getArchiver().sendPolicyTermToArchive(bundle.add(term))
      })
    }
    term.refresh()
    archiveSucceeded = term.CheckArchived
  }

  function doArchivePolicyTerm(archivePolicy: String, archiveTerm: String, skipValidation: boolean) {
    archiveSucceeded = false
    if (archivePolicy == null or archivePolicy.equalsIgnoreCase("") or archiveTerm == null or archiveTerm.equalsIgnoreCase("")) {
      throw new gw.api.util.DisplayableException (DisplayKey.get("Web.Archive.InternalTools.PolicyAndTermNumberAreMandatory"))

    }
    var policy = PCDependenciesGateway.getPolicyFinder().findPolicyByPolicyNumber(archivePolicy)
    if (policy == null) {
      throw new gw.api.util.DisplayableException (DisplayKey.get("Web.Archive.InternalTools.PolicyDoesNotExist", archivePolicy))
    }
    var term = policy.Periods.firstWhere(\p -> p.TermNumber != null and (p.TermNumber.toString().equals(archiveTerm))).PolicyTerm
    validateNoWorkItems(term)
    if (skipValidation) {
      // for testing only - do not bypass validation in production
      var handler = PCDependenciesGateway.getArchiver().getArchiveHandler(null, null)
      handler.archiveTerm(term)
    } else {
      Transaction.runWithNewBundle(\bundle -> {
        PCDependenciesGateway.getArchiver().sendPolicyTermToArchive(bundle.add(term))
      })
    }
    term.refresh()
    archiveSucceeded = term.CheckArchived
  }

  function doFlushWorkQueues() {
    PLDependenciesGateway.getBatchProcessManager().startBatchProcess(BatchProcessType.TC_WORKFLOW, null)
    PLDependenciesGateway.getBatchProcessManager().startBatchProcess(BatchProcessType.TC_PURGEWORKFLOWS, null)
    PLDependenciesGateway.getBatchProcessManager().startBatchProcess(BatchProcessType.TC_PURGEWORKFLOWLOGS, null)
    PLDependenciesGateway.getBatchProcessManager().startBatchProcess(BatchProcessType.TC_PREMIUMCEDING, null)
  }

  function doArchiveByBatchProcess() {
    PLDependenciesGateway.getBatchProcessManager().startBatchProcess(BatchProcessType.TC_ARCHIVEPOLICYTERM, null)
  }

  function validateNoWorkItems(term: PolicyTerm) {
    term.Periods.each(\period -> {
      var allEntityTypes = MetadataDependencies.getIntrinsicTypeFactory().AllEntityTypes
      allEntityTypes.each(\entityType -> {
        if (gw.api.util.TypeUtil.isNominallyOrStructurallyAssignable(WorkItem.Type, entityType)) {
          entityType.TypeInfo.Properties.each(\propertyInfo -> {
            if (propertyInfo typeis IEntityPropInfoInternal) {
              if (propertyInfo typeis ILinkPropertyInfo && propertyInfo.ColumnInDb) {
                var otherType = propertyInfo.FeatureType
                if (gw.api.util.TypeUtil.isNominallyOrStructurallyAssignable(PolicyPeriod.Type, otherType)) {
                  var q = Query.make(entityType as Type<KeyableBean>)
                  q.compare(propertyInfo.Name, gw.api.database.Relop.Equals, period.ID)
                  var results = q.select()
                  if (!results.isEmpty()) {
                    throw new gw.api.util.DisplayableException (DisplayKey.get("Web.Archive.InternalTools.ClearWorkItems", entityType))
                  }
                }
              }
            }
          })
        }
      })
    })
  }
}