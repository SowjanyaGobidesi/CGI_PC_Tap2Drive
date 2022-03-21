package gw.pcf

/**
 * Created by rvernick on 7/13/2015.
 */
enhancement ListOfGLCostEnhancement : List<GLCost> {

  property get SortedByLocationNumClassCode() : GLCovExposureCost[] {
    var ordered = this.whereTypeIs(GLCovExposureCost).toSet()
    return ordered
        .orderBy(\ g -> g.GLExposure.Location.LocationNum)
        .thenBy(\g -> g.GLExposure.ClassCode.Code)
        .thenBy(\g -> g.Subline)
        .thenBy(\g -> g.SplitType)
        .thenBy(\g -> g.GLExposure.EffectiveDate)
        .toTypedArray()
  }
}
