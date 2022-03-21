package gw.billing.caching

uses com.google.common.cache.Cache
uses com.google.common.cache.CacheBuilder
uses com.google.common.util.concurrent.UncheckedExecutionException
uses gw.api.system.PCLoggerCategory

uses java.util.concurrent.ExecutionException

/**
 * GoogleCacheWrapper is a caching framework based on the Google Common Cache classes.
 *
 * It's designed for users to implement Cachable<K,V> to provide data from some source, typically a plugin.
 * They need to override retrieveFromSource method which will get the data from the source.
 *
 * The Key class must be able to differentiate data being stored.  Typically, the equals/hashCode methods are overridden
 * to provide a comparison between arguments passed into the sublass's API
 *
 * With these in place, the cache can create its interface which will need to create the key and call retrive(Key) to
 * have the cache check its contents and get from the source if needed.
 *
 * Exceptions called in retrieveFromSource(Key) are thrown from retrieve(Key).  Exception messages are logged to the
 * BILLING_SYSTEM_PLUGIN log by default.  Users of the cache can call Log = during construction to use a different logger.
 *
 * Uses weak references to values
 */
@Export
class GoogleCacheWrapper<K,V> {

  private var _cachable : Cachable<K,V>
  private var _expireSecondsAfterRead = 0
  private var _cache : Cache<K,V> as readonly Cache
  protected var _log : org.slf4j.Logger as Log

  construct(cachable : Cachable<K,V>) {
    _cachable = cachable
    Log = PCLoggerCategory.BILLING_SYSTEM_PLUGIN
    resetCache()
  }

  /**
   * Invalidate clears the cache of all contents, requiring them to be retrieved from the source again
   */
  function invalidate() {
    Cache.invalidateAll()
  }

  /**
   * When set, the cache will remove items from the cache which have not been accessed within the number of seconds provided
   * If set to 0 or less, time from last read will not be a factor in cache invalidation
   * Invalidates the cache when called
   *
   * @param seconds
   */
  function setExpireAfterRead(seconds : int) {
    _expireSecondsAfterRead = seconds
    resetCache()
  }

  /**
   * Checks the cache for values associated with the given key.  If it has values, it will return them.  Otherwise,
   * it will populate itself by calling retrieveFromSource(key).  Any exceptions thrown by retrieveFromSource will be
   * thrown from here as well.
   *
   * @param key an object used to retrieve and compare cache contents
   * @return the values stored in the cache
   */
  function retrieve(key : K) : V {
    try {
      return Cache.get(key, \ -> _cachable.retrieveFromSource(key))
    } catch(e : ExecutionException) {
      if (e.getCause() != null) {
        Log.error("Exception thrown in retrieval", e.getCause())
        throw e.getCause()
      } else {
        throw e
      }
    } catch(e : UncheckedExecutionException) {
      if (e.getCause() != null) {
        Log.error("Exception thrown in retrieval", e.getCause())
        throw e.getCause()
      } else {
        throw e
      }
    }
  }

  private function resetCache() {
    var cacheBuilder = CacheBuilder<K,V>.newBuilder() as CacheBuilder<K,V>
    cacheBuilder.weakValues()
    if (_expireSecondsAfterRead > 0) {
      cacheBuilder.expireAfterAccess(_expireSecondsAfterRead, SECONDS)
    }
    _cache = cacheBuilder.build()
  }
}