package gw.note

uses gw.api.database.IQueryBeanResult

/**
 * Defines the following properties and methods for each {@link NoteTopicType}:
 * <ul>
 *   <li>A read-only property that retrieves the {@link Note}s on this {@link Policy} that have the associated
 *   {@link NoteTopicType}.
 *   </li>
 *   <li>A method that creates a new {@link Note} on this {@link Policy} with the associated {@link NoteTopicType}.</li>
 * </ul>
 */
enhancement PolicyNoteEnhancement : entity.Policy {

  property get GeneralNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_GENERAL)
  }

  function newGeneralNote(): Note {
    return this.newNote(TC_GENERAL)
  }

  property get RiskNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_RISK)
  }

  function newRiskNote(): Note {
    return this.newNote(TC_RISK)
  }

  property get CoverageNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_COVERAGE)
  }

  function newCoverageNote(): Note {
    return this.newNote(TC_COVERAGE)
  }

  property get GapsNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_GAPS)
  }

  function newGapsNote(): Note {
    return this.newNote(TC_GAPS)
  }

  property get LosscontrolNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_LOSSCONTROL)
  }

  function newLosscontrolNote(): Note {
    return this.newNote(TC_LOSSCONTROL)
  }

  property get CreditworthyNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_CREDITWORTHY)
  }

  function newCreditworthyNote(): Note {
    return this.newNote(TC_CREDITWORTHY)
  }

  property get MeetingsagreementsNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_MEETINGSAGREEMENTS)
  }

  function newMeetingsagreementsNote(): Note {
    return this.newNote(TC_MEETINGSAGREEMENTS)
  }

  property get BusdevelopmentNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_BUSDEVELOPMENT)
  }

  function newBusdevelopmentNote(): Note {
    return this.newNote(TC_BUSDEVELOPMENT)
  }

  property get RelationmgtNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_RELATIONMGT)
  }

  function newRelationmgtNote(): Note {
    return this.newNote(TC_RELATIONMGT)
  }

  property get LegalNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_LEGAL)
  }

  function newLegalNote(): Note {
    return this.newNote(TC_LEGAL)
  }

  property get PrerenewalNotes(): IQueryBeanResult<Note> {
    return this.getNotes(TC_PRERENEWAL)
  }

  function newPrerenewalNote(): Note {
    return this.newNote(TC_PRERENEWAL)
  }

}
