package gw.api.web.dashboard.ui.note

uses gw.api.database.IQueryBeanResult
uses gw.api.locale.DisplayKey
uses gw.api.util.LocaleUtil
uses gw.api.util.StringUtil
uses gw.api.web.dashboard.ui.DashboardParameters
uses gw.i18n.DateTimeFormat
uses gw.note.NoteDisplayData
uses gw.web.notes.NoteSearchUtil
uses org.apache.commons.lang3.StringUtils
uses pcf.AccountFile_Notes
uses pcf.NewAccountNoteWorksheet
uses pcf.NewContactRelatedNoteWorksheet
uses pcf.NewNoteWorksheet
uses pcf.NotesPopup
uses pcf.PolicyFile_Notes
uses typekey.*
uses typekey.AccountContactRole

@Export
class NoteHelper {
  final var _notes: Note[] as readonly RecentNotes
  final var _viewMoreVisible: boolean
  final var _viewMore: block()
  final var _goInNewNote: block()
  final var _relatedToMap: Map<Integer, NoteDisplayData> = new HashMap<Integer, NoteDisplayData>()
  final var _relatedToClass: Class
  var _canAddNewNote = true

  static function forAccount(account: Account): NoteHelper {
    return new NoteHelper(account, DashboardParameters.ListViewLimitShort)
  }

  static function forContact(contact: Contact): NoteHelper {
    return new NoteHelper(contact, DashboardParameters.ListViewLimitShort)
  }

  static function forPolicyPeriod(period: PolicyPeriod, asOfDate: Date): NoteHelper {
    return new NoteHelper(period, asOfDate, DashboardParameters.ListViewLimitShort)
  }

  construct(contact: Contact, limit: int) {
    var notes = contact
        .getAccountsByRoleType(AccountContactRole.TC_ACCOUNTHOLDER)
        .flatMap(\account -> retrieveNotes(account).toCollection()).sortByDescending(\note -> note.CreateTime)
    _viewMoreVisible = notes.Count > limit
    _viewMore = \-> NotesPopup.push(notes)
    _notes = notes.limit(limit)
    _goInNewNote = \-> NewContactRelatedNoteWorksheet.goInWorkspace(contact)
    _relatedToClass = contact.Class
  }

  construct(account: Account, limit: int) {
    var notes = retrieveNotes(account)
    _viewMoreVisible = notes.Count > limit
    _viewMore = \-> AccountFile_Notes.push(account)
    _notes = notes.limit(limit).toTypedArray()
    _goInNewNote = \-> NewAccountNoteWorksheet.goInWorkspace(account)
    _relatedToClass = account.Class
  }

  construct(period: PolicyPeriod, asOfDate: Date, limit: int) {
    var notes = retrieveNotes(period)
    _viewMoreVisible = notes.Count > limit
    _viewMore = \-> period.Archived ? NotesPopup.push(notes.toTypedArray()) : PolicyFile_Notes.push(period, asOfDate)
    _notes = notes.limit(limit).toTypedArray()
    _goInNewNote = \-> NewNoteWorksheet.goInWorkspace(period, asOfDate)
    _relatedToClass = period.Class
    _canAddNewNote = not period.Archived
  }

  private static function retrieveNotes(accout: Account): IQueryBeanResult<Note> {
    var searchCriteria = NoteSearchUtil.createSearchCriteria(accout)
    return NoteSearchUtil.performSearch(searchCriteria, null, null).orderByDescending(Note.CREATETIME_PROP.get()) as IQueryBeanResult<Note>
  }

  private static function retrieveNotes(period: PolicyPeriod): IQueryBeanResult<Note> {
    var searchCriteria = NoteSearchUtil.createSearchCriteria(period)
    return NoteSearchUtil.performSearch(searchCriteria, period, null).orderByDescending(Note.CREATETIME_PROP.get()) as IQueryBeanResult<Note>
  }

  function isNoteAvailable(i: int): boolean {
    return i < RecentNotes.length
  }

  function pushViewMore() {
    _viewMore()
  }

  function goInNewNote() {
    _goInNewNote()
  }

  function relatedTo(i: int): NoteDisplayData {
    var displayData = _relatedToMap.get(i)
    if (displayData == null) {
      displayData = Note.getLevelDisplayData(_notes[i].Level)
      _relatedToMap.put(i, displayData)
    }
    return displayData
  }

  function isRelatedToVisible(i: int): boolean {
    return isNoteAvailable(i) and not _relatedToClass.isInstance(relatedTo(i).Type)
  }

  property get ViewMoreVisible(): boolean {
    return _viewMoreVisible
  }

  function dateFormat(date: Date): String {
    return LocaleUtil.CurrentLocale.getOutputDateFormat(DateTimeFormat.MEDIUM, null).format(date)
  }

  function truncatedBody(i: int): String {
    return StringUtils.abbreviate(_notes[i].Body, DashboardParameters.NoteBodyMaxLength)
  }

  function truncatedRelatedTo(i: int): String {
    return StringUtils.abbreviate(relatedTo(i).TypeValue, DashboardParameters.NoteRelatedToMaxLength)
  }

  property get CanAddNewNote(): boolean {
    return _canAddNewNote
  }

  /**
   * Formats the date and time of the note with the specified index in the RecentNotes array for display.  Used in the
   * dashboard.
   * @param i the 0 based index within RecentNotes of the note for which to format the date.
   * @return the formatted date and time.
   */
  function dateAndTimeFormat(i: int): String {
    var note = RecentNotes[i]
    var date = DisplayKey.get('Web.Dashboard.Tile.Notes.Date', dateFormat(note.CreateTime))
    var time = StringUtil.formatTime(note.CreateTime, "short")
    //TODO: PC-36571 - Replace this hard coded concatenation of the date and time with a display.property value.
    return date + " " + time
  }
}
