package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/email/EmailWorksheet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EmailWorksheet extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (srcBean :  KeyableBean, docContainer :  gw.api.domain.document.DocumentContainer, emailTemplateStr :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EmailWorksheet, {srcBean, docContainer, emailTemplateStr}, 0)
  }
  
  static function createDestination (docContainer :  gw.api.domain.document.DocumentContainer) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EmailWorksheet, {docContainer}, 1)
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (srcBean :  KeyableBean, docContainer :  gw.api.domain.document.DocumentContainer, emailTemplateStr :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EmailWorksheet, {srcBean, docContainer, emailTemplateStr}, 0).goInWorkspace()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (docContainer :  gw.api.domain.document.DocumentContainer) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EmailWorksheet, {docContainer}, 1).goInWorkspace()
  }
  
  static function push (srcBean :  KeyableBean, docContainer :  gw.api.domain.document.DocumentContainer, emailTemplateStr :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EmailWorksheet, {srcBean, docContainer, emailTemplateStr}, 0).push()
  }
  
  static function push (docContainer :  gw.api.domain.document.DocumentContainer) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EmailWorksheet, {docContainer}, 1).push()
  }
  
  
}