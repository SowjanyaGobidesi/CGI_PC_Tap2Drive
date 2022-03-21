package gw.lookup

uses com.google.common.collect.ImmutableMap
uses gw.lang.reflect.IType
uses gw.lang.reflect.TypeSystem
uses gw.pl.exception.GWRuntimeExceptionWithNoStacktrace

uses java.math.BigDecimal

/**
 * Enhancement for LookupTableColumn
 * <p/>
 * The parameter or for a matching operation used to query the associated lookup table,
 * or a factor which is the result of lookup.
 */
@Export
enhancement LookupTableColumnEnhancement: LookupTableColumn {

  property get IType() : IType {
    try {
      return TypeSystem.getByFullName(this.DataType)
    } catch (e : RuntimeException) {
      throw new IllegalArgumentException("The lookup column: " + this.ColumnName + " specifies the invalid IType full name: " + this.DataType, e)
    }
  }

}
