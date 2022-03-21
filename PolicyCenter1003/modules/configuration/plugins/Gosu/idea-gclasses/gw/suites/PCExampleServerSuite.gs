package gw.suites

uses gw.api.test.PCServerTestClassBase
uses gw.api.test.SuiteBuilder
uses junit.framework.Test

@Export
class PCExampleServerSuite {

  public static final var NAME : String = "PCExampleServerSuite"

  static function suite() : Test {
    return new SuiteBuilder(PCServerTestClassBase)
        .withSuiteName(NAME)
        .build()
  }

}
