package gw.webservice.pc.pc910.ccintegration

uses gw.api.productmodel.ProductModelClass
uses gw.util.GosuStringUtil
uses gw.util.StreamUtil

uses java.io.OutputStream

/**
 * Class responsible for mapping from a PC Product Model pattern/element to a CC Product Model typecode
 */
@Export
@Deprecated(:value="910 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
class CCProductModelCodeMappingUtil {

  /**
   * Get CC Product Model typecode mapping for a PC Product Model element
   *
   * @param pmObject product model element to obtain CC typecode for
   * @param warningStream optional argument, pass to have the function write any non-critical warning messages to the passed input stream
   * @return result of mapping including CC typecode and any exception/special handling messages
   */
  public static function getCCTypeCodeForPMType(pmObject: ProductModelClass, warningStream: OutputStream = null) : String {

    if (pmObject == null) {
      throw new IllegalArgumentException("pmObject cannot be null")
    }

    if (GosuStringUtil.isBlank(pmObject.PublicID)) {
      throw new IllegalArgumentException("pmObject.Code cannot be null or empty")
    }

    var genCode = pmObject.PublicID

    //The default logic trims the Code property to 50 characters to generate the CC typecode for an element
    //if more complex mapping is necessary due to collisions or other requirements, alter the logic below
    if (genCode.length() > 50) {
      if (warningStream != null) {
        warningStream.write(StreamUtil.toBytes("Warning: Code exceeds max allowed 50 characters for a typecode: [" + pmObject.PublicID + "]. Code trimmed in order to map it.\n"))
      }
      genCode = trimTypeCode(genCode)
    }

    return genCode
  }


  // When a code exceeds the max length of a typecode, this function can be used to trim it down to the max length.
  // This should be used for both generating the typelist and later when mapping values during policy retrieval.  Of course,
  // it is far better to avoid having codes which exceed the 50 char max length because there is no way to guarantee that a
  // trimmed code will be unique.  If cases occur where trimmed codes are not unique, they could be added as special cases here
  // which are treated in a non-standard way that results in unique values.
  private static function trimTypeCode(code : String) : String {
    if (code.length > 50) {
      return code.substring(0,50)
    } else {
      return code
    }
  }

}