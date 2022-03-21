package gw.sharding

uses org.apache.xml.utils.XMLChar

/**
 * Helpful methods for XML account transfer handlers
 */
@Export
interface BeanHandlerMethods {

  /**
   * Validates the handlerPath is a "/" separated xml path comprised of valid element names and returns
   * an array of those element names
   * @param handlerPath handler xml path to validate and split
   * @return array with names of each element in handlerpath
   * @throws IllegalArgumentException if handlerPath is null
   * @throws IllegalArgumentException if handlerPath has less than 2 "/" separated elements
   * @throws IllegalArgumentException if any element in handlerPath is not a valid xml name
   */
  function validateAndSplitHandlerPath(handlerPath : String) : String[] {
    if (handlerPath == null) {
      throw new IllegalArgumentException("Handler path cannot be null")
    }

    var splitHandlerPath = handlerPath.split("/")
    if (splitHandlerPath.Count < 2) {
      throw new IllegalArgumentException("Expected path '" + handlerPath + "' to have at least two parts. Use a path with the 'handlerName/nodeName' format")
    }

    for (path in splitHandlerPath) {
      if (!XMLChar.isValidName(path)) {
        throw new IllegalArgumentException(handlerPath + " contains element name '" + path + "' which is not a valid xml element name")
      }
    }
    return splitHandlerPath
  }

}