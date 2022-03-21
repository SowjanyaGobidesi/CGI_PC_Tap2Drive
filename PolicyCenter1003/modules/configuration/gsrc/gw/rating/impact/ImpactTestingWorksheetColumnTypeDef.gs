package gw.rating.impact

uses gw.api.locale.DisplayKey

@Export
final class ImpactTestingWorksheetColumnTypeDef {

  public enum ImpactTestingWorksheetColumnType {
    AccountNumber,
    AccountName,
    AccountJurisdiction,
    Product,
    Offering,
    Issued,
    PolicyNumber,
    PolicyJurisdiction,
    PeriodStart,
    PeriodEnd,
    TermNumber,
    BaselineTotalCost,
    ComparisonTotalCost,
    ProducerCodeOfRecord,
    ProducerCodeOfService,
    UWCompany,
    CostDescription,
    CostType,
    ActiveRateBook,
    BaseTermAmount,
    BaseActualAmount,
    ComparisonRateBook,
    ComparisonTermAmount,
    ComparisonActualAmount,
    InvalidRate,
    Coverable;
  }

  /**
   * The display key needs to be evaluated every time it is needed, to get the text on the user's locale.
   * Hence, attaching the label to the enumerator itself is not an option.
   *
   * @param columnType The column of interest
   * @return The evaluated display key on the current user's locale
   */
  public static function getLabel(columnType: ImpactTestingWorksheetColumnType): String {
    switch (columnType) {
      case AccountNumber:
        return DisplayKey.get("Rating.Impact.AccountNumber")
      case AccountName:
        return DisplayKey.get("Rating.Impact.AccountName")
      case AccountJurisdiction:
        return DisplayKey.get("Rating.Impact.AccountJurisdiction")
      case Product:
        return DisplayKey.get("Rating.Impact.Product")
      case Offering:
        return DisplayKey.get("Rating.Impact.Offering")
      case Issued:
        return DisplayKey.get("Rating.Impact.Issued")
      case PolicyNumber:
        return DisplayKey.get("Rating.Impact.PolicyNumber")
      case PolicyJurisdiction:
        return DisplayKey.get("Rating.Impact.PolicyJurisdiction")
      case PeriodStart:
        return DisplayKey.get("Rating.Impact.PeriodStart")
      case PeriodEnd:
        return DisplayKey.get("Rating.Impact.PeriodEnd")
      case TermNumber:
        return DisplayKey.get("Rating.Impact.TermNumber")
      case BaselineTotalCost:
        return DisplayKey.get("Rating.Impact.BaselineTotalCost")
      case ComparisonTotalCost:
        return DisplayKey.get("Rating.Impact.ComparisonTotalCost")
      case ProducerCodeOfRecord:
        return DisplayKey.get("Rating.Impact.ProducerCodeOfRecord")
      case ProducerCodeOfService:
        return DisplayKey.get("Rating.Impact.ProducerCodeOfService")
      case UWCompany:
        return DisplayKey.get("Rating.Impact.UWCompany")
      case CostDescription:
        return DisplayKey.get("Rating.Impact.CostDescription")
      case CostType:
        return DisplayKey.get("Rating.Impact.CostType")
      case ActiveRateBook:
        return DisplayKey.get("Rating.Impact.ActiveRateBook")
      case BaseTermAmount:
        return DisplayKey.get("Rating.Impact.BaseTermAmount")
      case BaseActualAmount:
        return DisplayKey.get("Rating.Impact.BaseActualAmount")
      case ComparisonRateBook:
        return DisplayKey.get("Rating.Impact.ComparisonRateBook")
      case ComparisonTermAmount:
        return DisplayKey.get("Rating.Impact.ComparisonTermAmount")
      case ComparisonActualAmount:
        return DisplayKey.get("Rating.Impact.ComparisonActualAmount")
      case InvalidRate:
        return DisplayKey.get("Rating.Impact.InvalidRate")
      case Coverable:
        return DisplayKey.get("Rating.Impact.Coverable")
      default:
        throw new IllegalStateException(DisplayKey.get("Rating.Impact.Column.Unknown"))
    }
  }
}