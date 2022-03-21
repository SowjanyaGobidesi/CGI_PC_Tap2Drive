package gw.api.assignment.multicluster

uses gw.api.web.desktop.data.ResolverRedirectHelper

@Export
class ClusterUrlJobAssignmentAPIClient {
  public static final var Instance : JobAssignmentAPIClient = new JobAssignmentAPIClient(\clusterId -> ResolverRedirectHelper.getClusterUrl(clusterId));

  private construct() {
  }
}