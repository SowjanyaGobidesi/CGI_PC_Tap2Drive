package gw.api.assignment.multicluster

uses gw.api.web.desktop.data.ResolverRedirectHelper

@Export
class ClusterUrlActivityAPIClient {
  public static final var Instance : ActivityCommonAPIClient = new ActivityCommonAPIClient(\clusterId -> ResolverRedirectHelper.getClusterUrl(clusterId));

  private construct() {
  }
}