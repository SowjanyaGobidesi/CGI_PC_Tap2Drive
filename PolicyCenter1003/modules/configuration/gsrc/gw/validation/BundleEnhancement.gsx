package gw.validation

uses gw.api.locale.DisplayKey
uses gw.pl.persistence.core.Bundle
uses gw.entity.IEntityType
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.FieldConversionException
uses gw.api.database.PCBeanFinder

enhancement BundleEnhancement : Bundle {

  /**
   * Loads and returns an entity of type <code>type</code> whose PublicID is <code>publicID</code>.
   * Throws a {@link RequiredFieldException} if <code>publicID</code> is null, with a reference to
   * <code>fieldName</code> in the exception message. Throws a {@link FieldConversionException} if
   * no matching entity is found.
   */
  function loadByPublicIdOrThrow(type : IEntityType, publicID : String, fieldName : String) : KeyableBean {
    if (publicID == null) {
      throw new RequiredFieldException(DisplayKey.get("Bundle.RequiredFieldIsNull", fieldName))
    }
    var entity = this.add(PCBeanFinder.loadBeanByPublicID(publicID, type))
    if (entity == null) {
      throw new FieldConversionException(DisplayKey.get("Bundle.EntityNotFound", type, publicID))
    }
    return entity
  }
}
