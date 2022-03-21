package gw.api.databuilder

uses java.util.Date

@Export
class ContingencyBuilder extends DataBuilder<Contingency, ContingencyBuilder> {

  construct(period : PolicyPeriod) {
    super(Contingency)
    withPolicyPeriod(period)
    withDefaults()
  }

  construct(policy : Policy) {
    super(Contingency)
    withPolicy(policy)
    withDefaults()
  }

  private function withDefaults() {
    var generator = UniqueKeyGenerator.get()
    withTitle("Proof of Transcript " + generator.nextID())
    withDescription("GPA : 4.5 " + generator.nextID())
    withDueDate(Date.Today.addDays(30))
    withStatus(TC_PENDING)
    withAction(TC_CHANGEREMAINDEROFTERM)
    withActionStartDate(Date.Today.addDays(15))
  }

  private function withPolicyPeriod(period : PolicyPeriod) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("PolicyPeriod"), period)
    set(Contingency.Type.TypeInfo.getProperty("Policy"), period.Policy)

    return this
  }

  final function withActionStarted(alreadyStarted : boolean) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("ActionStarted"), alreadyStarted)
  	return this
  }

  private function withPolicy(policy : Policy) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("Policy"), policy)

    return this
  }

  final function withAction(action : ContingencyAction) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("Action"), action)
    return this
  }

  final function withTitle(title : String) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("Title"), title)
    return this
  }

  final function withDescription(description : String) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("Description"), description)
    return this
  }

  final function withDueDate(dueDate : Date) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("DueDate"), dueDate)
    return this
  }

  final function withStatus(status : ContingencyStatus) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("Status"), status)
    return this
  }

  final function withCloseUser(user : User) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("CloseUser"), user)
    return this
  }

  final function withCloseDate(date : Date) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("CloseDate"), date)
    return this
  }

  final function withActionStartDate(date : Date) : ContingencyBuilder {
    set(Contingency.Type.TypeInfo.getProperty("ActionStartDate"), date)
    return this
  }
}
