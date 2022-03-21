package gw.personaldata.obfuscation

uses gw.api.personaldata.obfuscation.PCPersonalDataObfuscator
uses gw.entity.IEntityPropertyInfo

@Export
class OfficialIDObfuscator extends PCPersonalDataObfuscator {
  construct(officialID : OfficialID) {
    super(officialID)
  }

  override function beforeObfuscate() {
  }

  override public function getObfuscatedValueForPersonalDataField(personalDataField : IEntityPropertyInfo,
                                                                  tagValue : String) : Object {
    var bean = getOwner()
    if (personalDataField == OfficialID.OFFICIALIDTYPE_PROP.get()) {
      return (bean as OfficialID).OfficialIDType
    }
    return null
  }

}