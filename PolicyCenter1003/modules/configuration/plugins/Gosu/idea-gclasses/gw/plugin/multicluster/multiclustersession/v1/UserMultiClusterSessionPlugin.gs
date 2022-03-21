package gw.plugin.multicluster.multiclustersession.v1

uses com.google.common.base.Preconditions
uses com.google.common.cache.CacheBuilder
uses com.google.common.cache.CacheLoader
uses com.google.common.cache.LoadingCache
uses com.google.common.collect.ImmutableSet
uses gw.api.intentionallogging.IntentionalLogger
uses gw.api.system.PCLoggingMarker
uses gw.api.system.PLConfigParameters
uses gw.api.system.PLLoggerCategory
uses gw.api.web.desktop.data.ResolverRedirectHelper
uses gw.plugin.InitializablePlugin
uses gw.plugin.multicluster.AuthClientCredentialsEnabledClientBase
uses gw.plugin.multicluster.multiclustersession.RemoteUnsavedWork
uses gw.plugin.multicluster.multiclustersession.UnsavedWorkDTO
uses gw.plugin.multicluster.multiclustersession.UserMultiClusterSession
uses gw.plugin.web.multicluster.IMultiClusterSession
uses gw.plugin.web.multicluster.IMultiClusterSessionPlugin
uses gw.plugin.web.multicluster.IRemoteUnsavedWork
uses org.apache.commons.lang3.StringUtils
uses org.apache.http.client.utils.URIBuilder
uses pcf.MultiClusterNavigation

uses javax.servlet.http.HttpServletRequest
uses java.util.concurrent.TimeUnit

uses Preconditions#checkArgument
uses AuthClientCredentialsEnabledClientBase#*

@Export
class UserMultiClusterSessionPlugin implements IMultiClusterSessionPlugin, InitializablePlugin {

  static final var PARAM_CACHE_EXPIRATION_TIME = "CacheExpirationTime"

  var _serviceClient : UnsavedWorkServiceClient

  var _cache : LoadingCache<UserMultiClusterSession, Set<IRemoteUnsavedWork>>

  construct() {

  }

  internal construct(serviceClient : UnsavedWorkServiceClient) {
    _serviceClient = serviceClient
    _cache = buildCache(null)
  }

  override function getOrCreateSession(user : User, request : HttpServletRequest) : IMultiClusterSession {
    return new UserMultiClusterSession(user.PublicID)
  }

  override function closeLocalSession(session : IMultiClusterSession) {
    var userSession = castSession(session)
    _serviceClient.delete(userSession.UserPublicId, PLConfigParameters.ShardId.Value)
    _cache.invalidate(userSession)
  }

  override function addLocalUnsavedWork(session : IMultiClusterSession, key : String, title : String, timeStamp : long, groupKey : String, groupTitle : String) {
    var userSession = castSession(session)
    var unsavedWork = new UnsavedWorkDTO(PLConfigParameters.ShardId.Value, key, title, timeStamp, groupKey, groupTitle)
    _serviceClient.save(userSession.UserPublicId, unsavedWork.writeAsJSONString())
  }

  override function removeLocalUnsavedWork(session : IMultiClusterSession, key : String) {
    var userSession = castSession(session)
    _serviceClient.delete(userSession.UserPublicId, PLConfigParameters.ShardId.Value, key)
  }

  override function getRemoteUnsavedWork(session : IMultiClusterSession) : Set<IRemoteUnsavedWork> {
    var userSession = castSession(session)
    return _cache.get(userSession)
  }

  override function goToRemoteWork(session : IMultiClusterSession, remoteWork : IRemoteUnsavedWork, goToGroup : boolean) {
    var remoteUnsavedWork = castWork(remoteWork)

    redirect(createRedirectUrl(remoteUnsavedWork.ClusterId, remoteUnsavedWork.GlobalKey, goToGroup))
  }

  override function getRemoteKeepAliveUrls(session : IMultiClusterSession) : Set<String> {
    var userSession = castSession(session)
    var unsavedWorks = _cache.getIfPresent(userSession)
    if (unsavedWorks == null) {
      unsavedWorks = loadRemoteUnsavedWork(userSession)
    }
    return ImmutableSet.copyOf(
        unsavedWorks.map(\unsavedWork -> (unsavedWork as RemoteUnsavedWork).ClusterId)
          .toSet()
          .map(\clusterId -> createKeepAliveUrl(clusterId)))
  }

  override function leaveCluster(session : IMultiClusterSession, url : String) {
    var userSession = castSession(session)
    _cache.invalidate(userSession)
  }

  override property set Parameters(params : Map) {
    _serviceClient = new UnsavedWorkServiceClient(
        params.get(PARAM_HOST) as String,
        params.get(PARAM_CLIENT_ID) as String,
        params.get(PARAM_CLIENT_SECRET) as String,
        params.get(PARAM_SCOPE) as String,
        params.get(PARAM_TOKEN_URI) as String)
    _cache = buildCache(params.get(PARAM_CACHE_EXPIRATION_TIME) as String)
  }

  internal function redirect(url : String) {
    MultiClusterNavigation.push(url)
  }

  private function buildCache(cacheExpirationTimeParam : String) : LoadingCache<UserMultiClusterSession, Set<IRemoteUnsavedWork>> {
    var builder = CacheBuilder.newBuilder()
    if (StringUtils.isNumeric(cacheExpirationTimeParam)) {
      var cacheExpirationTime = Integer.valueOf(cacheExpirationTimeParam)
      if (cacheExpirationTime >= 1) {
        builder.expireAfterWrite(cacheExpirationTime, TimeUnit.MINUTES)
      }
    }
    return builder.build(createCacheLoader())
  }

  private function loadRemoteUnsavedWork(session : UserMultiClusterSession) : Set<IRemoteUnsavedWork> {
    var response = _serviceClient.get(session.UserPublicId)
    if (!response.isResponseStatus2xxOr3xx() || response.Entity == null) {
      return ImmutableSet.of()
    }
    var unsavedWorks = UnsavedWorkDTO.fromCollection(response.Entity)
    return ImmutableSet.copyOf(
        unsavedWorks.where(\unsavedWork -> unsavedWork.ClusterId != PLConfigParameters.ShardId.Value)
          .map(\unsavedWork -> RemoteUnsavedWork.from(unsavedWork)))
  }

  private function createCacheLoader() : CacheLoader<UserMultiClusterSession, Set<IRemoteUnsavedWork>> {
    return new CacheLoader<UserMultiClusterSession, Set<IRemoteUnsavedWork>>() {
      override function load(session : UserMultiClusterSession) : Set<IRemoteUnsavedWork> {
        return loadRemoteUnsavedWork(session)
      }
    }
  }

  private function castSession(session : IMultiClusterSession) : UserMultiClusterSession {
    checkArgument(session typeis UserMultiClusterSession, "Unsupported IMultiClusterSession implementation: ${session.Class.Name}")
    return session as UserMultiClusterSession
  }

  private function castWork(remoteUnsavedWork : IRemoteUnsavedWork) : RemoteUnsavedWork {
    checkArgument(remoteUnsavedWork typeis RemoteUnsavedWork, "Unsupported IRemoteUnsavedWork implementation: ${remoteUnsavedWork.Class.Name}")
    return remoteUnsavedWork as RemoteUnsavedWork
  }

  private function createRedirectUrl(clusterId : String, key : String, goToGroup : boolean) : String {
    var shardUrl = ResolverRedirectHelper.getClusterUrl(clusterId)
    var builder = new URIBuilder(shardUrl);
    return builder.setPath("${builder.Path}/MultiClusterEntry.do")
        .addParameter("locationKey", key)
        .addParameter("goToGroup", Boolean.toString(goToGroup))
        .build()
        .normalize()
        .toASCIIString()
  }

  private function createKeepAliveUrl(clusterId : String) : String {
    var shardUrl = ResolverRedirectHelper.getClusterUrl(clusterId)
    var builder = new URIBuilder(shardUrl);
    return builder.setPath("${builder.Path}/KeepAlive.do")
        .build()
        .normalize()
        .toASCIIString()
  }
}