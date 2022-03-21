package entity

@javax.annotation.Generated("com.guidewire.pl.metadata.codegen.Codegen", "", "PendingUpdatesWorkItem.eti;PendingUpdatesWorkItem.eix;PendingUpdatesWorkItem.etx")
enhancement GWPendingUpdatesWorkItemEntityEnhancement : entity.PendingUpdatesWorkItem {
  function applyUpdates () : void {
    (com.guidewire.pl.persistence.code.EntityInternalAccess.getImplementation(this, "gw.account.PendingUpdates") as gw.account.PendingUpdates).applyUpdates()
  }
  
  
}