package gw.productmodel

uses com.google.common.collect.ImmutableMap

/**
 * This class maps Products and PolicyLinePatterns from the base configuration to their SVG icons. The class should only
 * be modified if the icons for the base products or lines need to be changed.
 * <p>
 * Icon naming conventions for Products and PolicyLinePatterns are described in the PolicyCenter documentation. If they
 * are followed, Product Designer users can create new lines and products without having to create or modify any
 * explicit icon mappings in PC.
 */
@Export
class ProductModelIconMapper {

  // The predefined icon names in the base product
  private static final var BUSINESSOWNER = "businessowner"
  private static final var COMMERCIAL_AUTO = "commercial_auto"
  private static final var COMMERCIAL_PROPERTY = "commercial_building"
  private static final var COMMERCIAL_PACKAGE = "commercial_package"
  private static final var GENERAL_LIABILITY = "general_liability"
  private static final var HOMEOWNERS = "homeowners"
  private static final var INLAND_MARINE = "inland_marine"
  private static final var PERSONAL_AUTO = "personal_auto"
  private static final var WORKERS_COMP = "workers_comp"

  private static final var _iconMap : Map<String, String> = new ImmutableMap.Builder<String, String>()
      /*
       * The mappings for PolicyLinePattern icons.
       * PolicyLinePattern#CodeIdentifier -> icon name
       */
      .put("BOPLine", BUSINESSOWNER)
      .put("BusinessAutoLine", COMMERCIAL_AUTO)
      .put("CPLine", COMMERCIAL_PROPERTY)
      .put("GLLine", GENERAL_LIABILITY)
      .put("HOPLine", HOMEOWNERS)
      .put("IMLine", INLAND_MARINE)
      .put("PersonalAutoLine", PERSONAL_AUTO)
      .put("WorkersCompLine", WORKERS_COMP)
      /*
       * The mappings for Product icons.
       * Product#CodeIdentifier -> icon name
       */
      .put("BusinessOwners", BUSINESSOWNER)
      .put("BusinessAuto", COMMERCIAL_AUTO)
      .put("CommercialPackage", COMMERCIAL_PACKAGE)
      .put("CommercialProperty", COMMERCIAL_PROPERTY)
      .put("GeneralLiability", GENERAL_LIABILITY)
      .put("HOPHomeowners", HOMEOWNERS)
      .put("InlandMarine", INLAND_MARINE)
      .put("PersonalAuto", PERSONAL_AUTO)
      .put("WorkersComp", WORKERS_COMP)
      .build()

  static function getPredefinedIcon(codeIdentifier : String) : String {
    return _iconMap[codeIdentifier]
  }

}