package gw.coverage

/**
 * Defines the following properties for each {@link CoverageSymbolType}:
 * <ul>
 *   <li>A read-only property that retrieves the {@link CoverageSymbol} associated with the {@link CoverageSymbolType}.
 *   </li>
 *   <li>A read-write property that determines whether the associated {@link CoverageSymbolType} is selected.</li>
 *   <li>A read-only property that determines where the associated {@link CoverageSymbolType} is available.</li>
 * </ul>
 */
enhancement CoverageSymbolGroupTypeEnhancement : entity.CoverageSymbolGroup {

  property get ANY(): CoverageSymbol {
    return this.getCoverageSymbolByType(TC_ANY)
  }

  property get ANYSelected(): Boolean {
    return this.isCoverageSymbolTypeSelected(TC_ANY)
  }

  property set ANYSelected(value: Boolean) {
    this.setCoverageSymbolTypeSelected(TC_ANY, value)
  }

  property get ANYAvailable(): Boolean {
    return this.isCoverageSymbolTypeAvailable(TC_ANY)
  }

  property get OVO(): CoverageSymbol {
    return this.getCoverageSymbolByType(TC_OVO)
  }

  property get OVOSelected(): Boolean {
    return this.isCoverageSymbolTypeSelected(TC_OVO)
  }

  property set OVOSelected(value: Boolean) {
    this.setCoverageSymbolTypeSelected(TC_OVO, value)
  }

  property get OVOAvailable(): Boolean {
    return this.isCoverageSymbolTypeAvailable(TC_OVO)
  }

  property get OPV(): CoverageSymbol {
    return this.getCoverageSymbolByType(TC_OPV)
  }

  property get OPVSelected(): Boolean {
    return this.isCoverageSymbolTypeSelected(TC_OPV)
  }

  property set OPVSelected(value: Boolean) {
    this.setCoverageSymbolTypeSelected(TC_OPV, value)
  }

  property get OPVAvailable(): Boolean {
    return this.isCoverageSymbolTypeAvailable(TC_OPV)
  }

  property get OCV(): CoverageSymbol {
    return this.getCoverageSymbolByType(TC_OCV)
  }

  property get OCVSelected(): Boolean {
    return this.isCoverageSymbolTypeSelected(TC_OCV)
  }

  property set OCVSelected(value: Boolean) {
    this.setCoverageSymbolTypeSelected(TC_OCV, value)
  }

  property get OCVAvailable(): Boolean {
    return this.isCoverageSymbolTypeAvailable(TC_OCV)
  }

  property get SRC(): CoverageSymbol {
    return this.getCoverageSymbolByType(TC_SRC)
  }

  property get SRCSelected(): Boolean {
    return this.isCoverageSymbolTypeSelected(TC_SRC)
  }

  property set SRCSelected(value: Boolean) {
    this.setCoverageSymbolTypeSelected(TC_SRC, value)
  }

  property get SRCAvailable(): Boolean {
    return this.isCoverageSymbolTypeAvailable(TC_SRC)
  }

  property get DVO(): CoverageSymbol {
    return this.getCoverageSymbolByType(TC_DVO)
  }

  property get DVOSelected(): Boolean {
    return this.isCoverageSymbolTypeSelected(TC_DVO)
  }

  property set DVOSelected(value: Boolean) {
    this.setCoverageSymbolTypeSelected(TC_DVO, value)
  }

  property get DVOAvailable(): Boolean {
    return this.isCoverageSymbolTypeAvailable(TC_DVO)
  }

  property get HVO(): CoverageSymbol {
    return this.getCoverageSymbolByType(TC_HVO)
  }

  property get HVOSelected(): Boolean {
    return this.isCoverageSymbolTypeSelected(TC_HVO)
  }

  property set HVOSelected(value: Boolean) {
    this.setCoverageSymbolTypeSelected(TC_HVO, value)
  }

  property get HVOAvailable(): Boolean {
    return this.isCoverageSymbolTypeAvailable(TC_HVO)
  }

  property get NOV(): CoverageSymbol {
    return this.getCoverageSymbolByType(TC_NOV)
  }

  property get NOVSelected(): Boolean {
    return this.isCoverageSymbolTypeSelected(TC_NOV)
  }

  property set NOVSelected(value: Boolean) {
    this.setCoverageSymbolTypeSelected(TC_NOV, value)
  }

  property get NOVAvailable(): Boolean {
    return this.isCoverageSymbolTypeAvailable(TC_NOV)
  }

  property get CUS(): CoverageSymbol {
    return this.getCoverageSymbolByType(TC_CUS)
  }

  property get CUSSelected(): Boolean {
    return this.isCoverageSymbolTypeSelected(TC_CUS)
  }

  property set CUSSelected(value: Boolean) {
    this.setCoverageSymbolTypeSelected(TC_CUS, value)
  }

  property get CUSAvailable(): Boolean {
    return this.isCoverageSymbolTypeAvailable(TC_CUS)
  }
}
