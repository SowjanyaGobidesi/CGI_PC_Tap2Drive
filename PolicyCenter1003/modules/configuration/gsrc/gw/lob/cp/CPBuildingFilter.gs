package gw.lob.cp

uses com.guidewire.pl.system.filters.BeanBasedQueryFilter

@Export
class CPBuildingFilter implements BeanBasedQueryFilter {

  var _location : CPLocation
  
  /**
   * Construct an instance of the filter for the given CPLocation.
   * 
   * @param location the CPLocation for which this filter is active
   */
  construct(location : CPLocation) {
    _location = location
  }
  
  /**
   * Apply the filter to the given object, which is assumed to be a CPBuilding.  Return true if the building's
   * location matches the filter's location.
   * 
   * @param obj the object whose PolicyPeriod is to be checked
   * @return whether the location matches
   */
  override function applyFilter(obj : Object) : boolean {
    var location = (obj as CPBuilding).CPLocation
    return (location.ID == _location.ID) 
  }
  
  /**
   * Return a string representation of this filter, which is just the display name for the
   * underlying location.
   */  
  override function toString() : String {
    return _location.DisplayName
  }
}
