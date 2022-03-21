package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/ModifyUserProducerCodeRolesPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ModifyUserProducerCodeRolesPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (user :  User, prodCode :  ProducerCode) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ModifyUserProducerCodeRolesPopup, {user, prodCode}, 0)
  }
  
  static function createDestination (user :  User, prodCode :  ProducerCode, canEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ModifyUserProducerCodeRolesPopup, {user, prodCode, canEdit}, 1)
  }
  
  static function push (user :  User, prodCode :  ProducerCode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ModifyUserProducerCodeRolesPopup, {user, prodCode}, 0).push()
  }
  
  static function push (user :  User, prodCode :  ProducerCode, canEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ModifyUserProducerCodeRolesPopup, {user, prodCode, canEdit}, 1).push()
  }
  
  
}