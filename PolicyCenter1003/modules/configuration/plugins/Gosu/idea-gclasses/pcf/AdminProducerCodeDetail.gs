package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/AdminProducerCodeDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdminProducerCodeDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (producerCode :  ProducerCode) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AdminProducerCodeDetail, {producerCode}, 0)
  }
  
  static function drilldown (producerCode :  ProducerCode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeDetail, {producerCode}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (producerCode :  ProducerCode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeDetail, {producerCode}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (producerCode :  ProducerCode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeDetail, {producerCode}, 0).goInMain()
  }
  
  static function printPage (producerCode :  ProducerCode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeDetail, {producerCode}, 0).printPage()
  }
  
  static function push (producerCode :  ProducerCode) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeDetail, {producerCode}, 0).push()
  }
  
  
}