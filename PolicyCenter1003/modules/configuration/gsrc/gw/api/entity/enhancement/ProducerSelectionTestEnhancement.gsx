package gw.api.entity.enhancement

uses gw.sampledata.tiny.TinySampleCommunityData

enhancement ProducerSelectionTestEnhancement: ProducerSelection {

  /**
   * Gets default organization name. Uses the one from TinySampleCommunityData if it has been loaded;
   * otherwise you need to configure this to return the desired value.
   *
   * @return default organization name
   */
  @SuppressWarnings("unused") // this is invoked reflectively from SubmissionBuilderBase
  static property get DefaultOrgName() : String {

    // This does a query. There won't be much performance implication, because SubmissionBuilderBase
    // caches the result. But if you know your default organization name with certainty you could
    // just return it here.
    var sampleData = new TinySampleCommunityData()
    if (sampleData.AlreadyLoaded) {
      return sampleData.DefaultOrganizationName
    }

    throw new UnsupportedOperationException("No default organization loaded")
  }
}
