package gw.rating.worksheet.worksheetcontainer

uses gw.api.system.PCLoggerCategory
uses gw.rating.worksheet.domain.Worksheet

uses java.util.concurrent.ConcurrentLinkedQueue

/**
 * Allows a handler to handle the actions that would normally update the worksheet container immediately
 * by either postponing the update or by passing the update through directly to the policy period.
 */
@Export
abstract class AbstractWorksheetContainerContentHandler<E> {

  /*
* This queue is thread safe, so it can be used by multiple threads.
* Using a queue so that the sequence of insertion is retained, it's not really important across the threads,
* but it's nice to retain the order of insertion within each thread when adding the XML nodes.
*/
  protected var _queue: Queue<DeferredWorksheetEntry<E>> = new ConcurrentLinkedQueue<DeferredWorksheetEntry<E>>()

  protected final var _policyPeriod : PolicyPeriod

  construct(policyPeriod : PolicyPeriod) {
    _policyPeriod = policyPeriod
  }


  /**
   * Apply any stored updates to the policy period (and hence the worksheet container).
   */
  abstract function updatePolicyPeriod()

  /**
   * Log the text message, prefixing it with the current thread's name.
   * @param text the text to be logged.
   */
  function log(text : String) {
    var threadInfo = "[" + Thread.currentThread().Name + "] "
    PCLoggerCategory.PARALLELIZATION.debug(threadInfo + text)
  }

  /**
   * Add the worksheet to the worksheet container.  Since this will be done from multiple child threads, doing it
   * immediately is not thread safe, so the updates will be stored in the queue. Then updates can be done from the main
   * thread when {@link DeferredWorksheetContainerHandler.DeferredWorksheetEntry#updatePolicyPeriod()} is called.
   * @param effDated an EffDated bean or dto that is the item that has been rated
   * @param ws the worksheet information
   * @param tag an optional tag
   */
  function addWorksheetFor(effDated : E, ws: Worksheet, tag: String) {
    log("Storing the information for a Worksheet Update")
    var entry = new DeferredWorksheetEntry(effDated, ws, tag)
    _queue.add(entry)
  }

  /**
   * This class stores the worksheet entry information so it can be applied later.  The EffDated beans come from
   * child threads.  The child threads get initialized with beans that are copied from the main bundle.
   * So these EffDated beans are from the child threads, and leak out temporarily into the main thread until
   * the updatePolicyPeriod method is called.
   */
  protected class DeferredWorksheetEntry<T> {
    var _effDated : T as readonly Bean
    var _worksheet : Worksheet as readonly Worksheet
    var _tag : String as readonly Tag

    construct(bean: T, ws: Worksheet, tag: String) {
      _worksheet = ws
      _effDated = bean
      _tag = tag
    }
  }
}