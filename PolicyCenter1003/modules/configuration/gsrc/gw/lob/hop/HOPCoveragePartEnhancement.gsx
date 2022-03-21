package gw.lob.hop

enhancement HOPCoveragePartEnhancement: HOPCoveragePart {

  function clearDwellingCovForm() {
    for (aDwelling in this.HOPDwellings) {
      aDwelling.CoverageForm = null
    }
  }
}
