package gw.forms

uses gw.api.productmodel.PolicyLinePattern
uses gw.admin.FormPatternValidation
uses java.util.List

/**
 * The base for a general-purpose inference class that is able to handle common
 * inference scenarios. Any subclass of {@link FormData} that does not implement
 * this interface is considered a "custom" form inference class.
 */
@Export
interface GenericFormInference extends GenericFormInferenceBase {

  /**
   * When a FormPattern's GenericInferenceClass has been changed, this is called
   * to clean up settings that are no longer used. For details, see
   * {@link gw.admin.FormPatternInferenceEnhancement#clearCustomInferenceFields}
   */
  function clearCustomFields(formPattern : FormPattern)

}
