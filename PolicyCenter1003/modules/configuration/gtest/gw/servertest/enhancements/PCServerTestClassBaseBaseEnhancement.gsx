package gw.servertest.enhancements

uses gw.api.test.PCServerTestClassBase
uses gw.testharness.v3.PLAssertions
uses org.fest.assertions.*

uses java.math.BigDecimal

@Export
enhancement PCServerTestClassBaseBaseEnhancement : PCServerTestClassBase {

  function assertThat(actual : Boolean) : BooleanAssert {
    return PLAssertions.assertThat(actual)
  }

  function assertThat(actual : BigDecimal) : BigDecimalAssert {
    return PLAssertions.assertThat(actual)
  }

  function assertThat(actual : Object[]) : ObjectArrayAssert {
    return PLAssertions.assertThat(actual)
  }

}
