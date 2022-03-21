package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/infopages/OracleStatisticsPreferencesConfigPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OracleStatisticsPreferencesConfigPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (PreferencesHelper :  com.guidewire.pl.system.database.dbstatistics.oracle.OracleTableStatsPreferencesUIHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OracleStatisticsPreferencesConfigPopup, {PreferencesHelper}, 0)
  }
  
  static function push (PreferencesHelper :  com.guidewire.pl.system.database.dbstatistics.oracle.OracleTableStatsPreferencesUIHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OracleStatisticsPreferencesConfigPopup, {PreferencesHelper}, 0).push()
  }
  
  
}