package gw.personaldata.purge

uses gw.api.domain.PinnableVisitor
uses gw.pl.persistence.core.Bundle

/**
 * A post purge hook for cleanup and optionally for deleting entities that are orphaned by the purge.
 */
@Export
interface RemoveOrphanedEntitiesVisitor extends PinnableVisitor {
  /**
   * Called after the purge too handle cleanup activities if any. Return a collection of entities, if any, that should be
   * destroyed. Any bean modifications should be done in the supplied bundle, i.e., before modifying a bean add it to
   * the supplied bundle. The bundle will be committed before entity deletion. Entities are delted in the order in
   * which they are returned by the collection.
   *
   * @param bundle the {@link Bundle} for the post purge <code>commit()</code>
   *
   * @return collection of entities, if any, that should be deleted
   */
  public function postPurge(bundle: Bundle): Collection<KeyableBean>
}