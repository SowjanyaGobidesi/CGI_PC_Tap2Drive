package gw.lob.im.sign
uses gw.api.copier.ReferenceDateInternalEffDatedCopyable

@Export
class IMSignEffDatedCopier extends ReferenceDateInternalEffDatedCopyable<IMSign> {

  construct(sign : IMSign) {
    super(sign)
  }


  override function copyBasicFieldsFromBean(sign : IMSign) {
    super.copyBasicFieldsFromBean(sign)
    var thisOne = this._bean
    
    thisOne.Description = sign.Description
    thisOne.Interior = sign.Interior
    thisOne.SignType = sign.SignType
  }

}