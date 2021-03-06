package gw.webservice.pc.pc1000.community.datamodel

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.webservice.exception.BadIdentifierException
uses gw.pl.persistence.core.Bundle
uses gw.xml.ws.annotation.WsiExportable

@Export
@WsiExportable("http://guidewire.com/pc/ws/gw/webservice/pc/pc1000/community/datamodel/OrganizationDTO")
final class OrganizationDTO {

  var _carrier : boolean as Carrier
  var _contactPublicID : String as ContactPublicID
  var _masterAdmin : boolean as MasterAdmin
  var _name : String as Name
  var _publicID : String as PublicID

  var _producerStatus : ProducerStatus as ProducerStatus
  var _tier : Tier as Tier
  var _type : BusinessType as Type

  var _rootGroup : gw.webservice.pc.pc1000.community.datamodel.GroupDTO as RootGroup

  function populateFromOrganization(org : Organization) {
    this.Carrier = org.Carrier
    this.ContactPublicID = org.Contact.PublicID
    this.MasterAdmin = org.MasterAdmin
    this.Name = org.Name
    this.ProducerStatus = org.ProducerStatus
    this.PublicID = org.PublicID
    this.Tier = org.Tier
    this.Type = org.Type

    if (this.RootGroup == null) {
      this.RootGroup = new gw.webservice.pc.pc1000.community.datamodel.GroupDTO()
    }
    this.RootGroup.BranchCode = org.RootGroup.BranchCode
    this.RootGroup.Description = org.RootGroup.Description
    this.RootGroup.LoadFactor = org.RootGroup.LoadFactor
    this.RootGroup.Name = org.RootGroup.Name
    this.RootGroup.PublicID = org.RootGroup.PublicID
    this.RootGroup.SecurityZonePublicID = org.RootGroup.SecurityZone.PublicID
    this.RootGroup.SupervisorPublicID = org.RootGroup.Supervisor.PublicID
  }

  function createOrganization(bundle : Bundle) : Organization {
    var org = new Organization(bundle)
    return populateOrganization(org)
  }

  function updateOrganization(organization : Organization) {
    populateOrganization(organization)
  }

  private function populateOrganization(org : Organization) : Organization {
    org.Carrier = this.Carrier
    if (this.ContactPublicID != null) {
      org.Contact = findBeanByPublicIDOrThrow<Contact>(this.ContactPublicID)
    } else {
      org.Contact = null
    }
    org.MasterAdmin = this.MasterAdmin
    org.setNameAndRootGroupName(this.Name)
    org.ProducerStatus = this.ProducerStatus
    org.PublicID = this.PublicID
    org.Tier = this.Tier
    org.Type = this.Type

    org.RootGroup.BranchCode = this.RootGroup.BranchCode
    org.RootGroup.Description = this.RootGroup.Description
    org.RootGroup.LoadFactor = this.RootGroup.LoadFactor
    org.RootGroup.Name = this.RootGroup.Name
    if (this.RootGroup.PublicID != null) {
      org.RootGroup.PublicID = this.RootGroup.PublicID
    }

    if (this.RootGroup.SecurityZonePublicID != null) {
      org.RootGroup.SecurityZone = findBeanByPublicIDOrThrow<SecurityZone>(this.RootGroup.SecurityZonePublicID)
    } else {
      throw new BadIdentifierException(DisplayKey.get("OrganizationModel.populateOrganization.Error.ForeignKeyCannotBeNull", "SecurityZone", "RootGroup"))
    }

    if (this.RootGroup.SupervisorPublicID != null) {
      org.RootGroup.Supervisor = findBeanByPublicIDOrThrow<User>(this.RootGroup.SupervisorPublicID)
    } else {
      org.RootGroup.Supervisor = null
    }

    return org
  }

  private reified function findBeanByPublicIDOrThrow<T extends KeyableBean>(orgPublicID : String) : T {
    var bean = Query.make(T).compare(T#PublicID, Equals, orgPublicID).select().AtMostOneRow
    if (bean == null) {
      throw new BadIdentifierException(DisplayKey.get("OrganizationModel.populateOrganization.Error.CannotFindForeignKeyBeanWithPublicID", T, orgPublicID))
    }
    return bean
  }
}