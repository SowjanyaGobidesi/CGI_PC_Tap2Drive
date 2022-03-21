package gw.api.databuilder.im

uses gw.api.databuilder.DataBuilder
uses gw.api.databuilder.BuilderContext
uses gw.entity.IEntityPropertyInfo
uses gw.api.builder.BuilderPropertyPopulator
uses gw.api.databuilder.populator.BeanPopulator
uses java.lang.Integer
uses gw.api.builder.CoverageBuilder
uses java.util.concurrent.atomic.AtomicInteger

@Export
class IMSignBuilder extends DataBuilder<IMSign, IMSignBuilder>
{

  static var _number = new AtomicInteger(1)

  construct() {

    super(IMSign)

    withNumber( _number.incrementAndGet() )
    withPrivateSignType(SignType.TC_FLUORESCENT)

    addPopulator(Integer.MAX_VALUE, new BeanPopulator<IMSign>() {
      public override function execute(sign : IMSign) {
        /*
        if (sign.IMLocation == null) {
          var period = sign.IMSignPart.InlandMarineLine.PolicyPeriod
          var imLocation = new IMLocation(this.Branch)
          imLocation.
          sign.IMLocation.Location = period.PrimaryLocation
        }
        */
      }
    })
  }

  /** helper for withXxx() methods */
  protected function setByPropName(propertyName : String, value : Object) : IMSignBuilder {
    set(IMSign.Type.TypeInfo.getProperty( propertyName ), value)
    return this
  }

  function withSignType( signtype : SignType) : IMSignBuilder {
    setByPropName( "SignType", signtype)
    return this
  }

  //prevents overridable method from being called within a constructor
  private function withPrivateSignType(signtype : SignType) : IMSignBuilder {
    setByPropName("SignType", signtype)
    return this
  }

  function withDescription(description : String) : IMSignBuilder {
    setByPropName("Description", description)
    return this
  }

  final function withNumber( number : int) : IMSignBuilder {
    setByPropName( "SignNumber",  number )
    return this
  }

  function withIMLocation(imLocationBuilder : IMLocationBuilder) : IMSignBuilder {
    addPopulator(new BuilderPropertyPopulator<IMSign>(IMSign.Type.TypeInfo.getProperty("IMLocation") as IEntityPropertyInfo, imLocationBuilder))
    return this
  }

  function withCoverage(coverageBuilder : CoverageBuilder) : IMSignBuilder {
    addAdditiveArrayElement( IMSign.Type.TypeInfo.getProperty("Coverages") , coverageBuilder )
    return this
  }

  function withCurrency(currency : Currency) : IMSignBuilder {
    set(IMSign#PreferredCoverageCurrency, currency)
    return this
  }

  protected override function createBean(context : BuilderContext) : IMSign {
    var part = context.ParentBean as entity.IMSignPart
    var sign = new IMSign( part.InlandMarineLine.Branch )
    part.addToIMSigns( sign )
    return sign
  }
}
