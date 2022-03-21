package gw.lob.common

uses gw.api.policy.PolicyLineMethods

/**
 * A class for holding threshold constant values that represent the number of coverables on
 * the line to enable AsyncQuote/AsyncRate during a job process. These constants are used
 * in {@link gw.api.policy.PolicyLineMethods#shouldQuoteAsynchronously} and Customer can
 * choose to replace these constants to suit their needs either directly on the
 * {@link PolicyLineMethods#shouldQuoteAsynchronously()} or here. This class is solely
 * created to facilitate testing AsyncQuote/AsyncRate OOTB.
 */

@Export
class AsyncQuoteCoverableThresholdByLine {

  private construct() {}

  public static final var BAVehicleThreshold : int = 30
  public static final var CPBuildingThreshold : int = 30
  public static final var BOPBuildingThreshold : int = 30
  public static final var GLExposureThreshold : int = 30
  public static final var IMSignThreshold : int = 30
  public static final var WCExposureThreshold : int = 30

}