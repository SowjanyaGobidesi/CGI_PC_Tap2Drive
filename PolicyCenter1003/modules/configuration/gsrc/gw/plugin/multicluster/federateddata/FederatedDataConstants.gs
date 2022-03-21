package gw.plugin.multicluster.federateddata

uses java.text.SimpleDateFormat

@Export
class FederatedDataConstants {
  public static final var API_DATE_TIME_PATERN : String = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX"

  public static function getApiDateTime(date : Date) : String {
    return date != null ? new SimpleDateFormat(FederatedDataConstants.API_DATE_TIME_PATERN).format(date) : null
  }
}