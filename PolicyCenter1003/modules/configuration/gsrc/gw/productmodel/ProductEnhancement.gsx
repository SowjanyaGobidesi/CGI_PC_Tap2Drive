package gw.productmodel
uses gw.api.locale.DisplayKey
uses gw.api.database.Query
uses gw.product.ProductConfig
uses java.util.List

enhancement ProductEnhancement : gw.api.productmodel.Product {
  
  function isContactTypeSuitableForProductAccountType(contactType : Type<Contact>) : boolean {
    switch(this.ProductAccountType) {
      case TC_ANY     : return true
      case TC_COMPANY : return gw.api.util.TypeUtil.isNominallyOrStructurallyAssignable(Company.Type, contactType)
      case TC_PERSON  : return gw.api.util.TypeUtil.isNominallyOrStructurallyAssignable(Person.Type, contactType)
      default : throw DisplayKey.get("Web.Contact.Error.UnknownProductAccountType", this.ProductAccountType)
    }
  }

  /** 
   *  Returns all the FormPatterns associated with this product
   */
  property get FormPatterns() : List<FormPattern> {
    var q = Query.make(FormPattern)
    q.compare("PolicyLinePatternCode", Equals, null)
    q.subselect("ID", CompareIn, FormPatternProduct, "FormPattern").compare("ProductCode", Equals, this.PublicID)
    return q.select().toList()
  }
  
  /**
   * Returns the FormPattern with the specified code associated with this product, or
   * null if no such match is found
   */
  function getFormPattern(code : String) : FormPattern {
    var q = Query.make(FormPattern)
    q.compare("PolicyLinePatternCode", Equals, null)
    q.compare("Code", Equals, code)
    q.subselect("ID", CompareIn, FormPatternProduct, "FormPattern").compare("ProductCode", Equals, this.PublicID)
    return q.select().FirstResult
  }
  
  /**
   * Finds the DiffTree.xml for the product. Must create the DiffTree in 
   * pc\config\resources\diff and must be called &lt;Product.Abbreviation>DiffTree.xml 
   * where &lt;Product.Abbreviation> is the abbreviation for the product. 
   * @return Name of the file to use for the difference tree configuration, or <code>null</code> if none exists.
   */
  property get DiffTreeConfig() : String {
    return ProductConfig.getDiffTreeConfig(this)
  }

  /**
   * All products are capable of supporting a quick quote that minimally reduces the quote steps,
   * but not all products are configured to allow a truly "quick" quick quote that dramatically
   * reduces the number of wizard steps and level of data validation for obtaining a quote.
   */
  property get QuickerQuickQuoteAllowed() : boolean {
    return ProductConfig.getQuickerQuickQuoteAllowed(this)
  }

  /**
   * Determines if the product is a personal product (e.g. PersonalAuto).
   */
  property get Personal() : boolean {
    return this.ProductType == ProductType.TC_PERSONAL
  }

  /**
   * Determines if the product is a commercial product (e.g. CommercialAuto).
   */
  property get Commercial() : boolean {
    return this.ProductType == ProductType.TC_COMMERCIAL
  }

  /**
   * Returns the name of the icon that corresponds to this product.
   *
   * @return the predefined icon for products included in the base configuration.
   * For other products, return the product's abbreviation by convention.
   */
  property get Icon() : String {
    var icon = ProductModelIconMapper.getPredefinedIcon(this.CodeIdentifier)

    if (icon == null) {
      // No icon was defined for this product in the base configuration, so return its abbreviation by convention
      icon = this.Abbreviation
    }

    return icon
  }

}
