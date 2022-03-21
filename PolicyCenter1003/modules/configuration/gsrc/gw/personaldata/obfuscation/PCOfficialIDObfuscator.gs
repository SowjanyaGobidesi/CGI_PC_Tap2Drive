package gw.personaldata.obfuscation

uses gw.api.personaldata.obfuscation.PCPersonalDataObfuscator
uses gw.datatype.DataTypes
uses gw.entity.IEntityPropertyInfo
uses gw.util.StreamUtil
uses org.apache.commons.codec.digest.DigestUtils

@Export
class PCOfficialIDObfuscator extends OfficialIDObfuscator {
  construct(officialID : PCOfficialID) {
    super(officialID)
  }

  override public function getObfuscatedValueForPersonalDataField(personalDataField : IEntityPropertyInfo,
                                                                  tagValue : String) : Object {
    var bean = getOwner()

    if (personalDataField == PCOfficialID.PATTERNCODE_PROP.get()) {
      var dataType = DataTypes.get(personalDataField)
      var dataTypeLength = dataType.asConstrainedDataType().getLength(null, personalDataField)
      var obfuscateUnique = bean.IntrinsicType.DisplayName + PCPersonalDataObfuscator.SEPARATOR + (bean as KeyableBean).PublicID
      var value = DigestUtils.md5Hex(StreamUtil.toBytes(obfuscateUnique))

      if (dataTypeLength != null and value typeis String and value.length() > dataTypeLength) {
        value = value.substring(0, dataTypeLength)
      }

      return value
    }
    return super.getObfuscatedValueForPersonalDataField(personalDataField, tagValue)
  }
}