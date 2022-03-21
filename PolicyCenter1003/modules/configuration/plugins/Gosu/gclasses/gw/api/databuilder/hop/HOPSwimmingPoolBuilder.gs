package gw.api.databuilder.hop

uses gw.api.databuilder.DataBuilder

@Export
class HOPSwimmingPoolBuilder extends DataBuilder<HOPSwimmingPool, HOPSwimmingPoolBuilder> {
  construct() {
    super(HOPSwimmingPool)
    withPoolType(HOPSwimmingPoolType.TC_ABOVEGROUND)
  }

  function withAdditionalInformation(additionalInformation : String) : HOPSwimmingPoolBuilder {
    set(HOPSwimmingPool#AdditionalInformation, additionalInformation)
    return this
  }

  function withApprovedFence(hasApprovedFence : Boolean) : HOPSwimmingPoolBuilder {
    set(HOPSwimmingPool#ApprovedFence, hasApprovedFence)
    return this
  }

  function withDivingBoard(hasDivingBoard : Boolean) : HOPSwimmingPoolBuilder {
    set(HOPSwimmingPool#DivingBoard, hasDivingBoard)
    return this
  }

  function withSlide(hasSlide : Boolean) : HOPSwimmingPoolBuilder {
    set(HOPSwimmingPool#Slide, hasSlide)
    return this
  }

  function withPoolType(type : HOPSwimmingPoolType) : HOPSwimmingPoolBuilder {
    set(HOPSwimmingPool#PoolType, type)
    return this
  }
}