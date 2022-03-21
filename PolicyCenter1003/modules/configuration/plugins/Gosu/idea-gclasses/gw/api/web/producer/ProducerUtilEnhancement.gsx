package gw.api.web.producer

uses gw.api.database.QuerySelectColumns
uses gw.api.database.IQueryBeanResult
uses gw.api.path.Paths
uses gw.api.system.PLDependenciesGateway
uses gw.api.database.ISelectQueryBuilder
uses gw.api.system.ExternalUserAccessParameterKey

enhancement ProducerUtilEnhancement : gw.api.web.producer.ProducerUtil {

 /**
  * Gets the list of available ProducerCodes based on the agency selection.
  * @param agency Organization from which to get producer code range from
  * @param use If non-null, use ProducerStatusUse when querying
  */
  public static function getProducerCodeRange(agency : Organization,
                                              use : ProducerStatusUse) : IQueryBeanResult<ProducerCode> {
    return getProducerCodeRange(agency, use, false)
  }

/**
 * Gets the list of available ProducerCodes based on the agency selection
 * @param agency Organization from which to get producer code range from
 * @param use If non-null, use ProducerStatusUse when querying
 * @param createAccountSecurity (optional) if true, check for create account permission when filtering producer codes
 */
  public static function getProducerCodeRange(agency : Organization,
                                              use : ProducerStatusUse,
                                              createAccountSecurity : boolean) : IQueryBeanResult<ProducerCode> {
    var user = PLDependenciesGateway.getCommonDependencies().getCurrentUser()
    var producerCodeQueryBuilder =  new gw.product.ProducerCodeQueryBuilder()

    producerCodeQueryBuilder
      .withSecure(user.UseProducerCodeSecurity)
      .withCreateAccountSecurity(createAccountSecurity)
      .withStatusUse(use)
      .withProducer(agency)

    var producerCodesQuery = producerCodeQueryBuilder.build() as ISelectQueryBuilder<ProducerCode>
    return producerCodesQuery.select().orderBy(QuerySelectColumns.path(Paths.make(ProducerCode#Code))) as IQueryBeanResult<ProducerCode>
  }

  /**
   * can edit if user is internal or system unrestricted
   * @return true if user is internal or system is unrestricted
   */
  public static function canEditOrganization() : boolean {
    return not User.util.CurrentUser.ExternalUser
        or not ExternalUserAccessParameterKey.ExternalUserAccessIsFullyRestricted()
  }
}
