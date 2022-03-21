package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/scriptparameters/ScriptParameterDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ScriptParameterDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (ScriptParameterPack :  com.guidewire.pl.system.gosu.entity.ScriptParameterPack) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ScriptParameterDetail, {ScriptParameterPack}, 0)
  }
  
  static function drilldown (ScriptParameterPack :  com.guidewire.pl.system.gosu.entity.ScriptParameterPack) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ScriptParameterDetail, {ScriptParameterPack}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (ScriptParameterPack :  com.guidewire.pl.system.gosu.entity.ScriptParameterPack) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ScriptParameterDetail, {ScriptParameterPack}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (ScriptParameterPack :  com.guidewire.pl.system.gosu.entity.ScriptParameterPack) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ScriptParameterDetail, {ScriptParameterPack}, 0).goInMain()
  }
  
  static function printPage (ScriptParameterPack :  com.guidewire.pl.system.gosu.entity.ScriptParameterPack) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ScriptParameterDetail, {ScriptParameterPack}, 0).printPage()
  }
  
  static function push (ScriptParameterPack :  com.guidewire.pl.system.gosu.entity.ScriptParameterPack) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ScriptParameterDetail, {ScriptParameterPack}, 0).push()
  }
  
  
}