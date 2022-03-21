package gw.billing.caching

/**
 * This class provides the common implementation for the various caches, passing the cache-specific message
 * through to the cache itself and creating the cache initially.
 */
@Export
abstract class AbstractCachable<K,V> implements Cachable<K,V> {

  var _cache : GoogleCacheWrapper<K,V> as readonly Cache

  construct() {
    _cache = new GoogleCacheWrapper<K,V>(this)
  }

  protected property get Cache() : GoogleCacheWrapper<K,V> {
    return _cache
  }

  abstract function retrieveFromSource(key : K) : V

  /**
   * Sets how many seconds after the last read that a value will be removed from the cache
   * If set to zero, time from last read will not be considered when invalidating items.
   * @param seconds
   */
  function setExpireAfterRead(seconds : int) {
    Cache.setExpireAfterRead(seconds)
  }

  /**
   * Clears the cache of values, requiring them to be retrieved from the source at the next access
   */
  function invalidate() {
    Cache.invalidate()
  }
}