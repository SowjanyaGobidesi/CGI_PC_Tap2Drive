package gw.api.web.dashboard.ui.account

@Export
class ProducerHelper {
  final var _producerCodes: AccountProducerCode[] as ProducerCodes
  final var _viewMoreVisible: boolean as ViewMoreVisible

  construct(account: Account, producersLimit: int) {
    var producerCodes = account.ProducerCodes
        .orderBy(\code -> code.ProducerCode.Organization.DisplayName)
        .thenBy(\code -> code.ProducerCode.Code)
    _producerCodes = producerCodes.limit(producersLimit).toTypedArray()
    _viewMoreVisible = producerCodes.size() > producersLimit
  }
}
