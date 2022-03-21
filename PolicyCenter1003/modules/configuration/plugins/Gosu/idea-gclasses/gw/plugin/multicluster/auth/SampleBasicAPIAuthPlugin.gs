package gw.plugin.multicluster.auth

uses gw.util.StreamUtil
uses org.apache.http.HttpHeaders

/**
 * This sample plugin implementation is included purely for instructional and testing purposes; it is
 * unsuitable for production use. It assumes a hardcoded login information for Sample Data users, e.g. aapplegate/gw.
 *
 * The production-ready implemenation should reflect the requirements derived
 * from the PC REST API authorization configuration.
 */
@Export
class SampleBasicAPIAuthPlugin implements PCAPIAuthPlugin {

  static final var PASS = "gw"
  public static final var BASIC : String = "Basic"

  override function addAuth(authenticationInfo : HttpAuthenticationInfo) {
    var currentUserName = User.util.CurrentUser.Credential.UserName
    var auth = "${currentUserName}:${PASS}"
    var encodedAuth = Base64.getEncoder().encode(StreamUtil.toBytes(auth))
    var authHeader = "${BASIC} ${StreamUtil.toString(encodedAuth)}"
    authenticationInfo.addHeader(HttpHeaders.AUTHORIZATION, authHeader)
  }
}