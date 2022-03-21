package gw.plugin.multicluster.federateddata

uses gw.api.system.PCConfigParameters
uses gw.api.web.prefs.PreferenceObject
uses gw.api.web.prefs.UserPreferencesStoreImpl
uses gw.plugin.Plugins
uses gw.plugin.web.prefs.UserPreferencesStore

@Export
class FederatedUserPreferencesStoreImpl implements UserPreferencesStore {

  delegate _defaultUserPreferencesStore:UserPreferencesStore represents UserPreferencesStore

  construct() {
    this._defaultUserPreferencesStore = PCConfigParameters.EnableFederatedData.Value ? new FederatedUserPreferenceStore() : new UserPreferencesStoreImpl()
  }

  private static final class FederatedUserPreferenceStore implements UserPreferencesStore {

    override function loadPreferences(user : User) : PreferenceObject {
      return PreferenceObject.deserialize(RemoteStore.getUserPreferences(user.PublicID))
    }

    override function storePreferences(user : User, preferences : PreferenceObject) : boolean {
      if (!preferences.Empty) {
        RemoteStore.updateUserPreferences(user.PublicID, preferences.serialize())
      }
      return true
    }

    private property get RemoteStore() : IFederatedDataPlugin {
      return Plugins.get(IFederatedDataPlugin);
    }
  }
}