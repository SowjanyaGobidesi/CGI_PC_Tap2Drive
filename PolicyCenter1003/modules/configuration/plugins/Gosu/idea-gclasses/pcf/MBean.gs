package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/MBean.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MBean extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName}, 0)
  }
  
  static function createDestination (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String, Result :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName, Result}, 1)
  }
  
  static function drilldown (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName}, 0).drilldown()
  }
  
  static function drilldown (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String, Result :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName, Result}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String, Result :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName, Result}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String, Result :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName, Result}, 1).goInMain()
  }
  
  static function printPage (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName}, 0).printPage()
  }
  
  static function printPage (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String, Result :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName, Result}, 1).printPage()
  }
  
  static function push (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName}, 0).push()
  }
  
  static function push (BeanCategory :  String, GWMBeansData :  gw.api.tools.MBeansData, GWMBeanName :  String, Result :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MBean, {BeanCategory, GWMBeansData, GWMBeanName, Result}, 1).push()
  }
  
  
}