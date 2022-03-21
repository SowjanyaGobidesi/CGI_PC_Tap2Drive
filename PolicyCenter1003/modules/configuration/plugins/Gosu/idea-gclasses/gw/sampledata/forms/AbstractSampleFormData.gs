package gw.sampledata.forms
uses gw.api.database.Query
uses gw.sampledata.AbstractSampleDataCollection

@Export
abstract class AbstractSampleFormData extends AbstractSampleDataCollection {

  construct() {
  }

  protected function formPatternLoaded(code : String) : boolean {
    var q = Query.make(FormPattern)
    q.compare("Code", Equals, code)
    return q.select().Count > 0
  }

}
