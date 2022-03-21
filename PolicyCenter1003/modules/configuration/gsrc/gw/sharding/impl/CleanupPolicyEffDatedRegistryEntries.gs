package gw.sharding.impl

uses gw.beantransfer.impl.BeanImportGraph
uses gw.sharding.XmlAccountBeanImportHandler
uses org.w3c.dom.Document

/**
 * Removes duplicate PolicyEffDatedRegistry entries from imported policies. PolicyEffDatedRegistry entries are part of
 * the account transfer graph so they are explicitly imported into the target system. However, duplicate registry
 * entries also get created automatically as part of the import process. This handler tracks Policy entities as they
 * are imported, and then removes automatically created PolicyEffDatedRegistry beans before the import completes.
 */
@Export
class CleanupPolicyEffDatedRegistryEntries extends XmlAccountBeanImportHandler {

  construct(importGraph : BeanImportGraph, additionalInfo : Document) {
    super(importGraph, additionalInfo)
  }

  override function handlePostImport(info : Set<RootInfo>) {

    var policies = extractImportedBeansFromRootBundle(Policy,info,true)
    // Remove automatically created PolicyEffDatedRegistry elements, which will be the ones without a PublicID
    for (policy in policies) {
      for (registryEntry in policy.EffDatedRegistry) {
        if (registryEntry.PublicID == null) {
          registryEntry.remove()
        }
      }
    }
  }

}