package jsonschema.taptodrive.pc.taptodrivepolicyrequest.v1_0;

import com.guidewire.pl.json.runtime.JsonWrapperList;
import gw.api.json.JsonDeserializationOptions;
import gw.api.json.JsonObject;
import gw.api.json.JsonParser;
import gw.api.json.JsonValidationResult;
import gw.api.json.JsonWrapper;
import gw.lang.SimplePropertyProcessing;

import javax.annotation.Generated;
import java.util.List;

@SimplePropertyProcessing
@Generated(comments = "taptodrive.pc.taptodrivepolicyrequest-1.0#/definitions/Tap2DrivePolicyRequest", value = "com.guidewire.pl.json.codegen.SchemaWrappersGenerator")
public class Tap2DrivePolicyRequest extends JsonWrapper {

  private static final String FQN = "taptodrive.pc.taptodrivepolicyrequest-1.0#/definitions/Tap2DrivePolicyRequest";

  public Tap2DrivePolicyRequest() {
    super();
  }

  private Tap2DrivePolicyRequest(JsonObject jsonObject) {
    super(jsonObject);
  }

  public static Tap2DrivePolicyRequest wrap(JsonObject jsonObject) {
    return jsonObject == null ? null : new Tap2DrivePolicyRequest(jsonObject);
  }

  public static String getFullyQualifiedName() {
    return FQN;
  }

  public static Tap2DrivePolicyRequest parse(String json) {
    return json == null ? null : wrap(JsonParser.OBJECT.parse(json, FQN));
  }

  public static Tap2DrivePolicyRequest parse(String json, JsonValidationResult jsonValidationResult, JsonDeserializationOptions jsonDeserializationOptions) {
    return json == null ? null : wrap(JsonParser.OBJECT.parse(json, FQN, jsonValidationResult, jsonDeserializationOptions));
  }

  public static List<Tap2DrivePolicyRequest> parseArray(String json) {
    return json == null ? null : new JsonWrapperList<>(JsonParser.OBJECT.parseArray(json, FQN), Tap2DrivePolicyRequest::wrap);
  }

  public static List<Tap2DrivePolicyRequest> parseArray(String json, JsonValidationResult jsonValidationResult, JsonDeserializationOptions jsonDeserializationOptions) {
    return json == null ? null : new JsonWrapperList<>(JsonParser.OBJECT.parseArray(json, FQN, jsonValidationResult, jsonDeserializationOptions), Tap2DrivePolicyRequest::wrap);
  }

  public String getpolicyNumber() {
    return getTyped("policyNumber");
  }

  public void setpolicyNumber(String value) {
    put("policyNumber", value);
  }

}
