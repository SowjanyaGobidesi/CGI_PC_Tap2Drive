package jsonschema.taptodrive.pc.taptodrivepolicydriverrequest.v1_0;

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
@Generated(comments = "taptodrive.pc.taptodrivepolicydriverrequest-1.0#/definitions/Tap2DrivePolicyDriverRequest", value = "com.guidewire.pl.json.codegen.SchemaWrappersGenerator")
public class Tap2DrivePolicyDriverRequest extends JsonWrapper {

  private static final String FQN = "taptodrive.pc.taptodrivepolicydriverrequest-1.0#/definitions/Tap2DrivePolicyDriverRequest";

  public Tap2DrivePolicyDriverRequest() {
    super();
  }

  private Tap2DrivePolicyDriverRequest(JsonObject jsonObject) {
    super(jsonObject);
  }

  public static Tap2DrivePolicyDriverRequest wrap(JsonObject jsonObject) {
    return jsonObject == null ? null : new Tap2DrivePolicyDriverRequest(jsonObject);
  }

  public static String getFullyQualifiedName() {
    return FQN;
  }

  public static Tap2DrivePolicyDriverRequest parse(String json) {
    return json == null ? null : wrap(JsonParser.OBJECT.parse(json, FQN));
  }

  public static Tap2DrivePolicyDriverRequest parse(String json, JsonValidationResult jsonValidationResult, JsonDeserializationOptions jsonDeserializationOptions) {
    return json == null ? null : wrap(JsonParser.OBJECT.parse(json, FQN, jsonValidationResult, jsonDeserializationOptions));
  }

  public static List<Tap2DrivePolicyDriverRequest> parseArray(String json) {
    return json == null ? null : new JsonWrapperList<>(JsonParser.OBJECT.parseArray(json, FQN), Tap2DrivePolicyDriverRequest::wrap);
  }

  public static List<Tap2DrivePolicyDriverRequest> parseArray(String json, JsonValidationResult jsonValidationResult, JsonDeserializationOptions jsonDeserializationOptions) {
    return json == null ? null : new JsonWrapperList<>(JsonParser.OBJECT.parseArray(json, FQN, jsonValidationResult, jsonDeserializationOptions), Tap2DrivePolicyDriverRequest::wrap);
  }

  public String getdriverId() {
    return getTyped("driverId");
  }

  public void setdriverId(String value) {
    put("driverId", value);
  }

  public String getemailId() {
    return getTyped("emailId");
  }

  public void setemailId(String value) {
    put("emailId", value);
  }

  public String getfirstName() {
    return getTyped("firstName");
  }

  public void setfirstName(String value) {
    put("firstName", value);
  }

  public String getlastName() {
    return getTyped("lastName");
  }

  public void setlastName(String value) {
    put("lastName", value);
  }

  public String getphone() {
    return getTyped("phone");
  }

  public void setphone(String value) {
    put("phone", value);
  }

}
