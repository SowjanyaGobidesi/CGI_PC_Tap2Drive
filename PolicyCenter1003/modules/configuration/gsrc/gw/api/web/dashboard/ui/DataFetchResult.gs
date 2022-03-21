package gw.api.web.dashboard.ui

uses gw.api.util.DisplayableException
uses gw.api.util.LocationUtil

@Export
class DataFetchResult<T> {
  final var _data: T as readonly Data
  final var _error: Optional<DisplayableException> as readonly Error

  private construct(data: T, error: Optional<DisplayableException>) {
    _data = data
    _error = error
  }

  property get HasNoErrors(): boolean {
    return not _error.Present
  }

  reified static function of<U>(fetcher(): U, onError(DisplayableException): U): DataFetchResult<U> {
    try {
      return new DataFetchResult<U>(fetcher(), Optional.empty())
    } catch (exc: DisplayableException) {
      LocationUtil.addRequestScopedWarningMessage(exc.Message)
      return new DataFetchResult(onError(exc), Optional.of(exc))
    }
  }
}