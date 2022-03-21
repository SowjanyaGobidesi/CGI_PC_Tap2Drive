package gw.plugin.multicluster.federateddata

uses org.apache.http.client.utils.URIBuilder

@Export
public class FederatedDataCustomParams {
  private var parameters : Map<String, Object>

  private construct() {
    parameters = new HashMap()
  }

  public function addParamsToUri(uriBuilder : URIBuilder) : URIBuilder {
    for (var entry in parameters.entrySet()) {
      if (entry.Value typeis String) {
        uriBuilder.addParameter(entry.Key, entry.Value)
      } else if (entry.Value typeis Collection) {
        addMultipleParamsToUri(entry.Key, entry.Value, uriBuilder)
      }
    }
    return uriBuilder
  }

  private function addMultipleParamsToUri(key : String, params : Collection, uriBuilder : URIBuilder) {
    for (var param in params) {
      uriBuilder.addParameter(key, param.toString())
    }
  }

  override function equals(federatedDataCustomParams : Object) : boolean {
    if (federatedDataCustomParams typeis FederatedDataCustomParams) {
      return parameters == federatedDataCustomParams.parameters
    }
    return false
  }

  static function builder() : Builder {
    return new Builder()
  }

  public static class Builder {
    private var builderParameters : Map<String, Object> = new HashMap()

    public function withParam(key : String, value : Object) : Builder {
      if (key != null && value != null) {
        builderParameters.put(key, value.toString())
      }
      return this
    }

    public function withParams(key : String, value : Collection) : Builder {
      if (key != null && value != null && !value.isEmpty()) {
        builderParameters.put(key, value)
      }
      return this
    }

    public function build() : FederatedDataCustomParams {
      var params = new FederatedDataCustomParams()
      params.parameters.putAll(builderParameters)
      return params
    }
  }
}