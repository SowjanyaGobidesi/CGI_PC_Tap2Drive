package gw.job

uses gw.logging.TraceabilityUtils

@Export
public class JobProcessContextUpdater {

  private static final var _mdcUpdater = TraceabilityUtils.getMDCContextUpdater(Fields.values()*.ParameterName.toSet())

  enum Fields {
    JOB("job", \pp -> pp.Job.JobNumber),
    LOBS("lobs", \pp -> pp.Lines*.PatternCode.join(MULTIVALUE_DELIMITER)),
    PRODUCT("product", \pp -> pp.Policy.ProductCode),
    POLICYID("policyID", \pp -> pp.Policy.ID.toString()),
    POLICYPERIODID("policyPeriodID", \pp -> pp.ID.toString()),

    public static final var MULTIVALUE_DELIMITER : String = ","

    final var _parameterName : String as readonly ParameterName
    final var _parameterMapper(period : PolicyPeriod) : String as readonly Mapper

    private construct(parameterName : String, parameterMapper(period : PolicyPeriod) : String) {
      _parameterName = parameterName;
      _parameterMapper = parameterMapper
    }
  }

  public static function updateContext(branch : PolicyPeriod) {
    Fields.values().each(\field -> {_mdcUpdater.withMDCKeyValue(field.ParameterName, field.Mapper(branch))})
  }

  public static function clearContext() {
    _mdcUpdater.close()
  }

}