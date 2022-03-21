package gw.webservice
uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.database.Query
uses gw.api.webservice.exception.AlreadyExecutedException
uses gw.api.webservice.exception.FieldConversionException
uses gw.api.webservice.exception.RequiredFieldException
uses gw.api.webservice.exception.ServerStateException
uses gw.api.webservice.exception.SOAPException
uses org.slf4j.Logger
uses java.lang.Throwable
uses gw.pl.persistence.core.Bundle
uses java.lang.Exception
uses com.guidewire.pl.system.bundle.EntityBundleImpl

@Export
class SOAPUtil
{
  private construct() { }

  /**
   * Throws a {@link FieldConversionException} if <code>object</code> is null. The exception message
   * will be <code>description</code>.
   */
  static function notNull( object : Object, description : String ) {
    if (object == null){
      throw new FieldConversionException( description )
    }
  }

    /**
   * Check that the given value is not null. If it is, throw an exception
   * complaining that the required parameter "parameterName" is null.
   *
   * @param value         the value of the parameter
   * @param parameterName the name of the parameter, used in the exception message
   */
  static function require(value: Object, parameterName: String) {
    if (value == null) {
      throw new RequiredFieldException(DisplayKey.get("Webservice.Error.MissingRequiredField", parameterName))
    }
  }

  /**
   * Calls the block and converts any exception to a SOAPException
   */

  static function convertToSOAPException(aLogger : Logger, aCall : block()) {
    try {
      aCall()
    }
    catch (e : SOAPException) {
      // Log the exception because we're losing the stack trace from the original
      // exception
      aLogger.error(e.toString(), e)
      throw e
    }
    catch (e : Throwable) {
      aLogger.error(e.toString(), e)
      throw new SOAPException(e.toString())
    }
  }

  @Throws(AlreadyExecutedException, "if the SOAP request is already executed")
  @Throws(ServerStateException, "if other exception occurs")
  public static function tryCatch<T>(call : block(bundle : Bundle) : T, transactionId : String) : T {
    // check the uniqueness of the transaction id
    // this is just one way of getting what we need (by let pl commit to transactionid table)
    // we can just commit the transactionid as key to any table and throw AlreadyExecuteException
    // when appropriate
    if (!Query.make(entity.TransactionId).compare(TransactionId#tid, Equals, transactionId).select().Empty) {
      throw new AlreadyExecutedException(DisplayKey.get("SOAPUtil.AlreadyExecuted", transactionId))
    }
    var result : T
    try {
      gw.transaction.Transaction.runWithNewBundle(\ bundle -> {
        result = call(bundle)
        (bundle.Bundle as EntityBundleImpl).CommitOptions.TransactionId = transactionId
      })
    } catch(e : com.guidewire.pl.system.exception.DBAlreadyExecutedException) {
      // this can still happen after the checked above because of race condition
      throw new AlreadyExecutedException(DisplayKey.get("SOAPUtil.AlreadyExecuted", transactionId))
    } catch(e : Exception) {
      e.printStackTrace()
      throw e
    }
    return result
  }

}
