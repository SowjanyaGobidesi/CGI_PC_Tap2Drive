package gw.webservice.pc.pc900.gxmodel
uses gw.xml.XmlTypeInstance
uses java.lang.UnsupportedOperationException
uses gw.xsd.w3c.xmlschema.types.complex.AnyType
uses gw.entity.IEntityPropertyInfo
uses gw.lang.reflect.IEnumType

/**
 * Moving PC specific code off of a generic GX Model enhancement into a utility class.  See XmlElementEnhancement.gs
 * for further history on this code.
 */
@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class SimpleValuePopulator {

  /**
   * Populate the target object with all the values from the source xml.
   * This method assumes that each simple property in the source xml
   * corresponds to a field on the target object.
   */
  static function populate(source : XmlTypeInstance, target : Object) {
    for (child in source.$Children) {
      if (child.$SimpleValue != null) { // ignore child if it is a complex property
        var fieldName = child.$QName.LocalPart
        var field = (typeof target).TypeInfo.getProperty(fieldName)
        if (target typeis gw.pl.persistence.core.Bean) {
          if (field.FeatureType typeis IEnumType and child.$SimpleValue.GosuValueType == String) {
            target.setFieldValue(fieldName, field.FeatureType.getEnumValue(child.$SimpleValue.GosuValue as String))
          } else if (field.FeatureType.Namespace == ("typekey") and child.$SimpleValue.GosuValueType == String) {
            var getMethod = gw.lang.reflect.ReflectUtil.findCallableMethod( "get", {String}, field.FeatureType )
            var convertedValue = getMethod.CallHandler.handleCall(field.FeatureType, {child.$SimpleValue.GosuValue})
            target.setFieldValue(fieldName, convertedValue)
          }
          else {
            target.setFieldValue(fieldName, child.$SimpleValue.GosuValue)
          }
        } else {
          if (field.Writable) {
            field.Accessor.setValue(target, child.$SimpleValue.GosuValue)
          }
        }
      }
    }
  }

}
