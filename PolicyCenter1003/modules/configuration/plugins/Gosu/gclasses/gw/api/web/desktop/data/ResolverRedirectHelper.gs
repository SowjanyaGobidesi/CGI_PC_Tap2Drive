package gw.api.web.desktop.data

uses gw.api.locale.DisplayKey
uses gw.api.system.PCConfigParameters
uses gw.api.system.PCLoggerCategory
uses gw.plugin.Plugins
uses gw.plugin.multicluster.resolver.IResolverServicePlugin
uses org.apache.commons.lang3.StringUtils
uses pcf.Desktop
uses pcf.DesktopAccounts
uses pcf.DesktopActivities
uses pcf.DesktopSubmissions
uses pcf.MulticlusterAccount
uses pcf.MulticlusterActivity
uses pcf.MulticlusterContact
uses pcf.MulticlusterJob
uses pcf.MulticlusterNewAccount
uses pcf.MulticlusterNewSubmission
uses pcf.MulticlusterPolicy
uses pcf.PolicySearch

@Export
class ResolverRedirectHelper {

  static var LOGGER = PCLoggerCategory.RESOLVER_PLUGIN

  private static property get ClusterForNewAccount() : String {
    try {
      var clusterIdForAccount = Plugins.get(IResolverServicePlugin).getClusterIdForNewAccount()
      return getClusterUrl(clusterIdForAccount)
    } catch (ex : Exception) {
      LOGGER.error(DisplayKey.get("Web.ResolverService.Errors.UnknownClusterUrl"), ex)
    }
    return null
  }

  static function getClusterUrlForAccount(accountPublicId : String) : String {
    try {
      var clusterIdForAccount = Plugins.get(IResolverServicePlugin).getClusterForAccount(accountPublicId)
      return getClusterUrl(clusterIdForAccount)
    } catch (ex : Exception) {
      LOGGER.error(DisplayKey.get("Web.ResolverService.Errors.UnknownClusterUrl"), ex)
    }
    return null
  }

  static function getClusterUrlForPolicy(policyPublicId : String) : String {
    try {
      var cluster = Plugins.get(IResolverServicePlugin).getClusterForPolicy(policyPublicId)
      var clusterUrl = getClusterUrl(cluster)
      return clusterUrl
    } catch (ex : Exception) {
      LOGGER.error(DisplayKey.get("Web.ResolverService.Errors.UnknownClusterUrl"), ex)
    }
    return null
  }

  static function nextAccountForward() {
    var clusterUrl = ClusterForNewAccount
    if (clusterUrl != null) {
      MulticlusterNewAccount.push(clusterUrl)
    } else {
      DesktopAccounts.push();
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.ResolverService.Errors.UnknownClusterUrl"))
    }
  }

  static function nextSubmissionForward() {
    var clusterUrl = ClusterForNewAccount
    if (clusterUrl != null) {
      MulticlusterNewSubmission.push(clusterUrl)
    } else {
      DesktopSubmissions.push();
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.ResolverService.Errors.UnknownClusterUrl"))
    }
  }

  static function getClusterUrl(clusterId : String) : String {
    if (PCConfigParameters.ClusterUrlTemplate.Value.Empty) {
      LOGGER.error("Could not resolve shard url as parameter ${PCConfigParameters.ClusterUrlTemplate.Name} is not configured.")
      return null
    }

    var clusterUrl = StringUtils.replace(PCConfigParameters.ClusterUrlTemplate.Value, "CLUSTER-ID", clusterId)
    return clusterUrl
  }

  static function accountForward(accountPublicId : String, accountNumber : String) {
    var clusterUrl = gw.api.web.desktop.data.ResolverRedirectHelper.getClusterUrlForAccount(accountPublicId)
    if (clusterUrl != null) {
      MulticlusterAccount.push(clusterUrl, accountNumber)
    } else {
      DesktopAccounts.push();
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.ResolverService.Errors.UnknownClusterUrl"))
    }
  }

  static function policyForward(policyPublicId : String, policyNumber : String) {
    var clusterUrl = gw.api.web.desktop.data.ResolverRedirectHelper.getClusterUrlForPolicy(policyPublicId)
    if (clusterUrl != null) {
      MulticlusterPolicy.push(clusterUrl, policyNumber)
    } else {
      PolicySearch.push();
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.ResolverService.Errors.UnknownClusterUrl"))
    }
  }

  static function jobForward(accountPublicId : String, jobNumber : String) {
    var clusterUrl = getClusterUrlForAccount(accountPublicId)
    if (clusterUrl != null) {
      MulticlusterJob.push(clusterUrl, jobNumber)
    } else {
      Desktop.push();
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.ResolverService.Errors.UnknownClusterUrl"))
    }
  }

  static function activityForward(accountPublicId : String, activityId : String) {
    var clusterUrl = getClusterUrlForAccount(accountPublicId)
    if (clusterUrl != null) {
      MulticlusterActivity.push(clusterUrl, activityId)
    } else {
      DesktopActivities.push();
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.ResolverService.Errors.UnknownClusterUrl"))
    }
  }

  static function contactForward(accountPublicId : String, contactPublicId : String) {
    var clusterUrl = gw.api.web.desktop.data.ResolverRedirectHelper.getClusterUrlForAccount(accountPublicId)
    contactForwardWithUrl(contactPublicId, clusterUrl);
  }

  static function contactClusterForward(contactPublicId : String, clusterId : String) {
    var clusterUrl = getClusterUrl(clusterId)
    contactForwardWithUrl(contactPublicId, clusterUrl);
  }

  private static function contactForwardWithUrl(contactPublicId : String, clusterUrl : String) {
    if (clusterUrl != null) {
      MulticlusterContact.push(clusterUrl, contactPublicId)
    } else {
      Desktop.push();
      throw new gw.api.util.DisplayableException(DisplayKey.get("Web.ResolverService.Errors.UnknownClusterUrl"))
    }
  }
}