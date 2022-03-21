package gw.activity

uses entity.Activity
uses gw.api.web.color.GWColor

enhancement ActivityUIEnhancement: Activity {

  private property get DefaultColor(): GWColor {
    return null
  }

  property get UIDisplayName(): String {
    var displayName = this.Job.Policy.Account.AccountHolderContact.DisplayName
    return displayName == null
        ? this.Account.AccountHolderContact.DisplayName
        : displayName
  }

  property get UIDisplayState(): State {
    var displayState = this.Job.Policy.Account.AccountHolderContact.PrimaryAddress.State
    return displayState == null
        ? this.Account.AccountHolderContact.PrimaryAddress.State
        : displayState
  }

  property get UIPriorityColor(): GWColor {
    if (this.Priority == Priority.TC_URGENT) {
      return GWColor.THEME_IMPORTANCE_CRITICAL
    } else if (this.Priority == Priority.TC_HIGH) {
      return GWColor.THEME_IMPORTANCE_HIGH
    }
    return DefaultColor
  }

  property get UIOverdueColor(): GWColor {
    return this.Overdue ? GWColor.THEME_PROGRESS_OVERDUE : DefaultColor
  }

}