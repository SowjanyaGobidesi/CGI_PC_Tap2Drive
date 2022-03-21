package gw.util

uses org.slf4j.Logger

enhancement LoggerEnhancement: Logger {
  /**
   * Evaluates thunk and logs iff INFO is enabled.
   *
   * @param producer
   */
  function maybeInfo(producer(): String) {
    if (this.isInfoEnabled()) {
      this.info(producer())
    }
  }

  /**
   * Evaluates thunk and logs iff DEBUG is enabled.
   *
   * @param producer
   */
  function maybeDebug(producer(): String) {
    if (this.isDebugEnabled()) {
      this.debug(producer())
    }
  }

  /**
   * Evaluates thunk and logs iff TRACE is enabled.
   *
   * @param producer
   */
  function maybeTrace(producer(): String) {
    if (this.isTraceEnabled()) {
      this.trace(producer())
    }
  }

  /**
   * Evaluates thunk and logs iff DEBUG is enabled.
   *
   * @param producer
   */
  function maybeWarn(producer(): String) {
    if (this.isWarnEnabled()) {
      this.warn(producer())
    }
  }
}
