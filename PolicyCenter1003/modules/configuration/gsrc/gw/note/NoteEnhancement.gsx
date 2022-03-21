package gw.note

uses com.guidewire.commons.metadata.MetadataDependencies
uses com.guidewire.commons.metadata.i18n.config.GWLocale
uses gw.api.locale.DisplayKey
uses gw.i18n.ILocale
uses gw.transaction.Transaction
uses org.apache.commons.lang.StringUtils
uses java.util.Map
uses gw.api.util.DisplayableException
uses gw.api.util.LocaleUtil
uses java.io.StringReader
uses gw.document.TemplatePluginUtils
uses java.util.Date

enhancement NoteEnhancement : Note {
  static function getLevelDisplayString(value: Object): String {
    return getLevelDisplayData(value).DisplayString
  }

  static function getLevelDisplayData(value: Object): NoteDisplayData {
    if(value typeis Account) {
      return new NoteDisplayData(value,
          DisplayKey.get("Java.Note.Account"),
          DisplayKey.get("Java.Note.AccountNameAndNumber", value.AccountHolderContact.DisplayName, value.AccountNumber),
          DisplayKey.get("Java.Note.AccountLevelNote", value))
    } else if (value typeis Policy) {
      var period = entity.Policy.finder.findPolicyPeriodByPolicyAndAsOfDate(value, Date.Today)
      if (period == null) {
        period = value.Periods.last()
      }
      return new NoteDisplayData(period,
          DisplayKey.get("Java.Note.Policy"),
          "#" + period.PolicyNumberDisplayString,
          DisplayKey.get("Java.Note.PolicyLevelNote", period.PolicyNumberDisplayString))
    } else if (value typeis Job) {
      var jobStrings = getJobDisplayStrings(value)
      return new NoteDisplayData(value, value.DisplayType, jobStrings[0], jobStrings[1])
    } else if (value typeis PolicyPeriod) {
      var jobStrings = getJobDisplayStrings(value.Job)
      return new NoteDisplayData(value, value.Job.DisplayType,
          DisplayKey.get("Java.Note.PolicyPeriodLevelNote", jobStrings[0], value.BranchName),
          DisplayKey.get("Java.Note.PolicyPeriodLevelNote", jobStrings[1], value.BranchName))
    } else if (value typeis Activity) {
      return new NoteDisplayData(value, DisplayKey.get("Java.Note.CurrentActivity"),
          value.DisplayName, DisplayKey.get("Web.NoteSearch.CurrentActivity", value))
    } else if (value typeis Contingency) {
      var contingency = value as Contingency
      return new NoteDisplayData(value, DisplayKey.get("Java.Note.Contingency"),
          contingency.Title, DisplayKey.get("Web.Contingency.RelatedTo", contingency.Title))
    } else {
      return new NoteDisplayData(value, DisplayKey.get("Note.UnknownLevel"),
          value.toString(), DisplayKey.get("Note.UnknownLevel"))
    }
  }

  private static function getJobDisplayStrings(job : Job): String[] {
    var effectiveDate = job.LatestPeriod.EditEffectiveDate
    var dateOrStatus = effectiveDate == null ? job.DisplayStatus : effectiveDate as String
    return {
        DisplayKey.get("Java.Note.JobLevelNoteValueOnly", job.JobNumber, dateOrStatus),
        DisplayKey.get("Java.Note.JobLevelNote", job.DisplayType, job.JobNumber, dateOrStatus)}
  }
  
  /**
   * Each note securitytype (internal, sensitive, or unrestricted) is associated with zero or one permissionkey.
   * this method will be called to check that the current user has the create permission for a given securitytype.
   */
  static function hasCreatePermission(securityType : NoteSecurityType) : boolean {
    if (securityType == TC_INTERNALONLY) {
      return perm.System.createintnote
    } else if (securityType == TC_SENSITIVE) {
      return perm.System.createsensnote
    } else {
      return true
    }
  }
  
  /**
   * Deletes the note.
   */
  function delete() {
    Transaction.runWithNewBundle(\ bundle -> {
      bundle.delete(this)
    })
  }
  
  /**
   * Completes a note.
   */
  function complete(){
    Transaction.runWithNewBundle(\ bundle -> {
      if (not StringUtils.isEmpty(this.getBody())) {
        bundle.add(this)
      }
    })
  }
  
  /** This will use the results of a template search to populate the note.
   * 
   * @param result the template result
   * @param beans the symbol table
   */
    function useTemplate(result : NoteTemplateSearchResults, beans : Map<String,Object>) {
    try {
      var locale = result.Language == null ? null : convertLanguageToLocale(result.Language)
      if (locale == null) {
        locale = LocaleUtil.getDefaultLocale()
      }
      TemplatePluginUtils.resolveTemplates( locale , 
          {new StringReader(result.Subject), new StringReader(result.Body)}, 
          // setup the symbol table for the template processing
          \ iScriptHost -> {
            for (entry in beans.entrySet()) {
              var bean = entry.getValue()
              if (bean != null) {
                iScriptHost.putSymbol(entry.Key, typeof(bean) as String, bean)
              }
            }
          }, 
          // process the result of the template expansion
          \ results -> {
            this.Topic = result.Topic
            this.Language = convertLocaleToLanguage(User.util.CurrentLocale)
            this.Subject = results[0]
            this.Body = results[1]
          } )
    } catch (e : DisplayableException) {
      var itemName = result.getName()
       throw new DisplayableException(DisplayKey.get("NoteAPI.ExceptionCaught", itemName), e)
    }
  }

  function convertLanguageToLocale(language : typekey.LanguageType) : ILocale {
    var localeTypes = LocaleType.AllTypeKeys
    var foundLocale = localeTypes.firstWhere(\elt1 -> elt1.Code == language.Code && elt1.isRetired() == false)
    if (foundLocale == null){
      foundLocale = localeTypes.firstWhere(\elt -> elt.Code.startsWith(language.Code) && elt.isRetired() == false)
    }
    return MetadataDependencies.getLocaleFactory().getLocaleByTypecode(foundLocale.getCode()) as ILocale
  }
  function convertLocaleToLanguage(locale : GWLocale) : LanguageType {
    var languageTypes = LanguageType.AllTypeKeys
    var foundLanguage = languageTypes.firstWhere(\elt1 -> elt1.Code == locale.Code && elt1.isRetired() == false)
    if (foundLanguage == null){
      foundLanguage = languageTypes .firstWhere(\elt -> locale.Code.startsWith(elt.Code) && elt.isRetired() == false)
    }
    return foundLanguage
  }
}