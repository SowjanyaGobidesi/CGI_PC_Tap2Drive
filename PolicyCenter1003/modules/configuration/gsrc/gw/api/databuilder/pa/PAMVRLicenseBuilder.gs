package gw.api.databuilder.pa
uses gw.api.databuilder.DataBuilder
uses gw.plugin.motorvehiclerecord.MVRSearchCriteria
uses java.util.Date

@Export
class PAMVRLicenseBuilder  extends DataBuilder<MVRLicense, PAMVRLicenseBuilder> {

  construct(){
    super(MVRLicense)
  }

  construct(driverSc: MVRSearchCriteria) {  
    super(MVRLicense)
    withPrimaryLicense(true)
    withLicenseNumber(driverSc.LicenseNumber)    
    withLicenseState(driverSc.LicenseState)
    withLicenseClass("C")
    withLicenseStatus("LIC CDL:ELG")
    withOriginallyIssuedDate(Date.create(1970, JANUARY, 1))
    withCurrentIssuedDate(Date.create(2009, JANUARY, 1))
    withExpirationDate(Date.create(2014, JANUARY, 1))
    withReinstatementDate(Date.create(2005, JANUARY, 1))
  }

  final function withPrimaryLicense(primary: boolean): PAMVRLicenseBuilder{
    set(MVRLicense.Type.TypeInfo.getProperty("PrimaryLicense"), primary)
    return this
  }
 
  final function withLicenseNumber(lNumber: String): PAMVRLicenseBuilder{    
    set(MVRLicense.Type.TypeInfo.getProperty("LicenseNumber"), lNumber)
    return this
  }
  
  final function withLicenseState (state: State): PAMVRLicenseBuilder {
    set(MVRLicense.Type.TypeInfo.getProperty("LicenseState "), state)
    return this  
  }
  
  final function withLicenseClass (lClass: String): PAMVRLicenseBuilder {
    set(MVRLicense.Type.TypeInfo.getProperty("LicenseClass "), lClass)
    return this  
  }
  
  final function withLicenseStatus (status: String): PAMVRLicenseBuilder {
    set(MVRLicense.Type.TypeInfo.getProperty("LicenseStatus"), status)
    return this  
  }  
  
  final function withOriginallyIssuedDate(origIssue: Date): PAMVRLicenseBuilder {
    set(MVRLicense.Type.TypeInfo.getProperty("OriginallyIssued"), origIssue)
    return this  
  }  
  
  final function withCurrentIssuedDate(currIssue: Date): PAMVRLicenseBuilder {
    set(MVRLicense.Type.TypeInfo.getProperty("IssuedDate"), currIssue)
    return this  
  }
    
  final function withExpirationDate(expDate : Date): PAMVRLicenseBuilder {
    set(MVRLicense.Type.TypeInfo.getProperty("ExpireDate"), expDate)
    return this  
  }
    
  final function withReinstatementDate(reinDate: Date): PAMVRLicenseBuilder {
    set(MVRLicense.Type.TypeInfo.getProperty("ReinstateDate"), reinDate)
    return this  
  }
  
  
}
