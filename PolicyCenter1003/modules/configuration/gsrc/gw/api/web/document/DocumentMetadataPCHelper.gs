package gw.api.web.document

uses gw.api.domain.linkedobject.LinkedObjectContainer
uses gw.document.DocumentDetailsApplicationHelper

uses java.util.Date

/**
 * DocumentMetadataPCHelper
 * A helper object used by PCFs to manipulate collections of Documents as a single group
 * Applications extend the PL base class DocumentDetailsApplicationHelper
 * Primary use is in Document Detail Views PCFs
 */
@Export
public class DocumentMetadataPCHelper extends DocumentDetailsApplicationHelper {
  private var _pcfMode : String
  private var _levels : LinkedObjectContainer[]
  private var _levelsVisible: boolean

  private var _documentNameEnabled : boolean
  private var _descriptionEnabled : boolean
  private var _mimeTypeEnabled : boolean
  private var _languageEnabled : boolean
  private var _levelEnabled : boolean
  private var _sectionEnabled : boolean
  private var _authorEnabled : boolean
  private var _recipientEnabled : boolean
  private var _statusEnabled : boolean
  private var _securityTypeEnabled : boolean
  private var _typeEnabled : boolean
  private var _obsoleteEnabled : boolean

  private var _savedLevels : LinkedObjectContainer[]

  public construct(pcfMode : String, documents : Document[], levels : LinkedObjectContainer[], levelsVisible : boolean) {
    super(documents)
    _pcfMode = pcfMode
    _levels = levels
    _levelsVisible = levelsVisible
  }

  public construct(documents : Document[], levels : LinkedObjectContainer[], levelsVisible : boolean) {
    this(null, documents, levels, levelsVisible)
  }

  public property get PCFMode() : String { return _pcfMode }

  override public property set AllFieldsEnabled(allFieldsEnabled : Boolean) {
    super.AllFieldsEnabled = allFieldsEnabled
    DocumentNameEnabled = allFieldsEnabled
    DescriptionEnabled = allFieldsEnabled
    MimeTypeEnabled = allFieldsEnabled
    LanguageEnabled = allFieldsEnabled
    LevelEnabled = allFieldsEnabled
    SectionEnabled = allFieldsEnabled
    AuthorEnabled = allFieldsEnabled
    RecipientEnabled = allFieldsEnabled
    StatusEnabled = allFieldsEnabled
    SecurityTypeEnabled = allFieldsEnabled
    TypeEnabled = allFieldsEnabled
    ObsoleteEnabled = allFieldsEnabled
  }

  public property get DocumentNameEnabled() : Boolean {
    return _documentNameEnabled
  }

  public property set DocumentNameEnabled(documentNameEnabled : Boolean) {
    if (_documentNameEnabled && !documentNameEnabled) {
      restoreFields(Document.NAME_PROP.get())
    }
    _documentNameEnabled = documentNameEnabled
  }

  public property get Name() : String {
    return getFields(Document.NAME_PROP.get()) as String
  }

  public property set Name(name : String) {
    setFields(Document.NAME_PROP.get(), name)
  }

  public property get DescriptionEnabled() : Boolean {
    return _descriptionEnabled
  }

  public property set DescriptionEnabled(descriptionEnabled : Boolean) {
    if (_descriptionEnabled && !descriptionEnabled) {
      restoreFields(Document.DESCRIPTION_PROP.get())
    }
    _descriptionEnabled = descriptionEnabled
  }

  public property get Description() : String {
    return getFields(Document.DESCRIPTION_PROP.get()) as String
  }

  public property set Description(description : String) {
    setFields(Document.DESCRIPTION_PROP.get(), description)
  }

  public property get MimeTypeEnabled() : Boolean {
    return _mimeTypeEnabled
  }

  public property set MimeTypeEnabled(mimeTypeEnabled : Boolean) {
    if (_mimeTypeEnabled && !mimeTypeEnabled) {
      restoreFields(Document.MIMETYPE_PROP.get())
    }
    _mimeTypeEnabled = mimeTypeEnabled
  }

  public property get MimeType() : String {
    return getFields(Document.MIMETYPE_PROP.get()) as String
  }

  public property set MimeType(mimeType : String) {
    setFields(Document.MIMETYPE_PROP.get(), mimeType)
  }

  public property get LanguageEnabled() : Boolean {
    return _languageEnabled
  }

  public property set LanguageEnabled(languageEnabled : Boolean) {
    if (_languageEnabled && !languageEnabled) {
      restoreFields(Document.LANGUAGE_PROP.get())
    }
    _languageEnabled = languageEnabled
  }

  public property get Language() : LanguageType {
    return (getFields(Document.LANGUAGE_PROP.get())) as LanguageType
  }

  public property set Language(language : LanguageType) {
    setFields(Document.LANGUAGE_PROP.get(), language)
  }

  public property get LevelEnabled() : Boolean {
    return _levelEnabled
  }

  public property set LevelEnabled(levelEnabled : Boolean) {
    if (_levelEnabled && !levelEnabled) {
      if (_savedLevels != null) {
        for (var i in 0..|_documents.length) {
          (_documents[i] as Document).Level = _savedLevels[i];
        }
      }
    }
    _levelEnabled = levelEnabled
  }

  public property get Level() : LinkedObjectContainer {
    if (_documents == null || _documents.length == 0)
      return null;
    var commonLevel = (_documents[0] as Document).Level
    for (var i in 1..|_documents.length) {
      var cmpLevel = (_documents[i] as Document).Level;
      if (commonLevel != cmpLevel)
        return null;
    }
    return commonLevel;
  }

  public property set Level(level : LinkedObjectContainer) {
    if (_documents != null) {
      var savedLevels : LinkedObjectContainer[] = null;
      if (_savedLevels == null) {
        savedLevels = new LinkedObjectContainer[_documents.length];
        _savedLevels = savedLevels
      }
      for (var i in 0..|_documents.length) {
        if (savedLevels != null) {
          savedLevels[i] = (_documents[i] as Document).Level
        }
        (_documents[i] as Document).Level = level
      }
    }
  }

  public property get GenerateLevels() : LinkedObjectContainer[] {
    if (_documents == null || _documents.length == 0)
      return null
    return _levels
  }

  public property get LevelsVisible() : boolean {
    return _levelsVisible
  }

  public property get SectionEnabled() : Boolean {
    return _sectionEnabled
  }

  public property set SectionEnabled(sectionEnabled : Boolean) {
    if (_sectionEnabled && !sectionEnabled) {
      restoreFields(Document.SECTION_PROP.get())
    }
    _sectionEnabled = sectionEnabled
  }

  public property get Section() : DocumentSection {
    return getFields(Document.SECTION_PROP.get()) as DocumentSection
  }

  public property set Section(section : DocumentSection) {
    setFields(Document.SECTION_PROP.get(), section)
  }

  public property get AuthorEnabled() : Boolean {
    return _authorEnabled
  }

  public property set AuthorEnabled(authorEnabled : Boolean) {
    if (_authorEnabled && !authorEnabled) {
      restoreFields(Document.AUTHOR_PROP.get())
    }
    _authorEnabled = authorEnabled
  }

  public property get Author() : String {
    return getFields(Document.AUTHOR_PROP.get()) as String
  }

  public property set Author(author : String) {
    setFields(Document.AUTHOR_PROP.get(), author)
  }

  public property get RecipientEnabled() : Boolean {
    return _recipientEnabled
  }

  public property set RecipientEnabled(recipientEnabled : Boolean) {
    if (_recipientEnabled && !recipientEnabled) {
      restoreFields(Document.RECIPIENT_PROP.get())
    }
    _recipientEnabled = recipientEnabled
  }

  public property get Recipient() : String {
    return getFields(Document.RECIPIENT_PROP.get()) as String
  }

  public property set Recipient(recipient : String) {
    setFields(Document.RECIPIENT_PROP.get(), recipient)
  }

  public property get StatusEnabled() : Boolean {
    return _statusEnabled
  }

  public property set StatusEnabled(statusEnabled : Boolean) {
    if (_statusEnabled && !statusEnabled) {
      restoreFields(Document.STATUS_PROP.get())
    }
    _statusEnabled = statusEnabled
  }

  public property get Status() : DocumentStatusType {
    return getFields(Document.STATUS_PROP.get()) as DocumentStatusType
  }

  public property set Status(status : DocumentStatusType) {
    setFields(Document.STATUS_PROP.get(), status)
  }

  public property get SecurityTypeEnabled() : Boolean {
    return _securityTypeEnabled
  }

  public property set SecurityTypeEnabled(securityTypeEnabled : Boolean) {
    if (_securityTypeEnabled && !securityTypeEnabled) {
      restoreFields(Document.SECURITYTYPE_PROP.get())
    }
    _securityTypeEnabled = securityTypeEnabled
  }

  public property get SecurityType() : DocumentSecurityType {
    return getFields(Document.SECURITYTYPE_PROP.get()) as DocumentSecurityType
  }

  public property set SecurityType(securityType : DocumentSecurityType) {
    setFields(Document.SECURITYTYPE_PROP.get(), securityType)
  }

  public property get TypeEnabled() : Boolean {
    return _typeEnabled
  }

  public property set TypeEnabled(typeEnabled : Boolean) {
    if (_typeEnabled && !typeEnabled) {
      restoreFields(Document.TYPE_PROP.get())
    }
    _typeEnabled = typeEnabled
  }

  public property get Type() : DocumentType {
    return getFields(Document.TYPE_PROP.get()) as DocumentType
  }

  public property set Type(type : DocumentType) {
    setFields(Document.TYPE_PROP.get(), type)
  }

  public property get CreateTime() : Date { return getFields(Document.DATECREATED_PROP.get()) as Date}

  public property get ObsoleteEnabled() : Boolean { return _obsoleteEnabled }

  public property set ObsoleteEnabled(obsoleteEnabled : Boolean) {
    if (_obsoleteEnabled && !obsoleteEnabled) {
      restoreFields(Document.OBSOLETE_PROP.get())
    }
    _obsoleteEnabled = obsoleteEnabled
  }

  public property get Obsolete() : Boolean { return(getFields(Document.OBSOLETE_PROP.get())) as Boolean }

  public property set Obsolete(obsolete : Boolean) {
    setFields(Document.OBSOLETE_PROP.get(), obsolete)
  }

  public property get Document() : Document {
    return _documents?.Count == 1 ? _documents.single() : null
  }
}
