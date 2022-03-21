package gw.plugin.lookup

uses gw.api.database.Query
uses gw.lookup.LookupColumnDTO
uses gw.lookup.LookupDefinitionDTO
uses gw.lookup.LookupTableDefinitionValidation
uses gw.validation.PCValidationContext

@Export
class PCLookupTableCreationPlugin implements LookupCreationPlugin {

  override property get AvailableLookupSourceNames(): List<String> {
    return new SystemTableSourceLookupMethods().AvailableLookupSourceNames
  }

  override function getLookupSourceColumns(lookupDefDTO: LookupSourceDefinitionDTO): List<LookupSourceColumnDTO> {
    if (lookupDefDTO.SourceTable != null) {
      return new SystemTableSourceLookupMethods().getLookupSourceColumns(lookupDefDTO)
    } else {
//      OOTB only system table source column lookups are supported.
      return {}
    }
  }

  override function validateAllLookups(): List<String> {
    var allLookups = Query.make(LookupTableDefinition).select()
    var context = new PCValidationContext(ValidationLevel.TC_DEFAULT)
    allLookups.each(\lookup -> {
      var validator = new LookupTableDefinitionValidation(context, lookup)
      validator.validate()
    })

    return context.Result.ErrorMessages.toList()
  }

  override function validateLookup(lookupTableDefinition: LookupTableDefinition): List<String> {
    var context = new PCValidationContext(ValidationLevel.TC_DEFAULT)
    var validator = new LookupTableDefinitionValidation(context, lookupTableDefinition)
    validator.validate()
    return context.Result.ErrorMessages.toList()
  }
}