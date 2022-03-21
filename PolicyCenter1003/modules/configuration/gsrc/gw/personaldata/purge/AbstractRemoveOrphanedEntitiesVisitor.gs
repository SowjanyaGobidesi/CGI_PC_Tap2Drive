package gw.personaldata.purge

uses gw.api.archiving.ArchiveDocumentReferencesUtil
uses gw.api.database.PCDatabaseReferenceTrackerUtility
uses gw.api.database.Queries

@Export
abstract class AbstractRemoveOrphanedEntitiesVisitor implements RemoveOrphanedEntitiesVisitor {
  protected function reloadEntity(entity: KeyableBean): KeyableBean {
    var query = Queries.createQuery(entity.IntrinsicType)
    query.compare(KeyableBean.ID_DYNPROP.get(entity.IntrinsicType), Equals, entity.ID)
    query.withFindRetired(true)
    return query.select().AtMostOneRow as KeyableBean
  }

  protected function isEntityOrphaned(bean: KeyableBean) : boolean {
    return not PCDatabaseReferenceTrackerUtility.isReferencedFromDatabase(bean) and
        not ArchiveDocumentReferencesUtil.isReferencedFromArchiveDocument(bean)
  }
}