package jsonschema.taptodrive.pc.taptodriveenrollrequest.v1_0;

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
@Generated(comments = "taptodrive.pc.taptodriveenrollrequest-1.0#/definitions/Tap2DriveEnrollRequest", value = "com.guidewire.pl.json.codegen.SchemaWrappersGenerator")
public class Tap2DriveEnrollRequest extends JsonWrapper {

  private static final String FQN = "taptodrive.pc.taptodriveenrollrequest-1.0#/definitions/Tap2DriveEnrollRequest";

  public Tap2DriveEnrollRequest() {
    super();
  }

  private Tap2DriveEnrollRequest(JsonObject jsonObject) {
    super(jsonObject);
  }

  public static Tap2DriveEnrollRequest wrap(JsonObject jsonObject) {
    return jsonObject == null ? null : new Tap2DriveEnrollRequest(jsonObject);
  }

  public static String getFullyQualifiedName() {
    return FQN;
  }

  public static Tap2DriveEnrollRequest parse(String json) {
    return json == null ? null : wrap(JsonParser.OBJECT.parse(json, FQN));
  }

  public static Tap2DriveEnrollRequest parse(String json, JsonValidationResult jsonValidationResult, JsonDeserializationOptions jsonDeserializationOptions) {
    return json == null ? null : wrap(JsonParser.OBJECT.parse(json, FQN, jsonValidationResult, jsonDeserializationOptions));
  }

  public static List<Tap2DriveEnrollRequest> parseArray(String json) {
    return json == null ? null : new JsonWrapperList<>(JsonParser.OBJECT.parseArray(json, FQN), Tap2DriveEnrollRequest::wrap);
  }

  public static List<Tap2DriveEnrollRequest> parseArray(String json, JsonValidationResult jsonValidationResult, JsonDeserializationOptions jsonDeserializationOptions) {
    return json == null ? null : new JsonWrapperList<>(JsonParser.OBJECT.parseArray(json, FQN, jsonValidationResult, jsonDeserializationOptions), Tap2DriveEnrollRequest::wrap);
  }

  public String getdriverKey() {
    return getTyped("driverKey");
  }

  public void setdriverKey(String value) {
    put("driverKey", value);
  }

  public String getemail() {
    return getTyped("email");
  }

  public void setemail(String value) {
    put("email", value);
  }

  public String getpassword() {
    return getTyped("password");
  }

  public void setpassword(String value) {
    put("password", value);
  }

  public String getstatus() {
    return getTyped("status");
  }

  public void setstatus(String value) {
    put("status", value);
  }

}
