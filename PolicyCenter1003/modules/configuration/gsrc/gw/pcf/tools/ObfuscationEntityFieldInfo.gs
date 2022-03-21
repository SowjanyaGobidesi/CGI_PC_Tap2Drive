package gw.pcf.tools

/**
 * Test only class for displaying entity info in test obfuscation page.
 *
 * Not meant to be in production.  If it does... Ding Ding SHAME!
 */
@Export
class ObfuscationEntityFieldInfo {
  var _fieldName : String as FieldName
  var _originalValue : Object as OriginalValue
  var _obfuscatedValue : Object as ObfuscatedValue
  var _obfuscatable : boolean as Obfuscatable
  var _personalData : boolean as IsPersonalData
}