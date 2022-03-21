package gw.plugin.document.impl

uses gw.plugin.document.IDocumentProduction
uses gw.document.TemplatePluginUtils
uses java.util.Map
uses gw.document.DocumentContentsInfo
uses gw.api.util.LocaleUtil
uses gw.plugin.document.IDocumentTemplateDescriptor

@Export
class LocalDocumentProductionDispatcher extends BaseDocumentProductionDispatcher implements IDocumentProduction {
  construct() {
  }

  override function createDocumentSynchronously(templateDescriptor : IDocumentTemplateDescriptor , parameters : Map<Object, Object>, document : Document) : DocumentContentsInfo {
    var result : DocumentContentsInfo
    var language = templateDescriptor.Language
    if (language == null) {
      language = LocaleUtil.getDefaultLanguage()
    }
    document.Locale = language // does the translation to language
    LocaleUtil.runAsCurrentLanguage( language , \ ->  {
      result = (getDispatchImplementation(templateDescriptor) as IDocumentProduction).createDocumentSynchronously(templateDescriptor, parameters, document)
    })
    return result
  }
  
  
  override protected function cast(obj : Object) : IDocumentProduction {
    return TemplatePluginUtils.castDocumentProduction(obj, IDocumentProduction)
  }

}
