package jsonschema.taptodrive.pc.taptodriveresponse.v1_0;

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
@Generated(comments = "taptodrive.pc.taptodriveresponse-1.0#/definitions/Tap2DriveResponse", value = "com.guidewire.pl.json.codegen.SchemaWrappersGenerator")
public class Tap2DriveResponse extends JsonWrapper {

  private static final String FQN = "taptodrive.pc.taptodriveresponse-1.0#/definitions/Tap2DriveResponse";

  public Tap2DriveResponse() {
    super();
  }

  private Tap2DriveResponse(JsonObject jsonObject) {
    super(jsonObject);
  }

  public static Tap2DriveResponse wrap(JsonObject jsonObject) {
    return jsonObject == null ? null : new Tap2DriveResponse(jsonObject);
  }

  public static String getFullyQualifiedName() {
    return FQN;
  }

  public static Tap2DriveResponse parse(String json) {
    return json == null ? null : wrap(JsonParser.OBJECT.parse(json, FQN));
  }

  public static Tap2DriveResponse parse(String json, JsonValidationResult jsonValidationResult, JsonDeserializationOptions jsonDeserializationOptions) {
    return json == null ? null : wrap(JsonParser.OBJECT.parse(json, FQN, jsonValidationResult, jsonDeserializationOptions));
  }

  public static List<Tap2DriveResponse> parseArray(String json) {
    return json == null ? null : new JsonWrapperList<>(JsonParser.OBJECT.parseArray(json, FQN), Tap2DriveResponse::wrap);
  }

  public static List<Tap2DriveResponse> parseArray(String json, JsonValidationResult jsonValidationResult, JsonDeserializationOptions jsonDeserializationOptions) {
    return json == null ? null : new JsonWrapperList<>(JsonParser.OBJECT.parseArray(json, FQN, jsonValidationResult, jsonDeserializationOptions), Tap2DriveResponse::wrap);
  }

  public String getfailureMessage() {
    return getTyped("failureMessage");
  }

  public void setfailureMessage(String value) {
    put("failureMessage", value);
  }

  public String getsuccessMessage() {
    return getTyped("successMessage");
  }

  public void setsuccessMessage(String value) {
    put("successMessage", value);
  }

}
