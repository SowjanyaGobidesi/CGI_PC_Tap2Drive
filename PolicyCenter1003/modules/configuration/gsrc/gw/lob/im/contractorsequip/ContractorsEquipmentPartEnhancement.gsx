package gw.lob.im.contractorsequip

uses entity.ContractorsEquipment
uses gw.pl.persistence.core.Bundle

enhancement ContractorsEquipmentPartEnhancement : ContractorsEquipPart {

  /**
   * Returns an array containing ContractorsEquipments from current and future slices.
   */
   property get CurrentAndFutureContractorsEquipments() : ContractorsEquipment[] {
     var equipments = this.ContractorsEquipments.toSet()

     this.InlandMarineLine.getAllExistingCoverageParts(ContractorsEquipPart)
         .each(\equipPart -> equipments.addAll(equipPart.ContractorsEquipments
             .where(\equipment -> equipment.ExpirationDate.after(this.Branch.EditEffectiveDate)).fastList()))

     return equipments.toTypedArray()
  }
  
  function createAndAddIMContrEqAndCoverage() : ContractorsEquipment {
    var contrEq = new ContractorsEquipment( this.InlandMarineLine.Branch )
    this.addToContractorsEquipments( contrEq )
    this.ContrEqPartAutoNumberSeq.number( contrEq, CurrentAndFutureContractorsEquipments, ContractorsEquipment.Type.TypeInfo.getProperty( "ContractorsEquipmentNumber" ) )
    contrEq.createCoveragesConditionsAndExclusions()
    return contrEq
  }
  
  function removeIMContrEqAndCoverage( contrEq : ContractorsEquipment) {
    this.removeFromContractorsEquipments( contrEq )
    renumberIMContrEqs()
  }
  
  function renumberIMContrEqs() {
    this.ContrEqPartAutoNumberSeq.renumber(CurrentAndFutureContractorsEquipments, ContractorsEquipment.Type.TypeInfo.getProperty( "ContractorsEquipmentNumber" ) )
  }

  function renumberNewIMContrEqs() {
    this.ContrEqPartAutoNumberSeq.renumberNewBeans(CurrentAndFutureContractorsEquipments, ContractorsEquipment.Type.TypeInfo.getProperty( "ContractorsEquipmentNumber" ) )
  }
  
  function cloneContrEqAutoNumberSequence() {
    this.ContrEqPartAutoNumberSeq = this.ContrEqPartAutoNumberSeq.clone( this.Bundle )
  }
  
  function resetContrEqAutoNumberSequence() {
    this.ContrEqPartAutoNumberSeq.reset()
    renumberIMContrEqs()
  }
  
  function bindContrEqAutoNumberSequence() {
    renumberIMContrEqs()
    this.ContrEqPartAutoNumberSeq.bind( CurrentAndFutureContractorsEquipments, ContractorsEquipment.Type.TypeInfo.getProperty( "ContractorsEquipmentNumber" ) )
  }

  function initializeAutoNumberSequence(bundle : Bundle) {  
    this.ContrEqPartAutoNumberSeq = new AutoNumberSequence(bundle)
  }

  function getDefaultContainerForAddlInterest() : ContractorsEquipment {
    return this.ContractorsEquipments.first()
  }
}