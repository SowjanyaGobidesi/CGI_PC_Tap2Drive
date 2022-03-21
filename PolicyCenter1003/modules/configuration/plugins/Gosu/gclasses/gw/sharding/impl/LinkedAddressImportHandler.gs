package gw.sharding.impl

uses entity.KeyableBean
uses entity.LinkedAddress
uses gw.api.beantransfer.BeanTransferException
uses gw.api.database.PCBeanFinder
uses gw.api.database.Query
uses gw.api.importing.ImportingUtil
uses gw.beantransfer.BeanTransferUtil
uses gw.beantransfer.impl.BeanImportGraph
uses gw.entity.IEntityType
uses gw.pl.persistence.core.Bundle
uses gw.sharding.XmlAccountBeanImportHandler
uses gw.util.AutoMap
uses org.w3c.dom.Document
uses entity.Address

@Export
class LinkedAddressImportHandler extends XmlAccountBeanImportHandler {

  var addressesByLinkID = new AutoMap<String, Set<BeanImportGraph.BeanImportElement>>(\key-> new HashSet<BeanImportGraph.BeanImportElement>())
  var linkTheseAddresses = new HashMap<String, Set<Address>>()
  var linkTheseGroups = new ArrayList<Collection<LinkedAddress>>()

  construct(importGraph : BeanImportGraph, additionalInfo : Document) {
    super(importGraph, additionalInfo)

    this.ImportGraph.getAssignableElementsForType(Address).each(\elem-> {
      var linkId = elem.getAttribute(Address#LinkedAddress.PropertyInfo.Name)
      if (linkId != null) {
        addressesByLinkID.get(linkId).add(elem)
      }
    })
  }

  override function findEntityById(entityType : IEntityType, publicId : String): KeyableBean {
    if (BeanTransferUtil.isSourceTypeAssignable(LinkedAddress.Type, entityType)) {
      var linkedAddrInGraph = ImportGraph.getElementByPublicId(LinkedAddress,publicId)

      var addressesForThisLink = addressesByLinkID.get(linkedAddrInGraph.DocID)
      var addressesAlreadyInThisShard = new HashSet<Address>()
      addressesForThisLink.each(\addr -> {
        var addressInThisShard = findAddressBeanByABUIDOrPublicId(addr)
        if (addressInThisShard != null) {
          addressesAlreadyInThisShard.add(addressInThisShard)
        }
      })

      var reachableLinkedAddresses = addressesAlreadyInThisShard*.LinkedAddress.where(\elt -> elt != null).toSet()

      if (reachableLinkedAddresses.Count >= 1) {
        //if one or more address groups are found we're assuming they're logical matches and merge them on post import
        linkTheseGroups.add(reachableLinkedAddresses)
        //and add any unlinked addresses found to the survivor, which needs to be consistent between this method and handlePostImport
        var survivor = getSurvivorForLinkedAddressGroup(reachableLinkedAddresses)
        linkTheseAddresses.put(survivor.PublicID,addressesAlreadyInThisShard.where(\elt -> elt.LinkedAddress == null).toSet())
        return survivor
      } else {
        //if no linked address group exists for the addresses on this shard, we'll let this entity be created
        //and link all existing shard addresses to it
        linkTheseAddresses.put(publicId, addressesAlreadyInThisShard)
        return null
      }
    }

    return null
  }

  private function getSurvivorForLinkedAddressGroup(group : Collection<LinkedAddress>) : LinkedAddress {
    return group.maxBy(\elt -> elt.ID)
  }

  function handlePostImport(info : Set<RootInfo>) {
    var rootBundle = info.first().Bundle
    //first merge together the linked address 'logical match' groups during import
    for (group in linkTheseGroups) {
      var survivor = getSurvivorForLinkedAddressGroup(group)
      group.remove(survivor)
      var survivorAddress = rootBundle.add(survivor.Addresses.first())

      for (victim in group) {
        victim = rootBundle.add(victim)
        victim.Addresses.each(\ a -> { a.LinkedAddress = survivor })
        victim.remove()
      }

      survivorAddress.updateLinkedAddresses()
    }

    //now for all unlinked addresses link them to the LinkAddress
    for (entry in linkTheseAddresses.entrySet()) {
      var linkedAddress = loadLinkedAddressFromBundleOrDB(rootBundle, entry.Key)
      if (linkedAddress == null) {
        throw new BeanTransferException("LinkedAddressImportHandler could not find LinkedAddress with public ID "+entry.Key+" to link to addresses "+entry.Value*.PublicID.toList())
      }
      for (addrToLink in entry.getValue()) {
        addrToLink = rootBundle.add(addrToLink)
        addrToLink.LinkedAddress = linkedAddress
      }
    }
  }

  private function findAddressBeanByABUIDOrPublicId(bean : BeanImportGraph.BeanImportElement) : Address {
    var abuid = bean.getAttribute(Address#AddressBookUID.FeatureInfo.Name)
    return (abuid != null) ? Query.make(Address).compare(Address#AddressBookUID, Equals, abuid).select().AtMostOneRow
        : Query.make(Address).compare(Address#PublicID, Equals, bean.getAttribute(ImportingUtil.PUBLIC_ID_ATTRIB)).select().AtMostOneRow
  }

  private function loadLinkedAddressFromBundleOrDB(bundle : Bundle, publicID : String) : LinkedAddress {
    var linkedAddressesInBundle = bundle.getBeansByRootType(LinkedAddress).where(\elt -> elt.PublicID == publicID)
    if (linkedAddressesInBundle.HasElements) {
      return linkedAddressesInBundle.single() as LinkedAddress
    } else {
      return PCBeanFinder.loadBeanByPublicID(publicID, LinkedAddress)
    }
  }
}