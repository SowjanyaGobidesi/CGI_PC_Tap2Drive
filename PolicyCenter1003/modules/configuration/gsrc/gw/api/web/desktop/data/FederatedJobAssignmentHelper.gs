package gw.api.web.desktop.data

uses gw.api.assignment.multicluster.FederatedBatchAPIResponse.Response
uses gw.api.assignment.multicluster.JobAssignmentAPIClient
uses gw.api.locale.DisplayKey
uses gw.api.util.DisplayableException
uses gw.plugin.Plugins
uses gw.plugin.multicluster.federateddata.IFederatedDataPlugin
uses gw.plugin.multicluster.resolver.IResolverServicePlugin
uses typekey.UserRole

uses java.io.IOException
uses java.util.stream.Collectors
uses java.util.stream.Stream

uses Collectors#toList()
uses gw.api.assignment.multicluster.ClusterUrlJobAssignmentAPIClient

@Export
class FederatedJobAssignmentHelper {
  final var _jobAssignmentAPIClient : JobAssignmentAPIClient
  final var _federatedPlugin : IFederatedDataPlugin
  final var _resolverPlugin : IResolverServicePlugin

  construct(jobAssignmentAPIClient : JobAssignmentAPIClient, federatedPlugin : IFederatedDataPlugin, resolverPlugin : IResolverServicePlugin) {
    _jobAssignmentAPIClient = jobAssignmentAPIClient
    _federatedPlugin = federatedPlugin
    _resolverPlugin = resolverPlugin
  }

  static property get NewInstance() : FederatedJobAssignmentHelper {
    return new FederatedJobAssignmentHelper(ClusterUrlJobAssignmentAPIClient.Instance,
        Plugins.get(IFederatedDataPlugin), Plugins.get(IResolverServicePlugin))
  }

  function performAssignment(user : GroupUser, role : UserRole, jobs : JobDTO[]) {
    try {
      var errorMessages = findClustersForJobs(jobs)
          .map(\elt -> assignSingleJob(user, role, elt))
          .flatMap(\elt -> getErrorMessage(elt))
          .collect(toList<String>());
      if (!errorMessages.Empty) {
        errorMessages.add(DisplayKey.get("Java.Assignment.Popup.AssignmentFailed"))
        throw new DisplayableException(errorMessages.reverse().toTypedArray())
      }
    } catch (e : IOException) {
      throw new DisplayableException(DisplayKey.get("Multicluster.Job.Assignment.Fail"))
    }
  }

  private function assignSingleJob(user : GroupUser, role : UserRole, clusterAndJob : ClusterIdAndJob) : JobNumberAndResponse {
    return JobNumberAndResponse.of(clusterAndJob.Job.JobNumber,
        _jobAssignmentAPIClient.assignJob(clusterAndJob.ClusterId, user, role, clusterAndJob.Job.PublicId))
  }

  private function findClustersForJobs(jobs : JobDTO[]) : Stream<ClusterIdAndJob> {
    return jobs.fastList().stream()
        .map(\elt -> ClusterIdAndJob.of(_resolverPlugin.getClusterForPolicy(elt.PolicyPublicId), elt))
  }

  private function getErrorMessage(jobNumberAndResponse : JobNumberAndResponse) : Stream<String> {
    if (jobNumberAndResponse.Response.is4xx()) {
      return Stream.of(DisplayKey.get("Multicluster.Job.Assignment.NotFound", jobNumberAndResponse.JobNumber))
    } else if (jobNumberAndResponse.Response.is5xx()) {
      return Stream.of(DisplayKey.get("Multicluster.Job.Assignment.ServiceUnavailable", jobNumberAndResponse.JobNumber))
    } else {
      return Stream.empty()
    }
  }

  function getUsersForJobRole(jobs : JobDTO[], role : UserRole) : Map<String, String> {
    return _federatedPlugin.findUsersForJobRoles(jobs.toList().stream()
        .map(\elt -> elt.PublicId)
        .collect(toList<String>()), role)
  }

  static function getUserDisplayNameFromJobToUserMap(jobToUser : Map, job : JobDTO) : String {
    if(jobToUser.containsKey(job.PublicId)) {
      return gw.api.database.Query.make(User).compare(User#PublicID, Equals, jobToUser.get(job.PublicId)).select().AtMostOneRow.DisplayName
    }
    return ""
  }

  private static class JobNumberAndResponse {
    var _jobNumber : String as JobNumber
    var _response : Response as Response

    private construct(jobNumber : String, response : Response) {
      _jobNumber = jobNumber
      _response = response
    }

    static function of(jobNumber : String, response : Response) : JobNumberAndResponse {
      return new JobNumberAndResponse(jobNumber, response)
    }
  }

  private static class ClusterIdAndJob {
    var _clusterId : String as ClusterId
    var _job : JobDTO as Job

    private construct(clusterId : String, job : JobDTO) {
      _clusterId = clusterId
      _job = job
    }

    static function of(clusterId : String, job : JobDTO) : ClusterIdAndJob {
      return new ClusterIdAndJob(clusterId, job)
    }
  }
}