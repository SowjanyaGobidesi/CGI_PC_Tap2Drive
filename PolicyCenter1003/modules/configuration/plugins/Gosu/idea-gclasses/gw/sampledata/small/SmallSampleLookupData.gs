package gw.sampledata.small

uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.api.databuilder.lookup.LookupTableColumnBuilder
uses gw.api.databuilder.lookup.LookupTableDefinitionBuilder
uses gw.lang.reflect.IType
uses gw.sampledata.AbstractSampleDataCollection

@Export
class SmallSampleLookupData extends AbstractSampleDataCollection {

  public static var HIGHEXPOSUREVEHICLECODE :String = "High Exposure Vehicle Code"
  public static var UWINTERVENTIONCLASSIFICATIONCODE :String = "UW Intervention Classification Codes Table Code"
  public static var COASTALEXPOSURECOUNTYCODE :String = "Coastal Exposure Counties Code"
  public static var INELIGIBLEDOGBREEDCODE :String = "Ineligible Dog Breeds Code"
  public static var UNACCEPTABLEFIREPROTECTIONCODE :String = "Unacceptable Fire Protection Score Code"

  override property get CollectionName() : String {
    return "Small Lookup Table Definitions"
  }

  override property get AlreadyLoaded() : boolean {
    return isLookupTableDefinitionLoaded(HIGHEXPOSUREVEHICLECODE)
  }

  override function load() {
    new LookupTableDefinitionBuilder()
        .withTableDesc("List of high exposure vehicles by year model and make")
        .withTableName("High Exposure Vehicle")
        .withTableCode(HIGHEXPOSUREVEHICLECODE)
        .withEntityName("HighExposureVehicle")
        .withInput(getInput("VehicleMake", String, "pc:sample:1"))
        .withInput(getInput("VehicleModel", String, "pc:sample:2"))
        .withInput(getInput("Year", Integer, "pc:sample:3"))
        .isExistence(true)
        .withPublicId("pc:sample:1")
        .createAndCommit()

    new LookupTableDefinitionBuilder()
        .withTableDesc("UW Reference Due to Hazardous Classification Codes")
        .withTableName("UW Intervention Classification Codes")
        .withTableCode(UWINTERVENTIONCLASSIFICATIONCODE)
        .withEntityName("UWInterventionClassificationCode")
        .withInput(getInput("Code", String, "pc:sample:4"))
        .withInput(getInput("ClassIndicator", String, "pc:sample:5"))
        .isExistence(true)
        .withPublicId("pc:sample:2")
        .createAndCommit()

    new LookupTableDefinitionBuilder()
        .withTableDesc("Coastal exposure cities require approval")
        .withTableName("Coastal Exposure Counties")
        .withTableCode(COASTALEXPOSURECOUNTYCODE)
        .withEntityName("CoastalExposureCounty")
        .withInput(getInput("State", State, "pc:sample:6"))
        .withInput(getInput("County", String, "pc:sample:7"))
        .withOutput(getOutput("ExposureLevel", Integer, "ExposureLevel", "pc:sample:8"))
        .withPublicId("pc:sample:3")
        .createAndCommit()

    new LookupTableDefinitionBuilder()
        .withTableDesc("UW Reference Due to Dog Breeds")
        .withTableName("Ineligible Dog Breeds")
        .withTableCode(INELIGIBLEDOGBREEDCODE)
        .withEntityName("IneligibleDogBreed")
        .withInput(getInput("DogBreed", String, "pc:sample:9"))
        .isExistence(true)
        .withPublicId("pc:sample:4")
        .createAndCommit()

    new LookupTableDefinitionBuilder()
        .withTableDesc("UW Reference Due to Fire Protection Score")
        .withTableName("Unacceptable Fire Protection Score")
        .withTableCode(UNACCEPTABLEFIREPROTECTIONCODE)
        .withEntityName("UnacceptableFireProtectionScore")
        .withInput(getInput("Score", String, "pc:sample:10"))
        .withInput(getInput("LineOfBusiness", String, "pc:sample:11"))
        .isExistence(true)
        .withPublicId("pc:sample:5")
        .createAndCommit()
  }

  private function getOutput(factorName: String, type: IType, label: String, publicId : String) : LookupTableColumnBuilder<LookupTableOutputColumn>  {
    return new LookupTableColumnBuilder<LookupTableOutputColumn> ()
        .withColumnName(factorName)
        .withColumnLabel(label)
        .withDataType(type)
        .withPublicId(publicId)
  }

  private function getInput(columnName: String, paramType: IType, publicId : String) : LookupTableColumnBuilder<LookupTableInputColumn> {
    return new LookupTableColumnBuilder<LookupTableInputColumn>()
        .withColumnName(columnName)
        .withColumnLabel(columnName)
        .withDataType(paramType)
        .withPublicId(publicId)
  }

  private function isLookupTableDefinitionLoaded(tableCode : String) : boolean {
    return not (getLookupQueryResult(tableCode).Empty)
  }

  private function getLookupQueryResult(tableCode : String) : IQueryBeanResult<LookupTableDefinition> {
    return Query<LookupTableDefinition>.make(LookupTableDefinition).compare(LookupTableDefinition#TableCode, Equals, tableCode).select()
  }
}
